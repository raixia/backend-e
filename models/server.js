const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;
        this.paths={
            
            auth:'/api/auth',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios:'/api/usuarios',
            buscar:'/api/buscar'
        }
       
        this.conectaDB();
        this.middlewares();
        this.routes();//primero tiene que estar importado las rutas adyacentes arriba
    }
    async conectaDB(){
        await dbConnection();
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto ${this.port}`))
    }

}
module.exports = {
    Server
}