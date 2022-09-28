<script>
    import "$lib/css/global.css";
    import "../app.css";
</script>

<slot name="breadcrumb"></slot>

<div class="container">
    <slot></slot>
</div>

<style>
    .container {
        padding: 1rem;
        max-width: 1040px;
    }
</style>