// models/Usuario.js - Modelo de Usuario
const supabase = require('../config/database')

class Usuario {
  static async obtenerTodos() {
    const { data, error } = await supabase.from('Usuarios').select('*')
    if (error) throw error
    return data
  }

  static async obtenerPorId(id) {
    const { data, error } = await supabase.from('Usuarios').select('*').eq('RUT', id).single()
    if (error) throw error
    return data
  }

  static async crearUsuario(usuario) {
    const { data, error } = await supabase.from('Usuarios').insert([usuario]).select('*')
    if (error) throw error
    return data[0]
  }

  static async actualizarUsuario(id, data) {
    const { data: updatedData, error } = await supabase.from('Usuarios').update(data).eq('RUT', id).select('*')
    if (error) throw error
    return updatedData[0]
  }

  static async eliminarUsuario(id) {
    const { data, error } = await supabase.from('Usuarios').delete().eq('RUT', id).select('*')
    if (error) throw error
    return data[0]
  }
}

module.exports = Usuario