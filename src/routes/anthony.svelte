<script lang="ts">
    class Tile {
        constructor(
            readonly coord: number,
            readonly value: string = ""
        ){}

        withNewValue( value: string ) : Tile {
            return new Tile(this.coord, value)
        }

        get isPicked() : boolean {
            return !!this.value;
        }

        get isX() : boolean {
            return this.value === "X";
        }

        get isO() : boolean {
            return this.value === "O";
        }
    }

    let turn = "X";
    // let lastCoord = 0;

    let tiles : Tile[] = [];
    
    for(let i = 0; i<9; i++) tiles.push( new Tile(i) );

    const setTileValue = (coord : number) => {
        if(tiles[coord].value) return;

        // TODO Determine if this move results in a win, then flag appropriate

        tiles = tiles.map( tile => {
            if( coord !== tile.coord ) return tile;

            return tile.withNewValue( turn );
        });

        // lastCoord = coord;
        turn = turn === "X" ? "O" : "X";
    }

    const resetTiles = () => {
        tiles = tiles.map( tile => {
            return tile.withNewValue( "" );
        });

        if( turn !== "X" ) turn = "X";
    }
</script>

<div class="window">
    <div class="center-box">
        <div class="game-box">
            <div class="game-box--inner">
                <div class="game-grid">
                    {#each tiles as tile (tile.coord) }
                        <button
                            aria-pressed={tile.isPicked}
                            class:is-x={tile.isX}
                            class:is-o={tile.isO}
                            class="tile" on:click={() => setTileValue(tile.coord)}>
                            {tile.value}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
        <button on:click={resetTiles}>Reset</button>
    </div>
</div>

<style>
    .window {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .center-box {
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

    .tile {
        border: 1px solid #000;
        font-size: 2em;
    }
    .tile[aria-pressed="true"]:hover {
        cursor: auto;
    }
    .tile.is-x {
        background: #1e92af;
        color: #FFF;
    }
    .tile.is-o {
        background: #d1491c;
        color: #FFF;
    }

    button {
        padding: .5rem 1rem
    }
    button:hover {
        cursor: pointer;
    }
</style>