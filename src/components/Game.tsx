import React, { useState } from 'react';
import type { CellPosition, CellValue, DifficultyLevel } from '@/types/types';

import Board from '@/components/Board';
import Controls from '@/components/Controls';
import DifficultyModal from '@/components/DifficultyModal';
import { useGameState } from '@/hooks/useGameState';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useKeyboardInput } from '@/hooks/useKeyboardInput';

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

    const { hiddenInputRef, scrollAnchorRef, focusAndScroll } = useAutoScroll();

    const isKeyboardEnabled = !!selectedCell && !isComplete && !isModalOpen;

    useKeyboardInput((value) => {
        if (selectedCell) {
            updateCell(selectedCell.row, selectedCell.col, value);
        }
    }, isKeyboardEnabled);

    const handleSelectDifficulty = (level: DifficultyLevel) => {
        startNewGame(level);
        setSelectedCell(null);
        setIsModalOpen(false);
    }

    const handleCellClick = (row: number, col: number) => {
        setSelectedCell({ row, col });
        focusAndScroll(row);
    };

    const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || !selectedCell) return;

        const lastDigit = value.slice(-1);

        if (lastDigit >= '1' && lastDigit <= '9') {
            updateCell(selectedCell.row, selectedCell.col, parseInt(lastDigit, 10) as CellValue);
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
                style={{ position: 'absolute', opacity: 0, top: '1px', left: '1px' }}
            />
            <div ref={scrollAnchorRef} style={{ height: '1px', width: '1px' }} />

            <div className="mt-4 text-center text-gray-500">
                Selecione uma célula e use os números do teu teclado (1-9) para preencher.
            </div>

            <Controls
                onCheck={checkSolution}
                onNewGame={() => setIsModalOpen(true)}
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