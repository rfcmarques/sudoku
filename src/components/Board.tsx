import React from 'react';
import type { Board as BoardType } from '../types/types';
import Cell from './Cell';

interface BoardProps {
    board: BoardType;
}

interface BoardProps {
    board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
    return (
        <div className="grid grid-cols-9 w-max border-4 border-gray-800 mx-auto my-5">
            {board.map((row, rowIndex) =>
                row.map((cellValue, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={cellValue}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                    />
                ))
            )}
        </div>
    );
};

export default Board;