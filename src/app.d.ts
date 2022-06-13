/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	interface Platform {
    env, // TODO Describe with available KV namespaces
    context
  }
	// interface Session {}
	// interface Stuff {}
}
declare namespace svelte.JSX {
    interface HTMLProps<T> {
      oninprox?: (e: CustomEvent) => void,
      onoutprox?: (e: CustomEvent) => void
    }
}