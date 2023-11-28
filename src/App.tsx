import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home-page';
import Header from './components/Header';
import PageNotFoundRouter from './pages/PageNotFoundRouter';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFoundRouter />} />
      </Routes>
    </>
  );
}
