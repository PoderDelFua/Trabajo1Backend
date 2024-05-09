const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem, deleteLogico, buscarComercioPorCiudad, buscarComercioPorCiudadActividad, updateScore} = require('../controllers/webcomerces');
const checkRol = require("../middleware/rol")

const { validatorCreateComerce, validatorGetComerce , validatorUpdateComerce, validatorScore} = require('../validators/webcomerces');
const {authMiddleware} = require("../middleware/session");
// Accedemos a los métodos de los controladores de comercios, a veces con id porqué es un parámetro de la url
router.get('/', getItems);
router.get('/:id', validatorGetComerce, getItem)
router.get('/buscar/:ciudad', buscarComercioPorCiudad);
router.get('/buscar/:ciudad/:actividad', buscarComercioPorCiudadActividad);
router.put('/score', validatorScore, updateScore);
router.post('/',authMiddleware, validatorCreateComerce, createItem);
router.put('/:id',authMiddleware ,validatorUpdateComerce, updateItem);
router.delete('/:CIF',authMiddleware, validatorGetComerce, deleteItem);
router.delete('/delete/:CIF', authMiddleware, validatorGetComerce, deleteLogico);


module.exports = router