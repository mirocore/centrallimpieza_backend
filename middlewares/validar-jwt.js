const { request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validarJWT = async(req = request, res, next) => {

    const token = req.header("x-token");

    // Verifico que el token exista
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No se ha enviado token",
        })
    }
    
    try {
        // Verifico que el token sea valido
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Busco el usuario con el id del token
        const usuario = await User.findById(uid);

        // Verifico que el usuario exista
        if(!usuario){
            return res.status("401").json({
                ok: false,
                msg: "Usuario autenticado no existente"
            })
        }

        // Verifico que el usuario autenticado no tenga el estado en false
        if(!usuario.state){
            return res.status("401").json({
                ok: false,
                msg: "Usuario inactivo"
            }) 
        }

        // Guardo el usuario en la req
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg: "Token inválido"
        })
    }

}

module.exports = {validarJWT};