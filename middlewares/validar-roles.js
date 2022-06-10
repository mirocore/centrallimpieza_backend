

const esAdmin = ( req, res, next ) => {

    // Verifico primero que se haya validado el token
    if(!req.usuario){
        return res.status(500).json({
            ok: false,
            msg: "No se puede validar el rol antes de validar el token"
        })
    }

    // Obtengo los datos
    const { role, name } = req.usuario;

    if( role !== "ADMIN_ROLE" ){
        return res.status(401).json({
            ok: false,
            msg: `El usuario ${name} no posee los permisos para realizar la siguiente acción.`
        })
    }

    next();

}

const tieneRole = ( ...roles ) => {

    return (req, res, next) => {

        // Verifico primero que se haya validado el token
        if(!req.usuario){
            return res.status(500).json({
                ok: false,
                msg: "No se puede validar el rol antes de validar el token"
            })
        }

        // Verifico que el rol del usuario autenticado coincida con el de la lista
        const { role, name } = req.usuario;

        if( !roles.includes(role) ){
            return res.status(401).json({
                ok: false,
                msg: `El usuario ${name} no posee los permisos para realizar la siguiente acción.`
            })
        }

        next();
    }

}

module.exports = {esAdmin, tieneRole}