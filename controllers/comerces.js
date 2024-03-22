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
    //Obtener un comercio por su CIF
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
        console.log("Request recibido", req.body); // Log para ver el cuerpo de la solicitud
        const body = matchedData(req);
        console.log("Datos coincidentes", body); // Verificar los datos procesados
        const data = await comercesModel.create(body);
        console.log("Item creado", data); // Confirmar la creación del item
        res.send({ data });
    } catch (err) {
        console.error("Error al crear item", err); // Log para ver el error
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }
}


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