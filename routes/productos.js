const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { crearProductos, obtenerProductoPorId, obtenerProductos, actualiarProductos, eliminarProductos } = require('../controllers/productos');
const { exsiteCategoriaxnombre, ExisteProductoxnombre, existeProductoPorid } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:id', [
    validarJWT,
    check('id', 'no es un id de mongo').isMongoId(),
    validarCampos

], obtenerProductoPorId);

router.get('/', [
    validarJWT,
    validarCampos

], obtenerProductos);


router.post('/', [
    validarJWT,
    check('nombre').custom(ExisteProductoxnombre),
    check('categoria', 'no es un id de mongo').isMongoId(),
    check('categoria').custom((categoria) => exsiteCategoriaxnombre(categoria)),

    validarCampos
], crearProductos)

router.put('/:id', [

    validarJWT,
    check('id', 'no es un id de mongo').isMongoId(),
    check('nombre').custom(ExisteProductoxnombre),
    check('categoria').custom((categoria) => exsiteCategoriaxnombre(categoria)),
    validarCampos

], actualiarProductos);

router.delete('/:id', [
    validarJWT,
    check('id', 'no es un id de mongo').isMongoId(),
    validarCampos
], eliminarProductos);


module.exports = router;