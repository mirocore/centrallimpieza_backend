const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
    name:{
        type: String,
        require: [true, "El nombre es obligatorio"]
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, "El estado es obligatorio"]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = model("Categoria", CategoriaSchema);