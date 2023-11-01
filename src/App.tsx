import { Route, Navigate, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home-page';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/pages/1" replace />} />
        <Route path="/pages/*" element={<HomePage />}>
          <Route
            path="messages"
            element={
              <div>
                <h1>messages</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
