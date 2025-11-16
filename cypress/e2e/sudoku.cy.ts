import { SudokuPage } from "../support/pages/SudokuPage";

const sudokuPage = new SudokuPage();

describe('Sudoku Game', () => {
  beforeEach(() => {
    sudokuPage.visit();
  });

  it('should load the game board', () => {
    cy.contains(sudokuPage.texts.gameTitle).should('be.visible');

    sudokuPage.cellShouldContain(0, 0, 5);
    sudokuPage.cellShouldBeEmpty(0, 2);
  });

  it('should allow the player select a cell and input a number', () => {
    sudokuPage.clickCell(0, 2);
    sudokuPage.insertNumber(9);
    sudokuPage.cellShouldContain(0, 2, 9);

    sudokuPage.interceptAlert(sudokuPage.texts.wrongSolutionAlert);

    sudokuPage.clickCheckButton();
  });

  it('should not allow changing initial numbers', () => {
    sudokuPage.clickCell(0, 0);
    sudokuPage.insertNumber(3);
    sudokuPage.cellShouldContain(0, 0, 5);
    sudokuPage.cellShouldNotContain(0, 0, 3);
  });
});