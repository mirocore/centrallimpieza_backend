const { Router } = require("express");
const { check } = require("express-validator");

const {
    categoriasIndex,
    categoriasStore,
    categoriasUpdate,
    categoriasDestroy,
    categoriasShow
 } = require("../controllers/categorias");
const { existeCategoriaPorNombre, existeCategoriaPorId } = require("../helpers/dbValidators");
const { validarJWT, validarCampos, esAdmin } = require("../middlewares");

const router = Router();

router.post("/", [
    validarJWT,
    check( "name", "El nombre es obligatorio" ).not().isEmpty(),
    check("name").custom( existeCategoriaPorNombre ),
    validarCampos
] ,categoriasStore);

router.get("/", categoriasIndex);

router.get("/:id", [
    check("id").custom(existeCategoriaPorId),
    check("id", "El id no es un MongoId").isMongoId(),
    validarCampos
] , categoriasShow);

router.put("/:id", [
    validarJWT,
    esAdmin,
    check("id").custom(existeCategoriaPorId),
    check("id", "El id no es un MongoId").isMongoId(),
    check( "name", "El nombre es obligatorio" ).not().isEmpty(),
    validarCampos
] ,categoriasUpdate);

router.delete("/:id", [
    validarJWT,
    esAdmin,
    check("id").custom(existeCategoriaPorId),
    check("id", "El id no es un MongoId").isMongoId(),
    validarCampos,
] ,categoriasDestroy);

module.exports = router;