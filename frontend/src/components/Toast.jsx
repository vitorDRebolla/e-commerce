import { XCircle, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 shadow-lg rounded flex items-center gap-3">
        <XCircle className="text-red-500" size={20} />
        <div className="flex-1">
          <p className="text-sm text-red-700 font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="text-red-400 hover:text-red-600 transition">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toast;