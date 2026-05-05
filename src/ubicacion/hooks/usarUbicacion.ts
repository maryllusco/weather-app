import { useEffect, useState } from 'react';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export default function usarUbicacion() {
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const [habilitado, setHabilitado] = useState(false);

  useEffect(() => {
    async function obtenerUbicacion() {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') return;

      const ubicacion = await getCurrentPositionAsync({});

      setLatitud(ubicacion.coords.latitude);
      setLongitud(ubicacion.coords.longitude);
      setHabilitado(true);
    }

    obtenerUbicacion();
  }, []);

  return {
    latitud,
    longitud,
    habilitado,
  };
}