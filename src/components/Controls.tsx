import React from 'react';

interface ControlsProps {
    onCheck: () => void;
    onNewGame: () => void;
    onHint: () => void;
    hintCount: number;
}

const Controls: React.FC<ControlsProps> = ({ onCheck, onNewGame, onHint, hintCount }) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 my-4">
            <button
                onClick={onNewGame}
                className="w-40 px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all duration-200"
            >
                Novo Jogo
            </button>

            <button
                className="w-40 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
                onClick={onCheck}
            >
                Validar
            </button>

            <div className="flex flex-col items-center gap-2 w-40">
                <button
                    onClick={onHint}
                    className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200 disabled:opacity-50"
                    disabled={hintCount >= 3}
                >
                    Dica
                </button>
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 w-4 rounded-full ${i >= hintCount ? 'bg-blue-600' : 'bg-gray-400'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Controls;