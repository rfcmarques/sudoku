import { useAutoScroll } from '@/hooks/useAutoScroll';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

describe('useAutoScroll Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should focus the invisible input when called', () => {
        const { result } = renderHook(() => useAutoScroll());


        const mockInput = document.createElement('input');
        mockInput.focus = vi.fn();

        result.current.hiddenInputRef.current = mockInput;

        result.current.focusAndScroll(0);

        expect(mockInput.focus).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should not scroll if row is less than 4', () => {
        const { result } = renderHook(() => useAutoScroll());

        const mockAnchor = document.createElement('div');
        mockAnchor.scrollIntoView = vi.fn();

        result.current.scrollAnchorRef.current = mockAnchor;

        result.current.focusAndScroll(3);

        vi.advanceTimersByTime(1000);

        expect(mockAnchor.scrollIntoView).not.toHaveBeenCalled();
    });

    it('should scroll after 500ms if row is greater than 3', () => {
        const { result } = renderHook(() => useAutoScroll());

        const mockAnchor = document.createElement('div');
        mockAnchor.scrollIntoView = vi.fn();

        result.current.scrollAnchorRef.current = mockAnchor;

        const mockInput = document.createElement('input');
        mockInput.focus = vi.fn();

        result.current.hiddenInputRef.current = mockInput;

        result.current.focusAndScroll(4);

        expect(mockAnchor.scrollIntoView).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);

        expect(mockAnchor.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
            block: 'nearest',
        });
    });
});