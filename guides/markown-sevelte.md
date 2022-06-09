# SvelteKit and Markdown

An introduction to using Markdown with SvelteKit.

## Markdown

From the research I have completed, the main use for Markdown and Sveltekit is for blogs. There are many YouTube and blog tutorials outlining how to complete an application on the web. Markdown can be used to make custom widgets and components for blogs that are rendered in using local scope.

## MDSveX

MDX for Sveltekit.
Markdown preprocessor for Svelte components. Components are saved in `.svx` file. Also it coverts Markdown to HTML, and uses Svelte components inside Markdown. Mdsvex can be used without npm installing Markdown. mdsvex also allows for layout design 

## Installation

Vanilla Markdown: `npm i svelte-markdown`

Mdsvex: `npm i -D mdsvex`

## How To:

To use vanilla Markdown directly, 
```
<script>
import SvelteMarkdown from 'svelte-markdown'

const source = `
# Header

Some text 

*List
1. Markdown item list 1
2. Mardown item list 2

`
</script>

<SvelteMarkdown {source} />

```

OR


To start using mdsvex, `svelte-preprocess` first needs to be imported in the `svelte.config.js`

```
import sveltePreprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
const config = {
  kit: { /* Kit options here */ },

  extensions: ['.svelte', '.md'],

  preprocess: [
    sveltePreprocess(),
    mdsvex({
      extensions: ['.md']
    })
  ]
}
```

Since markdown files are saved with the `.md` this
is how they will be imported into the component. Now Markdown files are imported as Svelte components. Since svelte is looking for `.svx ` files, this will allow `.md` files to be incorporated into the final render.

```
<script>
import Form from '$lib/Form.svelte'
</script>

# Markdown goes here

<Form>

More _markdown_
```
Markdown can be added inside other Markdown files. 

### Sources:

- YouTube tutorial for SvelteKit and mdsvex: https://www.youtube.com/watch?v=LutB0Ih0nXQ

- Svelte Components Using Custom Markdown Renderers : https://www.youtube.com/watch?v=ZiEROAqobwM

- Markdown + Svelte = MDsveX : https://www.youtube.com/watch?v=UfcIz8024js

- YouTube tutorial for Markdown blog: https://www.youtube.com/watch?v=sKKgT0SEioI

- Blog post with tutorial about how to make a blog with Markdown and Sveltekit: https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog

- Blog post about using MDSveX: https://blog.siddu.tech/mdsvex

- Svelte-Preprocess-Markdown : https://alexxnb.github.io/svelte-preprocess-markdown/

- MDsveX - Adding Interactivity with Svelte Components in Markdown : https://www.infoq.com/news/2020/05/svelte-markdown-mdx-compiler/

- Link to the markdown install doc: https://www.npmjs.com/package/svelte-markdown

- Link to the MDsveX install doc : https://www.npmjs.com/package/mdsvex

- Link to mdsvex website: https://mdsvex.com/
