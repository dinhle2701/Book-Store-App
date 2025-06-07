/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext'; // đường dẫn đúng theo project bạn
import { CartProvider  } from './context/CartContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider >
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {/* <UserDashboard/> */}
            <AppRoutes />

          </BrowserRouter>
        </CartProvider >
      </UserProvider>
    </div>
  );
}

export default App;
