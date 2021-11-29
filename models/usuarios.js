
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let usuarioSchema = Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dni: { type: Number, required: true },
    sex: { type: String, required: true },
    cell_phone: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'inactive', 'pending']
    },
    password: { type: String },
});

module.exports = mongoose.model('usuarios', usuarioSchema);