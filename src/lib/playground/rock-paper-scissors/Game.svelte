<script lang="ts">
	import { selectWinner } from './utils/selectWinner';
	import { fade } from 'svelte/transition';
	import AboutRPS from './AboutRPS.svelte';

	let computer = '/computer.svg';
	let equals = '/equals.svg';
	let paper = '/handpapersolid.svg';
	let rock = '/handrocksolid.svg';
	let scissors = '/handscissorssolid.svg';
	let medal = '/medal.svg';
	console.log(equals);
	// Build the initial icons

	let result: string | null  = '';
	let choice: string = '';
	let computerChoice: string = '';

	// Handle user2 or computer returning their move

	const options = ['rock', 'paper', 'scissors'];
	// Handle user1 clicking icon
	const winner = (value: string) => {
		choice = 'You chose ' + value;
		let random = options[Math.floor(Math.random() * options.length)];
		computerChoice = 'Computer chose ' + random;
		result = selectWinner(value, random);
	};

	// Add button for high scores?
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
			{#if result === 'user1'}
				<span class="row row-ai-center" in:fade aria-describedby="turn-label">
					The winner is: Me!
				</span>
				<img class="image" alt="medal" src={medal} />
			{:else if result === 'tie'}
				<span class="row row-ai-center" in:fade
					>The winner is: It's a tie
					<img
						alt="tie"
						class="image"
						src={equals}
						style="animation-duration: 1.5s; animation-iteration-count: 1"
					/>
				</span>
			{:else}
				<span class="row row-ai-center" in:fade
					>The winner is: computer<img class="image" alt="medal" src={computer} /></span
				>
			{/if}
		</div>
	</div>

	<!-- print icons here. -->
	<div class="fs-larger text-center ">
		Choose rock, paper, or scissors.
		<hr />
		<div class="row buttons">
			<img class="image active" alt="rock" src={rock} on:click={(e) => winner(options[0])} />

			<img class="image active" alt="paper" src={paper} on:click={(e) => winner(options[1])} />

			<img
				class="image active"
				alt="scissors"
				src={scissors}
				on:click={(e) => winner(options[2])}
			/>
		</div>
	</div>

	{#if choice === 'rock' || 'paper' || 'scissors'}
		<span class="col text-center choices">{choice}</span>
	{/if}

	{#if computerChoice === 'rock' || 'paper' || 'scissors'}
		<span class="col text-center computerChoices ">{computerChoice}</span>
	{/if}
</main>

<style>

	.active:hover {
		background-color: lightblue !important;
		cursor: pointer;
		background-image:120%;
	}
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

	.game-container {
		display: grid;
		gap: 10px;
	}
	.image {
		height: 100px!important;
		width: auto;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 1rem;
		
	}
</style>
