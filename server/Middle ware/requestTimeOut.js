// Create a middleware function to set a request timeout
export default function requestTimeout(timeoutMillis) {
    return function (req, res, next) {
        let timedOut = false;

        // Set a timeout using setTimeout
        const timeoutId = setTimeout(() => {
            timedOut = true;
            res.status(408).json({ error: 'Request timed out' }); // Respond with a timeout error
            console.log(`time out `)
        }, timeoutMillis);

        // Attach an event listener to the response to clear the timeout on success
        res.on('finish', () => {
            if (!timedOut) {
                clearTimeout(timeoutId);
            }
        });

        // Continue to the next middleware
        next();
    };
}

