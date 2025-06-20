import { useState } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // ✅ Add this at the top

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
   <form
  onSubmit={handleLogin}
  className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow space-y-4"
>
  <h2 className="text-2xl font-bold text-center">Login</h2>
  <input
    className="w-full border p-2 rounded"
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    className="w-full border p-2 rounded"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
  >
    Log In
  </button>
  {error && <p className="text-red-600 text-sm">{error}</p>}
</form>
      <p>
      Don't have an account? <Link to="/signup">Sign up here</Link>
    </p>
  </>
  );
}
