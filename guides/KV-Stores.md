# Using KV Stores with Cloudflare Workers

_You'll need to set up CloudFlare workers before this step. See [Cloudflare Workers Setup guide](Cloudflare-Workers-Setup.md)._

Once our app is built and published with Cloudflare workers ([see cloudflare dashboard view](WorkersPage-preview.PNG)), we'll end up with a few items of note: a _deployed url_, a published _KV namespace+ID_, and a _binding_ to bridge our namespace with our worker.

1. **Live route/deployed url**<br> The KV Worker (**function deployment service**) is used here in a serverless environment.

2. **KV Namespace + Unique ID** <br>The KV namespace is just a collection (think database table) of key-value pairs where all the keys have to be unique. i.e. a database made up of key-value pairs.
   These are replicated to Cloudflare's edge for efficient retrieval when someone visits our site.<br> <br> The namespace '\_kv-binding-workers_sites_assets' is based on the name I put in my wrangler.toml file.<br>
   [name = "kv-binding", click for PNG](..%5Cwrangler.toml)<br><br>The files from our build are broken down into 'keys' and 'values'. Here is a partial list of KV stores for the published namespace, _\_\_kv-binding-workers_sites_assets_. You can see the manifest is one key name and the value is the entire manifest.json![Key-Value Store of Static Site](KVStore-manifest-example.PNG)

3. **KV Binding** <br> This bridges our actual worker with our Namespace. This allows the worker to read data from our KV namespace (i.e. database holding our site files).

A default binding was automatically created for us upon the wrangler publish command. It looks like this in the dashboard:
![KV Binding in CloudFlare Settings](KV-Settings-Variables-ENV-Binding.PNG)

# Multiple KV stores/namespaces

As we navigate dynamic data from users being added to our site, we might find we need to add or edit namespaces and bindings. We may have a login namespace with it's unique binding to a worker, and a create account namespace with it's unique binding. We can have multiple namespaces pointing to the same wroker/deployed route. Multiple routes can also be bound to the same namespace.

# Using the Wrangler CLI

In the example here, the namespace and binding were automatically created upon deployment. But what if we wanted to add a namespace for user input, like creating an account or completing a form? We can perform all CRUD actions with our namespaces and bindings in the Wrangler CLI (terminal). Below are the common commands we'll be using to do so, along with examples.
