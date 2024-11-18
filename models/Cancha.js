const supabase = require('../config/database');

class Cancha {
    static async obtenerTodas() {
      const { data, error } = await supabase
        .from('canchas')
        .select('*')
      if (error) throw error
      return data
    }
  
    static async obtenerPorId(id) {
      const { data, error } = await supabase
        .from('canchas')
        .select('*')
        .eq('id_cancha', id)
        .single()
      if (error) throw error
      return data
    }
  
    static async crearCancha(cancha) {
      const { data, error } = await supabase
        .from('canchas')
        .insert([cancha])
        .select('*')
      if (error) throw error
      return data[0]
    }
  
    static async actualizarCancha(id, data) {
      const { data: updatedData, error } = await supabase
        .from('canchas')
        .update(data)
        .eq('id_cancha', id)
        .select('*')
      if (error) throw error
      return updatedData[0]
    }
  
    static async eliminarCancha(id) {
      const { data, error } = await supabase
        .from('canchas')
        .delete()
        .eq('id_cancha', id)
        .select('*')
      if (error) throw error
      return data[0]
    }
}

module.exports = Cancha;