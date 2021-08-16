const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs=require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req,res=response)=>{

    const {correo,password}=req.body
    try { 
        const usuario=await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                smg:'Usuario/Password no son correctos'
            })
        }
        if(!usuario.estado){
            return res.status(400).json({
                smg:'Usuario/Password no son correctos --estado:false'
            })
        }
        const validPassword=bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos -password'
            })
        }

        const token =await generarJWT(usuario.id);

        res.json({
            msg:'estas en el login ',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'hable con el administrador'
        })
    }
  

}
module.exports={
    login
}