import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Pencil, Save, X } from 'lucide-react';
import api from '../api';
import Toast from '../components/Toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data.data);
      setFormData(res.data.data);
    });
    api.get('/categories').then(res => setCategories(res.data.data));
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/products/${id}`, formData);
      setProduct(res.data.data);
      setIsEditing(false);
    } catch (err) {
      setError('Erro ao salvar alterações.');
    }
  };

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url
    }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  if (!product) return <div className="text-center py-10 italic">Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Toast message={error} onClose={() => setError('')} />
      
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition">
          <ArrowLeft size={20} /> Voltar
        </button>
        
        {token && (
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            {isEditing ? <><X size={18} /> Cancelar</> : <><Pencil size={18} /> Editar Produto</>}
          </button>
        )}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <img src={formData.image_url || 'https://via.placeholder.com/400'} className="w-full h-[400px] object-cover rounded-xl" alt={product.name} />
          {isEditing && (
            <input 
              type="text" 
              className="w-full mt-4 border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="URL da Imagem"
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
            />
          )}
        </div>

        <div className="flex-1 space-y-4">
          {isEditing ? (
            <>
              <input 
                className="text-3xl font-bold w-full border-b focus:border-blue-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <div className="flex gap-4">
                <input 
                  type="number"
                  className="text-2xl text-blue-600 font-bold border-b w-32 outline-none"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
                <select 
                  className="border rounded-lg p-1 outline-none"
                  value={formData.category_id}
                  onChange={e => setFormData({...formData, category_id: e.target.value})}
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <textarea 
                className="w-full border rounded-lg p-2 h-32 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
              <button 
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                <Save size={20} /> Salvar Alterações
              </button>
            </>
          ) : (
            <>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {product.category}
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
              <p className="text-3xl text-blue-600 font-bold">R$ {Number(product.price).toFixed(2)}</p>
              <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
              
              {token && (
                <button 
                  onClick={addToCart}
                  className={`w-full py-4 rounded-xl font-bold mt-6 flex items-center justify-center gap-2 transition shadow-lg ${
                    added 
                    ? 'bg-green-500 text-white shadow-green-100' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                  }`}
                >
                  <ShoppingCart size={22} />
                  {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;