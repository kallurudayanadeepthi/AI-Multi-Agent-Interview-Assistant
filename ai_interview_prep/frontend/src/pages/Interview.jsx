import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { submitAnswer } from '../api/api';
import { LucideSend, LucideLoader2, LucideCheckCircle } from 'lucide-react';

export default function Interview() {
  const { interviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const questions = location.state?.questions || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState(null);

  if (questions.length === 0) {
    return <div className="text-center mt-20 text-xl">No questions found. Please restart the setup.</div>;
  }

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    setEvaluating(true);
    try {
      const res = await submitAnswer({
        interview_id: interviewId,
        question_index: currentIndex,
        answer: answer
      });
      setEvalResult(res.evaluation);
    } catch (err) {
      console.error(err);
      alert("Error submitting answer.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    setAnswer("");
    setEvalResult(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
    } else {
      setLoading(true);
      // Navigate to feedback page
      navigate(`/feedback/${interviewId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentIndex) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl mb-6">
        <h2 className="text-2xl font-semibold mb-6 leading-relaxed">
          {questions[currentIndex]}
        </h2>

        {!evalResult ? (
          <div className="space-y-4">
            <textarea
              className="w-full h-48 bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white resize-none"
              placeholder="Type your answer here..."
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            ></textarea>
            
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                disabled={evaluating || !answer.trim()}
                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                {evaluating ? <><LucideLoader2 className="animate-spin mr-2" /> Evaluating...</> : <><LucideSend className="mr-2 w-4 h-4" /> Submit Answer</>}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <LucideCheckCircle className="text-emerald-400 w-6 h-6" />
                <h3 className="text-xl font-bold text-emerald-400">Answer Evaluated</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(evalResult).map(([key, value]) => {
                  if (key.includes("_score")) {
                    const type = key.replace("_score", "");
                    const feedbackKey = `${type}_feedback`;
                    return (
                      <div key={key} className="bg-white/5 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                          <span className="capitalize font-medium text-gray-300">{type.replace("_", " ")}</span>
                          <span className={`font-bold ${value >= 8 ? 'text-emerald-400' : value >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>{value}/10</span>
                        </div>
                        <p className="text-sm text-gray-400">{evalResult[feedbackKey]}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-colors flex items-center"
              >
                {currentIndex < questions.length - 1 ? "Next Question" : "Finish & Get Feedback"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
