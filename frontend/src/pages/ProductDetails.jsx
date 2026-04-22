import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data.data));
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row gap-8">
      <img src={product.image_url || 'https://via.placeholder.com/400'} className="w-full md:w-1/2 h-96 object-cover rounded-lg" />
      <div className="flex-1">
        <span className="text-blue-600 text-sm font-semibold uppercase">{product.category}</span>
        <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
        <p className="text-2xl text-gray-800 font-bold mt-4">R$ {product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 hover:bg-blue-700 transition">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;