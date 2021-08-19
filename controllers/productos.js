const { response } = require("express")
const { Producto, Categoria } = require("../models")


const obtenerProductoPorId = async (req, res = response) => {
    const uid = req.params.id
    const productoDB = await Producto.findById(uid).populate('usuario categoria')
    if (!productoDB) {
        res.json({
            msg: 'El producto no existe en la base de datos'
        })
    }
    res.json({
        msg: 'Producto obtenido',
        productoDB
    })
}

const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find().skip(Number(desde)).limit(Number(limite))

    ])
    res.json({
        total,
        productos,
        msg: 'Este es la lista de productos'
    })
}

const crearProductos = async (req, res = response) => {
    const { nombre, categoria, caracteristicas, estado, stock, precio } = req.body
    const data = {
        nombre,
        categoria,
        caracteristicas,
        estado,
        stock,
        precio,
        fechaCreacion: Date(),
        usuario: req.usuario.id
    }
    const producto = new Producto(data);
    await producto.save();
    res.json({
        msg: 'Se creo un producto',
        producto
    })
}

const actualiarProductos = async (req, res = response) => {
    const uid = req.params.id
    const { nombre, categoria, caracteristicas, estado, stock, precio } = req.body
    const data = {
        nombre,
        categoria,
        caracteristicas,
        estado,
        stock,
        precio,
        usuario: req.usuario.id,
        fechaModificacion: Date()
    }
    const productoDB = await Producto.findByIdAndUpdate(uid, data, { new: true })
    //   console.log(uid,req.usuario.id,req.usuario._id)
    res.json({
        msg: 'esta es la lista de actualizar productos',
        productoDB
    })
}
const eliminarProductos = async (req, res = response) => {
    const uid = req.params.id
    const data = {
        estado: false,
        fechaModificacion: Date()
    }
    const productoDB = await Producto.findByIdAndUpdate(uid, data, { new: true })
    res.json({
        msg: 'Producto desactivado',
        productoDB
    })
}
module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProductos,
    actualiarProductos,
    eliminarProductos
}