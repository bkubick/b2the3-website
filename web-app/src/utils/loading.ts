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
        preloadImage(picture);
    });
}

/**
 * Preloads an image to prevent flickering when it is first displayed.
 * 
 * @param src - The image path to preload.
 * @returns Promise that resolves when the image is loaded.
 */
function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve as any;
      img.onerror = reject;
    });
  };


export { preloadImages, preloadImage };
