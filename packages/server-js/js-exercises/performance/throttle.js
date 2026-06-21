/**
 * @description Throttle function ensures that the provided function is only called once every wait milliseconds. If the provided function 
 * is triggered again before the wait time, the function is ignored until the wait time elapsed
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const throttle = (func, wait) => {
    let lastCallTime = 0;
    let timeoutId;
    let lastArgs;

    function throttled (...args) {
        const now = Date.now();
        const remainingTime = wait - (now - lastCallTime);
        lastArgs = args;

        if (remainingTime <= 0) {
            clearTimeout(timeoutId);
            timeoutId = null;
            lastCallTime = now;
            func(...args);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastCallTime = Date.now();
                timeoutId = null;
                func(...lastArgs);
            }, remainingTime);
        }
    }

    throttled.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastArgs = null;
        lastCallTime = 0;
    }

    throttled.flush = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
            lastCallTime = Date.now();
            func(...lastArgs);
        }
    }
    
    return throttled;
}