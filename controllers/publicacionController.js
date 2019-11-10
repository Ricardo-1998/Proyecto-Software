//const mongoose = require('mongoose'); //libreria para el manejo a la conexion de bases de datos
const publicacionModel = require("../models/publicaciones"); //modelo publicacioes.
const controller = {}; // objeto que tendra la logica de nuestra web


controller.insert = function(req,res){
    let publicacionNew = new publicacionModel({
        titulo: req.body.titulo,
        texto: req.body.texto,
        autor: JSON.parse(req.session.user).username
    });

    //console.log(publicacionNew);

    publicacionNew.save(function(err,insertado){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.redirect('/');
        }
        
    });
};

controller.getAll = function (req, res) {
    
    // Obtener todos los post de la base datos
    publicacionModel.find({},function(err, posts){
        if (err) {
            //console.log("dese dijo algo bueno por primera ves, que mal que dio error");
            res.status(500);
            res.json({code:500, err});
            
        } else {
            //console.log(posts);
            posts.reverse();
            res.json({ ok:true , posts});
        }
    });
    // Enviarlos como respuesta en JSON
};


controller.delete = function(req,res){
    // intentar eliminar
    publicacionModel.findByIdAndRemove(req.params.id, function(err, eleminado){
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