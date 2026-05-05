// src/utils/calculos.ts
 
import { PuntoClima } from '@/src/clima/types';
 
export type ResumenDia = {
  avgtemp_c: number;
  mintemp_c: number;
  maxtemp_c: number;
  conditionText: string;
  humidity: number;
  pressure: number;
  wind_kph: number;
};
 
const RESUMEN_VACIO: ResumenDia = {
  avgtemp_c: 0,
  mintemp_c: 0,
  maxtemp_c: 0,
  conditionText: 'Desconocido',
  humidity: 0,
  pressure: 0,
  wind_kph: 0,
};
 
export function calcularResumenDia(dia: PuntoClima[]): ResumenDia {
  if (!dia || dia.length === 0) return RESUMEN_VACIO;
 
  const punto =
    dia.find((item) => item.time.includes('12:00:00')) ??
    dia[Math.floor(dia.length / 2)] ??
    dia[0];
 
  const temps = dia.map((item) => item.temp_c);
 
  return {
    avgtemp_c: temps.reduce((sum, t) => sum + t, 0) / temps.length,
    mintemp_c: Math.min(...temps),
    maxtemp_c: Math.max(...temps),
    conditionText: punto.condition?.text ?? 'Desconocido',
    humidity: punto.humidity,
    pressure: punto.pressure_mb,
    wind_kph: punto.wind_kph,
  };
}