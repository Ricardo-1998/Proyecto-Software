var express = require('express');
var router = express.Router();
const AuthController =require("../controllers/publicacionController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('foro', { title: 'Express' });
});

router.post('/publicar',AuthController.insert);



module.exports = router;