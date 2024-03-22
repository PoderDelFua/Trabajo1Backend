const express = require('express');
const router = express.Router();
const { getItem, getItems, createItem, updateItem, deleteItem, deleteLogico } = require('../controllers/comerces');
const { validatorCreateComerce, validatorGetComerce , validatorUpdateComerce} = require('../validators/comerces');

router.get('/', getItems);
router.get('/:id', validatorGetComerce, getItem);
router.post('/', validatorCreateComerce, createItem);
router.put('/:id', validatorUpdateComerce, updateItem);
router.delete('/:CIF', deleteItem);
router.delete('/delete/:CIF', validatorGetComerce, deleteLogico);

module.exports = router