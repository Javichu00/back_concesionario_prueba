const Usuario = require("../model/usuario.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
class UsuarioController{

    async getTodos(req,res){
        const result = await Usuario.find()
        return res.status(200).send(result)
    }

    async getUserById(req,res){
        const result = await Usuario.findById(req.params.id)
        return res.status(200).send(result)
    }

    async signUp(req,res){
        try{
            const usuario = new Usuario({
                username: req.body.username,
                password: req.body.password,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            })
            const result = await usuario.save();
            res.status(201).send("Usuario Registrado")
        } catch(error){
            console.error("Error en el registro")
            return res.status(500).send("Error en el registro")
        }
    }

    async signUpCrypt(req,res){
        try{
            const passwordEncriptada = await bcrypt.hash(req.body.password,10)
            console.log(passwordEncriptada)
            const usuario = new Usuario({
                username: req.body.username,
                password: passwordEncriptada,
                nombre: req.body.nombre,
                email: req.body.email,
                rol: req.body.rol
            })
            const result = await usuario.save();
            res.status(201).send("Usuario Registrado")
        } catch(error){
            console.error("Error en el registro")
            return res.status(500).send("Error en el registro")
        }
    }

    async logIn(req,res){
        const result = await Usuario.findOne({username:req.body.username, password:req.body.password})
        if (!result){
            return res.status(404).send("Credenciales incorrectas")
        }
        return res.status(200).send(result)
    }

    async logInBien(req,res){
        const user = await Usuario.findOne({username:req.body.username}).select("+password")
        const isRealPassword = user ? await bcrypt.compare(req.body.password, user.password) : false
        if (!user || !isRealPassword){
            return res.status(404).send("Credenciales incorrectas")
        }
        const token = jwt.sign({
            id: user._id,
            username: user.username,
            rol: user.rol
        },
        process.env.TOKEN_PASSWORD,
        {
            expiresIn: "2h"
        }
        )

        return res.status(200).json({"mensaje": "inicio de sesion correcto", "token": token})
    }

    async delete(req,res){
        const result = await Usuario.findByIdAndDelete(req.params.id)
        if (!result){
            res.status(404).send("No se encontro usuario")
        }
        return res.status(200).send(result)
    }

}

module.exports = new UsuarioController();