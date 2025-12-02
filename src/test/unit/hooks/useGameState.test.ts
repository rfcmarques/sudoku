import { renderHook } from "@testing-library/react";
import { useGameState } from "@/hooks/useGameState";
import { act } from "react";
import { getPuzzleByLevel } from "@/utils/puzzles";

describe('useGameState Hook', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should initialize a medium puzzle by default', () => {
        const { result } = renderHook(() => useGameState());

        expect(result.current.currentPuzzle.level).toBe('medium');
        expect(result.current.hintCount).toBe(0);
        expect(result.current.isComplete).toBe(false);
    });

    it('should restart the hints when a new game starts', () => {
        const { result } = renderHook(() => useGameState());

        act(() => {
            result.current.useHint();
        });

        act(() => {
            result.current.startNewGame('hard');
        });

        expect(result.current.currentPuzzle.level).toBe('hard');
        expect(result.current.hintCount).toBe(0);
        expect(result.current.isComplete).toBe(false);
    });

    it('should update the board when a valid cell is changed', () => {
        const { result } = renderHook(() => useGameState());

        let targetRow = -1, targetCol = -1;

        result.current.board.some((row, rowIndex) => {
            return row.some((cell, cellIndex) => {
                if (cell === 0) {
                    targetRow = rowIndex;
                    targetCol = cellIndex;
                    return true;
                }

                return false;
            });
        });

        act(() => {
            result.current.updateCell(targetRow, targetCol, 5);
        });

        expect(result.current.board[targetRow][targetCol]).toBe(5);
    });

    it('should not update cell if it is part of the initial puzzle', () => {
        const { result } = renderHook(() => useGameState());

        let targetRow = -1, targetCol = -1;

        result.current.currentPuzzle.board.some((row, rIndex) => {
            return row.some((cell, cIndex) => {
                if (cell !== 0) {
                    targetRow = rIndex;
                    targetCol = cIndex;
                    return true;
                }
                return false;
            });
        });

        const originalValue = result.current.board[targetRow][targetCol];

        act(() => {
            result.current.updateCell(targetRow, targetCol, 9);
        });

        expect(result.current.board[targetRow][targetCol]).toBe(originalValue);
        expect(result.current.board[targetRow][targetCol]).not.toBe(9);
    });

    it('should increment hint count when using a hint', () => {
        const { result } = renderHook(() => useGameState());

        expect(result.current.hintCount).toBe(0);

        act(() => {
            result.current.useHint();
        });

        expect(result.current.hintCount).toBe(1);
    });

    it('should detect when the game is won', () => {
        const puzzle = getPuzzleByLevel('medium');
        const solution = puzzle.solution;

        const almostWonBoard = solution.map(row => [...row]);

        let targetRow = 0;
        let targetCol = 0;
        let found = false;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzle.board[r][c] === 0) {
                    targetRow = r;
                    targetCol = c;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (!found) throw new Error("O puzzle de teste não tem células vazias!");

        almostWonBoard[targetRow][targetCol] = 0;

        const correctValue = solution[targetRow][targetCol];

        window.localStorage.setItem('sudoku-puzzle', JSON.stringify(puzzle));
        window.localStorage.setItem('sudoku-board', JSON.stringify(almostWonBoard));

        const { result } = renderHook(() => useGameState());

        act(() => {
            result.current.updateCell(targetRow, targetCol, correctValue);
        });

        act(() => {
            result.current.checkSolution();
        });

        expect(result.current.isComplete).toBe(true);
    });
});