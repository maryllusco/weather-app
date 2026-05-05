// __tests__/usarDias.test.ts
 
import { renderHook, act } from '@testing-library/react-native';
import { usarDias } from '@/src/dias/hooks/usarDias';
 
test('inicia en el día de hoy (índice 1)', () => {
  const { result } = renderHook(() => usarDias(3));
  expect(result.current.diaIndex).toBe(1);
});
 
test('avanza al día siguiente', () => {
  const { result } = renderHook(() => usarDias(3));
  act(() => result.current.irAlSiguiente());
  expect(result.current.diaIndex).toBe(2);
});
 
test('retrocede al día anterior', () => {
  const { result } = renderHook(() => usarDias(3));
  act(() => result.current.irAlSiguiente());
  act(() => result.current.irAlAnterior());
  expect(result.current.diaIndex).toBe(1);
});
 
test('no retrocede más allá del primer día', () => {
  const { result } = renderHook(() => usarDias(3));
  act(() => result.current.irAlAnterior());
  expect(result.current.diaIndex).toBe(0);
});
 
test('no avanza más allá del último día', () => {
  const { result } = renderHook(() => usarDias(3));
  act(() => result.current.irAlSiguiente());
  act(() => result.current.irAlSiguiente());
  act(() => result.current.irAlSiguiente());
  expect(result.current.diaIndex).toBe(2);
});