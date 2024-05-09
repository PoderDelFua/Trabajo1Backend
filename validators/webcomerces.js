const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
//Vamos a validar los datos que se reciben en la petición para crear un comercio, sin esto, no se podrá crear un comercio
//Y no podran inyectar código malicioso



const validatorCreateComerce = [
    check("ciudad").exists().notEmpty(),
    check("actividad").exists().notEmpty(),
    check("titulo").exists().notEmpty(),
    check("telefono").exists().notEmpty(),
    check("resumen").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
//Como hemos dicho que se filtre por CIF, vamos a validar que se reciba un CIF
const validatorGetComerce = [
    check("CIF").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateComerce = [
    check("nombre").optional(),
    check("id").optional().isMongoId(),
    check("direccion").optional(),
    check("telefono").optional(),
    check("image").optional().isMongoId(),
    check("email").optional(),
    check("resenaUsuario").optional(),
    check("CIF").optional(),
    (req, res, next) => validateResults(req, res, next)
]

const validatorBuscarCiudad = [
    check("ciudad").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorScore = [
    check("scoring").exists().notEmpty().isNumeric(),
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorCreateComerce, validatorGetComerce , validatorUpdateComerce, validatorBuscarCiudad, validatorScore}