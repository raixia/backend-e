const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const eQuery = { estado: true };

    /* const usuarios = await Usuario.find(eQuery)
            .skip(Number(desde))
            .limit(Number(limite))
        const total = await Usuario.countDocuments(eQuery)
    */
    const [total, usuarios ] = await Promise.all([
        Usuario.countDocuments(eQuery),
        Usuario.find(eQuery)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        msg: 'esto es el usuariosGet',
        total, usuarios

    })
}
const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encripta correo
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();
    res.json({
        msg: 'esto es elusuariosPost',
        usuario

    })
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'esto es el usuariosPut',
        usuario
    })
}
const usuariosDelete = async (req, res = response) => {
    const {id}=req.params;
 //   const usuario= await Usuario.findByIdAndDelete(id)
    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        msg: 'esto es el usuariosDelete',
        id

    })
}
const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'esto es el usuariosPatch'
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}