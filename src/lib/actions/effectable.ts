import { readable, type Readable, type Unsubscriber } from 'svelte/store';

type Concrete<T> = { [P in keyof T]-?: T[P] };

interface EffectableState {
	scrollY: number;
	// mouse: number
}

type EffectableStateType = keyof EffectableState;

type EffectableStateList = EffectableStateType[];

type Subscribeables = {
	[K in EffectableStateType]: Readable<EffectableState[K]>;
};

type EffectableStateSet<T extends EffectableStateList> = {
	[K in T[number]]: EffectableState[K];
};

const subscribables: Subscribeables = {
	scrollY: readable(0, (set) => {
		const setScroll = () => {
			// console.log(window.scrollY);
			set(window.scrollY);
		};
		window.addEventListener('scroll', setScroll);

		return () => {
			window.removeEventListener('scroll', setScroll);
		};
	})
};

interface EffectClasses {
	[key: string]: boolean;
}

interface TransformationConfigs {
	style?: Partial<CSSStyleDeclaration>;
	classNames?: EffectClasses;
}

type TransformationsOptions = Concrete<TransformationConfigs>;

type TransformationKey = keyof TransformationsOptions;

type Transformations = {
	[K in TransformationKey]: (el: HTMLElement, option: TransformationsOptions[K]) => void;
};

const transformations: Transformations = {
	style(el: HTMLElement, style: Partial<CSSStyleDeclaration>) {
		// console.log(style);
		for (const key in style) el.style[key] = style[key] || '';
	},
	classNames(el: HTMLElement, classNames: EffectClasses) {
		for (const className in classNames) {
			const state = classNames[className];
			if (state) {
				!el.classList.contains(className) && el.classList.add(className);
				continue;
			}
			el.classList.contains(className) && el.classList.remove(className);
		}
	}
};

/**
 * Store for named elements used for connecting data between multiple effect elements.
 */
const named = new Map<string, HTMLElement>();

const getNamed = (name: string): HTMLElement | null =>
	named.has(name) ? (named.get(name) as HTMLElement) : null;

type StateModifier<K extends EffectableStateType> = (
	value: EffectableState[K],
	offsetEl: HTMLElement
) => EffectableState[K];

// Optional set for object
type OffsetModificationSet = {
	[K in EffectableStateType]?: StateModifier<K>;
};

type OffsetModifications = {
	[K in EffectableStateType]: StateModifier<K>;
};

const offsetMods: OffsetModificationSet = {
	scrollY: (scrollY, offsetEl) => {
		return scrollY - offsetEl.offsetTop;
	}
};

interface GetOffsetValue {
	<T extends EffectableStateType>(
		name: string,
		subType: T,
		value: EffectableState[T]
	): EffectableState[T];
}

const getOffset: GetOffsetValue = (name, subType, value) => {
	if (!(subType in offsetMods)) return value;

	const offsetEl = getNamed(name);

	if (null === offsetEl) return scrollY;

	// console.log(value, offsetEl.offsetTop);

	return (<OffsetModifications>offsetMods)[subType](value, offsetEl);
};

interface SubscribeConfig<T extends EffectableStateList> {
	subscribeTo: T;
	effect: (state: EffectableStateSet<T>) => TransformationConfigs;
	offset?: string;
}

