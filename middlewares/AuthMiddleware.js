//const mongoose = require('mongoose');
const User = require("../models/users");
const bcrypt = require('bcrypt');
const AuthMiddleware = {};

//middleware que verifica si una persona esta logueada
AuthMiddleware.isAuthentication = function (req, res, next) {
    if(!req.session.user) // verificamos is existe la session
    {
        return res.redirect('/'); //redirigimos al index si esto no es posible
    }
    //si existe la sesion parsea el contenido
    data = JSON.parse(req.session.user);
    User.findOne({ email: data.email })
        .exec(function (err, user) {
            if (err) {
                return res.redirect('/');
            }
            else {
                if (!user) {
                    return res.redirect('/');
                }

                else {
                    bcrypt.compare(data.userId, user._id.toString(), function (err, result) {
                        console.log("llego aca", data.userId);
                        if (result == true) {
                            return res.redirect('/');
                        }
                        else {
                            return res.redirect('/');
                        }
                    });
                }
            }
        });
};

module.exports = AuthMiddleware;

