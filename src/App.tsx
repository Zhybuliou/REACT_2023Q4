import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PageNotFoundRouter from './pages/PageNotFoundRouter';
import FormPage from './pages/FormPage';
import SecondFormPage from './pages/SecondFormPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uncontrolled-form" element={<FormPage />} />
        <Route path="/controlled-form" element={<SecondFormPage />} />
        <Route path="*" element={<PageNotFoundRouter />} />
      </Routes>
    </>
  );
}
