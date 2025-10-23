import React, { useState } from 'react';
import type { Board as BoardType } from '../types/types';
import { initialBoard } from '../utils/sudoku';
import Board from './Board';

const Game: React.FC = () => {
    // Usamos o useState para guardar o estado atual do tabuleiro
    // e inicializamo-lo com o nosso puzzle.
    const [board, setBoard] = useState<BoardType>(initialBoard);

    // Por agora, este componente apenas renderiza o tabuleiro.
    return (
        <div className="game">
            <Board board={board} />
        </div>
    );
};

export default Game;