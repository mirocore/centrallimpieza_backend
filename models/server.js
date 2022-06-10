const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

const fileUpload = require("express-fileupload")

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth :      "/api/auth",
            busqueda :  "/api/busqueda",
            categoria:  "/api/categorias",
            producto:  "/api/productos",
            user:       "/api/users",
            upload: "/api/uploads"
        }

        // Conexión a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del Body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static("public") );

        // File Uploads
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.busqueda, require("../routes/busqueda"));
        this.app.use( this.paths.categoria, require("../routes/categorias") );
        this.app.use( this.paths.producto, require("../routes/productos") );
        this.app.use( this.paths.user, require("../routes/users") );
        this.app.use( this.paths.upload, require("../routes/uploads") );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        } )
    }

}

module.exports = Server;