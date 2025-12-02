import { useKeyboardInput } from '@/hooks/useKeyboardInput';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

describe('useKeyboardInput Hook', () => {
    const fireKey = (key: string) => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
    }

    it('should call onInput withe the correct number when keys from 1-9 are pressed', () => {
        const onInputMock = vi.fn();

        renderHook(() => useKeyboardInput(onInputMock, true));

        fireKey('5');
        expect(onInputMock).toHaveBeenCalledWith(5);
        fireKey('9');
        expect(onInputMock).toHaveBeenCalledWith(9);
    });

    it('should call onInput when 0, Backspace or Delete are pressed', () => {
        const onInputMock = vi.fn();

        renderHook(() => useKeyboardInput(onInputMock, true));

        fireKey('0');
        expect(onInputMock).toHaveBeenCalledWith(0);
        fireKey('Backspace');
        expect(onInputMock).toHaveBeenCalledWith(0);
        fireKey('Delete');
        expect(onInputMock).toHaveBeenCalledWith(0);
    });

    it('should not call onInput when a non-number key is pressed', () => {
        const onInputMock = vi.fn();

        renderHook(() => useKeyboardInput(onInputMock, true));

        fireKey('a');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('!');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('Enter');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('Escape');
        expect(onInputMock).not.toHaveBeenCalled();
    });

    it('should not call onInput if isEnabled is false', () => {
        const onInputMock = vi.fn();

        renderHook(() => useKeyboardInput(onInputMock, false));

        fireKey('5');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('0');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('Backspace');
        expect(onInputMock).not.toHaveBeenCalled();
        fireKey('Delete');
        expect(onInputMock).not.toHaveBeenCalled();
    });

    it('should remove the event listener when the component unmounts', () => {
        const onInputMock = vi.fn();

        const removeSpy = vi.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useKeyboardInput(onInputMock, true));

        unmount();
        
        expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
});