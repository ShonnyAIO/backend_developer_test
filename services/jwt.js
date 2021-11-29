const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'registro_usuario';

exports.createToken = (user) => {
    let payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        dni: user.dni,
        sex: user.sex,
        cell_phone: user.cell_phone,
        status: user.status,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix
    };

    return jwt.encode(payload, secret);

};//fin de la funcion