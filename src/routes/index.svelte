<script lang=ts>
     import { effectable } from "$lib/actions/effectable";
</script>

<svelte:head>
    <title>Anthony Teaches! Coding Bootcamp Students | Code Resouces</title>
    <meta name="description" content="Learn about Anthony Brown and the students he teaches and explore free code resources to help you through your own bootcamp experience.">
</svelte:head>

<svelte:body use:effectable={{
    subs:["scrollY"],
    effect: ({ scrollY }) => ({
        style: {
            background: `hsl(${ Math.min( 360, Math.floor( 360*(scrollY/(window.innerHeight*2)) ) )},50%,70%)`
        },
        classNames: {
            "test-me": scrollY > window.innerHeight/2
        }
    })
}}></svelte:body>

<h1>Anthony Teaches!</h1>

<p>Much more to come here in the future! For now you can check out some playgrounds we have as we are learning our current environment.</p>

<p><a href="/playground">View Playgrounds</a></p>

<div style="height:400vh">

</div>

<style>

</style>