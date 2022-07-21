const { Categoria, Role, Usuario, Producto } = require('../models');

const esRolValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async(correo) =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorID = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

/** 
 * Categorias
 */
const existeCategoriaPorId = async(id) =>{
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`);
    }
}

/**
 * Productos
 */
 const existeProductoPorId = async(id) =>{
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorId,
    existeProductoPorId,
};