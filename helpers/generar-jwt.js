const jwt = require('jsonwebtoken')
const generarJWT = (uid='') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {//probar como valiable de entorno con hekoru
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('no se pudo generar token')
            } else {
                resolve(token)
            }
        })
    }
    )
}
module.exports = {
    generarJWT
}