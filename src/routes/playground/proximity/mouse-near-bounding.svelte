<svelte:head>
    <title>Svelte Playground: Tracking Mouse Movement by Anthony Brown</title>
    <meta name="description" content="A page to experiment with using mouse tracking event in SvelteKit">
</svelte:head>

<script lang=ts>
    
    import ProximityBox from "$lib/playground/proximity/ProximityBox.svelte";
    import { scrollY, mouseX, mouseY } from "$lib/playground/proximity/stores";

    /**
     * Mouse Tracking idea
     * @see https://svelte.dev/tutorial/dom-events 
     * 
     * ScrollY Concept
     * @see https://www.youtube.com/watch?v=K3CM7j9GIxk&list=PLLnpHn493BHF-Onm1MQgKC1psvW-rJuYi&index=18
    **/
    function handleMousemove(event: { clientX: number; clientY: number; }) {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
    }
</script>

<svelte:window on:mousemove={handleMousemove} bind:scrollY={$scrollY}></svelte:window>

<div class="coords-box">
    The mouse position is {$mouseX} x ({$mouseY} + {$scrollY} = {$mouseY + $scrollY})
</div>

<div class="window-box">
    <ProximityBox radius={100}/>
</div>

<div class="tall-box">
    <ProximityBox radius={30} />
    <ProximityBox radius={30} />
    <div class="box" style:transform={`translate3d(0, ${$scrollY*-1}px, 0)`}>
        <ProximityBox radius={60}/>
    </div>
    <ProximityBox radius={30} />
    <ProximityBox radius={30} />
    <ProximityBox radius={30} />
    <ProximityBox radius={30} />
    <ProximityBox radius={30} />
</div>

<style>
    .window-box {
        background: linear-gradient(#e66465, #9198e5);
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .tall-box {
        display:flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        height: 300vh;
        background: linear-gradient(#e66465, #9198e5);
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