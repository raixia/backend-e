const { response } = require("express");
const Categoria = require("../models/categoria");
const crearCategorias= async(req,res=response)=>{

    const nombre=req.body.nombre;
    const categoriaDB=await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${ categoriaDB.nombre }, ya existe `
        })
    }
    const data={
        nombre,
        usuario:req.usuario._id//del jsonwebtoker
    }
    console.log(req.usuario)
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria)
}
const ObtenerCategorias=()=>{
 //tarea de categorias   
}
module.exports={
    crearCategorias
}