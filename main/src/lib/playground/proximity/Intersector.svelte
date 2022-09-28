<script lang=ts>
     export let width : number;
     export let height : number;
     export let x : number;
     export let y : number;

     let top : number = 0;
     let left : number = 0;

     $ : {
         top = y - (height/2);
     }
</script>

<span></span>

<style>
    span {
        display: block;
        position:absolute;
        top:0;
        left:0;
        background:red;
    }
</style>