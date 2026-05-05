// src/dias/componentes/SelectorDeDia.tsx

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { PuntoClima } from '@/src/clima/types';
import { obtenerFechaDesdeTime } from '@/src/utils/fecha';

type Props = {
  indice: number;
  dias: PuntoClima[][];
  onPrev: () => void;
  onNext: () => void;
};

export default function SelectorDeDia({ indice, dias, onPrev, onNext }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.botonLateral}>
        <TouchableOpacity
          testID="button-prev-day"
          onPress={onPrev}
          disabled={indice === 0}
          style={styles.button}
        >
          <ChevronLeft size={24} color={indice === 0 ? '#ccc' : '#333'} />
        </TouchableOpacity>
      </View>

      <View style={styles.botones}>
        {dias.map((dia, index) => {
          const fecha = dia?.[0]?.time ? obtenerFechaDesdeTime(dia[0].time) : '';
          return (
            <View
              key={fecha}
              style={[styles.boton, index === indice && styles.botonActivo]}
            >
              <Text style={[styles.botonTexto, index === indice && styles.botonTextoActivo]}>
                {fecha}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.botonLateral}>
        <TouchableOpacity
          testID="button-next-day"
          onPress={onNext}
          disabled={indice === dias.length - 1}
          style={styles.button}
        >
          <ChevronRight size={24} color={indice === dias.length - 1 ? '#ccc' : '#333'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 8,
    marginTop: 24,
  },
  botonLateral: {
    width: 40,
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
  botones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  botonActivo: {
    backgroundColor: '#000',
  },
  botonTexto: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  botonTextoActivo: {
    color: '#fff',
  },
});
