import React,{useEffect, useMemo,useState} from "react";
import questionsData from '../../data/questions.json';

export default function FeedbackScreen() {
  const questions = useMemo(() => questionsData.data.questions, []);
  const getAnsweredQuestions = JSON.parse(localStorage.getItem('x-doc-user-answer-key')) || []
  const [results, setResults] = useState([]);
  const score = results?.reduce(
    (acc, q, i) => (q.isCorrect ? acc + 1 : acc),
    0
  );
  const fillBlanks = (sentence, words) => {
    const parts = sentence.split("_____________");
    return parts
      .map((part, i) => (i < words?.length ? part + words[i] : part))
      .join("");
  };
  const prepareData = () =>{
    const resultArray = questions.map((q) => {
      const answer = getAnsweredQuestions.find((ua) => ua.questionId === q.questionId);
      console.log(answer,"---")
      return {
        correctAnswer: fillBlanks(q.question, q.correctAnswer),
        userAnswer: fillBlanks(q.question, answer?.userAttempt),
        isCorrect: answer?.isUserAttemptedCorrect,
      };
    });
    setResults(resultArray);
  }
  useEffect(()=>{
    prepareData()
  },[])
  

  const percentage = Math.round((score / results.length) * 100);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Score Ring */}
      <div className="relative w-32 h-32 mb-6">
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#22c55e"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-2xl font-bold text-green-600">{percentage}</div>
          <div className="text-sm text-gray-500">Score</div>
        </div>
      </div>

      <p className="text-center text-gray-600 mb-8 max-w-lg">
        {percentage >= 90
          ? "🔥 Great job! You nailed it."
          : "⚠️ You did well, but there's room to improve. Review your answers below."}
      </p>

      {/* Answer Feedback */}
      <div className="w-full max-w-3xl space-y-4 text-gray-600">
        {console.log(results)}
        {results?.map((q, index) => {
          const userAnswer = q.userAnswer;
          const isCorrect = q.isCorrect;

          return (
            <div key={index} className="bg-white rounded-xl shadow p-4">
              <div className="text-xs font-semibold text-gray-500">Prompt</div>
              <div className="mb-2 text-gray-600">{q.correctAnswer}</div>

              <div className="text-xs font-semibold text-gray-500 mb-1">
                Your response{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-500"}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div
                className={`p-2 rounded-md ${
                  isCorrect ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {userAnswer || <em className="text-gray-400">No answer</em>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
