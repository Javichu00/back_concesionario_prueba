const logger = (req,res,next) => {
    console.log("Metodo: " + req.method)
    console.log("URL: " + req.url)

    next()
}

module.exports = logger