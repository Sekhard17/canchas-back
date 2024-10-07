// controllers/pagosController.js - Controlador de Pago
const Pago = require('../models/Pago')

exports.obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.obtenerTodos()
    res.json(pagos)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos' })
  }
}

exports.obtenerPagoPorId = async (req, res) => {
  try {
    const pago = await Pago.obtenerPorId(req.params.id)
    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json(pago)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pago' })
  }
}

exports.crearPago = async (req, res) => {
  try {
    const nuevoPago = await Pago.crearPago(req.body)
    res.status(201).json(nuevoPago)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pago' })
  }
}

exports.actualizarPago = async (req, res) => {
  try {
    const pagoActualizado = await Pago.actualizarPago(req.params.id, req.body)
    if (!pagoActualizado) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json(pagoActualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pago' })
  }
}

exports.eliminarPago = async (req, res) => {
  try {
    const pagoEliminado = await Pago.eliminarPago(req.params.id)
    if (!pagoEliminado) {
      return res.status(404).json({ error: 'Pago no encontrado' })
    }
    res.json({ message: 'Pago eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pago' })
  }
}
