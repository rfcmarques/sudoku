import './App.css';
import Game from './components/Game';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 font-sans">
        Sudoku
      </h1>
      <Game />

      <Toaster
        position="bottom-center"
        gutter={8}
        toastOptions={{
          style: {
            background: '#334155',
            color: '#f1f5f9',
          },
        }}
      />
    </main>
  );
}

export default App;