# Sudoku Puzzle Generator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vitest](https://img.shields.io/badge/vitest-%23444444.svg?style=for-the-badge&logo=vitest&logoColor=white) ![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) [![Netlify](https://img.shields.io/badge/netlify-%2300C7B7.svg?style=for-the-badge&logo=netlify&logoColor=white)](https://rfcmarques-sudoku.netlify.app/)

A modern, web-based Sudoku puzzle generator and solver built with React and TypeScript. The main goal of this project is to provide an endless supply of Sudoku puzzles for players of all skill levels, wrapped in a clean and responsive user interface.

## Live Demo

Play the game here: [https://rfcmarques-sudoku.netlify.app/](https://rfcmarques-sudoku.netlify.app/)

## Features

- **Puzzle Generator**: Instantly generate unique Sudoku puzzles.
- **Interactive Gameplay**: Play directly in your browser with a user-friendly interface.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Hint System**: Get a random hint when you're stuck.

## Future Features (Roadmap)

I am constantly working to improve the experience. Here are some features planned for the future:

- **Enhanced Puzzle Generation**: Randomly generate new puzzles for multiple difficulty levels (Easy, Medium, Hard, Expert).
- **PDF Export**: Download puzzles as PDFs to print and play by hand.
- **Timer & Time Trials**: Track your solving time and compete against yourself.
- **Game History**: Automatically save progress so you can resume unfinished games later.
- **Advanced Hint System**:
    - **Reveal Selected**: Reveal the correct value for a specific selected cell.
    - **Real-time Validation**: Option to check if your current inputs are correct as you type.
- **Reset Functionality**: Quickly reset the board to start over.
- **Notes / Pencil Marks**: Add candidate numbers to cells to plan your moves.
- **Dark/Light Mode**: Toggle between themes for comfortable viewing.
- **Keyboard Shortcuts**: faster input using keyboard navigation.

## Tech Stack

This project is built using the following technologies:

- **[React](https://react.dev/)**: UI library for building the interface.
- **[TypeScript](https://www.typescriptlang.org/)**: For type-safe code and better developer experience.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds and hot module replacement.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **[Vitest](https://vitest.dev/)**: Blazing fast unit testing framework.
- **[Cypress](https://www.cypress.io/)**: End-to-end testing framework.

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sudoku
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to view the app.
