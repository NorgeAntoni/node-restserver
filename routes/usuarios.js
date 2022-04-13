const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const validarJWT = require('../middlewares/validar-jwt');
const { validarCampos, esAdminRole, tieneRole } = require('../middlewares')

const {esRolValido, emailExiste, existeUsuarioPorID} = require('../helpers/db-validator')

const { usGet, usPut, usPost, usDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
] ,usPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('rol').custom(esRolValido),
    validarCampos
], usPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usDelete);


module.exports = router;