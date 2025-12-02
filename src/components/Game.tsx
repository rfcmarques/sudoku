import React, { useState, useEffect, useRef } from 'react';
import type {
    CellPosition,
    CellValue,
    DifficultyLevel,
} from '@/types/types';

import Board from '@/components/Board';
import Controls from '@/components/Controls';
import DifficultyModal from '@/components/DifficultyModal';
import { useGameState } from '@/hooks/useGameState';

const Game: React.FC = () => {
    const {
        board,
        currentPuzzle,
        hintCount,
        isComplete,

        startNewGame,
        updateCell,
        useHint,
        checkSolution
    } = useGameState();

    const [selectedCell, setSelectedCell] = useState<CellPosition>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);

    const handleSelectDifficulty = (level: DifficultyLevel) => {
        startNewGame(level);
        setSelectedCell(null);
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

    const handleNumberInput = (value: CellValue) => {
        if (!selectedCell) return;
        updateCell(selectedCell.row, selectedCell.col, value);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!selectedCell) return;

            if (event.key >= '1' && event.key <= '9') {
                handleNumberInput(parseInt(event.key, 10) as CellValue);
            }

            if (['Backspace', 'Delete', '0'].includes(event.key)) {
                handleNumberInput(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, updateCell]);

    const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') return;

        const lastDigit = value.slice(-1);

        if (lastDigit >= '1' && lastDigit <= '9') {
            handleNumberInput(parseInt(lastDigit, 10) as CellValue);
        }

        e.target.value = '';
    };

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
                onHint={useHint}
                hintCount={hintCount}
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