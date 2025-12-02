import { renderHook } from "@testing-library/react";
import useLocalStorage from "../../../hooks/useLocalStorage.ts";
import { act } from "react";

describe('useLocalStorage Hook', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should return the initial value if there is no value in localStorage', () => {
        const { result } = renderHook(() => useLocalStorage('test', 'initialValue'));

        expect(result.current[0]).toBe('initialValue');
    });

    it('should initialize with the value from localStorage if it exists', () => {
        const storedValue = { nome: 'Sudoku', nivel: 'hard' };
        window.localStorage.setItem('game-settings', JSON.stringify(storedValue));

        const { result } = renderHook(() =>
            useLocalStorage('game-settings', { nome: 'Default', nivel: 'easy' })
        );

        expect(result.current[0]).toEqual(storedValue);
    });

    it('should update the local storage when the setter is called', () => {
        const { result } = renderHook(() => useLocalStorage('score-key', 0));

        act(() => {
            result.current[1](100);
        });

        expect(result.current[0]).toBe(100);

        expect(window.localStorage.getItem('score-key')).toBe('100');
    });

    it('should support functional updates (callback)', () => {
        const { result } = renderHook(() => useLocalStorage('counter-key', 10));

        act(() => {
            result.current[1]((prev) => prev + 5);
        });

        expect(result.current[0]).toBe(15);
        expect(window.localStorage.getItem('counter-key')).toBe('15');
    });
});