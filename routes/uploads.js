const { Router } = require("express");
const { check } = require("express-validator");
const { subirImagenCloudinary } = require("../controllers/uploads");
const { existeProductoPorId } = require("../helpers/dbValidators");
const { validarCampos, extensionesPermitidas } = require("../middlewares");
const { validarArchivo } = require("../middlewares/validar-uploads");



const router = Router();

router.put("/productos/:id", 
    [
        validarArchivo,
        check("id", "El id no es un MongoId").isMongoId(),
        check("id").custom(existeProductoPorId),
        extensionesPermitidas("jpg", "jpeg", "png", "gif"),
        validarCampos
    ]
,subirImagenCloudinary);

module.exports = router;