import { renderHook, waitFor } from '@testing-library/react-native';
import usarUbicacion from '@/src/ubicacion/hooks/usarUbicacion';
 
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: 'granted' })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: -34.6, longitude: -58.4 },
    })
  ),
}));
 
test('inicia con habilitado en false', () => {
  const { result } = renderHook(() => usarUbicacion());
  expect(result.current.habilitado).toBe(false);
});
 
test('obtiene la ubicación correctamente', async () => {
  const { result } = renderHook(() => usarUbicacion());
 
  await waitFor(() => expect(result.current.habilitado).toBe(true));
 
  expect(result.current.latitud).toBe(-34.6);
  expect(result.current.longitud).toBe(-58.4);
});