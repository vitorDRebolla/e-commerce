import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Search, Filter } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    fetchProducts();
    api.get('/categories').then(res => setCategories(res.data.data));
  }, [page, category]);

  const fetchProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}&page=${page}`);
    setProducts(res.data.data);
    setMeta(res.data.meta);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <select 
          className="border rounded-lg px-4 py-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.category}</p>
            <p className="text-blue-600 font-bold">R$ {product.price.toFixed(2)}</p>
            <Link to={`/product/${product.id}`} className="block mt-4 text-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200">Ver Detalhes</Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: meta.last_page || 0 }, (_, i) => (
          <button 
            key={i + 1} 
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;