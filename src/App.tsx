import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AIConsultationPage from './components/AIConsultationPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai-consultation" element={<AIConsultationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;