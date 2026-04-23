import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Toast from '../components/Toast';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/register', formData);
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Toast message={error} onClose={() => setError('')} />
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Criar Conta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Nome</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">E-mail</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">Senha</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-2.5 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Finalizar Cadastro
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Já tem uma conta? <Link to="/login" className="text-blue-600 font-semibold">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;