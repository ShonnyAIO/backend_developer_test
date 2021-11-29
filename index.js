const mongoose = require('mongoose');
const app = require('./app'); // Incorpora la instancia de express
const port = 3800; // Puerto para ejecutarlo

// Conexion a la bases de datos en la PC de Itconectas
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pruebas_usuarios').then(
    () => {
        console.log("La conexión a la bases de datos pruebas_usuarios se ha realizado correctamente"),

            app.listen(port, () => { console.log("Servidor corriendo en http://localhost:3800"); });
    }).catch(err => console.log(err));