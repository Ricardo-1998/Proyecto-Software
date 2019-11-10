const mongoose = require('mongoose'); //Para manipular conexión y el manejo de la base de datos

const { Schema } = mongoose; //Objeto Schema para realizar diferentes operaciones
const imagenSchema = new Schema({
    //atributos con sus validaciones
    titulo:String,
    imagenExtension:{type:String, required: true},
    usuario: String,
    galeria: {
        type: Array,
        canciones: {
            type: Object,
            nombre: String,
            album: String,
            artista: String
        }
    }
});


let imagen = mongoose.model('recordatorios', imagenSchema);

module.exports = imagen;