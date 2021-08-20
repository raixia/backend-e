const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique:true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    descripcion:{
        type:String,
        default:''
    },
    stock:{
        type:Number,
        default:0,
        required:true,
    },
    precio:{
        type:Number,
        default:0.0,
        required:true
    },
    imagenes:{
        type:Array,
        default:[]
    },
    caracteristicas:{
        type:String,
        default:''
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    fechaCreacion:{
        type:String,
        required:true
    },
    fechaModificacion:{
        type:String,
        default:''
    }
})
module.exports = model('Producto',ProductoSchema);