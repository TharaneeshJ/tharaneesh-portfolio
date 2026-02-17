/**
 * Custom ease functions for hover interactions.
 * Buttery smooth — no overshoot, just clean deceleration.
 */

/**
 * Smooth hover-enter ease.
 * Starts fast, decelerates gently into position.
 * Like a feather floating up and settling.
 */
export const magneticHover = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
};

/**
 * Smooth hover-leave ease.
 * Slightly softer deceleration for the return.
 */
export const snapReturn = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
};
