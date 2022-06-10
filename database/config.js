const mongoose = require("mongoose");

const dbConnection = async() =>{
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useunifiedTopology:true,
            })
            
        console.log("Base de datos online")
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un error en la conexión a base de datos");
    }
}

module.exports = {dbConnection}