// src/clima/hooks/usarPronosticoClimatico.ts
 
import { useQuery } from '@tanstack/react-query';
import { obtenerClima } from '../api/obtenerClima';
import { RespuestaClima } from '../types';
 
type Props = {
  latitud: number;
  longitud: number;
  claveApi: string;
};
 
export default function usarPronosticoClimatico({ latitud, longitud, claveApi }: Props) {
  const query = useQuery<RespuestaClima>({
    queryKey: ['clima', latitud, longitud],
    queryFn: () => obtenerClima({ latitud, longitud, claveApi }),
    enabled: !!latitud && !!longitud,
  });
 
  return {
    ...query,
    dias: query.data?.dias ?? [],
    ciudad: query.data?.ciudad ?? '',
  };
}