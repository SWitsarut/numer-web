import chalk from 'chalk';

// Middleware to track request processing time with chalk styling
export default function requestTimeTracker(req, res, next) {
    const startTime = performance.now(); // Get the current high-resolution time

    // Add a 'finish' event listener to the response object
    res.on('finish', () => {
        const endTime = performance.now(); // Get the current time again
        const elapsedTimeInMs = (endTime - startTime).toFixed(2);

        // Define styles using chalk
        const timestampStyle = chalk.gray.bold;
        const methodStyle = (method) => {
            switch (method) {
                case 'GET':
                    return chalk.green.bold(method);
                case 'POST':
                    return chalk.blue.bold(method);
                case 'PUT':
                    return chalk.yellow.bold(method);
                case 'DELETE':
                    return chalk.red.bold(method);
                default:
                    return chalk.white.bold(method);
            }
        };

        // Log the request with styled output
        console.log(
            `${timestampStyle(`[${new Date().toISOString()}]`)} ${methodStyle(req.method)} ${req.url
            } - ${chalk.yellow.bold(`${elapsedTimeInMs} ms`)}`
        );
    });

    next();
}
