// src/utils/fecha.ts
 
export function formatearFechaLocal(fecha: Date): string {
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}
 
export function fechaOffset(offset: number): string {
  const f = new Date();
  f.setDate(f.getDate() + offset);
  return formatearFechaLocal(f);
}
 
export function obtenerFechaDesdeTime(time: string): string {
  const fechaString = time.split(' ')[0]; // "2026-05-03"
  const [year, month, day] = fechaString.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const diaStr = String(fecha.getDate()).padStart(2, '0');
  const mesStr = String(fecha.getMonth() + 1).padStart(2, '0');
  return `${diaStr}/${mesStr}`; // "03/05"
}