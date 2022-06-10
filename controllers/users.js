const bcryptjs = require("bcryptjs");

const User = require("../models/user");


const usersIndex = async( req, res ) => {

    try {
        const query = { state: true }
        const usuarios = await User.find(query);

        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        console.log(error);
         res.status().json({
            ok: true,
            msg: "Error al buscar los usuarios"
        })       
    }
    

    
}

const usersStore = async( req, res ) => {

    try {
        const user = new User(req.body);


        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( req.body.password, salt );
        // Grabar
        await user.save();



        res.json({
            ok: true,
            msg: "Usuario creado",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error al crear un usuario"
        })
    }

    
}

const usersUpdate = async( req, res) => {

    const { id } = req.params;
    const { password, email, ...resto } = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( req.body.password, salt );
    }

    try {
        
        const usuario = await User.findByIdAndUpdate( id, resto, {new:true} );

        res.json({
            ok: true,
            msg: `Usuario ${usuario.name} editado satisfactoriamente`,
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hubo un error en la edición del usuario",
        })
    }
    
}

const usersPatch = ( req, res) => {
    res.json({
        ok: true,
        msg: "Patch usuario"
    })
}

const usersDestroy = async( req, res) => {
    
    const {id} = req.params;
    
    try {
        const usuario = await User.findByIdAndUpdate(id, {state: false}, {new: true});
        res.json({
            ok: true,
            msg: "Usuario borrado exitosamente",
            usuario,
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: "Error al eliminar usuario"
        })
    }
}

module.exports = {
    usersIndex,
    usersStore,
    usersUpdate,
    usersPatch,
    usersDestroy,
}