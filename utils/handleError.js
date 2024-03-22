const handleHttpError = (res, message, code = 403) => {
    res.status(code).send(message)
}
//Mensaje de error generico
module.exports = { handleHttpError }