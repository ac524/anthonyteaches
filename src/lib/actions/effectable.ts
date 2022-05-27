import { readable, type Readable, type Unsubscriber } from "svelte/store";

// type Interactives = "scrollY"

type Subscribeables = {
    scrollY: Readable<number>,
    // mouse: Readable<{x: number, y: number}>
}

type SubType = keyof Subscribeables;

const subscribables : Subscribeables = {
    scrollY: readable(0, (set) => {
        const setScroll = () => set(window.scrollY);
        window.addEventListener('scroll', setScroll);
    
        return () => {
            window.removeEventListener('scroll', setScroll);
        }
    })
};

interface EffectableState {
    scrollY: number,
    // mouse: number
}

// type EffectableState<T extends SubType[]> = { [K in keyof Subscribeables]: InteractiveState[T[number]] }

interface Transformation {
    style?: Partial<CSSStyleDeclaration>
    classNames?: EffectClasses
}

interface EffectableConfig {
    subs: SubType[],
    effect: ( state: EffectableState ) => Transformation
}

interface EffectClasses {
    [key: string]: boolean
}

// export const effectablebox = (
//     el: HTMLElement,
//     { observe = true } = {}
// ) => {

// }

/**
 * TODO
 * Need a way in Typscript to use the array list of `subs` to provide the determined EffectableState object that gets provided to each
 * `effect` call. Current set up has EffectableState keys set up as optional, which is creating the need for additional type checking
 * in each provided `effect` to avoid ts warnings.
 * 
 * @see https://stackoverflow.com/questions/53276792/define-a-list-of-optional-keys-for-typescript-record
 * @see https://blog.digital-craftsman.de/record-with-optional-keys-with-typescript/
 */

export const effectable = (
    el: HTMLElement,
    { subs, effect } : EffectableConfig
) => {

    const state : EffectableState = {} as EffectableState;
    let init = false;

    const transform = () => {
        // Don't run transforms until we have a full state.
        if( !init && !(init = Object.keys(state).length === subs.length) ) return;

        const {
            style,
            classNames
        } = effect( state );

        // Map styles
        if( style ) for( const key in style ) el.style[key] = style[key] || "";
        if( classNames ) {
            for( const className in classNames ) {
                const state = classNames[className];
                if(state) {
                    !el.classList.contains(className) && el.classList.add(className);
                    continue;
                }
                el.classList.contains(className) && el.classList.remove(className);
            }
        }
    }
    
    const unsubs = subs.reduce<Unsubscriber[]>((unsubs, subType) => [
        ...unsubs,
        subscribables[subType].subscribe((value) => {
            state[subType] = value;
            transform();
        })
    ], []);

    return {
        destroy() {
            for( const unsub of unsubs ) unsub();
        }
    }
}