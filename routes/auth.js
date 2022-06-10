const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");


const { login, revalidarToken } = require("../controllers/auth");
const {validarJWT} = require("../middlewares");


const router = Router();

router.post("/login", [
    check("email", "Email o contraseña incorrecta").isEmail(),
    check("password", "Email o contraseña incorrecta").not().isEmpty(),
    validarCampos
] ,login);

router.get("/renew", validarJWT , revalidarToken);

module.exports = router;