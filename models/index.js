const models = {
    comercesModel: require('./nosql/comerces'),
    usersModel: require('./nosql/users'),
    storageModel: require('./nosql/storage'),
    webcomercesModel: require('./nosql/webcomerces'),

}
//Realmente esto no es necesario, pero si en un futuro se añaden más modelos, se hace asi para una mejor organización
//Exportaremos models, que contendrá los modelos que necesitamos. Y luego pediremos el modelo que necesitamos en cada archivo
module.exports = models