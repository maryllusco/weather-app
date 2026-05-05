// src/dias/hooks/usarDias.ts
 
import { useState } from 'react';
 
const DIA_HOY = 1; // 0=ayer, 1=hoy, 2=mañana
 
export function usarDias(total: number) {
  const [diaIndex, setDiaIndex] = useState(DIA_HOY);
 
  return {
    diaIndex,
    irAlSiguiente: () => setDiaIndex(Math.min(diaIndex + 1, total - 1)),
    irAlAnterior: () => setDiaIndex(Math.max(diaIndex - 1, 0)),
  };
}