const subscribe = <T extends EffectableStateList>(
	el: HTMLElement,
	{ subscribeTo, effect, offset }: SubscribeConfig<T>
): Unsubscriber[] => {
	/**
	 * Start off with an empty state that we'll fill in.
	 * Note: Not 100% this is the best approach. Currently taken as values are unavailable until the
	 * subscriptions have been initialized. May need an additional abstraction layer in the future around
	 * value fetching, so it can be done here independently, and within the readable stores.
	 */
	const state = {} as EffectableState;

	// A flag set to true one we all expected values in `state`.
	let init = false;

	// Transformation execution handler.
	const transform = () => {
		// Don't run transforms until we have a full `state`.
		if (!init && !(init = Object.keys(state).length === subscribeTo.length)) return;

		const transformConfigs = <TransformationsOptions>effect(state);

		const doTransform = <T extends TransformationKey>(key: T) =>
			transformations[key](el, transformConfigs[key]);

		for (const transform in transformConfigs) doTransform(transform as TransformationKey);
	};

	// For each given subscription name, subscribe to it's store and collect each unsubscriber.
	return subscribeTo.reduce<Unsubscriber[]>((unsubs, subType) => {
		return [
			...unsubs,
			subscribables[subType].subscribe((value) => {
				if (offset) {
					// If there was a named offset element, get the modified value.
					state[subType] = getOffset(offset, subType, value);
				} else {
					// Otherwise, update the state with the new value as is.
					state[subType] = value;
				}
				// Run transformations after state updates.
				transform();
			})
		];
	}, []);
};

interface ObservationWatcher {
	in: () => void;
	out: () => void;
}

const observationTree: {
	[key: string]: {
		observer: IntersectionObserver | undefined;
		watchers: Set<ObservationWatcher>;
	};
} = {};

const ensureObserverLeaf = (observe: string) => {
	if (!(observe in observationTree)) {
		observationTree[observe] = {
			observer: undefined,
			watchers: new Set()
		};
	}
};

const createObserver = (observe: string) => {
	const observable = getNamed(observe);
	if (observable) {
		observationTree[observe].observer = new IntersectionObserver((entries) => {
			entries.forEach(({ isIntersecting }) => {
				for (const watcher of observationTree[observe].watchers) {
					watcher[isIntersecting ? 'in' : 'out']();
				}
			});
		});
		observationTree[observe].observer?.observe(observable);
	}
};

const destroyObserver = (observe: string, force = false) => {
	if (observationTree[observe].observer && (force || !observationTree[observe].watchers.size)) {
		observationTree[observe].observer?.disconnect();
		observationTree[observe].observer = undefined;
	}
};

const subscribeObserver = (observe: string) => {
	const { observer, watchers } = observationTree[observe];
	if (!observer && watchers.size) {
		createObserver(observe);
	}
};

const subscribeObservation = (observe: string, watcher: ObservationWatcher): Unsubscriber => {
	ensureObserverLeaf(observe);

	observationTree[observe].watchers.add(watcher);

	createObserver(observe);

	return () => {
		observationTree[observe].watchers.delete(watcher);
		destroyObserver(observe);
	};
};

interface EffectableConfig<T extends EffectableStateList> {
	subscribeTo?: T;
	effect?: (state: EffectableStateSet<T>) => TransformationConfigs;
	name?: string;
	offset?: string;
	observe?: string;
}

/**
 * The `effectable` action.
 */
export const effectable = <T extends EffectableStateList>(
	el: HTMLElement,
	{ name, subscribeTo, effect, offset, observe }: EffectableConfig<T>
) => {
	// If provided a `name`, use it as a key to store the element in the `named` store, for easy access by other `effectable` elements.
	if (name) {
		named.set(name, el);
		if (name in observationTree) subscribeObserver(name);
	}

	let unsubs: undefined | Unsubscriber[];

	const doSubscribe = () => {
		if (!unsubs) {
			unsubs =
				subscribeTo &&
				effect &&
				subscribe<T>(el, {
					subscribeTo,
					effect,
					offset
				});
		}
	};
	const doUnsubscribe = () => {
		if (unsubs) {
			for (const unsub of unsubs) unsub();
			unsubs = undefined;
		}
	};

	let observerUnsub: undefined | Unsubscriber;
	if (observe) {
		observerUnsub = subscribeObservation(observe, {
			in: () => {
				doSubscribe();
			},
			out: () => {
				doUnsubscribe();
			}
		});
	} else {
		doSubscribe();
	}

	return {
		destroy() {
			// Clean up the store reference if there was one.
			if(name) {
                named.delete(name);
                if (name in observationTree) destroyObserver(name,true);
            }
			// Clean up any registered subscriptions.
			doUnsubscribe();
			if (observerUnsub) observerUnsub();
		}
	};
};