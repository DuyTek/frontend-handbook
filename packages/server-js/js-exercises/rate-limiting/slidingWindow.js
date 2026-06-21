const slidingWindow = (limit, windowMs) => {
    const inMemoryStore = new Map();

    return (req, res, next) => {
        const ip = req.ip;
        const currentTime = Date.now();

        let requestTimes = inMemoryStore.get(ip) || [];

        if (!requestTimes.length) {
            inMemoryStore.set(ip, requestTimes)
        }

        const cutoff = currentTime - windowMs;
        requestTimes = requestTimes.filter(time => time > cutoff);
        inMemoryStore.set(ip, requestTimes)

        if (requestTimes.length >= limit) {
            const retryAfterMs = requestTimes[0] + windowMs - currentTime;

            res.setHeader('Retry-After', Math.ceil(retryAfterMs / 1000))
            return res.sendStatus(429)
        }
        requestTimes.push(currentTime)
        next()
    }
}

module.exports = slidingWindow