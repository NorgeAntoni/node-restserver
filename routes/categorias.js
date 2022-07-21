const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaByID, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias-publico
router.get( '/', obtenerCategorias);

//Obtener una categorias x id-publico
router.get( '/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoriaByID);

//Crear categoria - privado - cualquier persona con un token valido
router.post( '/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria );

//Borrar categoria- Admin
router.delete( '/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;