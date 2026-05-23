export const debounce = (func, wait) => {
    let timeoutID = null;

    return (...args) => {
        clearTimeout(timeoutID)

        timeoutID = setTimeout(() => {
            timeoutID = null
            func(...args)
        }, wait)
    }
}