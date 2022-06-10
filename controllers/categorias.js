const { Categoria } = require("../models");


const categoriasStore = async( req, res ) => {

    const { name, medida } = req.body;
    const user = req.usuario.id;
    
    try {
        const categoria = await new Categoria( {name, medida, user} );

        categoria.save();

        res.status(500).json(
            {
                ok: true,
                msg: `Categoría ${categoria.name} creada`,
                categoria
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg: "Error al crear la categoría"
            }
        )
    }

    

}

const categoriasIndex = async( req, res ) => {
        /*const {limite = 9, desde = 9} = req.query;
        const query = { estado : true }
        */

        const query = { state : true }
        try {
        
        /*const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).skip( Number(desde) ).limit(Number(limite)).sort({_id:-1})
        ])*/
            
        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).sort({_id:-1})
        ])    

        res.json({
            ok: true,
            msg: "Listar Categorias",
            total,
            categorias
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "Error al querer listar las categorias"
        })
    }
}




const categoriasUpdate = async( req, res ) => {

    // ID RECIBIDO
    const { id } = req.params;

    try {
        
        const categoria = await Categoria.findByIdAndUpdate(id, req.body, {new: true});

        res.json({
            ok: true,
            msg: "Categoria actualizada",
            categoria
        })

    } catch (error) {
        res.json(
            {
                ok: false,
                msg: "Error al editar"
            }
        )
    }
}

const categoriasDestroy = async(req, res) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findByIdAndRemove(id);
        res.json({
            ok:true,
            msg: `Categoria ${categoria.name} eliminada`,
            categoria
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: "Error al borrar categoría"
        })
    }

}

const categoriasShow = async(req, res) => {

    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        res.json({
            ok: true,
            msg: "Mostrar categoría",
            categoria
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: "Error buscar categoría"
        })
    }

}


module.exports = {
    categoriasIndex,
    categoriasStore,
    categoriasUpdate,
    categoriasDestroy,
    categoriasShow
}