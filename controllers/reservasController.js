// controllers/reservasController.js - Controlador de Reserva
const Reserva = require('../models/Reserva')

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.obtenerTodas()
    res.json(reservas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' })
  }
}

exports.obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.obtenerPorId(req.params.id)
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }
    res.json(reserva)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reserva' })
  }
}

exports.crearReserva = async (req, res) => {
  try {
    const nuevaReserva = await Reserva.crearReserva(req.body)
    res.status(201).json(nuevaReserva)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear reserva' })
  }
}

exports.actualizarReserva = async (req, res) => {
  try {
    const reservaActualizada = await Reserva.actualizarReserva(req.params.id, req.body)
    if (!reservaActualizada) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }
    res.json(reservaActualizada)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar reserva' })
  }
}

exports.eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.eliminarReserva(req.params.id)
    if (!reservaEliminada) {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }
    res.json({ message: 'Reserva eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reserva' })
  }
}