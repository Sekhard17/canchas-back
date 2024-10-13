// controllers/reservasController.js - Controlador de Reserva
const Reserva = require('../models/Reserva')

exports.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.obtenerTodas()
    res.json(reservas)
  } catch (error) {
    console.error('Error al obtener reservas:', error)  // Esto imprimirá el error completo en los logs
    res.status(500).json({ error: 'Error al obtener reservas', details: error.message })
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

exports.obtenerReservasUsuario = async (req, res) => {
  try {
    console.log('Datos del usuario logueado:', req.user) // Para depurar si los datos del usuario están presentes
    const rutUsuario = req.user.id; // Verificar si el RUT del usuario está disponible
    const reservas = await Reserva.obtenerPorUsuario(rutUsuario)
    res.json(reservas)
  } catch (error) {
    console.error('Error al obtener reservas del usuario:', error)
    res.status(500).json({ error: 'Error al obtener reservas del usuario', details: error.message })
  }
};



