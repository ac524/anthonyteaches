# What are KV Stores?

Like MongoDB stores collections and documents, KV stores data as a key and a value in an object. You can call on a key to get/update/delete it's value. The value can be anything! People like Key/Value storage because it's lightening fast and can be integrated into other SQL and NoSQL/Relational databases.

Cloudflare stores the KV datasets in their data centers all over the world!

- Step functions - sync state data between multiple APIs functions.
- Edge file store - host large amounts of small files.

https://developers.cloudflare.com/workers/learning/how-kv-works/

## Adding KV stores to your namespace

You can create a namespace using Wrangler or in the Cloudflare dashboard. You can also bind the namespace to your Worker in the dashboard:

Go to Workers.
Select your Worker.
Select Settings > Variables.
Go to KV Namespace Bindings.
Select Add binding.

## Methods - PUT/GET/DELETE/LIST

## PUT

We can write key-value pairs or update the value for a key by calling the put method on any namespace we have bound to our script. This returns a promise that we should await to verify a successful update.

```js
await NAMESPACE.put(key, value);
```

Concurrent writes can end up overwriting one another. The bulk API can accept up to 10,000 KV pairs at once. We should write from a single process via Wrangler or the API. This avoids competing overwrites because it's a single stream.

## GET

```js
NAMESPACE.get(key);
```

Getting the value is easy! It's a promise, again so we'll want to use async/await. If the key isn't found, it'll resolve with a null. You can also pass in a type

The type parameter can be any of:

```
"text": A string (default).
"json": An object decoded from a JSON string.
"arrayBuffer": An ArrayBuffer instance.
"stream": A ReadableStream.
```

You can also add in a Cache Time to Live (TTL)

```js
NAMESPACE.get(key, { cacheTtl: 3600 });
```

Here's an example get request:

```js
addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const value = await NAMESPACE.get('first-key');
	if (value === null) {
		return new Response('Value not found', { status: 404 });
	}

	return new Response(value);
}
```

And an example getting back metadata

```js
const { value, metadata } = await NAMESPACE.getWithMetadata(key);
```

And an example delete request.

```js
await NAMESPACE.delete(key);
```

You can also quickly get a list of existing keys like in the following example:

```
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const value = await NAMESPACE.list();

  return new Response(value.keys);
}
```

### Expiration

Keys can have expiration dates. We can set Workers KV to automatically expire, configured at a particular point in time, or after time has passed since midification. ONce expiration is reached, it will be deleted. Can be set via UNIX or TTL (time to live). The put method accepts a third parameter, expiration or expirationTTL.

```js
NAMESPACE.put(key, value, { expiration: secondsSinceEpoch });

NAMESPACE.put(key, value, { expirationTtl: secondsFromNow });
```
