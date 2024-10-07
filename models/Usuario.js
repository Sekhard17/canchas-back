// models/Usuario.js - Modelo de Usuario
const supabase = require('../config/database')

class Usuario {
  static async obtenerTodos() {
    const { data, error } = await supabase.from('usuarios').select('*')
    if (error) throw error
    return data
  }

  static async obtenerPorId(id) {
    const { data, error } = await supabase.from('usuarios').select('*').eq('RUT', id).single()
    if (error) throw error
    return data
  }

  static async obtenerPorCorreo(email) {
    const { data, error } = await supabase.from('usuarios').select('*').eq('correo', email).single()
    if (error) throw error
    return data
  }

  static async crearUsuario(usuario) {
    const { data, error } = await supabase.from('usuarios').insert([usuario]).select('*')
    if (error) throw error
    return data[0]
  }

  static async actualizarUsuario(id, data) {
    const { data: updatedData, error } = await supabase.from('usuarios').update(data).eq('RUT', id).select('*')
    if (error) throw error
    return updatedData[0]
  }

  static async eliminarUsuario(id) {
    const { data, error } = await supabase.from('usuarios').delete().eq('RUT', id).select('*')
    if (error) throw error
    return data[0]
  }
}

module.exports = Usuario
