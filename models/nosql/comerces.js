const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
// Definimos el esquema de comercio, no es necesario id de la pagina porque se genera automáticamente _id
// He considerado que el CIF y el email deben ser únicos, ya que no puede haber dos comercios con el mismo CIF o email,
// aunque el nombre y la dirección pueden ser iguales, ya que pueden haber dos comercios con el mismo nombre o dirección (pensando en mismo edificio, no ponemos el nombre de la planta sino el de la calle)

const comerceSchema = new mongoose.Schema({
        nombre: {
            type: String,
        },
        CIF: {
            type: String,
            unique: true
        },
        direccion: {
            type: String,
        },
        telefono: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    })
comerceSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true });

//Lo exportamos con el nombre de "comerces" que usaremos en el controlador
module.exports = mongoose.model("comerces", comerceSchema)