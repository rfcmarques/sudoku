import React from 'react';
import type { CellValue } from '../types/types';

interface CellProps {
    value: CellValue;
    rowIndex: number;
    colIndex: number;
}

const Cell: React.FC<CellProps> = ({ value, rowIndex, colIndex }) => {
    // Lógica para as bordas dos blocos 3x3
    const getBorderClasses = () => {
        let classes = '';
        if (colIndex === 2 || colIndex === 5) {
            classes += ' border-r-2';
        }
        if (rowIndex === 2 || rowIndex === 5) {
            classes += ' border-b-2';
        }
        return classes;
    };

    return (
        <div
            className={`
              w-12 h-12 flex justify-center items-center text-2xl font-sans 
              border border-gray-400 border-solid
              ${getBorderClasses()} 
              border-gray-800
            `}
        >
            {value !== 0 ? value : ''}
        </div>
    );
};

export default Cell;