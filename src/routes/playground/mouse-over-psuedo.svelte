<script lang=ts>
    type ProximityConfig = {
        radius: number
    };
    const proximity = ( el: HTMLElement, { radius } : ProximityConfig = { radius: 50 } ) => {
        el.addEventListener("mouseover", e => console.log(e));

        const controlPosition = window.getComputedStyle(el).getPropertyValue('position') === "static";

        if(controlPosition) el.style.position = "relative";

        const bounds = el.getBoundingClientRect();
        const detector = document.createElement('span');

        detector.style.display = "block";
        detector.style.width = "100%";
        detector.style.height = "100%";
        detector.style.position = "absolute";
        detector.style.top = "0";
        detector.style.left = "0";
        // console.log(`scale( 1.${radius/bounds.width}, 1.${radius/bounds.height} )`);
        detector.style.transform = `scale( ${1 + (radius/bounds.width)}, ${1 + (radius/bounds.height)} )`;

        el.appendChild(detector);
    };
</script>

<div use:proximity></div>

<style>

    div {
        width: 100px;
        height: 100px;
        background: red;
    }

</style>