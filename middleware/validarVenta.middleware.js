const validarVenta = (req,res,next) => {
    
    if(!req.body.idUsuario || !req.body.idCoche || !req.body.precio){
        return res.status(404).send("Faltan datos en la peticion")
    }

    if(req.body.precio < 0){
        return res.status(404).send("No se acepta precio negativo")
    }

    next()
}

const validarUsuario = (req,res,next) => {
    if (!req.body.username || !req.body.password){
        return res.status(404).send("Faltan datos en la peticion")
    }
    next()
}

module.exports = {validarVenta, validarUsuario}