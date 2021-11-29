const bcrypt = require('bcrypt');
const Users = require('../models/usuarios');
const jwt = require('../services/jwt');

/* Punto 1 */
function saveUser(req, res) {
    let params = req.body;
    let users = new Users();
    if (params.first_name && params.last_name && params.dni && params.sex && params.cell_phone && params.status && params.password) {
        users.first_name = params.first_name;
        users.last_name = params.last_name;
        users.dni = params.dni;
        users.sex = params.sex;
        users.cell_phone = params.cell_phone;
        users.status = params.status;
        users.password = params.password;
        Users.find({ dni: users.dni }).exec((err, data) => {
            if (err) return res.status(500).send({ message: 'Error en la petición de usuarios!!' });
            if (data && data.length >= 1) {
                return res.status(200).send({ message: 'Este usuario con el DNI ya existe!!' });
            } else {
                bcrypt.hash(params.password, 10, (err, hash) => {
                    users.password = hash;
                    console.log(users);
                    users.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario!!' });
                        if (userStored) {
                            res.status(200).send({ user: userStored });
                        } else {
                            res.status(404).send({ message: 'No se han registrado el usuario!!' });
                        }//end-else
                    });
                });
            }
        });
    } else {
        res.status(400).send({ message: "Lo sentimos, falta informacion por completar" });
    }
}

/* Punto 2 */
function getAll(req, res) {
    Users.find({}, (err, data) => {
        if (err) return res.status(500).send({
            message: 'Error en la petición'
        });
        if (!data) {
            return res.status(404).send({
                message: 'No hay usuarios'
            });
        } else {
            return res.status(200).send({
                usuario: data
            });
        }
    });
}

/* Punto 3 */
function getUser(req, res) {
    let userId = req.params.id;
    Users.findById(userId, (err, data) => {
        if (err) return res.status(500).send({
            message: 'Error en la petición'
        });
        if (!data) {
            return res.status(404).send({
                message: 'El usuario no existe'
            });
        } else {
            return res.status(200).send({
                usuario: data
            });
        }
    });
}//end-function

/* Punto 4 */
function updateUser(req, res) {
    let userId = req.params.id;
    let update = req.body;

    Users.findOne({ _id: userId }, (err, data) => {
        if (err) return res.status(500).send({ message: 'Hay un error en la info' });
        if (data && data._id != userId) {
            return res.status(500).send({ message: 'Los datos ya estan en uso' });
        }
        Users.findByIdAndUpdate(userId, update, { new: true }, (err, dataUpdate) => {
            if (err) return res.status(500).send({ message: 'Error en la peticion' });
            if (!dataUpdate) return res.status(404).send({ message: 'No se han podido actualizar el usuario!!' });
            return res.status(200).send({ user: dataUpdate });
        });
    });
}//end-function

/* Punto 5 */
function deleteUser(req, res) {
    let userId = req.params.id;
    Users.findOneAndRemove({ _id: userId }, (err, data) => {
        if (err) return res.status(500).send({ message: 'Hay un error en la respuesta' });
        if (data) {
            return res.status(200).send({ message: 'Usuario eliminado exitosamente' });
        }
    });
}//end-function


/* Punto 6 */
function login(req, res) {
    let params = req.body;
    let login = { usuario: params.dni, password: params.password };

    Users.findOne({ dni: login.usuario }, (err, data) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });
        if (data) {
            bcrypt.compare(login.password, data.password, (err, check) => {
                if (check) {
                    return res.status(200).send({
                        token: jwt.createToken(data)
                    });
                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
                }
            });
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar!!' });
        }
    });
}

function getUsersAPI(req, res) {
    Users.aggregate([{ $match: { status: 'pending', sex: 'masculino' } }, { $sort: { first_name: -1 } }], (err, data) => {
        if (err) return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        if (!data) {
            return res.status(404).send({ message: 'No hay usuarios disponibles con ese criterio' });
        } else {
            return res.status(200).send({ data });
        }
    });
}


module.exports = { login, saveUser, getUser, getAll, updateUser, deleteUser, getUsersAPI }