// routes/reservasRoutes.js - Rutas de Reserva
const express = require('express')
const router = express.Router()
const reservasController = require('../controllers/reservasController')

router.get('/', reservasController.obtenerReservas)
router.get('/:id', reservasController.obtenerReservaPorId)
router.post('/', reservasController.crearReserva)
router.put('/:id', reservasController.actualizarReserva)
router.delete('/:id', reservasController.eliminarReserva)

module.exports = router