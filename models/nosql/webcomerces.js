const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const webcomercesSchema = new mongoose.Schema({
        ciudad: {
            type: String,
        },
        actividad: {
            type: String,
        },
        titulo: {
            type: String,
        },
        telefono: {
            type: String,
        },
        scoring: [{
            type: Number,
        }],
        resumen: {
            type: String,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'storages'
        },
        resenaUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        idComercio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comerces'
        },
    },
    {
        timestamps: true,
        versionKey: false
    })
webcomercesSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true });

//Lo exportamos con el nombre de "comerces" que usaremos en el controlador
module.exports = mongoose.model("webcomerces", webcomercesSchema)