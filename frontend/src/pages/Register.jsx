import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/register', formData);
      localStorage.setItem('token', res.data.access_token);
      navigate('/');
    } catch (err) {
      alert('Erro ao realizar cadastro. Verifique os dados informados.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input 
            type="text" 
            className="w-full border p-2 rounded mt-1" 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input 
            type="email" 
            className="w-full border p-2 rounded mt-1" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input 
            type="password" 
            className="w-full border p-2 rounded mt-1" 
            onChange={e => setFormData({...formData, password: e.target.value})} 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Register;