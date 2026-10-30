const express = require("express");
const ruta = express.Router();
const usuarioController = require("../controller/usuario.controller")
const validarUsuario = require("../middleware/validarVenta.middleware")
const authMiddleware = require("../middleware/auth.middleware")

ruta.get("/", usuarioController.getTodos)
ruta.get("/:id", usuarioController.getUserById)
//ruta.post("/registro", validarUsuario.validarUsuario, usuarioController.signUp)
ruta.post("/registroSeguro", usuarioController.signUpCrypt)
//ruta.post("/logIn", usuarioController.logIn);
ruta.post("/logInBien", usuarioController.logInBien);
ruta.delete("/:id", authMiddleware.permitirRoles("ADMON","DIRECTOR"), usuarioController.delete)

module.exports = ruta