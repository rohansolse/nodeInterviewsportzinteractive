
module.exports.responseData = function (response, status, statuscode, message, data) {
    var obj = {}
    obj.status = status || false
    obj.statuscode = statuscode || 500
    obj.message = message || 'internal server error'
    obj.data = data || {}
    response.status(statuscode).send(obj);
}