/**
 * @fileoverview Contains functions that add event listeners to the document
 * that update the CSS variables for the cursor follower effect.
 */


/**
 * Adds a listener to the document that updates the CSS variables for the cursor
 * follower effect by setting the CSS variables --mouse-x and --mouse-y to the
 * x and y coordinates of the cursor, respectively.
 */
function addCursorFollowerListener(): void {
    const root: HTMLElement = document.documentElement;

    document.addEventListener('mousemove', evt => {
        let x: number = evt.clientX / innerWidth;
        let y: number = evt.clientY / innerHeight;
    
        root.style.setProperty('--mouse-x', x.toString());
        root.style.setProperty('--mouse-y', y.toString());
    });
}


export { addCursorFollowerListener };
