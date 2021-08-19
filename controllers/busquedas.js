const { response } = require("express")
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')
const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]


//hacer esta busqueda en una sola funcion y mantenibñe
const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino) //retorna un id de mongo

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    const regExp = new RegExp(termino, 'i');

    //  const usuarios = await Usuario.countDocuments({ tambien sirve para las funciones solo mandarles parametros
    const usuarios = await Usuario.find({
        $or: [{ nombre: regExp }, { correo: regExp }],
        // $or: [{ nombre: regExp,estado:true },{correo:regExp,estado:true}], los 2 son validos
        $and: [{ estado: true }]


    });
    res.json({
        results: usuarios
    })


}

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino) //retorna un id de mongo

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    const regExp = new RegExp(termino, 'i');

    //  const usuarios = await Usuario.countDocuments({ tambien sirve para las funciones solo mandarles parametros
    const categorias = await Categoria.find({ nombre: regExp, estado: true });
    res.json({
        results: categorias
    })


}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino) //retorna un id de mongo

    if (esMongoID) {
        const producto= await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }
    const regExp = new RegExp(termino, 'i');

    //  const usuarios = await Usuario.countDocuments({ tambien sirve para las funciones solo mandarles parametros
    const productos = await Producto.find({ nombre: regExp, estado: true }).populate('categoria','nombre');;
    res.json({
        results: productos
    })


}



const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categoria':
            buscarCategoria(termino, res)
            break;
        case 'productos':
            buscarProductos(termino,res)
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }

}
module.exports = {
    buscar
}