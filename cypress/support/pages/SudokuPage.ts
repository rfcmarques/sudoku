export class SudokuPage {
    readonly texts = {
        gameTitle: 'React Sudoku',
        checkButton: 'Verificar',
        wrongSolutionAlert: 'O Sudoku não está correto. Tente novamente!',
    }
    
    visit() {
        cy.visit('/');
    }

    clickCell(row: number, col: number) {
        this.getCell(row, col).click();
    }

    insertNumber(number: string | number) {
        cy.get('body').type(String(number));
    }

    clickCheckButton() {
        cy.contains(this.texts.checkButton).click();
    }

    // --- ASSERTIONS ---

    cellShouldContain(row: number, col: number, number: string | number) {
        this.getCell(row, col).should('contain', String(number));
    }

    cellShouldNotContain(row: number, col: number, number: string | number) {
        this.getCell(row, col).should('not.contain', String(number));
    }

    cellShouldBeEmpty(row: number, col: number) {
        this.getCell(row, col).should('be.empty');
    }

    interceptAlert(expectedText: string) {
        cy.on('window:alert', (text) => {
            expect(text).to.contains(expectedText);
        });
    }

    protected getCell(row: number, col: number) {
        return cy.get(`[data-testid="cell-${row}-${col}"]`);
    }
}