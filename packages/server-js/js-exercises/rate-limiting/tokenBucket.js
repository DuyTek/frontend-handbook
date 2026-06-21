const tokenBucket = (refill, rate, burst) => {
    const store = new Map()

    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now()

        let bucket = store.get(key);

        if (!bucket) {
            bucket = {
                tokens: burst,
                lastRefill: now,
            }
            store.set(key, bucket)
        }

        const intervalsElapsed = Math.floor((now - bucket.lastRefill) / rate)
        if (intervalsElapsed > 0) {
            bucket.tokens = Math.min(
                burst,
                bucket.tokens + intervalsElapsed * refill
            )
            
            bucket.lastRefill += intervalsElapsed*rate
        }

        if (bucket.tokens < 1) {
            const retryAfterMs = Math.max(0, bucket.lastRefill + rate - now)

            res.setHeader('Retry-After', Math.ceil(retryAfterMs / 1000));
            return res.sendStatus(429)
        }

        bucket.tokens -= 1
        next()
    }
}

module.exports = tokenBucket