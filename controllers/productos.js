const Producto = require("../models/producto");
const uuid = require('uuid').v4;
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const extensionesPermitidas = ["jpg", "png", "gif", "jpeg"];

const productosStore = async(req, res) =>{

    // Obtengo los datos del usuario
    const { id } = req.usuario;
    const nuevoProducto = {...req.body, user: id};
    try {

/*
        // Si mandó foto la guardo
        let nombreTemp
        if( req.files){

            // VALIDAR EXTENSION
                const {archivo} = req.files;
                const nombreCortado = archivo.name.split(".");
                const extension = nombreCortado[ nombreCortado.length - 1]
                
                if( !extensionesPermitidas.includes(extension) ){
                    return res.status(400).json({
                        ok:false,
                        msg: "Formato de archivo incorrecto",
                    })
                }

            // GENERO EL NOMBRE DEL ARCHIVO    
             nombreTemp= uuid();

            const { tempFilePath } = req.files.archivo;
            const {secure_url} = await cloudinary.uploader.upload( tempFilePath , {
                public_id: `centrallimpieza/productos/${nombreTemp}`,
                overwrite: true,
                transformation: {width: 700, crop: "scale"}
            },
            function(error, result) {console.log(result, error)});

            nuevoProducto.image = secure_url;
        }*/


        const producto = await new Producto(nuevoProducto);
        producto.save();

        res.json({
            ok:true,
            msg: "Producto Creado",
            producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error al crear producto"
        })
    }
    
}

const productosIndex = async(req, res) =>{
    
    try {
        
        const productos = await Producto.find().populate("category", ["name", "medida"]);

        res.json({
            ok:true,
            msg: "Lista de productos",
            productos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error al listar productos"
        })
    }

}

const productosShow = async(req, res) =>{
    
    const {id} = req.params;

    try {
        
        const producto = await Producto.findById(id).populate("category", ["name", "medida"]).populate("user", "name");

        res.json({
            ok: true,
            msg: "Producto encontrado",
            producto
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al intentar ver un producto"
        })
    }
}

const productosUpdate = async(req, res) =>{
    
    const { id } = req.params;

    try {
        
        const producto = await Producto.findByIdAndUpdate(id, req.body, {new: true})

        res.json({
            ok: true,
            msg: "Producto editado",
            producto
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al editar producto"
        })
    }

}

const productosDestroy = async(req, res) =>{
    
    const { id } = req.params;

    try {
        
        const producto = await Producto.findByIdAndRemove(id);

        res.json({
            ok: true,
            msg: `El producto ${producto.name} ha sido eliminado satisfactoriamente`,
            producto
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar producto"
        })
    }

}




const productosPorCategoria = async(req, res) => {
    
    const {id} = req.params;
    
    try {
        
        const productos = await Producto.find({category: id});

        res.json({
            ok: true,
            msg: `Productos de la categoria:`,
            results: (productos) ? productos : []
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al borrar producto"
        })       
    }
}


module.exports = {
    productosStore,
    productosIndex,
    productosShow,
    productosUpdate,
    productosDestroy,
    productosPorCategoria
}