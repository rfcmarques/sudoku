import React, { useState } from 'react';
import type { Board as BoardType, CellPosition } from '../types/types';
import { initialBoard } from '../utils/sudoku';
import Board from './Board';

const Game: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(initialBoard);
    const [selectedCell, setSelectedCell] = useState<CellPosition>(null);

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
        console.log(`Célula selecionada: Linha ${row}, Coluna ${col}`);
    };

    return (
        <div className="game">
            <Board
                board={board}
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
            />
        </div>
    );
};

export default Game;