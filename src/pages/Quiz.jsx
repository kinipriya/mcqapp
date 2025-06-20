import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

export default function Quiz() {
  const { chapterId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('chapter_id', chapterId);

      setQuestions(data);
    };

    fetchQuestions();
  }, [chapterId]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      {questions.length === 0 ? (
        <p>No questions found for this chapter.</p>
      ) : (
        questions.map((q, i) => (
          <div key={q.id} className="mb-4">
            <p className="font-semibold">
              {i + 1}. {q.question_text}
            </p>
            <ul className="pl-4 list-disc">
              <li>{q.option_a}</li>
              <li>{q.option_b}</li>
              <li>{q.option_c}</li>
              <li>{q.option_d}</li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
