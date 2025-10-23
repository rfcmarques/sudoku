import './App.css';
import Game from './components/Game';

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 font-sans">
        React Sudoku
      </h1>
      <Game />
    </main>
  );
}

export default App;