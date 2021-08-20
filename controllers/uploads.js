const { response } = require('express');
const cargarArchivos = (req, res = response) => {

    const paths= req.files
    
    for (let index = 0; index < paths.length; index++) {
        const element = paths[index].path;
        console.log(element)
        
    }
    res.json({ 
        msg:'path de la imagen',
        picture: req.files
     });

}
module.exports = {
    cargarArchivos
}