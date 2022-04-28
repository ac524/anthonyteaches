<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();
    let timesClicked = 0;

	const handleClick = () => {
        timesClicked++;

    }
</script>

<svelte:head>
	<title>Kelsey</title>
</svelte:head>
<!-- <h1>Click the button</h1> -->
<button on:click={handleClick}>{`You've clicked me ${timesClicked} times`}</button>
