const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login, googleSignin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
] ,login);

router.post('/google',[
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
] ,googleSignin);

module.exports = router;