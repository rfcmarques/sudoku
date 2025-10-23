import React from 'react';

interface ControlsProps {
    onCheck: () => void;
}
const Controls: React.FC<ControlsProps> = ({ onCheck }) => {
    return (
        <div className="flex justify-center my-4">
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