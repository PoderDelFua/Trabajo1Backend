const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateUser = [
    check("nombre").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("edad").optional().notEmpty(),
    check("ciudad").optional().notEmpty(),
    check("intereses").optional().isArray(),
    check("permiteRecibirOfertas").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateUser = [
    check("id").exists().notEmpty().isMongoId(),
    check("ciudad").optional().notEmpty(),
    check("intereses").optional().isArray(),
    check("permiteRecibirOfertas").optional().isBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateRol = [
    check("role").exists().notEmpty().isArray(),
    (req, res, next) => validateResults(req, res, next)
]



module.exports = { validatorCreateUser, validatorUpdateUser, validatorGetItem, validatorUpdateRol }