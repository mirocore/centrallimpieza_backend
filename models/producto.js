const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        default: 0
    },
    cantidad: {
        type: Number,
        required: [true, "La cantidad es obligatoria"],
        default: 0
    },
    medida: {
        type: String,
        required: [true, "La unidad de medida es obligatoria"],
        enum: ["LITROS", "UNIDADES", "KILOS"]
    },
    stock: {
        type: Boolean,
        default: true
    },
    state:{
        type: Boolean,
        default: true
    },
    image:{
        type: String,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: [true, "La categoría es obligatoria"],
        default: "Sin categoría"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

ProductoSchema.methods.toJSON = function(){
    const {__v, ...product} = this.toObject();
    return product;
}

module.exports = model("Producto", ProductoSchema)