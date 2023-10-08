// Create a middleware function
export default function apiTracker(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} `);
    next();
}

