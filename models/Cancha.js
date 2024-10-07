// models/Cancha.js - Modelo de Cancha
class Cancha {
    static async obtenerTodas() {
      const { data, error } = await supabase.from('Canchas').select('*')
      if (error) throw error
      return data
    }
  
    static async obtenerPorId(id) {
      const { data, error } = await supabase.from('Canchas').select('*').eq('ID_Cancha', id).single()
      if (error) throw error
      return data
    }
  
    static async crearCancha(cancha) {
      const { data, error } = await supabase.from('Canchas').insert([cancha]).select('*')
      if (error) throw error
      return data[0]
    }
  
    static async actualizarCancha(id, data) {
      const { data: updatedData, error } = await supabase.from('Canchas').update(data).eq('ID_Cancha', id).select('*')
      if (error) throw error
      return updatedData[0]
    }
  
    static async eliminarCancha(id) {
      const { data, error } = await supabase.from('Canchas').delete().eq('ID_Cancha', id).select('*')
      if (error) throw error
      return data[0]
    }
  }
  
  module.exports = Cancha