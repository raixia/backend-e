const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { crearCategorias, ObtenerCategoriaById, ObtenerCategorias, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.get('/:id', [
    validarJWT,
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom((id) => existeCategoriaPorId(id)),
    validarCampos

], ObtenerCategoriaById)
router.get('/', [
    validarJWT,
 


], ObtenerCategorias)
router.post('/', [
    validarJWT,
   
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos

], crearCategorias)

router.put('/:id', [
    validarJWT,
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom((id) => existeCategoriaPorId(id)),
    validarCampos
], actualizarCategoria)

router.delete('/:id', [
    validarJWT,
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom((id) => existeCategoriaPorId(id)),
    validarCampos
], eliminarCategoria)
module.exports = router;