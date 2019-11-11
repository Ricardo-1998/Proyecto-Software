var express = require('express');
var router = express.Router();
var recordatorioController = require('../controllers/recordatorioController');


// Create
router.post('/', recordatorioController.insert);

//Get all
router.get('/', recordatorioController.getAll);

// Delete
router.delete('/:id',recordatorioController.delete);

module.exports = router; 