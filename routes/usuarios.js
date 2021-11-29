const { application } = require('express');
const express = require('express');
const usersController = require('../controllers/usuarios');
const md_auth = require('../middleware/authenticate');
const app = express.Router();

app.post('/login', usersController.login);
app.post('/register', usersController.saveUser);
app.get('/usuarios', md_auth.ensureAuth, usersController.getAll);
app.get('/usuarios/:id', md_auth.ensureAuth, usersController.getUser);
app.post('/usuarios-update/:id', md_auth.ensureAuth, usersController.updateUser);
app.get('/usuarios-eliminar/:id', md_auth.ensureAuth, usersController.deleteUser);
app.get('/usuarios-detalles', md_auth.ensureAuth, usersController.getUsersAPI);

module.exports = app;