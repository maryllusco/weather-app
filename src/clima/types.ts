// src/clima/types.ts
 
export type PuntoClima = {
  time: string;
  temp_c: number;
  condition: { text: string };
  humidity: number;
  pressure_mb: number;
  wind_kph: number;
};
 
export type RespuestaClima = {
  ciudad: string;
  dias: PuntoClima[][];
};
