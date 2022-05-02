<svelte:head>
    <title>Svelte Playground: Mouse Proximity to Element Bounding Rectangle</title>
    <meta name="description" content="A page to experiment with detecting when a mouse is within the proximity of an element's bounding rectangle">
</svelte:head>

<script lang=ts>
    import { tweened } from 'svelte/motion';
    import type { InProxDetails } from "$lib/playground/proximity/type";
    import ProximityBox from "$lib/playground/proximity/ProximityBox.svelte";
    import { scrollY, mouseX, mouseY } from "$lib/playground/proximity/stores";
    import { handleMousemove } from "$lib/playground/proximity/actions";

    let boxTranslateX = tweened(0);
    let boxTranlateY = tweened(0);
    let shadowRatio = 0;
    let shadowSize = 0;

    const handleNoTouch = ( { detail } : { detail: InProxDetails } ) => {
        if( detail.inTopProx ) {
            $boxTranlateY += $mouseY - detail.bounds.top + detail.radius;
        } else if( detail.inBottomProx ) {
            $boxTranlateY -= detail.bounds.bottom - $mouseY + detail.radius;
        }

        if( detail.inLeftProx ) {
            $boxTranslateX += $mouseX - detail.bounds.left + detail.radius;
        } else if( detail.inRightProx ) {
            $boxTranslateX -= detail.bounds.right - $mouseX + detail.radius;
        }
    }

    const handleProximityShadow = ({ detail } : { detail: InProxDetails }) => {
        shadowRatio = detail.ratio;
        shadowSize = Math.floor(30 * detail.ratio);
    }
    const handleRemoveProximityShadow = () => {
        shadowSize = 0;
    }

    /**
     * Mouse Tracking idea
     * @see https://svelte.dev/tutorial/dom-events
    **/
</script>

<svelte:window on:mousemove={handleMousemove} bind:scrollY={$scrollY}></svelte:window>

<div class="coords-box">
    The mouse position is {$mouseX} x ({$mouseY} + {$scrollY} = {$mouseY + $scrollY})
</div>

<div class="window-box">
    <ProximityBox radius={100}>Mouse detected within 100px</ProximityBox>
</div>

<div class="window-box">
    <div style:transform={`translate3d(${$boxTranslateX}px, ${$boxTranlateY}px, 0)`}>
        <ProximityBox radius={20} on:inprox={handleNoTouch}>Chase Me!</ProximityBox>
    </div>
</div>
<div class="window-box">
    <div style={`transform: scale(${1+(.2*shadowRatio)}); box-shadow: 0 0 ${shadowSize}px ${shadowSize*.8}px rgba(0,0,0,0.35);`}>
        <ProximityBox radius={200} on:inprox={handleProximityShadow} on:outprox={handleRemoveProximityShadow}>
            Highlight CTA
        </ProximityBox>
    </div>
</div>

<div class="center-box">
    <div class="box" style:transform={`translate3d(0, ${$scrollY*-1}px, 0)`}>
        <ProximityBox radius={60}>A box translating on scroll</ProximityBox>
    </div>
</div>

<style>
    .center-box
    {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .window-box {
        background: linear-gradient(#e66465, #9198e5);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    /* .tall-box {
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        height: 300vh;
        background: linear-gradient(#e66465, #9198e5);
    } */
    .coords-box {
        background-color: rgba(0,0,0,0.7);
        padding: 1rem;
        color: #FFF;
        position: fixed;
        top: 5px;
        left: 5px;
    }
</style>