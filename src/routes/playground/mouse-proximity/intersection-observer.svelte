<svelte:head>
    <title>Svelte Playground: Mouse Proximity to Element Bounding Rectangle</title>
    <meta name="description" content="A page to experiment with detecting when a mouse is within the proximity of an element's bounding rectangle">
</svelte:head>

<script lang=ts>

    /**
     * TODO Implement this strategy
     * @see https://codepen.io/znak/pen/WNovBX
    **/

    // import "$lib/playground/proximity/type";
    
    import { mouseCoords } from "$lib/playground/proximity/stores";
    import { type Unsubscriber, get } from "svelte/store";

    let windowObserver: IntersectionObserver;

    type ProximityConfig = {
        radius: number
    }

    const ensureWindowObserver = () => {
        windowObserver || (windowObserver = new IntersectionObserver((entries) => {
            entries.forEach(({target,isIntersecting}) => target.dispatchEvent(new CustomEvent(isIntersecting?"enterwindow":"exitwindow")));
        }));
    }

    const proximity = ( el: HTMLElement, { radius } : ProximityConfig = { radius: 0 } ) => {

        ensureWindowObserver();

        let inWindow = false;
        let tracker : HTMLSpanElement;
        let observer : IntersectionObserver;
        let unsubCoords : Unsubscriber;

        const mountTracker = () => {
            tracker = document.createElement('span');
            observer = new IntersectionObserver((entries) => {
                entries.forEach(
                    ({isIntersecting,intersectionRect,intersectionRatio}) => {
                        // console.log(isIntersecting,intersectionRect);
                        // el.classList[isIntersecting?"add":"remove"]('in-prox');
                        el.dispatchEvent(new CustomEvent(isIntersecting?"inprox":"outprox", {
                            detail: {
                                intersectionRect,
                                isIntersecting,
                                intersectionRatio
                            }
                        }))
                    }
                )
            }, {
                root: el,
                threshold: [ 0, .2, .4, .6, .8, 1 ],
                rootMargin: `${radius/2}px`
            });

            let bounds : DOMRect = el.getBoundingClientRect();
            tracker.style.display = "block";
            tracker.style.position = "absolute";
            tracker.style.top = "0";
            tracker.style.left = "0";
            // tracker.style.background = "red";
            tracker.style.zIndex = "-1";
            tracker.style.height = `${bounds.height+(radius)}px`;
            tracker.style.width = `${bounds.width+(radius)}px`;

            const setTrackerPosition = ({x,y}:{x:number,y:number}) => {
                bounds = el.getBoundingClientRect();
                const top = `${(y-bounds.top) - ((bounds.height + radius)/2)}px`;
                const left = `${(x-bounds.left) - ((bounds.width + radius)/2)}px`;
                tracker.style.transform = `translate3d(${left}, ${top}, 0)`;
            }

            unsubCoords = mouseCoords.subscribe(setTrackerPosition);

            document.addEventListener("scroll", () => {
                setTrackerPosition(get(mouseCoords));
            });

            el.appendChild( tracker );

            observer.observe( tracker );
        }

        const destroyTracker = () => {
            if( inWindow ) {
                observer.unobserve(tracker);
                tracker.remove();
                unsubCoords();
            }
        }

        windowObserver.observe(el);

        el.addEventListener("enterwindow", () => {
            inWindow = true;
            mountTracker();
        });
        el.addEventListener("exitwindow", () => {
            destroyTracker();
            inWindow = false;
        });

        return {
            destroy() {
                destroyTracker();
                el.removeEventListener("enterwindow", mountTracker);
                el.removeEventListener("exitwindow", destroyTracker);
                windowObserver.unobserve(el);
            },
        }
    }

    let firstInProx = false;

    const gridBoxesCount = 100;
    let gridBoxes : { id : number, inprox : boolean }[] = [];

    for( let i =0; i < gridBoxesCount; i++ ) gridBoxes.push({
        id: i,
        inprox: false
    });
    
</script>

<div class="window-box">
    <button
        class="chase-target"
        class:in-prox={firstInProx}
        use:proximity={{radius:50}}
        on:inprox={({detail: { intersectionRatio, isIntersecting }}) => firstInProx = isIntersecting}
        on:outprox={()=>firstInProx=false}>X
    </button>
</div>
<div class="window-box">
    <button class="chase-target" use:proximity>X</button>
</div>
<div class="window-box">
    <div class="grid-box">
        {#each gridBoxes as gridBox (gridBox.id)  }
            <button
                class="prox-target"
                use:proximity={{radius:50}}
                class:in-prox={gridBox.inprox}
                on:inprox={({detail: { isIntersecting }}) => {
                    gridBox.inprox = isIntersecting;
                    gridBoxes = gridBoxes;
                }}
                on:outprox={()=>{
                    gridBox.inprox = false;
                    gridBoxes = gridBoxes;
                }}>
                X
            </button>
        {/each}
    </div>
</div>

<!-- {#if browser} -->
<span class="coords-box">{$mouseCoords.x} {$mouseCoords.y}</span>
<!-- {/if} -->

<style>
    .window-box {
        background: linear-gradient(#e66465, #9198e5);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .chase-target {
        position: relative;
        background: rgba(0,0,0,.9);
        width:20px;
        height:20px;
        padding:0;
        color: #FFF;
        line-height: 20px;
    }
    :global(.chase-target.in-prox) {
        background: rgba(255,255,255,.9);
        color:#000;
    }
    .grid-box {
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(10, 20px);
        grid-template-columns: repeat(10, 20px);
    }
    .prox-target {
        position: relative;
        background: rgba(0,0,0,.9);
        padding:0;
        color: #FFF;
        line-height: 20px;
    }
    :global(.prox-target.in-prox) {
        background: rgba(255,255,255,.9);
        color:#000;
    }
    .coords-box {
        background-color: rgba(0,0,0,0.7);
        padding: 1rem;
        color: #FFF;
        position: fixed;
        top: 5px;
        left: 5px;
    }
</style>