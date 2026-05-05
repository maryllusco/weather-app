// src/clima/componentes/MetricasClima.tsx

import { View, Text, StyleSheet } from 'react-native';
import { Droplet, Gauge, Wind } from 'lucide-react-native';
import { ComponentType } from 'react';
import { SvgProps } from 'react-native-svg';

type Metrica = {
  Icon: ComponentType<SvgProps & { size?: number; color?: string }>;
  label: string;
  value: string;
};

type Props = {
  humidity: number;
  pressure: number;
  wind_kph: number;
};

export default function MetricasClima({ humidity, pressure, wind_kph }: Props) {
  const metricas: Metrica[] = [
    { Icon: Droplet, label: 'Humedad', value: `${humidity}%` },
    { Icon: Gauge, label: 'Presión', value: `${pressure} hPa` },
    { Icon: Wind, label: 'Viento', value: `${wind_kph.toFixed(1)} km/h` },
  ];

  return (
    <View style={styles.row}>
      {metricas.map(({ Icon, label, value }) => (
        <View key={label} style={styles.card} testID="metric-item">
          <View testID="metric-icon">
            <Icon size={18} color="#333" />
          </View>
          <Text testID="metric-value">{value}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
