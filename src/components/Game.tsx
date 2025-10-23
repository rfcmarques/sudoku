import React, { useState, useEffect, useCallback } from 'react';
import type { Board as BoardType, CellPosition, CellValue } from '../types/types';
import { initialBoard, solutionBoard } from '../utils/sudoku';
import Board from './Board';
import Controls from './Controls';

const Game: React.FC = () => {
    const [board, setBoard] = useState<BoardType>(initialBoard);
    const [selectedCell, setSelectedCell] = useState<CellPosition>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
    };

    const handleNumberInput = useCallback((value: CellValue) => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;

        if (initialBoard[row][col] !== 0) return;

        const newBoard = board.map(rowArray => [...rowArray]);
        newBoard[row][col] = value;
        setBoard(newBoard);
    }, [selectedCell, board]);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {

            if (!selectedCell) return;

            console.log(`Tecla pressionada: ${event.key}`);

            if (event.key >= '1' && event.key <= '9') {
                const number = parseInt(event.key, 10) as CellValue;
                handleNumberInput(number);
            }

            if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') {
                handleNumberInput(0);
            }

        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedCell, handleNumberInput])

    const checkSolution = () => {
        const currentBoardStr = JSON.stringify(board);
        const solutionBoardStr = JSON.stringify(solutionBoard);

        if (currentBoardStr === solutionBoardStr) {
            setIsComplete(true);
            setSelectedCell(null);
        } else {
            alert('O Sudoku não está correto. Tente novamente!');
        }
    }

    return (
        <div className="game">
            {isComplete && (
                <div className="p-4 mb-4 text-lg text-center text-green-800 bg-green-100 rounded-lg" role="alert">
                    <span className="font-bold">Parabéns!</span> Resolveste o Sudoku! 🥳
                </div>
            )}
            <Board
                board={board}
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
            />
            <div className="mt-4 text-center text-gray-500">
                Selecione uma célula e use os números do seu teclado (1-9) para preencher.
            </div>
            <Controls onCheck={checkSolution} />
        </div>
    );
};

export default Game;