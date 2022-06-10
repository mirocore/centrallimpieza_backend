const { Router } = require("express");
const { busqueda } = require("../controllers/busqueda");

const router = Router();

router.get("/:coleccion/:termino", busqueda);

module.exports = router;