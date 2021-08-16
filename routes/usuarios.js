const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const router = Router();
router.get('/', usuariosGet);
router.post('/', [
   check('correo', 'el correo no es valido').isEmail(),
   check('password', 'el pasword es incorrecto mas de 6 letras').isLength({ min: 6 }),
   check('nombre', 'el nombre es obligatorio').not().isEmpty(),
   check('rol').custom((rol) => esRoleValido(rol)),//esRoleValido tambien solo puede referenciar asi
   check('correo').custom((correo) => emailExiste(correo)),
   // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   validarCampos
], usuariosPost);
router.put('/:id', [
   check('id', 'No es un ID valido').isMongoId(),
   check('id').custom((id) => existeUsuarioPorId(id)),
   check('rol').custom((rol) => esRoleValido(rol)),
   validarCampos
], usuariosPut);
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
   check('id', 'No es un ID valido').isMongoId(),
   check('id').custom((id) => existeUsuarioPorId(id)),
   validarCampos
], usuariosDelete);
router.patch('/', usuariosPatch);
module.exports = router