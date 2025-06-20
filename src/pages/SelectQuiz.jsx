import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

export default function SelectQuiz() {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await supabase.from('subjects').select('*');
      setSubjects(data);
    };
    fetchSubjects();
  }, []);

  const handleSubjectChange = async (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    setSelectedChapter('');

    const { data } = await supabase
      .from('chapters')
      .select('*')
      .eq('subject_id', subjectId);

      console.log('Fetched Chapters:', data);
    setChapters(data);
  };

  const handleStartQuiz = () => {
    if (!selectedSubject || !selectedChapter) {
      alert('Please select both subject and chapter.');
      return;
    }

    // Navigate to quiz page with chapter ID as query or param
    navigate(`/quiz/${selectedChapter}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Start Your Quiz</h2>

      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">Select Subject</option>
        {subjects.map((subj) => (
          <option key={subj.id} value={subj.id}>
            {subj.name}
          </option>
        ))}
      </select>

      <select
        className="w-full mb-4 p-2 border rounded"
        value={selectedChapter}
        onChange={(e) => setSelectedChapter(e.target.value)}
        disabled={!chapters.length}
      >
        <option value="">Select Chapter</option>
        {chapters.map((ch) => (
          <option key={ch.id} value={ch.id}>{ch.title}         
          </option>
        ))}
      </select>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
}
