const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require('./src/database/mongodb.connection');

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Settings
app.set("port", process.env.PORT || 4000);

//Routes
app.use("/user", require("./src/routes/user.routes"))

//conexion
app.listen(app.get("port"), () => {
    console.log(`Aplicacion escuchando en el puerto ${app.get("port")}`)
})