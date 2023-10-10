import chalk from 'chalk';

export default function apiTracker(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

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

    // Log the request with styles
    console.log(`${timestampStyle(`[${timestamp}]`)} ${methodStyle(method)} ${url}`);

    next();
}
