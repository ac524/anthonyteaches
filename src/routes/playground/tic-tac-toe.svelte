<svelte:head>
    <title>Svelte Playground: Tic Tac Toe by Anthony Brown</title>
    <meta name="description" content="A Tic Tac Toe game board built in SvelteKit by Anthony Brown">
</svelte:head>

<script lang="ts">
    import TicTacToeGame from "$lib/playground/tic-tac-toe/Game.svelte";
</script>

<div class="window">
    <TicTacToeGame />
</div>

<style>
    .window {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>