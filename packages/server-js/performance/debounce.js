export const debounce = (func, wait) => {
    let timeoutId;
    let lastArgs;
    let lastCall;

    function debounced (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args)
            timeoutId = null;
            lastArgs = args;
            lastCall = func;
        }, wait);
    }

    debounced.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        lastArgs = null;
        lastCall = null;
    }

    debounced.flush = () => {
        if (timeoutId && lastCall) {
            clearTimeout(timeoutId);
            lastCall(...lastArgs);
        }
    }
    
    return debounced;
}
