const { comercesModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator')


const getItems = async (req, res) => {
    //Obtener la lista de comercios y, opcionalmente (vía parámetro query,) ordenados por
    // el CIF ascendentemente.
    try {
        const data = await comercesModel.find({}).sort({ CIF: 1 });
        res.send({ data });
    } catch (err) {
        handleHttpError(res, err.message, 404);
    }
}

const getItem = async (req, res) => {
    //Obtener un comercio por su CIF, de ahi el findOne con el CIF
    try {
        const { CIF } = matchedData(req);
        const data = await comercesModel.findOne({ CIF });
        res.send({ data });
    } catch (err) {
        handleHttpError(res, err.message, 404);
    }
}
const createItem = async (req, res) => {
    try {
        //Crear un comercio
        const body = matchedData(req);
        const data = await comercesModel.create(body);
        res.send({ data });
    } catch (err) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}

//Actualizar un comercio por su CIF, sacamos el CIF del body y el resto de los datos
//Luego hacemos un findOneAndUpdate con el CIF y el resto de los datos
const updateItem = async (req, res) => {
    try {
        //Update por el CIF
        const { CIF, ...body } = matchedData(req);
        const data = await comercesModel.findOneAndUpdate({ CIF }, body, { new: true });
        res.send({ data });
    }
    catch (err) {
        handleHttpError(res, err.message, 404);
    }
}

//Borrar un comercio por su CIF
const deleteItem = async (req, res) => {
//Borrar por CIF
    try {
        const { CIF } = matchedData(req);
        const data = await comercesModel.deleteOne({ CIF });
        res.send({ data });
    }
    catch (err) {
        handleHttpError(res, err.message, 404);
    }
}
//Borrar un comercio por su CIF, pero en vez de borrarlo, se hace un borrado lógico
const deleteLogico = async (req, res) => {
    try {
        //usamos delete en vez de deleteOne para que se haga un borrado lógico
        const { CIF } = matchedData(req);
        const data = await comercesModel.delete({ CIF: CIF });
        res.send({ data });

    }
    catch (err) {
        handleHttpError(res, err.message, 404);
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    deleteLogico
}