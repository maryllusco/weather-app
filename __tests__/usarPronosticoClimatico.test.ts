// __tests__/usarPronosticoClimatico.test.ts
 
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import usarPronosticoClimatico from '@/src/clima/hooks/usarPronosticoClimatico';
 
const mockDias = [[{
  time: '2024-01-01 12:00:00',
  temp_c: 25,
  condition: { text: 'Soleado' },
  humidity: 50,
  pressure_mb: 1013,
  wind_kph: 10,
}]];
 
jest.mock('@/src/clima/api/obtenerClima', () => ({
  obtenerClima: jest.fn(() =>
    Promise.resolve({ ciudad: 'Buenos Aires', dias: mockDias })
  ),
}));
 
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return React.createElement(QueryClientProvider, { client: queryClient }, children);
};
 
test('devuelve los días y la ciudad correctamente', async () => {
  const { result } = renderHook(
    () => usarPronosticoClimatico({ latitud: -34, longitud: -58, claveApi: 'fake-key' }),
    { wrapper }
  );
 
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
 
  expect(result.current.ciudad).toBe('Buenos Aires');
  expect(result.current.dias).toEqual(mockDias);
});
 
test('inicia en estado de carga', () => {
  const { result } = renderHook(
    () => usarPronosticoClimatico({ latitud: -34, longitud: -58, claveApi: 'fake-key' }),
    { wrapper }
  );
 
  expect(result.current.isLoading).toBe(true);
});