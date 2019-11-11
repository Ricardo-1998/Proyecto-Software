var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userControllers');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profileGeneral',{ first_name:'Javier' , email:'00076017@uca.edu.sv'});
});

router.get('/General', function(req, res, next) {
  res.render('profileGeneral',{ first_name:'Javier' , email:'00076017@uca.edu.sv'});
});

router.get('/Seguridad', function(req, res, next) {
  res.render('profileSeguridad');
});

router.post('/seguridad/cambiarPassword', UserController.changePassword);

//router.post('/seguridad/cambiarPregunta',controlador);

router.get('/Foros', function(req, res, next) {
  res.render('profileForos');
});

//router.get('/Foros/:username',publicacionController.getAll1);

router.get('/Hilos', function(req, res, next) {
  res.render('profileHilos');
});


router.post('/', UserController.update);


module.exports = router;