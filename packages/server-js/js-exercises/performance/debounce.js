/**
 * @description: Debounce function ensures that the debounced func is called after a wait milliseconds have elapsed since the last time it was invoked. 
 * If the debounced function is called again before the wait time has elapsed, the previous timer is canceled and a new timer is set.
 * @param {} func 
 * @param {*} wait 
 * @returns 
 */
export const debounce = (func, wait) => {
    let timeoutId;
    let lastArgs;

    function debounced (...args) {
        lastArgs = args;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...lastArgs);
            timeoutId = null;
            lastArgs = null;
        }, wait);
    }

    debounced.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastArgs = null;
    }

    debounced.flush = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            func(...lastArgs);
            lastArgs = null;
        }
    }
    
    return debounced;
}
