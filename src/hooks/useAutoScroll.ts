import { useRef } from "react";

export const useAutoScroll = () => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    const focusAndScroll = (row: number) => {
        hiddenInputRef.current?.focus({ preventScroll: true });

        if (row > 3) {
            setTimeout(() => {
                scrollAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }, 500);
        }
    }

    return {
        hiddenInputRef,
        scrollAnchorRef,
        focusAndScroll
    };
}