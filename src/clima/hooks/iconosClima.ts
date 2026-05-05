// src/clima/hooks/iconosClima.ts
 
import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudLightning } from 'lucide-react-native';
import { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';
 
type IconoClima = ComponentType<SvgProps & { size?: number; color?: string }>;
 
const MAPA_ICONOS: Record<string, IconoClima> = {
  soleado: Sun,
  despejado: Sun,
  nublado: Cloud,
  nuboso: Cloud,
  lluvia: CloudRain,
  llovizna: CloudDrizzle,
  tormenta: CloudLightning,
  nieve: CloudSnow,
  granizo: CloudSnow,
};
 
export function obtenerIconoClima(condicion: string): IconoClima {
  const lower = condicion.toLowerCase();
  const match = Object.keys(MAPA_ICONOS).find((clave) => lower.includes(clave));
  return match ? MAPA_ICONOS[match] : Sun;
}