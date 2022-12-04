// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import Register from './pages/register/Register';
import Login from './pages/login/Login';


function App() {
  return (
    <>

      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/user"  element={<User />} /> */}
      </Routes>

    </>
  );
}

export default App;
