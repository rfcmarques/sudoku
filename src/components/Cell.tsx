import React from 'react';
import type { CellValue } from '../types/types';
import { initialBoard } from '../utils/sudoku';

interface CellProps {
    value: CellValue;
    rowIndex: number;
    colIndex: number;
    isSelected: boolean;
    onCellClick: (row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ value, rowIndex, colIndex, isSelected, onCellClick }) => {
    // Lógica para as bordas dos blocos 3x3
    const getBorderClasses = () => {
        let classes = '';
        if (colIndex === 2 || colIndex === 5) classes += ' border-r-2';
        if (rowIndex === 2 || rowIndex === 5) classes += ' border-b-2';
        return classes;
    };

    const selectedClass = isSelected ? 'bg-blue-200' : 'bg-white';
    const initialValueClass = initialBoard[rowIndex][colIndex] !== 0 ? 'font-bold text-slate-900' : 'text-sky-700';

    return (
        <div
            className={`
              flex justify-center items-center
              aspect-square
              border border-gray-400 border-solid
              cursor-pointer transition-colors duration-150
              text-xl md:text-2xl
              ${getBorderClasses()} 
              border-gray-800
              ${selectedClass}
              ${initialValueClass}
            `}
            onClick={() => onCellClick(rowIndex, colIndex)}
        >
            {value !== 0 ? value : ''}
        </div>
    );
};

export default Cell;