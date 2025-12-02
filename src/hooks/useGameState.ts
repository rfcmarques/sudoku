import { useCallback } from "react";
import type { Board, CellValue, DifficultyLevel, Puzzle } from "@/types/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getPuzzleByLevel } from "@/utils/puzzles";
import toast from "react-hot-toast";

export const useGameState = () => {
    const [currentPuzzle, setCurrentPuzzle] = useLocalStorage<Puzzle>('currentPuzzle', getPuzzleByLevel('medium'));
    const [board, setBoard] = useLocalStorage<Board>('sudoku-board', currentPuzzle.board);
    const [hintCount, setHintCount] = useLocalStorage<number>('hintCount', 0);
    const [isComplete, setIsComplete] = useLocalStorage<boolean>('isComplete', false);

    const startNewGame = useCallback((level: DifficultyLevel) => {
        const newPuzzle = getPuzzleByLevel(level);
        setCurrentPuzzle(newPuzzle);
        setBoard(newPuzzle.board);
        setHintCount(0);
        setIsComplete(false);
    }, [setCurrentPuzzle, setBoard, setHintCount, setIsComplete]);

    const updateCell = useCallback((row: number, col: number, value: CellValue) => {
        if (isComplete) return;
        if (currentPuzzle.board[row][col] !== 0) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = value;
        setBoard(newBoard);
    }, [board, currentPuzzle, isComplete, setBoard]);

    const useHint = useCallback(() => {
        if (isComplete) return;

        const emptyCells: { row: number, col: number }[] = [];
        board.forEach((row: CellValue[], rIndex: number) => {
            row.forEach((cellValue: CellValue, cIndex: number) => {
                if (cellValue === 0) {
                    emptyCells.push({ row: rIndex, col: cIndex });
                }
            })
        });

        if (emptyCells.length === 0) {
            toast.error('Não há células vazias para dar uma dica!');
            return;
        }

        if (hintCount >= 3) {
            toast.error('Não há mais dicas disponíveis!');
            return;
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const { row, col } = randomCell;
        const solutionValue = currentPuzzle.solution[row][col];

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = solutionValue;
        setBoard(newBoard);
        setHintCount(prev => prev + 1);
    }, [board, currentPuzzle, hintCount, isComplete, setBoard, setHintCount]);

    const checkSolution = useCallback(() => {
        const currentBoardStr = JSON.stringify(board);
        const solutionBoardStr = JSON.stringify(currentPuzzle.solution);

        if (currentBoardStr !== solutionBoardStr) {
            toast.error('O Sudoku não está correto. Tente novamente!');
            return;
        }

        setIsComplete(true);
        toast.success('Parabéns! Resolveste o Sudoku! 🥳');
    }, [board, currentPuzzle, setIsComplete]);

    return {
        board,
        currentPuzzle,
        hintCount,
        isComplete,

        startNewGame,
        updateCell,
        useHint,
        checkSolution
    }
}