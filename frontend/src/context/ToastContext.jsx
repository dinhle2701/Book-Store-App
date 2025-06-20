import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, visible: true }]);

        // 2.7s thì bắt đầu ẩn
        setTimeout(() => {
            setToasts((prev) =>
                prev.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast))
            );
        }, 2700);

        // 3s thì xóa hẳn
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-5 right-5 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              px-4 py-2 rounded shadow text-white
              ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
              transition-all duration-300 ease-in-out
              ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
