// models/Reserva.js - Modelo de Reserva
class Reserva {
  // Obtener todas las reservas
  static async obtenerTodas() {
    try {
      const { data, error } = await supabase.from('"reservas"').select('*');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error en obtenerTodas:', error);
      throw error;
    }
  }

  // Obtener reserva por ID
  static async obtenerPorId(id) {
    try {
      const { data, error } = await supabase.from('"reservas"').select('*').eq('"id_reserva"', id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }

  // Crear una nueva reserva
  static async crearReserva(reserva) {
    try {
      const { data, error } = await supabase.from('"reservas"').insert([reserva]).select('*');
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error en crearReserva:', error);
      throw error;
    }
  }

  // Actualizar una reserva existente
  static async actualizarReserva(id, data) {
    try {
      const { data: updatedData, error } = await supabase.from('"reservas"').update(data).eq('"id_reserva"', id).select('*');
      if (error) throw error;
      return updatedData[0];
    } catch (error) {
      console.error('Error en actualizarReserva:', error);
      throw error;
    }
  }

  // Eliminar una reserva por ID
  static async eliminarReserva(id) {
    try {
      const { data, error } = await supabase.from('"reservas"').delete().eq('"id_reserva"', id).select('*');
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error en eliminarReserva:', error);
      throw error;
    }
  }

  // Obtener reservas por usuario logueado (filtrando por rut_usuario)
  static async obtenerPorUsuario(rutUsuario) {
    try {
      const { data, error } = await supabase.from('"reservas"').select('*').eq('"rut_usuario"', rutUsuario);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error en obtenerPorUsuario:', error);
      throw error;
    }
  }
}

module.exports = Reserva;
