/**
 * This module contains functions for loading data commonly used in the app.
 */


/**
 * Preloads images to prevent flickering when they are first displayed.
 * 
 * @param images - An array of image paths to preload.
 */
function preloadImages(images: string[]): void {
    images.forEach((picture: string) => {
        if (!picture) return;
        const img = new Image();
        img.src = picture;
    });
}


export { preloadImages };
