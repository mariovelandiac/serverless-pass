module.exports = function response(status, message) {
    const resp = {
        statusCode: status,
        body: message
    };
    return resp
}