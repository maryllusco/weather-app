// src/clima/api/obtenerClima.ts
 
import { PuntoClima, RespuestaClima } from '../types';
import { formatearFechaLocal, fechaOffset } from '@/src/utils/fecha';
 
export async function obtenerClima({
  latitud,
  longitud,
  claveApi,
}: {
  latitud: number;
  longitud: number;
  claveApi: string;
}): Promise<RespuestaClima> {
  const query = `${latitud},${longitud}`;
 
  const forecastRes = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${claveApi}&q=${query}&days=3&lang=es`
  );
  const forecastData = await forecastRes.json();
 
  if (!forecastRes.ok || !forecastData?.forecast?.forecastday) {
    throw new Error(forecastData?.error?.message ?? 'Error al obtener forecast');
  }
 
  let historyDay: { date: string; hour: PuntoClima[] } | null = null;
  try {
    const ayerFecha = formatearFechaLocal(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
    const historyRes = await fetch(
      `https://api.weatherapi.com/v1/history.json?key=${claveApi}&q=${query}&dt=${ayerFecha}&lang=es`
    );
    const historyData = await historyRes.json();
    if (historyRes.ok && historyData?.forecast?.forecastday?.[0]) {
      historyDay = historyData.forecast.forecastday[0];
    }
  } catch {
    // si falla ayer, continuamos sin él
  }
 
  const fechas = [fechaOffset(-1), fechaOffset(0), fechaOffset(1)];
 
  const dias: PuntoClima[][] = fechas.map((fecha) => {
    const enForecast = forecastData.forecast.forecastday.find(
      (d: { date: string; hour: PuntoClima[] }) => d.date === fecha
    );
    const enHistory = historyDay?.date === fecha ? historyDay : null;
    return enForecast?.hour ?? enHistory?.hour ?? [];
  });
 
  return {
    ciudad: forecastData.location?.name ?? '',
    dias,
  };
}