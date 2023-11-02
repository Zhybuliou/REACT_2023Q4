import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home-page';
import Header from './components/Header';
import CharacterCard from './components/CharacterCard';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/pages/1" replace />} />
        <Route path="/pages/:page" element={<HomePage />}>
          <Route path="character/:id" element={<CharacterCard />} />
        </Route>
      </Routes>
    </>
  );
}
