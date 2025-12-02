import type { CellValue } from "@/types/types";
import { useEffect } from "react";

export const useKeyboardInput = (
    onInput: (value: CellValue) => void,
    isEnabled: boolean = true
) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isEnabled) return;

            if (event.key >= '1' && event.key <= '9') {
                onInput(parseInt(event.key, 10) as CellValue);
            }

            if (['Backspace', 'Delete', '0'].includes(event.key)) {
                onInput(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isEnabled, onInput]);
};