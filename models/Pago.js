// models/Pago.js - Modelo de Pago
class Pago {
    static async obtenerTodos() {
      const { data, error } = await supabase.from('Pagos').select('*')
      if (error) throw error
      return data
    }
  
    static async obtenerPorId(id) {
      const { data, error } = await supabase.from('Pagos').select('*').eq('ID_Pago', id).single()
      if (error) throw error
      return data
    }
  
    static async crearPago(pago) {
      const { data, error } = await supabase.from('Pagos').insert([pago]).select('*')
      if (error) throw error
      return data[0]
    }
  
    static async actualizarPago(id, data) {
      const { data: updatedData, error } = await supabase.from('Pagos').update(data).eq('ID_Pago', id).select('*')
      if (error) throw error
      return updatedData[0]
    }
  
    static async eliminarPago(id) {
      const { data, error } = await supabase.from('Pagos').delete().eq('ID_Pago', id).select('*')
      if (error) throw error
      return data[0]
    }
  }
  
  module.exports = Pago