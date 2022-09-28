<script lang="ts">
    import type { Tile } from "./classes/Tile";
    import type { CoordList } from "./utils/coords";
    import { scale } from "svelte/transition";

    export let tile : Tile;
    export let turn : string;
    export let winningTiles : CoordList|false;

    const makeLabel = (turn: string, tile: Tile) => tile.isPicked ? `Tile selected as ${tile.value}` : `Select tile as ${turn}`;
    let label : string = makeLabel(turn, tile);
    let isWinning = false;
    let hoverLabel : string = "";

    $ : {
        if( isWinning && !tile.value) {
            isWinning = false;
        } else if( !isWinning && winningTiles && winningTiles.includes(tile.coord) ) {
            isWinning = true;
        }
    };

    const toggleHoverLabel = () => hoverLabel = hoverLabel ? "" : turn; 

    $ : {
        if( hoverLabel && tile.value ) hoverLabel = "";
    }
    
    $ : label = makeLabel(turn, tile);
</script>

<button
    aria-pressed={tile.isPicked}
    class="tile"
    class:is-x={tile.isX}
    class:is-o={tile.isO}
    class:is-winning={isWinning}
    title={label}
    disabled={winningTiles && !isWinning}
    on:mouseenter={toggleHoverLabel}
    on:mouseleave={toggleHoverLabel}
    on:click>
    {#if tile.value}
        <span in:scale><span>{tile.value}</span></span>
    {:else if hoverLabel}
        <span in:scale style="opacity:.7"><span>{turn}</span></span>
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
    .tile[aria-pressed="true"]:hover,
    .tile:disabled {
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
    .tile.is-winning > span {
        background: #149e16;
        color: #FFF;
    }
</style>