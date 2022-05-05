<svelte:head>
    <title>Svelte Playground: Mouse Proximity to Element Bounding Rectangle</title>
    <meta name="description" content="A page to experiment with detecting when a mouse is within the proximity of an element's bounding rectangle">
</svelte:head>

<script lang=ts>
    import { tweened } from 'svelte/motion';
    // import { get } from 'svelte/store'
    import type { InProxDetails } from "$lib/playground/proximity/type";
    import ProximityBox from "$lib/playground/proximity/ProximityBox.svelte";
    import { scrollY, mouseCoords } from "$lib/playground/proximity/stores";

    const chaseOptions = { duration: 120 }
    let boxTranslateX = tweened(0, chaseOptions);
    let boxTranslateY = tweened(0, chaseOptions);
    let hasWonBoxChase = false;
    let shadowRatio = 0;
    let shadowSize = 0;

    const handleNoTouch = ( { detail } : { detail: InProxDetails } ) => {
        if( detail.inBox && !hasWonBoxChase ) {
            hasWonBoxChase = true;
        }
        if( hasWonBoxChase ) return;

        if( detail.inTopProx ) {
            $boxTranslateY += $mouseCoords.y - detail.bounds.top + detail.radius + 30;
        } else if( detail.inBottomProx ) {
            $boxTranslateY -= detail.bounds.bottom - $mouseCoords.y + detail.radius + 30;
        }

        if( detail.inLeftProx ) {
            $boxTranslateX += $mouseCoords.x - detail.bounds.left + detail.radius + 30;
        } else if( detail.inRightProx ) {
            $boxTranslateX -= detail.bounds.right - $mouseCoords.x + detail.radius + 30;
        }
    }

    const resetChaseGame = async () => {
        await Promise.all([boxTranslateX.set(0, { duration: 0 }),boxTranslateY.set(0, { duration: 0 })]);
        boxTranslateX.set(0, chaseOptions);
        boxTranslateY.set(0, chaseOptions);
        hasWonBoxChase = false;
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

<svelte:window bind:scrollY={$scrollY}></svelte:window>

<div class="coords-box">
    The mouse position is {$mouseCoords.x} x ({$mouseCoords.y} + {$scrollY} = {$mouseCoords.y + $scrollY})
</div>

<div class="window-box">
    <ProximityBox radius={120}>Mouse detected within 100px</ProximityBox>
</div>

<div class="window-box">
    <div style="display:grid;gap:10px;">
        <button
            class="chase-game"
            class:has-won={hasWonBoxChase}
            style="width:200px"
            style:transform={`translate3d(${$boxTranslateX}px, ${$boxTranslateY}px, 0)`}
            on:click={resetChaseGame}
        >
            <ProximityBox radius={120} on:inprox={handleNoTouch} on:leavescreen={() => !hasWonBoxChase && resetChaseGame()}>
                {#if hasWonBoxChase }
                    You caught me! Click to reset.
                {:else}
                    Try to catch me!
                {/if}
            </ProximityBox>
        </button>
        {#if hasWonBoxChase }
        <button on:click={resetChaseGame} class="has-won">Win!</button>
        {/if}
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

    .chase-game {
        padding: 0;
        background: none;
        color: #FFF
    }
    .has-won {
        background-color: green;
        color: #FFF
    }
    .chase-game:hover {
        background-color: green;
    }
    button:hover {
        cursor: pointer;
    }
</style>