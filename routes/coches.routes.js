const express = require("express")

const ruta = express.Router();
const cocheController = require("../controller/coches.controller")
const logger = require("../middleware/logger.middleware")

/**
 * @swagger
 * /api/coches/carga-inicial:
 *   get:
 *     summary: Carga inicial
 *     responses:
 *       200:
 *         description: Carga la base de datos con todos los datos
 */

ruta.get("/carga-inicial",cocheController.cargaInicial)

/**
 * @swagger
 * /api/coches/todos:
 *   get:
 *     summary: Obtenemos todos los coches
 *     responses:
 *       200:
 *         description: Lista de coches
 */
ruta.get("/todos",logger, cocheController.findAll)

/**
 * @swagger
 * /api/coches/uno/{id}:
 *   get:
 *     summary: Obtenemos coche por id
 *     parameters:
 *        - in: path
 *          name: id
 *          description: ID del coche
 *     responses:
 *       200:
 *         description: Da un id recibe un coche
 */
ruta.get("/uno/:id", cocheController.findById)

ruta.get("/anio/:anio", cocheController.findByAnioGreaterThan)

ruta.get("/marca/:marca", cocheController.findByMarca)



ruta.post("/crearCoche", cocheController.insertOne)
ruta.post("/crear", cocheController.createCoche)



ruta.put("/actualizar/:id", cocheController.updateById)



ruta.delete("/eliminar/:id", cocheController.deleteById)



module.exports = ruta