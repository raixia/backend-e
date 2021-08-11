const { response } = require('express')
const usuariosGet = (req, res = response) => {


    res.json({
        msg: 'esto es el usuariosGet',

    })
}
const usuariosPost = (req, res = response) => {
   const { nombre, area } = req.body
   const param=req.params
    res.json({
        msg: 'esto es elusuariosPost',
        nombre, area,param

    })
}
const usuariosPut = (req, res = response) => {

    res.json({
        msg: 'esto es el usuariosPut'
    })
}
const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'esto es el usuariosDelete'
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