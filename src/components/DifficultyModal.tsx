import type React from "react";
import type { DifficultyLevel } from "@/types/types";

interface DifficultyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectDifficulty: (level: DifficultyLevel) => void;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({
    isOpen,
    onClose,
    onSelectDifficulty,
}) => {
    if (!isOpen) return null;

    const handleModalContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >

            <div
                className="relative w-11/12 max-w-sm rounded-lg bg-white p-6 shadow-xl"
                onClick={handleModalContentClick}
            >
                <h2 className="mb-4 text-center text-2xl font-bold text-slate-800">
                    Escolha a Dificuldade
                </h2>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => onSelectDifficulty('easy')}
                        className="w-full rounded-md bg-green-500 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-green-600"
                    >
                        Fácil
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('medium')}
                        className="w-full rounded-md bg-yellow-500 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-yellow-600"
                    >
                        Médio
                    </button>
                    <button
                        onClick={() => onSelectDifficulty('hard')}
                        className="w-full rounded-md bg-red-400 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-red-500 disabled:opacity-50"
                    >
                        Difícil
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DifficultyModal;