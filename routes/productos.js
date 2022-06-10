const { Router } = require("express");
const { check } = require("express-validator");

const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/dbValidators");

const router = Router();

const {
    productosStore,
    productosIndex,
    productosShow,
    productosUpdate,
    productosDestroy,
    productosPorCategoria
} = require("../controllers/productos");
const { validarCampos, validarJWT, esAdmin } = require("../middlewares");


router.post("/", [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("price", "El precio es obligatorio").not().isEmpty(),
    check( "medida", "La unidad de medida es obligatoria" ).not().isEmpty(),
    check("category", "La categoría es obligatoria").not().isEmpty(),
    check("category", "La categoría debe ser un MongoId").isMongoId(),
    validarCampos
] ,productosStore);



router.get("/", productosIndex);



router.get("/:id", [
    check("id", "El id no es un mongoId").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
] ,productosShow);

router.get("/categoria/:id", [
    check("id", "El id no es un mongoId").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
] ,productosPorCategoria);



router.put("/:id", [
    validarJWT,
    esAdmin,
    check("id", "El id no es un mongoId").isMongoId(),
    check("id").custom(existeProductoPorId),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check( "medida", "La unidad de medida es obligatoria" ).not().isEmpty(),
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("category", "La categoría es obligatoria").not().isEmpty(),
    check("category", "La categoría debe ser un MongoId").isMongoId(),
    validarCampos,
] ,productosUpdate);



router.delete("/:id", [
    validarJWT,
    esAdmin,
    check("id", "El id no es un mongoId").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
] ,productosDestroy);

module.exports = router;