import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

export default function Dashboard({ setQuizQuestions }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const currentUser = session.user;
      setUser(currentUser);

      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      setProfile(profileData);

      const { data: subjectData } = await supabase
        .from('subjects')
        .select('*')
        .eq('class_level', profileData.class_level);

      setSubjects(subjectData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedSubject) return;
      const { data } = await supabase
        .from('chapters')
        .select('*')
        .eq('subject_id', selectedSubject);
      setChapters(data);
    };

    fetchChapters();
  }, [selectedSubject]);

  const handleStartQuiz = async () => {
    if (!selectedChapter) return;

      await supabase.from('quiz_logs').insert([
    {
      user_id: user.id,
      chapter_id: selectedChapter,
    }
  ]);
  
    const { data: questions } = await supabase
      .from('questions')
      .select('*')
      .eq('chapter_id', selectedChapter);

    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 7);
    setQuizQuestions(selected);

    navigate('/quiz');
  };

  if (!user || !profile) return <p className="text-left mt-4 ml-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-start">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Welcome, {profile.name} (Class {profile.class_level})
        </h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Select Subject:</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedChapter('');
            }}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        {chapters.length > 0 && (
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Select Chapter:</label>
            <select
              className="w-full border p-2 rounded"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
            >
              <option value="">-- Select Chapter --</option>
              {chapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleStartQuiz}
          disabled={!selectedChapter}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
