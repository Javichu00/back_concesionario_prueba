const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    nombre:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match:[/^\S+@\S+\.\S+$/, "EL email no es válido"]
    },
    enable:{
        type: Boolean,
        default: true,
        select: false
    },
    rol:{
        type: String,
        required: true,
        trim: true,

        enum: ["ADMON", "CLIENTE", "DIRECTOR"]
    }
},{
    timestamps: true,
    versionKey: false
})

const Usuario = mongoose.model("usuario", usuarioSchema)
module.exports = Usuario;