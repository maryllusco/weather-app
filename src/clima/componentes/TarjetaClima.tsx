// src/clima/componentes/TarjetaClima.tsx

import { View, Text, StyleSheet } from 'react-native';
import { PuntoClima } from '@/src/clima/types';
import { obtenerIconoClima } from '@/src/clima/hooks/iconosClima';
import { calcularResumenDia } from '@/src/utils/calculos';
import { obtenerFechaDesdeTime } from '@/src/utils/fecha';
import MetricasClima from './MetricasClima';

type Props = {
  data: PuntoClima[];
  ciudad: string;
};

export default function TarjetaClima({ data, ciudad }: Props) {
  const { avgtemp_c, mintemp_c, maxtemp_c, conditionText, humidity, pressure, wind_kph } =
    calcularResumenDia(data);

  const Icono = obtenerIconoClima(conditionText);
  const fecha = data?.[0]?.time ? obtenerFechaDesdeTime(data[0].time) : '';

  return (
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.fecha}>{fecha}</Text>
        <Text style={styles.ciudad}>{ciudad.toUpperCase()}</Text>
      </View>

      <View style={styles.icono}>
        <Icono size={250} color="#000" />
      </View>

      <Text style={styles.temp}>{Math.round(avgtemp_c)}°</Text>

      <Text style={styles.condicion}>{conditionText}</Text>

      <Text style={styles.minmax}>
        Mín {Math.round(mintemp_c)}°  •  Máx {Math.round(maxtemp_c)}°
      </Text>

      <View style={styles.metricas}>
        <MetricasClima humidity={humidity} pressure={pressure} wind_kph={wind_kph} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingTop: 0, 
  },
  encabezado: {
    alignItems: 'center',
    gap: 6,
  },
  fecha: {
    textAlign: 'center',
    color: '#bbb',
    letterSpacing: 4,
    fontSize: 14,
  },
  ciudad: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  icono: {
    alignItems: 'center',
  },
  temp: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: 'bold',
  },
  condicion: {
    textAlign: 'center',
    fontSize: 18,
    color: '#444',
  },
  minmax: {
    textAlign: 'center',
    fontSize: 15,
    color: '#888',
  },
  metricas: {
    width: '100%',
  },
});
