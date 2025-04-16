import React, { useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom'
import questionsData from '../../data/questions.json';
import './index.css';



const TestPage = () => {
  const questions = useMemo(() => questionsData.data.questions, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBlank, setCurrentBlank] = useState(0);
  const [filledAnswers, setFilledAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedWords, setSelectedWords] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate()

  const currentQuestion = questions[currentIndex];


  useEffect(() => {
    localStorage.removeItem('x-doc-user-answer-key');
    const blanksArray = Array.from({ length: currentQuestion?.blanks }, (_, i) => ({
      index: i,
      word: ''
    }));
    setFilledAnswers(blanksArray);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        
        if (prev <= 1) {
            
          clearInterval(timer);
          handleNext();
        
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);
  const modifyObjectToList = (userAnswers) =>{
    let empty=[]
    for(let answer of userAnswers){
      empty.push(answer.word)
    }
    return empty
  }

  const handleWordSelect = (word) => {
    const emptyIndex = filledAnswers.findIndex((answer) => answer.word === '');
    if (emptyIndex === -1) return;

    const updatedAnswers = [...filledAnswers];
    updatedAnswers[emptyIndex] = { index: emptyIndex, word };
    console.log(updatedAnswers)
    setFilledAnswers(updatedAnswers);
    setSelectedWords((prev) => [...prev, word]);
  };

  const checkAnswer = () =>{
    let checkCount = 0
    for(let i=0;i<currentQuestion.blanks;i++){
      if(currentQuestion["correctAnswer"][i] === currentQuestion["userAttempt"][i]){
        checkCount+=1
      }
    }
    if(checkCount == 4){
      return true
    }else{
      return false
    }
  }

  const handleNext = () => {
    currentQuestion["userAttempt"] = modifyObjectToList(filledAnswers);
    currentQuestion['isUserAttemptedCorrect'] = checkAnswer()
    const currentQ = {
      questionId: currentQuestion.questionId,
      userAttempt: currentQuestion["userAttempt"],
      isUserAttemptedCorrect: currentQuestion['isUserAttemptedCorrect'],
    };
  
    let updatedAnswers = [...answeredQuestions, currentQ];
  
    // Set state
    setAnsweredQuestions(updatedAnswers);
  
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentBlank(0);
      setTimeLeft(30);
      setFilledAnswers([]);
      setSelectedWords([]);
    } else {
      localStorage.setItem("x-doc-user-answer-key", JSON.stringify(updatedAnswers));
      navigate('/result');
    }
  };
  

  const deSelect = ({ index, word }) => {
    const updatedAnswers = [...filledAnswers];
    updatedAnswers[index] = { index, word: '' };

    const updatedSelected = selectedWords.filter((w) => w !== word);

    setFilledAnswers(updatedAnswers);
    setSelectedWords(updatedSelected);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className="quiz-container">
      <div className="quiz-header">
        <div>Question {currentIndex + 1} of {questions?.length}</div>
        <div>Time Left: <strong>{timeLeft}</strong>s</div>
      </div>
      <div className="progress-bar">
          {questions?.map((_, i) => <hr
            key={i}
            className={`step 
                ${i < currentIndex ? 'completed' : ''} 
                ${i === currentIndex ? 'active' : ''}`}
            />)}
          
        </div>

      <h4 className="question-text">
        {currentQuestion?.question.split("_____________").map((part, i) => (
            <React.Fragment key={i}>
            {part + ' '}
            {i < currentQuestion.options.length && (
                <span className="fill-box" onClick={() => deSelect(filledAnswers[i])}>
                     <span className="blank-line" ></span>
                    {(filledAnswers[i]?.index === i && filledAnswers[i]?.word!=='') && <span className="answer">{filledAnswers[i]?.word}</span>}
                </span>
            )}
            </React.Fragment>
        ))}
        </h4>
      <div className="options-container">
        {currentQuestion?.options.map((word, i) => (
          <button
            key={i}
            className="option-btn"
            onClick={() => handleWordSelect(word)}
            disabled={selectedWords?.includes(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="quiz-footer">
        <button onClick={handleNext} disabled={selectedWords.length !== 4}>
          Next
        </button>
      </div>
      
    </div>
    </div>
    
  );
};

export default TestPage;
