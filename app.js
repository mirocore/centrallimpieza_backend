const Server = require("./models/server");
require('dotenv').config();

// Creo la instancia del servidor
const server = new Server();

// LLamo al server
server.listen();
