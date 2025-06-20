import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import QuizPage from './pages/QuizPage'; // Make sure you created this file
import { useState } from 'react';

function App() {
  // Share quizQuestions across components (optional if fetched in QuizPage)
  const [quizQuestions, setQuizQuestions] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<Dashboard setQuizQuestions={setQuizQuestions} />}
        />
        <Route
          path="/quiz"
          element={<QuizPage questions={quizQuestions} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
