# Using KV Stores (Namespaces and Bindings) with Cloudflare Workers

_You'll need to set up CloudFlare workers before this step. See [Cloudflare Workers Setup guide](Cloudflare-Workers-Setup.md)._

Table of Contents

- [Basics](#basics)
- [Using the Wrangler CLI](#using-the-wrangler-cli)
- [Create Namespace](#create-namespace)
- [View Namespaces](#view-namespaces)
- [Accessing keys, values in CLI](#accessing-keys-values-in-cli)
- [App namespace, binding set up](#app-namespace-binding-set-up)  
  ** [Hooks](##hooks)  
  ** [App.d.ts](##app.d.ts)  
  \*\* [`RequestEvent` Method](##requestevent-method)
- [Key-Value JS, TS CRUD actions](#key-value-js-ts-crud-actions)

# Basics

Once our app is built and published with Cloudflare workers ([see cloudflare dashboard view](./assets/WorkersPage-preview.PNG)), we'll end up with a few items of note: a _deployed url_, a published _KV namespace+ID_, and a _binding_ to bridge our namespace with our worker.

1. **Live route/deployed url**<br> The KV Worker (**function deployment service**) is used here in a serverless environment.

2. **KV Namespace + Unique ID** <br>The KV store is called a KV namespace by Cloudflare. It is a collection of key-value pairs where all the keys have to be unique. i.e. a database. Each namespace also is assigned its own unique id.
   These are replicated to Cloudflare's edge for efficient retrieval when someone visits our site.<br> <br> The namespace '\_kv-binding-workers_sites_assets' is based on the name I put in my wrangler.toml file.<br>
   [name = "kv-binding", click for PNG](..%5Cwrangler.toml)<br><br>The files from our build are broken down into 'keys' and 'values'. Here is a partial list of keys/values for the published namespace, *\_\_kv-binding-workers*sites_assets\*. You can see the manifest is one key name and the value is the entire manifest.json![Key-Value Store of Static Site](./assets/KVStore-manifest-example.PNG)

3. **KV Binding** <br> This bridges our actual worker with our Namespace. This allows the worker to read data from our KV namespace (i.e. database holding our site files).<br><br>
   A default binding was automatically created for us upon the wrangler publish command. It looks like this in the dashboard:
   ![KV Binding in CloudFlare Settings](./assets/KV-Settings-Variables-ENV-Binding.PNG)
   Notice the route listed up at the top is our deployed url which is a different name than our KV namespace. The binding '\_\_STATIC_CONTENT' is now a global variable we can access in this route/namespace.

# Using the Wrangler CLI

In the example here, the namespace and binding were automatically created upon deployment. But what if we wanted to add a namespace forthe guide files in our project and displaying them to the page? We can perform many actions with our namespaces and bindings in the Wrangler CLI (terminal). Below are the common commands we'll be using to do so, along with examples.

# Create Namespace

Create a new namespace (KV store) in terminal. This also creates a binding, which binds the namespace to your deployed project. You can view these in the cloudflare GUI after creation, as well. But we'll need to create everything here in the Wrangler CLI.

```
<!-- To create a namespace you have to be logged in to your account and your account id has to be listed in the top of the wrangler.toml file.

Your account id is located under the Workers tab in your cloudflare account. Now you can run the following commands. -->

wrangler login

<!-- should open in browser window, do you grant access? If success message, continue on to next step to create a namespace. -->
wrangler  kv:namespace create "FILES"

🌀  Creating namespace with title "__kv-binding-FILES'"
✨  Success!
Add the following to your toml configuration file:
kv_namespaces = [
  { binding = "kv-binding-FILES", id = "c3f09adsdsdfdfw1b4740a7f63" }
]
```

# View namespaces

View the namespaces and bindings associated with each namespace. The binding is last part of the 'title', and it's now a we'll access and use inside our project to get, put, and delete kv's dynamically.

```
 wrangler kv:namespace list

✨[{"id":"1a71bc7d9a46565dsf4dsb71e","title":"__kv-binding-workers_sites_assets"},

✨{"id":"c3f09adsdsdfdfw1b4740a7f63","title":"kv-binding-FILES"},

✨{"id":"e73de62e65406540ebfbsdf80a","title":"__rock-paper-scissors-workers_sites_assets"}]
```

# Accessing keys, values in CLI

This will right a key and a value to your KV namespace using the Wrangler CLI. In this project we'll be accessing and modifying our kv namespace items dynamically (see [KV Javascript CRUD actions](#kv-javascript-crud-actions) but this is how you could either put, list, or delete through CLI commands.

```
// substitute put with list or delete, same concept.
wrangler kv:key put --binding=kv-binding-FILES "key" "value"
```

Instead of --binding, you may use --namespace-id to specify which KV namespace should receive the operation:

```
wrangler kv:key put --namespace-id=c3f09adsdsdfdfw1b4740a7f63 "key" "value"
```

Have two+ environments, like development and production? See [Wrangler/Workers-KV docs](https://developers.cloudflare.com/workers/wrangler/workers-kv/).

More wrangler CLI commands to manage your Cloudflare Workers:

[init](https://developers.cloudflare.com/workers/wrangler/commands#init) - Create a skeleton Wrangler project, including the wrangler.toml file.<br>
[dev](https://developers.cloudflare.com/workers/wrangler/commands#dev) - Start a local server for developing your Worker.<br>
[publish](https://developers.cloudflare.com/workers/wrangler/commands#publish) - Publish your Worker to Cloudflare.<br>
[kv:namespace](https://developers.cloudflare.com/workers/wrangler/commands#kvnamespace) - Manage Workers KV namespaces.<br>
[kv:key](https://developers.cloudflare.com/workers/wrangler/commands#kvkey) - Manage key-value pairs within a Workers KV namespace.<br>
[kv:bulk](https://developers.cloudflare.com/workers/wrangler/commands#kvbulk) - Manage multiple key-value pairs within a Workers KV namespace in batches.<br>
[secret](https://developers.cloudflare.com/workers/wrangler/commands#secret) - Manage the secret variables for a Worker.<br>
[tail](https://developers.cloudflare.com/workers/wrangler/commands#tail) - Start a session to livestream logs from a deployed Worker.<br>
[login](https://developers.cloudflare.com/workers/wrangler/commands#login) - Authorize Wrangler with your Cloudflare account using OAuth.<br>
[logout](https://developers.cloudflare.com/workers/wrangler/commands#logout) - Remove Wrangler’s authorization for accessing your account.<br>

_Source: [Cloudflare Wrangler-Commands](https://developers.cloudflare.com/workers/wrangler/commands#kv)_

# App namespace, binding set up

In order to use our namespace and bindings dynamically, we'll need to provide our sveltekit files some additional info. The CloudFlare adapter will read our wrangler.toml and give sveltekit access to our namespaces and bindings, which become global env variables. to access these in our code, we'll need to do the following first:

## Hooks

Let's add a hooks.ts file into the root of our src folder. This way all items in source can access the built in SvelteKit `{ handle }` method. See [SvelteKit Hooks Docs](https://kit.svelte.dev/docs/hooks).

```ts
import type { Handle } from '@sveltejs/kit';

import { mode } from '$app/env';

const handle: Handle = async ({ event, resolve }) => {
	if (mode === 'development') {
		const { createPlatformMock } = await import('$lib/mocks');
		event.platform = createPlatformMock();
	}

	const response = await resolve(event);
	return response;
};

export { handle };
```

## App.d.ts

This item already exists in our SvelteKit/CloudFlare Worker project. We're going to add in some lines of code to the existing `declare namespace App` object, see [SvelteKit Platform docs](https://kit.svelte.dev/docs/adapters#supported-environments-platform-specific-context) for more info.

```ts
declare namespace App {
	// interface Locals {}
	interface Platform {
    env, // Access to available KV namespaces.
    context
  }
```

## `RequestEvent` method

There's one last thing we'll need in order access and modify our namespace dynamically, and it's the `{ RequestEvent }` method. Let's create a test file to see the usage with our created namespace and binding. The namespace/binding used in this example is `FILES`.

```ts
import type { RequestEvent } from '@sveltejs/kit/types/private';
//make a basic counter to test functionality. Note use of platform.env with get and put methods to access/modify our namespace! :)
export async function get({ platform }: RequestEvent) {
	const result = (await platform.env.FILES.get('count')) || 0;

	const count = parseInt(result) + 1;

	await platform.env.FILES.put('count', count.toString());

	return {
		body: {
			count
		}
	};
}
```

# Key-Value JS, TS CRUD actions

Once your namespace is created and you have added in additional code to hooks and app.d.ts files you should be ready to go! The KV namespace methods use async/await, platform.env, the global variable you created above, and one of four methods, `put, get, list, delete`.
<br>Here are basic CRUD samples using the FILES namespace/binding.

**Create**

```js
// await NAMESPACE.put(key, value).
await platform.env.FILES.put(filename, contents);
```

**Read**

```js
// await NAMESPACE.get(key).
(await platform.env.FILES.get(filename);
```

**List**

```js
//await NAMESPACE.list()
await platform.env.FILES.list();
```

**Delete**

```js
//await NAMESPACE.delete(key)
await platform.env.FILES.delete(filename);
```

Want more? Here are some examples from [Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/kv/)!
