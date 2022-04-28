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
<div class="btn-div">
    <button class="btn" on:click={handleClick}>{`You've clicked me ${timesClicked} times`}</button>
</div>

<style>
    .btn-div {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn {
        height: 40px;
        border: none;
        padding: 8px;
        background-color: rgb(145, 178, 189);
        cursor: pointer;
        border-radius: 5px;
    }
</style>
