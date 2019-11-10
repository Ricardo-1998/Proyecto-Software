const mongoose = require('mongoose'); //Para manipular conexión y el manejo de la base de datos

const { Schema } = mongoose; //Objeto Schema para realizar diferentes operaciones
const PublicacionesSchema = new Schema({
    //atributos con sus validaciones
    titulo: {type:String},
    texto: {type:String},
    autor: {type: String}
});


let publicacion = mongoose.model('publicaciones', PublicacionesSchema);

module.exports = publicacion;