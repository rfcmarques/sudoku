import React, { useState, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import type {
    Board as BoardType,
    CellPosition,
    CellValue,
    DifficultyLevel,
    Puzzle
} from '../types/types';

import { puzzles } from '../utils/puzzles';

import Board from './Board';
import Controls from './Controls';
import DifficultyModal from './DifficultyModal';

const getPuzzleByLevel = (level: DifficultyLevel): Puzzle => {
    const filteredPuzzles = puzzles.filter(
        (puzzle) => puzzle.level === level
    );

    if (filteredPuzzles.length === 0) {
        return puzzles.find(p => p.level === 'easy')!;
    }

    const randomIndex = Math.floor(Math.random() * filteredPuzzles.length);
    return filteredPuzzles[randomIndex];
}

const Game: React.FC = () => {
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>(getPuzzleByLevel('easy'));
    const [board, setBoard] = useState<BoardType>(currentPuzzle.board);
    const [selectedCell, setSelectedCell] = useState<CellPosition>(null);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    const startNewGame = (level: DifficultyLevel) => {
        const newPuzzle = getPuzzleByLevel(level);
        setCurrentPuzzle(newPuzzle);
        setBoard(newPuzzle.board);
        setSelectedCell(null);
        setIsComplete(false);
    }

    const handleSelectDifficulty = (level: DifficultyLevel) => {
        startNewGame(level);
        setIsModalOpen(false);
    }

    const openNewGameModal = () => {
        setIsModalOpen(true);
    }

    const handleCellClick = (
        row: number,
        col: number
    ) => {
        setSelectedCell({ row, col });
        hiddenInputRef.current?.focus({ preventScroll: true });

        if (row > 3) {
            setTimeout(() => {
                scrollAnchorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }, 500);
        }
    };

    const handleNumberInput = useCallback((value: CellValue) => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;

        if (currentPuzzle.board[row][col] !== 0) return;

        const newBoard = board.map(rowArray => [...rowArray]);
        newBoard[row][col] = value;
        setBoard(newBoard);
    }, [selectedCell, board, currentPuzzle]);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {

            if (!selectedCell) return;

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
    }, [selectedCell, handleNumberInput, isComplete]);

    const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') return;

        const lastDigit = value.slice(-1);

        if (lastDigit >= '1' && lastDigit <= '9') {
            const number = parseInt(lastDigit, 10) as CellValue;
            handleNumberInput(number);
        }

        e.target.value = '';
    };

    const checkSolution = () => {
        const currentBoardStr = JSON.stringify(board);
        const solutionBoardStr = JSON.stringify(currentPuzzle.solution);

        if (currentBoardStr !== solutionBoardStr) {
            toast.error('O Sudoku não está correto. Tente novamente!');
            return;
        }

        setIsComplete(true);
        setSelectedCell(null);
    }

    const handleHint = () => {
        const emptyCells: { row: number; col: number }[] = [];

        board.forEach((row, rIndex) => {
            row.forEach((cellValue, cIndex) => {
                if (cellValue === 0) {
                    emptyCells.push({ row: rIndex, col: cIndex });
                }
            })
        })

        if (emptyCells.length === 0) {
            toast.error('Não há células vazias para dar uma dica!');
            return;
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const { row, col } = randomCell;

        const solutionValue = currentPuzzle.solution[row][col];

        const newBoard = board.map(rowArray => [...rowArray]);
        newBoard[row][col] = solutionValue;
        setBoard(newBoard);
    }

    return (
        <div className="game p-4 sm:p-6 bg-white rounded-xl shadow-lg">
            {isComplete && (
                <div className="p-4 mb-4 text-lg text-center text-green-800 bg-green-100 rounded-lg" role="alert">
                    <span className="font-bold">Parabéns!</span> Resolveste o Sudoku! 🥳
                </div>
            )}

            <Board
                currentBoard={board}
                initialBoard={currentPuzzle.board}
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
            />

            <input
                ref={hiddenInputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={handleMobileInputChange}
                style={{
                    position: 'absolute',
                    opacity: 0,
                    top: '1px',
                    left: '1px',
                }}
            />

            <div ref={scrollAnchorRef} style={{ height: '1px', width: '1px' }} />

            <div className="mt-4 text-center text-gray-500">
                Selecione uma célula e use os números do teu teclado (1-9) para preencher.
            </div>

            <Controls 
                onCheck={checkSolution} 
                onNewGame={openNewGameModal} 
                onHint={handleHint}
            />

            <DifficultyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectDifficulty={handleSelectDifficulty}
            />
        </div>
    );
};

export default Game;