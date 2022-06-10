<script lang=ts>
     import { effectable } from "$lib/actions/effectable";

     let layers = [0,1,2,3];
</script>

<svelte:head>
    <title>Anthony Teaches! Coding Bootcamp Students | Code Resouces</title>
    <meta name="description" content="Learn about Anthony Brown and the students he teaches and explore free code resources to help you through your own bootcamp experience.">
</svelte:head>

<!-- <svelte:body use:effectable={{
    subscribeTo:["scrollY"],
    effect: ({ scrollY }) => ({
        style: {
            background: `hsl(${ Math.min( 360, Math.floor( 360*(scrollY/(window.innerHeight*2)) ) )},50%,70%)`
        },
        classNames: {
            "test-me": scrollY > window.innerHeight/2
        }
    })
}}></svelte:body> -->

<div class="window-box" use:effectable={{name: "windowA"}}>
    {#each layers as layer }
        <div
            class={`layer box-${layer}`}
            use:effectable={{
                subscribeTo: ["scrollY"],
                effect: ({ scrollY }) => {
                    return {
                        style: {
                            transform: `translate3d(0,${ scrollY * (layer+1)/(layers.length+1) * -1 }px,0)`
                        },
                        classNames: {
                            "is-red": true
                        }
                    }
                },
                observe: "windowA"
            }}
        ></div>
    {/each}
</div>
<div class="window-box" use:effectable={{name: "windowB"}} style:margin-top="20vh">
    {#each layers as layer }
        <div
            class={`layer box-${layer}`}
            use:effectable={{
                subscribeTo: ["scrollY"],
                effect: ({ scrollY }) => {
                    return {
                        style: {
                            transform: `translate3d(0,${ scrollY * (layer+1)/(layers.length+1) * -1 }px,0)`
                        }
                    }
                },
                offset: "windowB",
                observe: "windowB"
            }}
        ></div>
    {/each}
</div>

<h1>Anthony Teaches!</h1>

<p>Much more to come here in the future! For now you can check out some playgrounds we have as we are learning our current environment.</p>

<p><a href="/playground">View Playgrounds</a></p>

<div
    style="height:400vh;position:relative" 
    use:effectable={{name: "boundaryA"}}
>
    <div
        style:height="20em"
        style:background="red"
        use:effectable={{
            subscribeTo:["scrollY"],
            effect: ({ scrollY }) => {
                // console.log(scrollY)
                return {};
            }
        }}>
    </div>
    <div
        style:height="10em"
        style:width="100%"
        style:background="black"
        style:position="fixed"
        style:top="0"
        use:effectable={{
            subscribeTo:["scrollY"],
            effect: ({ scrollY }) => {
                // console.log(scrollY)
                return {
                    style: {
                        transform: `translate3d(0,${scrollY}px,0)`
                    }
                };
            },
            offset: "boundaryA"
        }}>
    </div>

</div>

<style>
    .window-box {
        position: relative;
        overflow: hidden;
        height: 100vh;
    }
    .layer {
        width: 100%;
        left: 0;
        position: absolute;
        bottom: 0;
    }
    .bg-dark {
        background-color: #000;
    }
    .box-0 {
        height: 80vh;
        background-color: #EEE;
    }
    .box-1 {
        height: 60vh;
        background-color: #AAA;
    }
    .box-2 {
        height: 40vh;
        background-color: #777;
    }
    .box-3 {
        height: 20vh;
        background-color: #333;
    }
</style>