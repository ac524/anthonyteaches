<script lang=ts>
    import { writable, type Unsubscriber } from "svelte/store"

    const y = writable( 0 );
    let innerHeight = 0;

    let layers = [0,1,2,3];

    const scrollEffectSubs = new Set<HTMLElement>();

    const seffectbox = ( el: HTMLElement, { observe = true } = {} ) => {
        const scrollBoxEffectSubs = new Set<HTMLElement>();
        const observer = observe && new IntersectionObserver((entries) => {
            entries.forEach(
                ({isIntersecting}) => {
                    console.log(isIntersecting, scrollBoxEffectSubs);
                    scrollBoxEffectSubs.forEach(sub => sub.dispatchEvent(new CustomEvent(`seffect${isIntersecting ? "on" : "off"}`)));
                }
            )
        });

        observer && observer.observe(el);

        const setOffset = (sub: HTMLElement) => sub.dispatchEvent(new CustomEvent("setoffset", { detail: el.offsetTop }));
        const setOffsets = () => scrollBoxEffectSubs.forEach(sub => setOffset(sub));

        window.addEventListener('resize', setOffsets);

        scrollEffectSubs.forEach( sub => {
            if( el.contains(sub) ) {
                scrollBoxEffectSubs.add(sub);
                setOffset(sub);
            }
        });

        return {
            destroy() {
                observer && observer.unobserve( el );
                window.removeEventListener('resize', setOffsets);
            }
        }

    };

    const seffect = ( el: HTMLElement, effect : (y:number) => string ) => {
        let offset = 0;

        scrollEffectSubs.add(el);
        const setOffsetHandler = (({ detail } : CustomEvent) => {
            offset = detail;
        }) as EventListener;

        el.addEventListener("setoffset", setOffsetHandler );

        const subscribe = () => y.subscribe(scrollY => el.style.transform = effect(scrollY - offset));

        let unsub : Unsubscriber|null = subscribe();

        const effectOff = () => !unsub && (unsub = subscribe());
        el.addEventListener("seffecton", effectOff);
        const effectOn = () => {
            if( !unsub ) return;
            unsub();
            unsub = null;
        };
        el.addEventListener("seffectoff", effectOn);

        return {
            destroy() {
                el.removeEventListener("setoffset", setOffsetHandler);
                el.removeEventListener("seffecton", effectOff);
                el.removeEventListener("seffectoff", effectOn);
                unsub && unsub();
            }
        }
    };
</script>

<svelte:window bind:scrollY={$y} bind:innerHeight={innerHeight}/>

<div class="window-box" use:seffectbox>
    {#each layers as layer }
        <div
            class={`layer box-${layer}`}
            use:seffect={(y) => `translate3d(0,${ y * (layer+1)/(layers.length+1) * -1 }px,0)`}
        ></div>
    {/each}
</div>

<div class="window-box bg-dark"></div>

<div class="window-box" use:seffectbox>
    {#each layers as layer }
        <div
            class={`layer box-${layer}`}
            use:seffect={(y) => `translate3d(0,${ y * (layer+1)/(layers.length+1) * -1 }px,0)`}
        ></div>
    {/each}
</div>

<div class="window-box bg-dark"></div>

<div class="window-box bg-dark" use:seffectbox>
    <div class="horizon layer" use:seffect={(y) => `scaleY( ${1 - (y/innerHeight)} )`}>
        <div
            class="street layer"
            use:seffect={(y) => `rotateX(${Math.max(2,(y/innerHeight)*60)}deg)`}
        ></div>
    </div>
</div>

<div class="window-box bg-dark"></div>

<style>
    .window-box {
        position: relative;
        overflow: hidden;
        height: 100vh;
    }
    .layer {
        width: 100%;
        left: 0;
        position: absolute;
        bottom: 0;
    }
    .bg-dark {
        background-color: #000;
    }
    .box-0 {
        height: 80vh;
        background-color: #EEE;
    }
    .box-1 {
        height: 60vh;
        background-color: #AAA;
    }
    .box-2 {
        height: 40vh;
        background-color: #777;
    }
    .box-3 {
        height: 20vh;
        background-color: #333;
    }

    /**
     * City Scape
    **/
    .horizon {
        border-radius: 40em/2em;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: #333;
        height: 60vh;
        perspective: 40vh;
        overflow: hidden;
        transform-origin: center bottom;
    }
    .street {
        background-color: #FFF;
        width: 20vw;
        left: calc(50% - 10vw);
        height: 100%;
        transform-origin: center top;
    }
    .street:after {
        content: "";
        position: absolute;
        left: calc(50% - 1px - .25vw);
        height: 100%;
        width: 2px;
        border: .5vw dashed #000;
    }
</style>