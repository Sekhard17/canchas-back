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
    const { nombre, correo, RUT, contraseña } = req.body

    // Verificar que todos los campos requeridos estén presentes
    if (!nombre || !correo || !RUT || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' })
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.obtenerPorCorreo(correo)
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado.' })
    }

    // Hash de la contraseña
    const hash = await bcrypt.hash(contraseña, 10)

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.crearUsuario({ nombre, correo, RUT, contraseña: hash })
    res.status(201).json(nuevoUsuario)
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res.status(500).json({ error: 'Hubo un problema al crear el usuario, por favor inténtelo más tarde.', detalle: error.message })
  }
}

exports.loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body
    console.log('Intentando iniciar sesión para:', email)
    const usuario = await Usuario.obtenerPorCorreo(email)
    if (!usuario) {
      console.log('Usuario no encontrado')
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValida) {
      console.log('Contraseña incorrecta')
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    const token = jwt.sign({ id: usuario.RUT }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message })
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