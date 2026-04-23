import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">E-SHOP</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Catálogo</Link>
        {token && (
          <Link to="/admin/products/create" className="text-gray-600 hover:text-blue-600 font-medium">
            + Novo Produto
          </Link>
        )}
        {token ? (
          <button onClick={logout} className="flex items-center gap-2 text-red-500">
            <LogOut size={18} /> Sair
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="flex items-center gap-1 text-gray-600"><User size={18} /> Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Cadastrar</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;