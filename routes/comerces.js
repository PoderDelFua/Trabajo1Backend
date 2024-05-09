const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem, deleteLogico } = require('../controllers/comerces');
const checkRol = require("../middleware/rol")

const { validatorCreateComerce, validatorGetComerce , validatorUpdateComerce} = require('../validators/comerces');
const {authMiddleware} = require("../middleware/session");
// Accedemos a los métodos de los controladores de comercios, a veces con id porqué es un parámetro de la url
router.get('/', getItems);
router.get('/:id', getItem)
router.post('/', authMiddleware, checkRol(['admin']), validatorCreateComerce, createItem);
router.put('/:id',authMiddleware ,validatorUpdateComerce, updateItem);
router.delete('/:CIF',authMiddleware, validatorGetComerce, deleteItem);
router.delete('/delete/:CIF', authMiddleware, validatorGetComerce, deleteLogico);


module.exports = router