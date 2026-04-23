import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Toast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (err) {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toast message={error} onClose={() => setError('')} />
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="E-mail" 
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Acessar Sistema
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-sm text-gray-500 hover:text-blue-600 transition">Não tenho conta ainda</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;