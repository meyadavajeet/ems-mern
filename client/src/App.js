// import logo from './logo.svg';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import Register from './pages/register/Register';
import Login from './pages/login/Login';


function App() {
  return (
    <>

      <Routes>
        <Route path="/" exact element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        }

        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/user"  element={<User />} /> */}
      </Routes>

    </>
  );
}

export const ProtectedRoutes = (props) => {
  if (localStorage.getItem("user")) return props.children;
  else return <Navigate to="/login" />
}

export default App;
