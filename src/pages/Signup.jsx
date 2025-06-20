import { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate(); // ✅ move inside component

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Insert into 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name,
        class_level: parseInt(classLevel),
      },
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      alert('Signup successful! Please check your email to confirm.');
      navigate('/dashboard'); // ✅ redirect after success
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Class (1–10)"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
