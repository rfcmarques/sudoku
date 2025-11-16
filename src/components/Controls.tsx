import React from 'react';

interface ControlsProps {
    onCheck: () => void;
    onNewGame: () => void;
    onHint: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onCheck, onNewGame, onHint }) => {
    return (
        <div className="flex justify-center gap-4 my-4">
            <button
                onClick={onNewGame}
                className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all duration-200"
            >
                Novo Jogo
            </button>

            <button
                onClick={onHint}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
            >
                Dica
            </button>

            <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
                onClick={onCheck}
            >
                Verificar Solução
            </button>
        </div>
    );
};

export default Controls;