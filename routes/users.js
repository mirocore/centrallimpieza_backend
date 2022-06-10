const { Router } = require("express");
const { 
    usersIndex,
    usersStore,
    usersUpdate,
    usersPatch,
    usersDestroy, } = require("../controllers/users");

const {check} = require("express-validator");
const {validarRoles, existeEmail, existeUsuarioPorId} = require("../helpers/dbValidators");


const {
    validarJWT,
    validarCampos,
    tieneRole,
    esAdmin
} = require("../middlewares");


const router = Router();

router.get("/", usersIndex);

router.post("/", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email es inválido").isEmail(),
    check("email").custom(existeEmail),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({min:6}),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("role").custom(validarRoles),
    validarCampos
] ,usersStore);

router.put("/:id",[
    check("id", "El id no es válido").isMongoId(),
    check("id", "Usuario no existente").custom( existeUsuarioPorId ),
    check("role").custom(validarRoles),
    validarCampos
] ,usersUpdate);

router.patch("/:id", usersPatch);

router.delete("/:id",[
    validarJWT,
    //esAdmin,
    tieneRole("ADMIN_ROLE"),
    check("id", "El id no es válido").isMongoId(),
    check("id", "Usuario no existente").custom( existeUsuarioPorId ),
    validarCampos
] ,usersDestroy);





module.exports = router;