import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Toast from '../components/Toast';

const ProductCreate = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category_id: '', image_url: ''
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      navigate('/');
    } catch (err) {
      setError('Erro ao cadastrar produto. Verifique os campos.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <Toast message={error} onClose={() => setError('')} />
      <h2 className="text-2xl font-bold mb-6">Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
          <input type="text" className="w-full border p-2 rounded-lg mt-1" 
            onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
            <input type="number" step="0.01" className="w-full border p-2 rounded-lg mt-1" 
              onChange={e => setFormData({...formData, price: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select className="w-full border p-2 rounded-lg mt-1" 
              onChange={e => setFormData({...formData, category_id: e.target.value})} required>
              <option value="">Selecione...</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input type="url" className="w-full border p-2 rounded-lg mt-1" 
            onChange={e => setFormData({...formData, image_url: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea className="w-full border p-2 rounded-lg mt-1" rows="3"
            onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
          Salvar Produto
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;