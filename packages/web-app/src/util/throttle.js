export const throttle = (func, wait) => {
    let timeoutID
    let lastCallTime = 0

    return (...args) => {
        const now = Date.now()
        const remainingTime = wait - (now - lastCallTime)

        if (remainingTime <= 0) {
            clearTimeout(timeoutID)
            lastCallTime = now
            func(...args)
        } else if (!timeoutID) {
            timeoutID = setTimeout(() => {
                timeoutID = null
                lastCallTime = Date.now()
                func(...args)
            }, remainingTime)
        }
    }
}