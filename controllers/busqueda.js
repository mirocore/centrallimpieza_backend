const busquedasPermitidas = ["productos"]
const { Producto } = require("../models");

const busqueda = async( req, res ) => {

    const { coleccion, termino } = req.params;

    if( busquedasPermitidas.includes(coleccion) ){
        
        try {
            const regex = new RegExp(termino, "i")
            
            const productos = await Producto.find({
                $or: [{name:regex}],
                $and: [{state: true}]
            }).populate("category", "name").populate("user", "name"); 

            return res.json({
                ok:true,
                msg: `Resultados de la búsqueda: ${termino}`,
                result: (productos) ? productos : []
            })

        } catch (error) {
            return res.json({
                ok:false,
                msg: "Error al realizar búsqueda"
            })
        }
    }else{
        return res.json({
            ok:false,
            msg: "Busqueda no permitida"
        })
    }

}

module.exports = {
    busqueda
}