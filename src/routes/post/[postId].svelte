<script context = 'module'>

export async function load({ params }) {

return{
    
    props: {
        postId: params.postId
    }
}
}
</script>

<script>
    export let postId = 0;
</script>

<h1> Single blog page</h1>