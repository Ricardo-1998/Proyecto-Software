var express = require('express');
const recordatorioController =require("../controllers/recordatorioController");
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('recordatorio');
});

router.post('/', recordatorioController.insert);

router.get('/', recordatorioController.getAll);

module.exports = router;