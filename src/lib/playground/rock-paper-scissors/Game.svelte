<script lang="ts">
	import { selectWinner } from './utils/selectWinner';
	import { fade } from 'svelte/transition';
	import AboutRPS from './AboutRPS.svelte';

	// Build the initial icons
	const options = ['rock', 'paper', 'scissors'];
	let selected = options[0];

	// Handle user1 clicking icon

	// Handle user2 or computer returning their move
	const number = Math.floor(Math.random() * 3 + 1);
	let random = options[Math.floor(Math.random() * options.length)];
	console.log('computer chose' + random);

	// pull the winner from selectWinner import

	selectWinner(options[0], random);
	console.log(selectWinner);

	// winner = selectWinner( user1.choice:string, user2.choice:string);

	// flag appropriate winner

	// button to reset the game. tally win?
	const resetGame = (): void => {
		return;
		// return something here to reset the game.
	};
</script>

<div class="game-container">
	<AboutRPS />
	<div class="box message">
		<!-- {#if winner} -->
		<span in:fade>Reset the game to play again</span>
		<!-- {:else} -->
		<span in:fade>Choose an image to play the game.</span>
		<!-- {/if} -->
	</div>
	<div class="row">
		<div>
			<!-- class="col box text-center message row row-ai-center text-wrap-no" class:is-win={winner} id="turn-label" -->
			<!-- {#if winner} -->
			<span in:fade>The winner is:</span>
			<!-- {/if} -->
		</div>
		<!-- <div
         aria-describedby="turn-label" class="col box fs-larger row row-ai-center" class:is-win={winner} style="max-width:40px;border-left:2px solid #FFF"
            > 
            <span class="col text-center"></span>
        </div> -->
	</div>
	<div class="game-box">
		<div class="game-box--inner">
			<div class="game-grid">
				<!-- print icons here. -->
				<div value={selected}>
					{#each options as option}
						<option value={option}>{option}</option>
					{/each}
				</div>
				<!-- Print each tile with it's coord as the key -->
				<!-- {#each tiles as tile (tile.coord) }
                    <GameTile {turn} {tile} {winningTiles} on:click={() => setTileValue(tile.coord)}/>
                {/each} -->
			</div>
		</div>
	</div>
	<button on:click={resetGame} title="Reset the game board">Reset</button>
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
		color: #fff;
	}
	.is-o {
		background: #d1491c;
		color: #fff;
	}
	.box {
		padding: 1rem;
	}
	.row {
		display: flex;
	}
	.row-ai-center {
		align-items: center;
	}
	.col {
		flex: 1 1 0;
	}
	.message {
		text-align: center;
		background: #efefef;
	}
	.is-win {
		background: #149e16;
		color: #fff;
	}
	.game-container {
		display: grid;
		gap: 10px;
	}

	.game-box {
		width: 300px;
		max-width: 100%;
		background: #dedede;
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
		padding: 0.5rem 1rem;
	}
	button:hover {
		cursor: pointer;
	}
</style>
