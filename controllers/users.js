const { usersModel } = require("../models")
const { handleHttpError } = require("../utils/handleError")
const { matchedData, body } = require("express-validator")

const getItems = async (req, res) => {
    const data = await usersModel.find({})
    res.send({data})
}

const getItem = async (req, res) => {
    //No es necesario
}
const createItem = async (req, res) => {
    const { body } = req
    const data = await usersModel.create(body)
    console.log(data)
    res.send({data})
}
const updateItem = async (req, res) => {
    try{
        const { id, ...body } = matchedData(req)

        const data = await usersModel.findByIdAndUpdate(id, body, {new:true})
        res.send({data})
    }
    catch(err){
        handleHttpError(res, err.message, 404)
    }
}
const updateRol = async (req, res) => {
    try{
        const { id, ...body} = matchedData(req)
        const data = await usersModel.findOneAndUpdate({_id:id},{role:body.role},{new:true})
        res.send({data})
    }catch(err){
        handleHttpError(res, err.message, 404)
    }
}


const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await usersModel.deleteOne({ _id: id });
        if (data.deletedCount === 0) {
            throw new Error("No se encontró el usuario a eliminar o ya fue eliminado.");
        }
        res.send({ data });
    } catch (err) {
        handleHttpError(res, "Error al eliminar el usuario", 404);
    }
}

const createResena = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await usersModel.findByIdAndUpdate(id, { $push: { resenas: body } }, { new: true });
        res.send({ data });
    } catch (err) {
        handleHttpError(res, err.message, 404);
    }
}

const getUsersByCityAndRecieveOffers = async (req, res) => {
    try {
        const { ciudad } = req.params;
        console.log(ciudad);
        const data = await usersModel.find({ ciudad: ciudad, permiteRecibirOfertas: true });
        console.log(data);
        res.send({ data });
    } catch (err) {
        handleHttpError(res, err.message, 404);
    }
}



module.exports = { getItems, getItem,
    createItem, updateItem,
    deleteItem, updateRol, createResena,
    getUsersByCityAndRecieveOffers}
