const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const usersSchema = new mongoose.Schema({
        nombre: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
        edad: {
            type: Number,
        },
        role: {
            type: ["admin", "user"],
            default: "user"
        },
        ciudad: {
            type: String,
        },
        intereses: {
            type: [String],
        },
        resena: [{
            type: String,
        }],
        permiteRecibirOfertas: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    })
usersSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt : true });

//Lo exportamos con el nombre de "users" que usaremos en el controlador
module.exports = mongoose.model("users", usersSchema)