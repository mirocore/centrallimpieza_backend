const { model, Schema } = require("mongoose");

const UserSchema = Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required: [true, "El email es obligatorio"],
        unique:true
    },
    password:{
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state:{
        type: Boolean,
        default: true
    }
});

// NO QUIERO QUE DEVUELVA EL PASSWORD Y LA VERSION
UserSchema.methods.toJSON = function(){
    const{__v, password,_id, ...user} = this.toObject();
    user.uid = _id;
    return user;
    }

module.exports = model( "User", UserSchema );