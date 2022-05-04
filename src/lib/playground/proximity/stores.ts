import { browser } from '$app/env';
import { writable, readable } from "svelte/store";

export const scrollY = writable(0);

/**
 * Readable store idea from 
 * @see https://www.youtube.com/watch?v=Aq-hZhX2vfU
 */
export const mouseCoords = readable({x:0,y:0}, (set) => {
    if( !browser ) return;

    const recordMove = ({ clientX: x, clientY: y } : MouseEvent) => set({x,y});
    const recordTouchMove = ({ touches } : TouchEvent) => {
        const touch = touches.item(0);
        if(!touch) return;
        const { clientX: x, clientY: y } = touch;
        set({x,y});
    };
    
    document.body.addEventListener("mousemove", recordMove);
    document.body.addEventListener("touchstart", recordTouchMove);
    document.body.addEventListener("touchmove", recordTouchMove);

    return () => {
        document.body.removeEventListener("mousemove", recordMove);
        document.body.removeEventListener("touchstart", recordTouchMove);
        document.body.removeEventListener("touchmove", recordTouchMove);
    }
});

export const mouseX = writable(0);
export const mouseY = writable(0);

