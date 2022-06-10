

const validarArchivo = ( req, res, next ) => {

    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo){
        return res.status(400).json({
            ok:false,
            msg: "No se ha enviado imagen"
        })
    }

    

    next();
}

const extensionesPermitidas = (...extensionesPermitidas) => {


    return (req, res, next) => {

        // Obtengo la extension del archivo
        const {archivo} = req.files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[ nombreCortado.length - 1]
        
        if( !extensionesPermitidas.includes(extension) ){
            return res.status(400).json({
                ok:false,
                msg: "Formato de archivo incorrecto",
            })
        }

        // Almaceno la extension del archivo en el request
        req.files.archivo.extension = extension;

        next();
    }
}

module.exports = {
    validarArchivo,
    extensionesPermitidas
}