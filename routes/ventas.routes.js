const express = require("express");
const ruta = express.Router();
const ventaController = require("../controller/venta.controller")
const validarVenta = require("../middleware/validarVenta.middleware")
const authMiddleware= require("../middleware/auth.middleware")

ruta.post("/registro", validarVenta.validarVenta, ventaController.registro)
ruta.get("/uno/:id", authMiddleware.verificarToken, ventaController.getVentasById)

ruta.get("/sorted", ventaController.getVentasByPrecio)
/**
 * @swagger
 * /api/ventas/filter:
 *   get:
 *     summary: Filtramos ventas con precio
 *     parameters:
 *        - in: query
 *          name: min
 *          schema:
 *              type: number
 *          description: precio min
 *        - in: query
 *          name: max
 *          schema:
 *              type: number
 *          description: precio max
 *     responses:
 *       200:
 *         description: Da un id recibe un coche
 */
ruta.get("/filter", ventaController.getVentasFilterByPrecio)

module.exports = ruta