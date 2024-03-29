<script lang=ts>
    import type { InProxDetails } from "./type";
    import type { Unsubscriber } from "svelte/store";
    import { onMount, createEventDispatcher, onDestroy } from "svelte";
    import { scrollY, mouseCoords } from "./stores";

    export let radius : number = 20;

    let box: HTMLDivElement;
    let bounds: DOMRect;
    let inBox : boolean = false;
    let inTopProx : boolean = false;
    let inBottomProx : boolean = false;
    let inLeftProx : boolean = false;
    let inRightProx : boolean = false;
    let inProx : boolean = false;
    let isInWindow = false;
    let ratio : number;

    const dispatch = createEventDispatcher<{
        inprox: InProxDetails,
        outprox: undefined,
        enterscreen: undefined,
        leavescreen: undefined
    }>();

    const dispatchInProx = () => dispatch("inprox", {
        bounds,
        inTopProx,
        inBottomProx,
        inLeftProx,
        inRightProx,
        radius,
        ratio,
        inBox
    });

    const determineProx = ( { x: mouseX, y: mouseY } : { x : number, y: number } ) => {
        const wasInProx = inProx;
        if( isInWindow ) {
            bounds = box.getBoundingClientRect();

            inBox = mouseX > bounds.left && mouseX < bounds.right && mouseY > bounds.top && mouseY < bounds.bottom;

            if( inBox ) {
                const inTop = mouseY < (bounds.top + (bounds.height/2));
                const inLeft = mouseX < (bounds.left + (bounds.width/2));
                inTopProx = inTop;
                inBottomProx = !inTop;
                inLeftProx = inLeft;
                inRightProx = !inLeft;
                ratio = 1;
                return dispatchInProx();
            }

            const withinX = mouseX >= (bounds.left-radius) && mouseX <= (bounds.right+20);

            if( withinX ) {
                const isInTopProx = mouseY >= (bounds.top-radius) && mouseY < bounds.top;
                if(isInTopProx !== inTopProx) inTopProx = isInTopProx;
                if( !inTopProx ) {
                    const isInBottomProx = mouseY > (bounds.bottom) && mouseY <= (bounds.bottom + radius);
                    if(isInBottomProx !== inBottomProx) inBottomProx = isInBottomProx;
                }
            } else {
                if(inTopProx) inTopProx = false;
                if(inBottomProx) inBottomProx = false;
            }
            
            const withinY = mouseY >= (bounds.top-radius) && mouseY <= (bounds.bottom+20);

            if( withinY ) {
                const isInLeftProx = mouseX > (bounds.left-radius) && mouseX < bounds.left;
                if(isInLeftProx !== inLeftProx) inLeftProx = isInLeftProx;

                if(!inLeftProx) {
                    const isInRightProx = mouseX > (bounds.right) && mouseX <= (bounds.right + radius);
                    if(isInRightProx !== inRightProx) inRightProx = isInRightProx;
                }
            } else {
                if(inLeftProx) inLeftProx = false;
                if(inRightProx) inRightProx = false;
            }
        }

        const nowInProx = inTopProx || inBottomProx || inLeftProx || inRightProx;

        if( nowInProx !== inProx ) inProx = nowInProx;

        if( inProx ) {
            if(inTopProx) ratio = 1 - ((bounds.top - mouseY)/radius);
            else if(inLeftProx) ratio = 1 - ((bounds.left - mouseX)/radius);
            else if(inBottomProx) ratio = 1 - ((mouseY - bounds.bottom)/radius);
            else if(inRightProx) ratio = 1 - ((mouseX - bounds.right)/radius);
            dispatchInProx();
        } else if( wasInProx ) {
            ratio = 0;
            dispatch("outprox");
        }
    }

    $ : determineProx( $mouseCoords);

    $ : {
        dispatch(isInWindow ? "enterscreen" : "leavescreen");
    }


    let scrollYSub : Unsubscriber;
    onMount(() => {
        let options = {
            rootMargin: '20px',
        };

        // TODO Create/Share a single observer as a dependency?
        let observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => isInWindow = entry.isIntersecting);

        }, options);

        observer.observe( box );

        scrollYSub = scrollY.subscribe(() => determineProx( $mouseCoords ));
    });

    onDestroy(() => {
        scrollYSub && scrollYSub();
    });
    
</script>

<div bind:this={box} class:is-near-hover={inProx}>
    <slot>{radius} Proximity Detection</slot>
</div>

<style>
    div {
        max-width: 100%;
        width: 50vw;
        background: rgba(0,0,0,0.2);
        padding: 2rem;
        
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    /* div.grow {
        flex-grow: 1;
    } */
    div.is-near-hover {
        background: rgba(255,255,255,0.2);
    }
</style>