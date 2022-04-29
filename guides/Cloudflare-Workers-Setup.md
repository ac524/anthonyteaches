# From Scratch Guide

Have an existing Svelte Kit project you are looking to deploy to CloudFlare Workers? Follow this guide to get up and running from scratch!

## Sign up for a CloudFlare account

Go do it! Sign up for CloadFlare!

## Enable Workers Dev Site

Go to the Workers tab from your main account dashboard and follow the prompts set up your `workers.dev` subdomain.

## Install Wrangler CLI

https://developers.cloudflare.com/workers/cli-wrangler/install-update

We'll need this CLI tool to generate a config file later.

```
npm i @cloudflare/wrangler -g
```

## Install Workers Adapter

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

Create a `wrangler.toml` file with the `wrangler init` command. Update `my-workers-app-name` to match the project you are deploying.
```
wrangler init --site my-workers-app-name
```

Update the `wrangler.toml` with the following configuration.
- Replace `{MY_CLOUDFLARE_ACCOUNT_ID}` with your CloudFlare Account ID
- Remove or Replace `{MY_CLOUDFLARE_ZONE_ID}` with a zone ID from your CloudFlare Account
```toml
account_id = '{MY_CLOUDFLARE_ACCOUNT_ID}'
zone_id    = '{MY_CLOUDFLARE_ZONE_ID}' # optional, if you don't specify this a workers.dev subdomain will be used.

type = "javascript" # I tried "webpack", but kept getting errors on deploy.
workers_dev = true # Publishes to the `workers.dev` site. Need a `routes` config for zone deployment.
compatibility_date = "2022-04-28" # Should be set to the current date the project is started.

[build]
# Assume it's already been built. You can make this "npm run build" to ensure a build before publishing
command = ""

[build.upload]
format = "modules"
main = "./worker.mjs"

[site]
bucket = "./build"
entry-point = "./dist" # Other guides had this as "./workers-sites", but the build seemed to be forcing "./dist" for me. So updated this config to match before I could get a successful deploy.
```

## Build the Svelte Project and Deploy!

```
npm run build && wrangler publish
```