const { response } = require("express");
const Categoria = require("../models/categoria");
const crearCategorias = async (req, res = response) => {

    const nombre = req.body.nombre;
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe `
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id//del jsonwebtoker
    }
    console.log(req.usuario)
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria)
}
const ObtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const eQuery = { estado: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find(eQuery).populate('usuario')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        categorias
    })

    //tarea de categorias   
}
const ObtenerCategoriaById = async (req, res = response) => {
    const uid = req.params.id
    const categoria = await Categoria.findById(uid).populate('usuario')
    res.json({
        msg: 'categoria encontrada',
        categoria
    })
}
const actualizarCategoria = async (req, res = response) => {
    const uid = req.params.id
    const { nombre } = req.body
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria.findByIdAndUpdate(uid, data, { new: true });
    console.log(uid)
    res.json({
        msg: 'categoria actualizada',
        categoria

    })
}
const eliminarCategoria = async (req, res = response) => {
    const uid = req.params.id
    const categoria = await Categoria.findOneAndUpdate(uid, { estado: false })
    if (!categoria) {
        res.status(401).json({
            msg: 'no existe producto para desactivar'
        })
    }
    res.json({
        msg: 'Categoria eliminada por el estado-falso',
        uid
    })
}


module.exports = {
    crearCategorias,
    ObtenerCategorias,
    ObtenerCategoriaById,
    actualizarCategoria,
    eliminarCategoria
}