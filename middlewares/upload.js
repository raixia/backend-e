
const { v4: uuidv4 } = require('uuid');

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');
cloudinary.config({
    cloud_name: "dbtszh2kw",
    api_key: "349151553912994",
    api_secret: "PWdOLaK2ba5pZ8sEY55TOJXkyvg",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.' + file.mimetype.split('/')[1])
    },
})*/
const upload = multer({ storage: storage }).array('imagen')
module.exports = {
    upload
}