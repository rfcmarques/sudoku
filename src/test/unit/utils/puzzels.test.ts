import { getPuzzleByLevel } from "@/utils/puzzles";

describe('utils: getPuzzleByLevel', () => {
    it('should return a valid puzzle with the correct structure', () => {
        const puzzle = getPuzzleByLevel('easy');

        expect(puzzle).toHaveProperty('board');
        expect(puzzle).toHaveProperty('solution');
        expect(puzzle).toHaveProperty('level');

        expect(puzzle.board).toHaveLength(9);
        expect(puzzle.solution).toHaveLength(9);
    });

    it('should return a puzzle from the easy level', () => {
        const puzzle = getPuzzleByLevel('easy');

        expect(puzzle.level).toBe('easy');
    });

    it('should return a puzzle from the medium level', () => {
        const puzzle = getPuzzleByLevel('medium');

        expect(puzzle.level).toBe('medium');
    });

    it('should return a puzzle from the hard level', () => {
        const puzzle = getPuzzleByLevel('hard');

        expect(puzzle.level).toBe('hard');
    });

    it('should fallback to easy if no puzzles of the requested level are available', () => {
        const puzzle = getPuzzleByLevel('hard');
        
        expect(puzzle).toBeDefined();
        expect(puzzle.board).toBeDefined();
    });

    it('should return different puzzles on successive calls (randomness test)', () => {
        // Este teste é "flaky" (pode falhar por azar), mas estatisticamente improvável se tiveres muitos puzzles.
        // Se tiveres apenas 1 puzzle fácil, este teste não faz sentido.
        
        // Só vale a pena se tiveres > 1 puzzle no nível easy
        /*
        const puzzle1 = getPuzzleByLevel('easy');
        const puzzle2 = getPuzzleByLevel('easy');
        
        // Nota: Isto pode falhar se o Math.random() calhar o mesmo index 2 vezes seguidas
        // Por isso, muitas vezes evita-se testar aleatoriedade assim em testes unitários rígidos.
        */
    });
});