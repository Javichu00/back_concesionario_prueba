const Usuario = require("../model/usuario.model")
const Coche = require("../model/coche.model")
const Venta = require("../model/venta.model")
const bcrypt = require("bcrypt")
class VentaController{

    async registro(req,res){
        const usuarioVenta = await Usuario.findById(req.body.idUsuario)
        if (!usuarioVenta){
            return res.status(404).send("Usuario no encontrado")
        }
        const cocheVenta = await Coche.findById(req.body.idCoche)
        if (!cocheVenta){
            return res.status(404).send("Coche no encontrado")
        }
        const ventaNueva = new Venta({
            usuario:{_id: usuarioVenta._id},
            coche:{_id: cocheVenta._id},
            precio:req.body.precio
        })

        const resultVenta = await ventaNueva.save();
        cocheVenta.isVendido = true;
        return res.status(201).send("Venta registrada correctamente")
    }

    async getVentasById(req,res){
        const result = await Venta.findById(req.params.id).populate("coche","marca modelo").populate("usuario", "username email")
        return res.status(200).send(result)
    }

    async getVentasByPrecio(req,res){
        const result = await Venta.find().sort({precio: 1})
        return res.status(200).send(result)
    }

    async getVentasFilterByPrecio(req,res){
        // const result = await Venta.find({precio: {$gt: req.params.min, $lt: req.params.max}})
        // return res.status(200).send(result)
        let filter = {}
        let filterPrecio = {}

        let orden = 0;

        if(req.query.ord == "asc"){
            orden = 1
        }
        else if (req.query.ord == "des"){
            orden = -1
        }

        if(req.query.max){
            filterPrecio.$lt = Number(req.query.max)
        }
        if(req.query.min){
            filterPrecio.$gt = Number(req.query.min)
        }

        if (req.query.min || req.query.max){
            filter.precio = filterPrecio
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10

        let skip = (page-1) * limit


        const result = await Venta.find(filter).sort({precio: orden}).skip(skip).limit(limit)
        return res.status(200).send(result)

    }

}

module.exports = new VentaController();