/**
 * Creates an error object with a specified status code and message.
 * @param {number} statusCode - HTTP status code.
 * @param {string} message - Error message.
 * @returns {Error} - Error object.
 */

export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode
    error.message = message
    return error;
}