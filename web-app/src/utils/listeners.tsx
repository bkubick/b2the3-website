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


/**
 * Adds a listener to the document that fires a function when the specified key
 * is pressed.
 * 
 * @param keyCode The code of the key to listen for.
 * @param shiftKey whether or not the shift key must be pressed.
 * @param ctrlKey whether or not the ctrl key must be pressed.
 */
function addKeyDownListener(keyCode: string,
                            callback: (event: KeyboardEvent) => void,
                            shiftKey: boolean = true,
                            ctrlKey: boolean = true): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        event.preventDefault();

        const shiftKeyCondition: boolean = shiftKey ? event.shiftKey : true;
        const ctrlKeyCondition: boolean = ctrlKey ? event.ctrlKey : true;

        if (shiftKeyCondition && ctrlKeyCondition && event.code === keyCode) {
            callback(event);
        }
    });
}


export { addCursorFollowerListener, addKeyDownListener };
