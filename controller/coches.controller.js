const req = require("express/lib/request")
const coches = require("../bbdd/coches")
const Coche = require("../model/coche.model")

const cargaInicial = async (req,res) =>{
    await Coche.insertMany(coches)
    res.status(201).send("Carga completa!")
}

const findAll = async(req, res) => {
    const result = await Coche.find();
    res.status(200).send(result);
}

const findById = async(req, res) => {
    const result = await Coche.find({_id: req.params.id});
    res.status(200).send(result);
}

const findByAnioGreaterThan = async (req,res)=>{
    const result = await Coche.find({anio: {$gt: req.params.anio}});
    res.status(200).send(result);
}

const findByMarca = async (req,res)=>{
    const result = await Coche.find({marca: {$eq: req.params.marca}});
    res.status(200).send(result);
}

const insertOne = async (req, res) => {
    try{
        const coche = req.body;
        const cocheNuevo = new Coche(coche)
        const result = cocheNuevo.save()
        res.status(201).send(result)
    } catch(error){
        console.error("Error al insertar Coche")
        res.status(404).send({message: "Error al insertar Coche"})
    }
    
}

const createCoche = async (req,res) => {
    try{
        const {marca,modelo,anio,extras} = req.body
        const result = Coche.create({marca,modelo,anio,extras})
        return res.status(201).send({message: "coche insertado correctamente"})
    } catch(error){
        console.error("Error al crear Coche")
        res.status(404).send({message: "Error al crear Coche"})
    }
}

const updateById = async (req,res) => {
    try{
        const result = await Coche.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})
        res.status(201).send(result)
    } catch(error){
        console.error("Error al actualizar Coche")
        res.status(404).send({message: "Error al actualizar Coche"})
    }
}

const deleteById = async (req,res) => {
    try{
        const result = await Coche.findByIdAndDelete(req.params.id)
        res.status(200).send(result)
    } catch(error){
        console.error("Error al eliminar Coche")
        res.status(404).send({message: "Error al eliminar Coche"})
    }
    
}


module.exports = {
    cargaInicial,
    findAll,
    findByAnioGreaterThan,
    findByMarca,
    insertOne,
    createCoche,
    updateById,
    deleteById,
    findById
}