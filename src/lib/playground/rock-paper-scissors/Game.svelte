<script lang="ts">
	import Icon from 'svelte-awesome';
	// import { handPaperO, handScissorsO, handRockO } from 'svelte-awesome/icons';
	import {
		faHandBackFist,
		faHand,
		faHandScissors,
		faEquals,
		faMicrochip,
		faTrophy
	} from '@fortawesome/free-solid-svg-icons';

	import { selectWinner } from './utils/selectWinner';
	import { fade } from 'svelte/transition';
	import AboutRPS from './AboutRPS.svelte';

	// Build the initial icons

	let result: string = 'none';
	let choice: string = '';
	let computerChoice: string = '';
	// Handle user2 or computer returning their move

	const options = ['rock', 'paper', 'scissors'];
	// Handle user1 clicking icon
	const winner = (value) => {
		choice = 'You chose ' + value;
		let random = options[Math.floor(Math.random() * options.length)];
		computerChoice = 'Computer chose ' + random;
		return (result = selectWinner(value, random));
	};

	// button to reset the game. tally win?
	const resetGame = (): void => {
		return;
		// return something here to reset the game.
	};
</script>

<main class="game-container">
	<AboutRPS />
	<!-- intro message if game does not have a win/lose -->
	<div>
		{#if !result || result === 'tie'}
			<span in:fade>Choose an icon to play.</span>
		{/if}
	</div>
	<div class="row">
		<div class="col box text-center message row row-ai-center text-wrap-no" id="turn-label">
			{#if result}
				<span class="buttons" in:fade>The winner is:</span>
				{#if result === 'user1'}
					<div
						aria-describedby="turn-label"
						class="col box buttons fs-larger row row-ai-center"
						class:is-win={result}
						style="max-width:40px;border-left:2px solid #FFF"
						in:fade
					>
						Me!
						<Icon data={faTrophy} />
					</div>
				{:else if result === 'tie'}
					<span class="buttons" in:fade
						>It's a tie
						<Icon
							data={faEquals}
							scale="3"
							spin
							style="animation-duration: 1.5s; animation-iteration-count: 1"
						/>
					</span>
				{:else}
					<span in:fade>Computer<Icon data={faMicrochip} scale="2" /></span>
				{/if}
			{/if}
		</div>
	</div>

	<!-- print icons here. -->
	<div class="fs-larger text-center ">
		Choose rock, paper, or scissors.
		<div class="row buttons">
			<button value="rock" on:click={(e) => winner(options[0])}
				><Icon data={faHandBackFist} scale="3" />
			</button>
			<button value="paper" on:click={(e) => winner(options[1])}
				><Icon data={faHand} scale="3" />
			</button>
			<button value="scissors" on:click={(e) => winner(options[2])}>
				<Icon data={faHandScissors} scale="3" />
			</button>
		</div>
	</div>

	{#if choice === 'rock' || 'paper' || 'scissors'}
		<span class="col text-center choices">{choice}</span>
	{/if}

	{#if computerChoice === 'rock' || 'paper' || 'scissors'}
		<span class="col text-center computerChoices ">{computerChoice}</span>
	{/if}
	<button on:click={resetGame} title="Reset the game board">Reset</button>
</main>

<style>
	.buttons {
		align-items: center;
		justify-content: center;
	}
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
		min-width: 100%;
		position: relative;
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
