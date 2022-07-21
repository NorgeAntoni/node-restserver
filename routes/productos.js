const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProductoPorID, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validator');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias-publico
router.get( '/', obtenerProductos);

//Obtener una categorias x id-publico
router.get( '/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProductoPorID);

//Crear categoria - privado - cualquier persona con un token valido
router.post( '/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

//Actualizar - privado
router.put( '/:id', [
    validarJWT,
    //check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto );

//Borrar categoria- Admin
router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;