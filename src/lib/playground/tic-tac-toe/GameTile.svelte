<script lang="ts">
    import type { Tile } from "./classes/Tile";
    import { scale } from "svelte/transition";

    export let tile : Tile;
    export let turn : string;

    const makeLabel = (turn: string, tile: Tile) => tile.isPicked ? `Tile selected as ${tile.value}` : `Select tile as ${turn}`;
    let label : string = makeLabel(turn, tile);

    $ : label = makeLabel(turn, tile);
</script>

<button
    aria-pressed={tile.isPicked}
    class="tile"
    class:is-x={tile.isX}
    class:is-o={tile.isO}
    title={label}
    on:click>
    {#if tile.value}
        <span in:scale><span>{tile.value}</span></span>
    {/if}
</button>

<style>
    .tile {
        border: 1px solid #000;
        font-size: 2em;
        display: flex;
        padding: 0;
        align-items: stretch;
    }
    .tile:hover {
        cursor: pointer;
    }
    .tile[aria-pressed="true"]:hover {
        cursor: auto;
    }
    .tile > span {
        display: block;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tile.is-x > span {
        background: #1e92af;
        color: #FFF;
    }
    .tile.is-o > span {
        background: #d1491c;
        color: #FFF;
    }
</style>