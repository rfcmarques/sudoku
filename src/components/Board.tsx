import React from 'react';
import type { Board as BoardType, CellPosition } from '../types/types';
import Cell from './Cell';

interface BoardProps {
    board: BoardType;
    selectedCell: CellPosition;
    onCellClick: (row: number, col: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, selectedCell, onCellClick }) => {
    return (
        <div className="
            grid grid-cols-9 
            w-[90vw] max-w-md 
            mx-auto my-5
            border-4 border-gray-800 
        ">
            {board.map((row, rowIndex) =>
                row.map((cellValue, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={cellValue}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        onCellClick={onCellClick}
                        isSelected={
                            selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        }
                    />
                ))
            )}
        </div>
    );
};

export default Board;