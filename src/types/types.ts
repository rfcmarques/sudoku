export type CellValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Board = CellValue[][];

export type CellPosition = {
    row: number;
    col: number;
} | null;

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'test';

export type Puzzle = {
    level: DifficultyLevel;
    board: Board;
    solution: Board;
}