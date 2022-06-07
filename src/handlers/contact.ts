// error message- KVNamespace not valid import type. Can't find valid import types for
// There is also a kv-asset-handler we already have installed as a dependency in the cloudflare-workers-tmp parckage.json. However, I'm unable to successfully import that. Here is the sample code from the Cloudflare docs. It appears that this only responds with static assets.

// Import the getAssetFromKV() function into your Worker script and use it to respond with static assets.

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
// again another error, cannot find module.
addEventListener('fetch', (event) => {
	event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
	try {
		// Add logic to decide whether to serve an asset or run your original Worker code
		return await getAssetFromKV(event);
	} catch (e) {
		let pathname = new URL(event.request.url).pathname;
		return new Response(`"${pathname}" not found`, {
			status: 404,
			statusText: 'not found'
		});
	}
}

// declare const CONTACT: KVNamespace
