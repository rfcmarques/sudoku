/// <reference types="cypress" />

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

    sudokuPage.clickCheckButton();
    sudokuPage.wrongSolutionToastAppears();
  });

  it('should not allow changing initial numbers', () => {
    sudokuPage.clickCell(0, 0);
    sudokuPage.insertNumber(3);
    sudokuPage.cellShouldContain(0, 0, 5);
    sudokuPage.cellShouldNotContain(0, 0, 3);
  });

  it('should allow starting a new game and reset the board', () => {
    sudokuPage.clickCell(0, 2);
    sudokuPage.insertNumber(9);
    sudokuPage.cellShouldContain(0, 2, 9);

    sudokuPage.clickNewGameButton();
    sudokuPage.modalShouldBeVisible();

    sudokuPage.selectDifficulty('easy');

    sudokuPage.modalShouldNotExist();
    sudokuPage.cellShouldBeEmpty(0, 2);
  });

  it('should fill a random cell when hint button is clicked', () => {
    sudokuPage.getEmptyCells().its('length').then((initialEmptyCount) => {
      sudokuPage.clickHintButton();

      sudokuPage.getEmptyCells().its('length').should('eq', initialEmptyCount - 1);
    });
  });

  it('should disable hint button after 3 uses', () => {
    for (let i = 0; i < 3; i++) {
      sudokuPage.clickHintButton();
    }

    sudokuPage.hintButtonShouldBeDisabled();
  });
});