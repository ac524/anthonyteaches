<svelte:head>
    <title>Svelte Playground: Radial Mouse Proximity Detection</title>
    <meta name="description" content="An example of radial mouse proximity detection by Anthony Brown">
</svelte:head>
<script lang=ts>
    import { browser } from "$app/env";


    type ProximityConfig = {
        radius: number
    };
    type MouseCoords = {
        x: number,
        y: number
    }

    let targetRadius = 50;
    let mouseProx = {
        distance: 0,
        ratio: 0
    };
    let ratioPercent = 0;
    $ : ratioPercent = Math.round(mouseProx.ratio*100);

    let gameBox : HTMLDivElement;

    import { mouseCoords } from "$lib/playground/proximity/stores";

    // const position

    const proximity = ( el: HTMLElement, { radius } : ProximityConfig = { radius: 50 } ) => {

        const calculateDistance = ({ x, y } : MouseCoords) => {
            const { left, top, width, height } = el.getBoundingClientRect();

            return Math.floor(
                Math.sqrt(
                    Math.pow(x - (left+(width/2)), 2) +
                    Math.pow(y - (top+(height/2)), 2)
                )
            ) - Math.round(width/2);
        }

        const setTrackerPosition = ( coords : MouseCoords ) => {
            let distance = calculateDistance(coords);
            // distance > radius ? 0 :
            let ratio = distance <= 0 ? 1 : (!radius || distance > radius ? 0 : (1-(distance/radius)));
            console.log(ratio);

            el.dispatchEvent(new CustomEvent("inprox", {
                detail: {
                    distance,
                    ratio
                }
            }));
        }

        const unsubCoords = mouseCoords.subscribe(setTrackerPosition);

        return {
            destroy() {
                unsubCoords();
            },
            update({ radius: newRadius } : ProximityConfig) {
                radius = newRadius;
            }
        }

    };

    // var mX, mY, distance,
    // $proximity = $('#proximity'),
    // $distance = $('#distance'),
    // $element  = $('#element');
  
    // // proximity threshold
    // var proximity = 100;
    // $proximity.text(proximity);

    // function calculateDistance(elem, mouseX, mouseY) {
    //     return Math.floor(
    //     Math.sqrt(
    //         Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) +
    //         Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)
    //     )
    //     ) - Math.round(elem.width()/2);
    // }

    // $(document).mousemove(function(e) {  
    //     mX = e.pageX;
    //     mY = e.pageY;
    //     distance = calculateDistance($element, mX, mY);
    //     $distance.text(distance);
        
    //     if (distance < proximity) {
    //     $element.addClass("triggered");
    //     } else {
    //     $element.removeClass("triggered");
    //     }
    // });
</script>

<div class="windox-box">
    <div>
        <label for="radius">Detection Radius</label><br/>
        <input type="number" id="radius" bind:value={targetRadius}>
    </div>
    <div>Distance: {mouseProx.distance} | Proximity Ratio: {ratioPercent}%</div>
    <div class="target-radius">
        <div
            class="target"
            style:background={`rgba(0,0,0,${mouseProx.ratio})`}
            style:margin={`${targetRadius}px`}
            use:proximity={{ radius: targetRadius }}
            on:inprox={({detail})=>mouseProx=detail}>
        </div>
    </div>
</div>
<!-- <div class="windox-box" bind:this={gameBox}>
    <div
        class="target"
        style:background={`rgba(0,0,0,${mouseProx.ratio})`}
        style:margin={`${targetRadius}px`}
        use:proximity={{ radius: targetRadius }}
        on:inprox={({detail})=>mouseProx=detail}>
    </div>
</div> -->

<style>
    .windox-box {
        height: 100vh;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 20px;
        justify-content: center;
        align-items: center;
    }
    .target {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        background: red;
        position: relative;
    }
    .target-radius {
        /* content: "";
        display: "block"; */
        /* position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; */
        border: 1px dashed red;
        border-radius: 999999px;
        /* transform: scale(2); */
    }
</style>