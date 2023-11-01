import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home-page';
import Header from './components/Header';
import Wrapper from './pages/Wrapper';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/pages/*" element={<HomePage />}>
          <Route path="messages" element={<div>messages</div>} />
        </Route>
      </Routes>
    </>
  );
}
