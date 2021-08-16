const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { crearCategorias } = require('../controllers/categorias');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const router = Router();

router.get('/id')
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos

],crearCategorias)

module.exports=router;