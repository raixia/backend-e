const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const router = Router();
router.post('/login',[

    check('correo','el correo no es valido').isEmail(),
  //  check('correo').custom((correo)=>emailExiste(correo)),
   // check('password','el pasword es incorrecto mas de 6 letras').isLength({min:6}),
    check('password','el pasword es obligatorio').not().isEmpty(),
    validarCampos
],login);

module.exports=router;