const express = require('express');
const router = express.Router();
const ResidentController = require('../controllers/ResidentController');

// Ruta para obtener todos los residentes
router.get('/', ResidentController.getAllResidents);

// Ruta para crear un nuevo residente
router.post('/', ResidentController.createResident);

// Ruta para actualizar un residente
router.put('/:id', ResidentController.updateResident);

// Ruta para eliminar un residente
router.delete('/:id', ResidentController.deleteResident);

// Ruta para obtener un residente por ID
router.get('/:id', ResidentController.getResidentById);

module.exports = router; 