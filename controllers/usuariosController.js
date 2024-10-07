// Controladores del backend MVC con Express para el sistema de reserva de canchas

// controllers/usuariosController.js - Controlador de Usuario
const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.obtenerTodos()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.obtenerPorId(req.params.id)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

exports.crearUsuario = async (req, res) => {
  try {
    const { contraseña, ...restoDatos } = req.body
    const hash = await bcrypt.hash(contraseña, 10)
    const nuevoUsuario = await Usuario.crearUsuario({ ...restoDatos, contraseña: hash })
    res.status(201).json(nuevoUsuario)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

exports.loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body
    const usuario = await Usuario.obtenerPorCorreo(email)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValida) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    const token = jwt.sign({ id: usuario.RUT }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

exports.actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.actualizarUsuario(req.params.id, req.body)
    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(usuarioActualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.eliminarUsuario(req.params.id)
    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json({ message: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}