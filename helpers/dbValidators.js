const { Categoria, Producto } = require("../models");
const Role = require("../models/role");
const User = require("../models/user");

const validarRoles = async( role = "" ) => {

    const rolExiste = await Role.findOne({role});

    if( !rolExiste){
        throw new Error("El rol es inválido");
    }
}

const existeEmail = async( email = "" ) => {

    const correo = await User.findOne({email});
    if(correo){
            throw new Error(`El email ${email} ya se encuentra registrado en la base de datos`);
        }
    

}

const existeUsuarioPorId = async(id = "") => {
    const usuario = await User.findById(id);
    if(!usuario){
        throw new Error("Usuario no existente");
    }
}

const existeCategoriaPorNombre = async( name = "" ) => {
    const categoria = await Categoria.findOne( {name} );
    if(categoria){
        throw new Error("Nombre de categoría ya existente")
    }
}

const existeCategoriaPorId = async( id = "" ) => {
    const categoria = await Categoria.findById( id );
    if(!categoria){
        throw new Error("Categoría inexistente")
    }
}

const existeProductoPorId = async( id = "" ) => {
    const producto = await Producto.findById(id);
    if(!producto){
        throw new Error("No se ha encontrado tal producto en la base de datos")
    }
}


module.exports = {
    validarRoles,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorNombre,
    existeCategoriaPorId,
    existeProductoPorId
}