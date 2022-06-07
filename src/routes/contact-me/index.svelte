<script lang ts>
// what can we import here to use the CONTACT variable?
import CONTACT from 'wrangler.toml'
declare global CONTACT: kv-name
  /**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return JSON.stringify(await request.json());
  } else if (contentType.includes('application/text')) {
    return request.text();
  } else if (contentType.includes('text/html')) {
    return request.text();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return 'a file';
  }
}

async function handleRequest(request) {
  const defaultData = { 
    todos: [
      {
        id: 1,
        name: 'Finish the Cloudflare Workers blog post',
          completed: false
      }
    ] 
  }
  CONTACT.put("data", JSON.stringify(defaultData))
  
}

addEventListener('fetch', event => {
  const { request } = event;
  const { url } = request;

  if (url.includes('form')) {
    return event.respondWith(rawHtmlResponse(someForm));
  }
  if (request.method === 'POST') {
    return event.respondWith(handleRequest(request));
  } else if (request.method === 'GET') {
    return event.respondWith(new Response(`The request was a GET`));
  }
});
</script>

<h1>Hello Friend!</h1>
<p>This is all generated using a Worker</p>
<form action="/contact-me" method="post">
	<div>
		<label for="say">What do you want to say?</label>
		<input name="say" id="say" type="text" />
	</div>
	<div>
		<label for="name">From who?</label>

		<input name="from" id="from" type="text" />
	</div>
	<div>
		<button>Send my greetings</button>
	</div>
</form>

<style>
</style>
