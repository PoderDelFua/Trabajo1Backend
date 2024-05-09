const express = require('express');
require('dotenv').config();

const app = express()
const morganBody = require("morgan-body")
const {IncomingWebhook} = require("@slack/webhook")
const { sequelize, dbConnectMySql } = require("./config/mysql")
const cors = require("cors")
const loggerStream = require("./utils/handleLogger")
const dbConnect = require("./config/mongo")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")


//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000
//Importamos la conexión a la BD
dbConnect()
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs))
app.use("/api", require("./routes"))
app.use(express.static("storage"))
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

if (process.env.ENGINE_DB === 'nosql'){
    dbConnect()
// Crea las colecciones por defecto si no existieran
}else {
    dbConnectMySql()
    sequelize.sync() // Crea las tablas en la base de datos si no existieran}
}
morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function (req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    }, stream: loggerStream
})

module.exports = app