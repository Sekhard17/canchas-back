// controllers/usuariosController.js - Controlador de Usuario
const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.obtenerTodos()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al obtener la lista de usuarios, por favor inténtelo más tarde.' })
  }
}

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.obtenerPorId(req.params.id)
    if (!usuario) {
      return res.status(404).json({ error: 'El usuario no se ha encontrado en el sistema.' })
    }
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al obtener el usuario, por favor inténtelo más tarde.' })
  }
}

exports.crearUsuario = async (req, res) => {
  try {
    const { contraseña, ...restoDatos } = req.body
    const hash = await bcrypt.hash(contraseña, 10)
    const nuevoUsuario = await Usuario.crearUsuario({ ...restoDatos, contraseña: hash })
    res.status(201).json(nuevoUsuario)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al crear el usuario, por favor inténtelo más tarde.' })
  }
}

exports.loginUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body
    console.log('Intentando iniciar sesión para:', email)
    const usuario = await Usuario.obtenerPorCorreo(email)
    if (!usuario) {
      console.log('Usuario no encontrado')
      return res.status(404).json({ error: 'El usuario no ha sido encontrado.' })
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValida) {
      console.log('Contraseña incorrecta')
      return res.status(401).json({ error: 'Las credenciales ingresadas no son correctas.' })
    }

    const token = jwt.sign({ id: usuario.RUT }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    res.status(500).json({ error: 'Hubo un problema al iniciar sesión, por favor inténtelo más tarde.' })
  }
}

exports.actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.actualizarUsuario(req.params.id, req.body)
    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'El usuario que deseas actualizar no se ha encontrado.' })
    }
    res.json(usuarioActualizado)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al actualizar el usuario, por favor inténtelo más tarde.' })
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.eliminarUsuario(req.params.id)
    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'El usuario que deseas eliminar no se ha encontrado.' })
    }
    res.json({ message: 'El usuario ha sido eliminado correctamente.' })
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al eliminar el usuario, por favor inténtelo más tarde.' })
  }
}