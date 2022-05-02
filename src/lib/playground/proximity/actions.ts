import { mouseX, mouseY } from "./stores";

/**
 * Mouse Tracking idea
 * @see https://svelte.dev/tutorial/dom-events 
 * 
**/
export const handleMousemove = (event: { clientX: number; clientY: number; }) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
}