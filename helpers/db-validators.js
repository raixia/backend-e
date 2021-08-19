const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }

}
const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`el correo ${correo} ya esta registrado`)
    }
}
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`el ${id} no existe`);
    }
}
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`la categoria con el ${id} no existe`)
    }
}
const exsiteCategoriaxnombre = async (categoria) => {
    const existeCategoria = await Categoria.findById(categoria)
    if (!existeCategoria) {
        throw new Error(`la categoria con el ${id} no existe`)
    }
}
const ExisteProductoxnombre = async (nombre) => {
    const existeProducto = await Producto.findOne({ nombre })
    if (existeProducto) {
        throw new Error(`este nombre de producto ya existe`)
    }

}
const existeProductoPorid=async(id)=>{
    const existeProductoId=await Producto.findById(id);
    if(!existeProductoId){
        throw new Error('este producto no se encuentra en la base de datos')
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    exsiteCategoriaxnombre,
    ExisteProductoxnombre,
    existeProductoPorid
}