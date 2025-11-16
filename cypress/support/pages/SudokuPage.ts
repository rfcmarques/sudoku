/// <reference types="cypress" />

export class SudokuPage {
    readonly texts = {
        gameTitle: 'React Sudoku',
        checkButton: 'Verificar',
        wrongSolutionAlert: 'O Sudoku não está correto. Tente novamente!',
        newGameButton: 'Novo Jogo',
        modalTitle: 'Escolha a Dificuldade',
        easyButton: 'Fácil',
        mediumButton: 'Médio',
        hardButton: 'Difícil',
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

    clickNewGameButton() {
        cy.contains(this.texts.newGameButton).click();
    }

    selectDifficulty(level: 'easy' | 'medium' | 'hard') {
        switch (level) {
            case 'easy':
                cy.contains(this.texts.easyButton).click();
                break;
            case 'medium':
                cy.contains(this.texts.mediumButton).click();
                break;
            case 'hard':
                cy.contains(this.texts.hardButton).click();
                break;
        }
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

    modalShouldBeVisible() {
        cy.contains(this.texts.modalTitle).should('be.visible');
        cy.contains(this.texts.easyButton).should('be.visible');
        cy.contains(this.texts.mediumButton).should('be.visible');
        cy.contains(this.texts.hardButton).should('be.visible');
    }

    modalShouldNotExist() {
        cy.contains(this.texts.modalTitle).should('not.exist');
    }

    protected getCell(row: number, col: number) {
        return cy.get(`[data-testid="cell-${row}-${col}"]`);
    }
}