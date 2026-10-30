const express = require('express')
const app = express();
const mongoose = require("mongoose")
const rutaCoches = require('./routes/coches.routes');
const rutaUsuarios = require('./routes/usuarios.routes');
const rutaVentas = require("./routes/ventas.routes")
const logger = require("./middleware/logger.middleware")
require("dotenv").config()

// Middleware
const bodyParser = require("body-parser")
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use("/api/coches", rutaCoches)
app.use("/api/usuarios", rutaUsuarios)
app.use("/api/ventas",rutaVentas)

app.use(logger)

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PUERTO = process.env.PORT || 3000

app.listen(PUERTO, ()=>{
    console.log(`App en puerto ${PUERTO}`)
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("BBDD EN MARCHA"))
.catch((err)=>console.log("LA BBDD PETO", err))
