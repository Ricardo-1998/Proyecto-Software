//const mongoose = require('mongoose'); //libreria para el manejo a la conexion de bases de datos
const recordatorioModel = require("../models/imagen"); //modelo publicacioes.
const controller = {}; // objeto que tendra la logica de nuestra web
var fs = require('fs.extra');



controller.insert = function(req,res){
    //Nombre de la imagen
    var extension = req.files.archivo.name;
    if(extension == ""){
        extension = "recordatorio.png";
    }
    //Data que se guardara en la base
    let data = {
        titulo: req.body.titulo,
        imagenExtension: extension,
        usuario: JSON.parse(req.session.user).username,
        galeria: []
    };
    console.log(req.body);
    //Se crea el modelo poniendo como datos la data
    if(typeof req.body.nombre!="string"){
        for(var x =0; x<req.body.nombre.length;x++){
            let cancion={
                nombre:req.body.nombre[x],
                album:req.body.album[x],
                artista: req.body.artista[x]
            }
            data.galeria.push(cancion);
        }
    }else{
        let cancion={
            nombre:req.body.nombre,
            album:req.body.album,
            artista: req.body.artista
        }
        data.galeria.push(cancion);
    }

    var newrecordatorio = recordatorioModel(data);
    //Se guarda
    newrecordatorio.save(function(err){
        if(!err){
            //Se cambia la direccion para guardar la imagen en public/images
            if(req.files.archivo.name != ""){
                fs.copy(req.files.archivo.path, "public/images/"+extension);
            }
            res.redirect('/');
        } else {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        }
    });
};

controller.getAll = function (req, res) {
    // Obtener todos los post de la base datos
    recordatorioModel.find({},function(err,recordatorio){

        if (err) {
            console.log(err);
            res.status(500);
            res.json({code:500, err});  
        } else {
            //console.log(posts);
            recordatorio.reverse();
            res.json({ ok:true , recordatorio});

        }
    });
    // Enviarlos como respuesta en JSON
};

controller.delete = function(req,res){
    // intentar eliminar
    recordatorioModel.findByIdAndRemove(req.params.id, function(err, eleminado){
        if (err) {
            res.status(500);
            res.json({code:500, err});
        } else {
            res.json({ok: true, eleminado});
        }
    });
    // noitifcar resultado 
}

module.exports = controller;