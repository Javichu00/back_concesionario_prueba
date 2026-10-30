const jwt = require("jsonwebtoken");

const verificarToken = (req,res,next) => {
    
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    const token = authHeader.split(" ")[1];
    
    const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD)
    console.log(tokenVerificado)

    if(tokenVerificado.id != req.params.id){
        return res.status(401).send("NO tienes permiso para esto")
    }

    

    next()
}

const verificarId = (req,res,next) => {
    
        
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    
    const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD)
    if((tokenVerificado.id != req.params.id) && (tokenVerificado.rol != "ADMON" && tokenVerificado.rol != "DIRECTOR")){
        return res.status(401).send("NOOOO tienes permiso para esto")
    }
    
    next()
}

const permitirRoles = (...rolesPermitidos) => {

    return (req,res,next) =>{
        const authHeader = req.headers.authorization;

        const token = authHeader.split(" ")[1];
    
        const tokenVerificado = jwt.verify(token, process.env.TOKEN_PASSWORD)


        if(!rolesPermitidos.includes(tokenVerificado.rol)){
            return res.status(401).send("NOOOO tienes permiso para esto")
        }
    
        next()
    }

}


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZGYxOTE1MjgxMjgwNzM5YjhkZDU0NiIsInVzZXJuYW1lIjoiSmF2aWVyIiwicm9sIjoiQ0xJRU5URSIsImlhdCI6MTc5MzAwNTg4OSwiZXhwIjoxNzkzMDEzMDg5fQ.ffl-ifQNGrN42IPLAr2s1mtmIDeYUkhIA70rqbSJCgA
//6adf180eb59ed391b17acca4
module.exports = {verificarToken,verificarId,permitirRoles}