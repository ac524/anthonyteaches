<script lang="ts">
    import type { CoordList } from "./utils/coords";
    import GameTile from "./GameTile.svelte";
    import { Tile } from "./classes/Tile";
    import { getWinningCoords } from "./utils/coords";
    import { fade } from "svelte/transition";

    let turn = "X";
    let turnFocused = "X";
    let lastCoord = 0;

    let tiles : Tile[] = [];

    let winningTiles : CoordList|false = false;
    
    // Build the initial tiles list
    for(let i = 0; i<9; i++) tiles.push( new Tile(i) );

    $ : {
        winningTiles = getWinningCoords( lastCoord, tiles );
        turnFocused = winningTiles ? tiles[winningTiles[0]].value : turn;
    }

    // Handle clicking Tiles
    const setTileValue = (coord : number) : void => {
        if(tiles[coord].value) return;

        // TODO Determine if this move results in a win, then flag appropriate

        tiles = tiles.map( tile => {
            if( coord !== tile.coord ) return tile;

            return tile.withNewValue( turn );
        });

        lastCoord = coord;
        turn = turn === "X" ? "O" : "X";
    }

    const resetTiles = () : void => {
        tiles = tiles.map( tile => {
            return tile.withNewValue( "" );
        });

        if( turn !== "X" ) turn = "X";
    }
</script>

<div class="game-container">
    <div class="box message" >
        {#if winningTiles}
            <span in:fade>Reset the game to play again</span>
        {:else}
            <span in:fade>Click the tiles to play the game</span>
        {/if}
    </div>
    <div class="row">
        <div class="col box text-center message row row-ai-center text-wrap-no" class:is-win={winningTiles} id="turn-label">
            {#if winningTiles}
                <span in:fade>The winner is:</span>
            {:else}
                <span in:fade>The current player is:</span>
            {/if}
        </div>
        <div
            aria-describedby="turn-label"
            class="col box fs-larger row row-ai-center"
            class:is-x={turnFocused==="X"}
            class:is-o={turnFocused==="O"}
            class:is-win={winningTiles}
            style="max-width:40px;border-left:2px solid #FFF">
            <span class="col text-center">{turnFocused}</span>
        </div>
    </div>
    <div class="game-box">
        <div class="game-box--inner">
            <div class="game-grid">
                <!-- Print each tile with it's coord as the key -->
                {#each tiles as tile (tile.coord) }
                    <GameTile {turn} {tile} {winningTiles} on:click={() => setTileValue(tile.coord)}/>
                {/each}
            </div>
        </div>
    </div>
    <button on:click={resetTiles} title="Reset the game board">Reset</button>
</div>

<style>
    .game-container {
        font-family: Arial, Helvetica, sans-serif;
    }
    .text-center {
        text-align: center;
    }
    .text-wrap-no {
        white-space: nowrap;
    }
    .fs-larger {
        font-size: 1.5em;
    }
    .is-x {
        background: #1e92af;
        color: #FFF;
    }
    .is-o {
        background: #d1491c;
        color: #FFF;
    }
    .box {
        padding: 1rem;
    }
    .row {
        display:flex;
    }
    .row-ai-center {
        align-items: center;
    }
    .col {
        flex: 1 1 0;
    }
    .message {
        text-align: center;
        background: #EFEFEF;
    }
    .is-win {
        background: #149e16;
        color: #FFF;
    }
    .game-container {
        display: grid;
        gap: 10px;
    }

    .game-box {
        width: 300px;
        max-width: 100%;
        background: #DEDEDE;
    }

    .game-box--inner {
        width: 100%;
        position: relative;
        padding-top: 100%;
    }

    .game-grid {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        border: 1px solid #000;
    }

    button {
        padding: .5rem 1rem
    }
    button:hover {
        cursor: pointer;
    }
</style>