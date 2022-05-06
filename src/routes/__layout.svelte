<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import "$lib/css/global.css";
</script>

<Navbar />

<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        padding: 1rem;
        max-width: 1040px;
    }
</style>