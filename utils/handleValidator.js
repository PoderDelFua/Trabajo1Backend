const { validationResult } = require("express-validator")
const {handleHttpError} = require('./handleError')
//Funciona de la siguiente manera:
// 1. Se importa validationResult de express-validator
// 2. Se crea una función llamada validateResults que recibe req, res y next.
//Req contiene la petición, res la respuesta y next es una función que llama al siguiente middleware
// 3. Dentro de la función, se intenta validar los resultados de la petición
// 4. Si hay un error, se envía un mensaje de error con el código 403
// 5. Se exporta la función validateResults

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        handleHttpError(res, "VALIDATION_ERROR", 403)
        res.send({ errors: err.array() })
    }
}
module.exports = validateResults