// app/(stacks)/Home.tsx

import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import usarUbicacion from '@/src/ubicacion/hooks/usarUbicacion';
import usarPronosticoClimatico from '@/src/clima/hooks/usarPronosticoClimatico';
import { usarDias } from '@/src/dias/hooks/usarDias';
import TarjetaClima from '@/src/clima/componentes/TarjetaClima';
import SelectorDeDia from '@/src/dias/componentes/SelectorDeDia';

export default function Home() {
  const { latitud, longitud, habilitado } = usarUbicacion();
  const claveApi = (Constants.expoConfig?.extra as Record<string, string>)
    ?.EXPO_PUBLIC_OPENWEATHER_API_KEY;

  const { dias, ciudad, isLoading, isError } = usarPronosticoClimatico({
    latitud,
    longitud,
    claveApi,
  });

  const { diaIndex, irAlSiguiente, irAlAnterior } = usarDias(dias.length);

  if (!habilitado || isLoading) {
    return (
      <View style={styles.center} testID="screen-loading">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!claveApi) {
    return (
      <View style={styles.center} testID="screen-error-no-api">
        <Text testID="text-error-api">Falta la clave de API en la configuración.</Text>
      </View>
    );
  }

  if (isError || dias.length === 0) {
    return (
      <View style={styles.center} testID="screen-error">
        <Text testID="text-error-clima">Error al cargar el clima</Text>
      </View>
    );
  }

  const diaSeleccionado = dias[diaIndex];

  return (
    <View style={styles.container} testID="screen-weather">
      <View style={styles.content}>
        <SelectorDeDia
          indice={diaIndex}
          dias={dias}
          onNext={irAlSiguiente}
          onPrev={irAlAnterior}
        />

        {diaSeleccionado ? (
          <TarjetaClima data={diaSeleccionado} ciudad={ciudad} />
        ) : (
          <Text testID="text-error-dia" style={styles.errorText}>
            Error al cargar el día
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
