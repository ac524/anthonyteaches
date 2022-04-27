<script lang="ts">
    import GameTile from "./GameTile.svelte";
    import { Tile } from "./classes/Tile";

    let turn = "X";
    // let lastCoord = 0;

    let tiles : Tile[] = [];
    
    // Build the initial tiles list
    for(let i = 0; i<9; i++) tiles.push( new Tile(i) );

    // Handle clicking Tiles
    const setTileValue = (coord : number) : void => {
        if(tiles[coord].value) return;

        // TODO Determine if this move results in a win, then flag appropriate

        tiles = tiles.map( tile => {
            if( coord !== tile.coord ) return tile;

            return tile.withNewValue( turn );
        });

        // lastCoord = coord;
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
    <div class="game-box">
        <div class="game-box--inner">
            <div class="game-grid">
                <!-- Print each tile with it's coord as the key -->
                {#each tiles as tile (tile.coord) }
                    <GameTile {turn} {tile} on:click={() => setTileValue(tile.coord)}/>
                {/each}
            </div>
        </div>
    </div>
    <button on:click={resetTiles} title="Reset the game board">Reset</button>
</div>

<style>
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