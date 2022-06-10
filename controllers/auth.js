const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const User = require("../models/user");

const login = async(req, res) => {

    const { email, password } = req.body;

    try {
        
        // Verifico que el email exista
        const usuario = await User.findOne({email});

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: "Usuario inexistente en la base de datos"
            })
        }

        // Verifico si el usuario está activo
        if(!usuario.state){
            return res.status(401).json({
                ok:false,
                msg: "Usuario inactivo"
            })
        }

        // Verifico la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(401).json({
                ok: false,
                msg: "Usuario o contraseña incorrecto"
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario._id, usuario.name );

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hubo un error en el login"
        })
    }

}

const revalidarToken = async(req, res) => {

    const uid = req.usuario._id;
    const name = req.usuario.name;

    // GENERO EL NUEVO TOKEN
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        msg: "Revalidar Token",
        token,
        uid,
        name,
    })
}

module.exports = {
    login,
    revalidarToken
}