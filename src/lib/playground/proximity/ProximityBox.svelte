<script lang=ts>
    import { onMount } from "svelte";
    import { mouseX, mouseY } from "./stores";

    export let radius : number = 20;

    let box: HTMLDivElement;
    let inTopProx : boolean = false;
    let inBottomProx : boolean = false;
    let inLeftProx : boolean = false;
    let inRightProx : boolean = false;
    let inProx : boolean = false;
    let isInWindow = false;

    onMount(() => {
        let options = {
            rootMargin: '20px',
        };

        // TODO Shared observer from store?
        let observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => isInWindow = entry.isIntersecting);

        }, options);

        observer.observe( box );
    });

    $ : {
        if( isInWindow ) {
            const bounds = box.getBoundingClientRect();

            const withinX = $mouseX >= (bounds.left-radius) && $mouseX <= (bounds.right+20);

            if( withinX ) {
                const isInTopProx = $mouseY >= (bounds.top-radius) && $mouseY < bounds.top;
                if(isInTopProx !== inTopProx) inTopProx = isInTopProx;
                if( !inTopProx ) {
                    const isInBottomProx = $mouseY > (bounds.bottom) && $mouseY <= (bounds.bottom + radius);
                    if(isInBottomProx !== inBottomProx) inBottomProx = isInBottomProx;
                }
            }
            
            const withinY = $mouseY >= (bounds.top-radius) && $mouseY <= (bounds.bottom+20);

            if( withinY ) {
                const isInLeftProx = $mouseX > (bounds.left-radius) && $mouseX < bounds.left;
                if(isInLeftProx !== inLeftProx) inLeftProx = isInLeftProx;

                if(!inLeftProx) {
                    const isInRightProx = $mouseX > (bounds.right) && $mouseX <= (bounds.right + radius);
                    if(isInRightProx !== inRightProx) inRightProx = isInRightProx;
                }
            }
        }
    }

    $ : inProx = inTopProx || inBottomProx || inLeftProx || inRightProx;
</script>

<div bind:this={box} class:is-near-hover={inProx}>
    <slot>{radius} Proximity Detection</slot>
</div>

<style>
    div {
        width: 50vw;
        background: rgba(0,0,0,0.2);
        padding: 2rem;
        
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    div.grow {
        flex-grow: 1;
    }
    div.is-near-hover {
        background: rgba(255,255,255,0.2);
    }
</style>