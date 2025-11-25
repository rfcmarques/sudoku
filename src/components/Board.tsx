import React from 'react';
import type { Board as BoardType, CellPosition } from '../types/types';
import Cell from './Cell';

interface BoardProps {
    currentBoard: BoardType;
    initialBoard: BoardType;
    selectedCell: CellPosition;
    onCellClick: (
        row: number,
        col: number
    ) => void;
    hiddenInputRef: React.RefObject<HTMLInputElement | null>;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Board: React.FC<BoardProps> = ({
    currentBoard,
    initialBoard,
    selectedCell,
    onCellClick,
    hiddenInputRef,
    onInputChange
}) => {
    return (
        <div className="
            grid grid-cols-9 
            w-[90vw] max-w-md 
            mx-auto my-5
            border-4 border-gray-800 
        ">
            {currentBoard.map((row, rowIndex) =>
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
                        isInitialValue={initialBoard[rowIndex][colIndex] !== 0}
                    />
                ))
            )}
            {selectedCell && (
                <input
                    ref={hiddenInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={onInputChange}
                    style={{
                        gridColumn: selectedCell.col + 1,
                        gridRow: selectedCell.row + 1,
                        opacity: 0,
                        pointerEvents: 'none',
                        width: '100%',
                        height: '100%',
                        zIndex: 10
                    }}
                    autoFocus
                />
            )}
        </div>
    );
};

export default Board;