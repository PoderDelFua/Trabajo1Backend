const mongoose = require("mongoose")

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)
module.exports = mongoose.model("storages", StorageScheme) // Nombre de la colección (o de la tabla en SQL)