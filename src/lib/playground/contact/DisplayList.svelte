<script lang="ts">

async function displayItems() {
		
		const result = await fetch('/playground/contact/api', {
			method: 'LIST',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		const list = await result.json();
		alert('Form submitted successfully');
	}
</script>

<button on:click={() => (displayItems)}type="submit"
						>View List
                        
                        </button
					>

                    <div>
                        {#if {list}}
                        {#each list as {name, github, linkedin}}
                            <li>{name}
                            </li>
                        {/each}
                        {/if}
                    </div>