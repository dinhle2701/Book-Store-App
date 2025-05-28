/* eslint-disable no-unused-vars */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext'; // đường dẫn đúng theo project bạn
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <div className="App">
      <UserProvider>
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
      </UserProvider>
    </div>
  );
}

export default App;
