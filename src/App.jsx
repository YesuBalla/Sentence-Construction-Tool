import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TestPage from './components/TestPage';
import Result from './components/FeedbackScreen';
import './index.css';


export default function App() {
  return (
    <Router>
      <div className="w-screen h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sentense-construction" element={<TestPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}