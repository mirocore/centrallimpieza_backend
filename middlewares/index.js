const  validarJWT  = require("./validar-jwt");
const  validarCampos  = require("./validar-campos");
const  validarRoles = require("./validar-roles");
const validarUploads = require("./validar-uploads");

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRoles,
    ...validarUploads
}