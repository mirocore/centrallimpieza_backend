const uuid = require('uuid').v4;
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const Producto = require("../models/producto");

const subirImagenCloudinary = async( req, res ) => {

    
    try {
     
    const { id } = req.params;
    const producto = await Producto.findById(id);
    let nombreTemp;

    // NOMBRE ARCHIVO
    if(producto.image){
        const nombreArr = producto.image.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        nombreTemp = public_id;
    }else{
        nombreTemp = uuid();
    }

    // SUBIR A CLOUDINARY
    const { tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath , {
        public_id: `centrallimpieza/productos/${nombreTemp}`,
        overwrite: true,
        transformation: {width: 700, crop: "scale"}
    },
    function(error, result) {console.log(result, error)});

    // GUARDAR NOMBRE EN LA BASE DE DATOS
    producto.image = secure_url;
    producto.save();

     res.json({
        msg: "Imagen subida a Cloudinary",
        secure_url,
        producto
    }) 

    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: "Error al subir imagen"
        })
    }

    
}

module.exports = {
    subirImagenCloudinary
}