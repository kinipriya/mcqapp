import { useEffect, useState } from 'react';

export default function QuizPage({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Quiz Completed!</h2>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={handleRestart}
        >
          Take Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentIndex + 1} of {questions.length}
      </h2>
      <p className="mb-4 text-lg font-medium">{currentQuestion.question_text}</p>
      <div className="space-y-2">
       {['A', 'B', 'C', 'D'].map((optionKey) => {
  const optionText = currentQuestion[`option_${optionKey}`];
  const isSelected = selectedOption === optionKey;
  const isCorrect = currentQuestion.correct_option.toUpperCase() === optionKey;

  console.log('optionKey', optionKey);
  console.log('isCorrect', isCorrect);
  console.log('currentQuestion.correct_answer', currentQuestion.correct_option);

  let bgColor = 'hover:bg-gray-50';
  let borderColor = 'border';
  let icon = '';

  if (showExplanation && isSelected) {
    if (isCorrect) {
      bgColor = 'bg-green-100';
      borderColor = 'border-green-400';
      icon = '✅';
    } else {
      bgColor = 'bg-red-100';
      borderColor = 'border-red-400';
      icon = '❌';
    }
  }
  // else if (showExplanation && isCorrect) {
    // highlight correct option even if not selected
  //  bgColor = 'bg-green-50';
   // borderColor = 'border-green-300';
    //icon = '✅';
  //}

  return (
    <button
      key={optionKey}
      className={`w-full text-left px-4 py-2 border rounded transition ${bgColor} ${borderColor} flex items-center justify-between`}
      onClick={() => handleAnswer(optionKey)}
      disabled={showExplanation}
    >
      <span>
        {optionKey}. {optionText}
      </span>
      {showExplanation && icon && <span className="text-lg">{icon}</span>}
    </button>
  );
})}
      </div>

      {showExplanation && (
            <div className="mt-6 p-4 bg-gray-50 border rounded text-left">
           
           <p
      className={`font-medium mb-2 ${
        selectedOption?.toUpperCase() === currentQuestion.correct_option.toUpperCase()
          ? 'text-green-700'
          : 'text-red-700'
      }`}
    >
      {selectedOption?.toUpperCase() === currentQuestion.correct_option.toUpperCase()
        ? '✅ Your answer is correct!'
        : '❌ Your answer is wrong.'}
    </p>
            {currentQuestion.explanation && (
      <p className="mt-3 text-gray-800">Explanation : {currentQuestion.explanation}</p>
    )}


          {currentQuestion.explanation_image && (
            <img
              src={currentQuestion.explanation_image}
              alt="Explanation"
              className="mt-3 max-w-full h-auto border rounded text-left"
            />
          )}
          <div className="mt-4">
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded text-left hover:bg-blue-700"
            onClick={handleNext}
          >
            Next Question
          </button>
          </div>
        </div>
       
      )}

      
    </div>
  );
}
