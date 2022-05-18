```js
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Todos</title>
  </head>
  <body>
    <h1>Todos</h1>
  </body>
</html>
```
Create a worker - see Cloudflare-Workers-Setup.md

## Write a worker
The process of writing a Worker should be familiar to anyone who’s used the fetch library before. In short, the default code for a Worker hooks into the fetch event, passing the request of that event into a custom function, handleRequest:
```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Within handleRequest, we make the actual request, using fetch, and return the response to the client. In short, we have a place to intercept the response body, but by default, we let it pass-through:

async function handleRequest(request) {
  console.log('Got request', request)
  const response = await fetch(request)
  console.log('Got response', response)
  return response
}

async function handleRequest(request) {
  const response = new Response("Hello!")
  return response
}
  
  const defaultData = { 
    todos: [
      {
        id: 1,
        name: 'Finish the Cloudflare Workers blog post',
          completed: false
      }
    ] 
  }
  KRISTIAN_TODOS.put("data", JSON.stringify(defaultData))
  const getCache = () => KRISTIAN_TODOS.get("data")

async function getTodos(request) {
  // ... previous code
  
  let data;
  const cache = await getCache()
  if (!cache) {
    await setCache(JSON.stringify(defaultData))
    data = defaultData
  } else {
    data = JSON.parse(cache)
  }
}
```
## inside the Workers GUI
 Moving into the “Routes” tab of the Worker editor, I added the route and attached it to the cloudflare-worker-todos script.
