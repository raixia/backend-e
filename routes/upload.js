const { Router } = require('express');
const { cargarArchivos } = require('../controllers/uploads');
const { upload } = require('../middlewares/upload');


const router = Router();
router.post('/', [
    upload
], cargarArchivos);


module.exports = router;