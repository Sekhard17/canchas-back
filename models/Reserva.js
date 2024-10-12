// models/Reserva.js - Modelo de Reserva
class Reserva {
  static async obtenerTodas() {
    const { data, error } = await supabase.from('"reservas"').select('*')
    if (error) throw error
    return data
  }

  static async obtenerPorId(id) {
    const { data, error } = await supabase.from('"reservas"').select('*').eq('"id_reserva"', id).single()
    if (error) throw error
    return data
  }

  static async crearReserva(reserva) {
    const { data, error } = await supabase.from('"reservas"').insert([reserva]).select('*')
    if (error) throw error
    return data[0]
  }

  static async actualizarReserva(id, data) {
    const { data: updatedData, error } = await supabase.from('"reservas"').update(data).eq('"id_reserva"', id).select('*')
    if (error) throw error
    return updatedData[0]
  }

  static async eliminarReserva(id) {
    const { data, error } = await supabase.from('"reservas"').delete().eq('"id_reserva"', id).select('*')
    if (error) throw error
    return data[0]
  }
}

module.exports = Reserva
