# From Scratch Guide

Have an existing Svelte Kit project you are looking to deploy to CloudFlare Workers? This guide outlines the steps we took to get our project first deployed to Workers via `wrangler`.

## Sign up for a CloudFlare account

Go do it! Sign up for CloudFlare!

## Enable Workers Dev Site

Go to the Workers tab from your main account dashboard and follow the prompts set up your `workers.dev` subdomain.

## Install Wrangler CLI Globally

https://developers.cloudflare.com/workers/cli-wrangler/install-update

We'll need this CLI tool to `login` to CloudFlare, `init` a workers config file and finally `publish` the app to deploy it to our workers site.

```
npm i @cloudflare/wrangler -g
```

## Login in with Wrangler CLI to authenticate publishes

Run this command in the terminal to login to your CloudFlare accound with wrangler
```
wrangler login
```

## Install Workers Adapter to your SvelteKit project

https://www.ashleyconnor.co.uk/2021/06/20/deploying-sveltekit-using-cloudflare-workers

This provides the `adapter` that dynamically renders SvelteKit routes through a CloudFlare worker.

```
npm i @sveltejs/adapter-cloudflare-workers@next
```

## Configure svelte.config.js

Replace the Svelte kit adapter with the newly intalled `@sveltejs/adapter-cloudflare-workers`

```js
// first import the adapter
import adapter from '@sveltejs/adapter-cloudflare-workers';

// Update the config.kit.adapter
const config = {
    // other config
    ...

    // Set up the adapter with the import from `@sveltejs/adapter-cloudflare-workers`
    kit: {
        adapter: adapter()
    }
};
```

## Generate and Configure wrangler.toml

Create a `wrangler.toml` file with the `wrangler init` command. Update `my-workers-app-name` to something that makes sense project you are deploying.

```
wrangler init --site my-workers-app-name
```

Update the `wrangler.toml` with the following configuration.
- Replace `{MY_CLOUDFLARE_ACCOUNT_ID}` with your CloudFlare Account ID
- Remove or Replace `{MY_CLOUDFLARE_ZONE_ID}` with a zone ID from your CloudFlare Account
```toml
# other config such as `name`
...

account_id = '{MY_CLOUDFLARE_ACCOUNT_ID}'
zone_id    = '{MY_CLOUDFLARE_ZONE_ID}' # optional, if you don't specify this a workers.dev subdomain will be used.

# I tried "webpack", but kept getting errors on deploy. Seemed to be failing on modern syntax in the file such as `??` and `?.`.
type = "javascript"
# Publishes to the `workers.dev` site. Need a `routes` config for zone deployment.
workers_dev = true
# Publishes to the `workers.dev` site. Need a `routes` config for zone deployment.
compatibility_date = "2022-04-28"

[build]
# Assume it's already been built. You can make this "npm run build" to ensure a build before publishing. We opted to keep the "npm run build" out of this process.
command = ""

[build.upload]
format = "modules"
main = "./worker.mjs"

[site]
bucket = "./build"
# Other guides had this as "./workers-sites", but the deploy seemed to be forcing a lookup for a "./dist" folder for me. Updating the option to match enabled a successful deploy.
entry-point = "./dist"
```

## Build the Svelte Project and Deploy!

```
npm run build && wrangler publish
```