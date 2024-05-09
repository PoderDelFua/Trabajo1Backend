const { check } = require("express-validator")
const validateResults = require("../../../mongoDB/utils/handleValidator")

const validatorRegister = [
    check("nombre").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("edad").optional().notEmpty(),
    check("ciudad").optional().notEmpty(),
    check("intereses").optional().isArray(),
    check("permiteRecibirOfertas").optional().isBoolean(),

    //check("role").optional(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = { validatorRegister, validatorLogin }