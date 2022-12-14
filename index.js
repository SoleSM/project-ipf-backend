const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
require("dotenv").config();
require('./src/database/mongodb.connection');

//Inicializamos el servidor
const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


//Settings
app.set("port", process.env.PORT || 4000);

//Routes
app.use("/auth", require('./src/routes/auth.routes'));
app.use("/user", require("./src/routes/user.routes"));
app.use("/materias", require("./src/routes/materias.routes"));
app.use("/publicaciones", require("./src/routes/publicaciones.routes"));
app.use("/carreras", require("./src/routes/carreras.routes"));

//conexion
app.listen(app.get("port"), () => {
    console.log(`Aplicacion escuchando en el puerto ${app.get("port")}`)
})