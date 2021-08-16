const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const usuario=await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido --usuario no existe'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido -usuario con estado falso!!',
                usuario,
            })
        }

        req.usuario = usuario
        next();//el operador next solo debe ser llamado una ves si se hace en otra parte quiza se establesca el next antes de toda la logica
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'token no valido'
        })
    }

}
module.exports = {
    validarJWT
}