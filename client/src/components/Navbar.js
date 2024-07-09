import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Dynamic Form App</Link>
        <div>
          {token ? (
            <div className='flex gap-5 items-center'>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Register</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </div>
          ) : (
            <div className='flex gap-5 items-center'>
              <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Register</Link>
              <Link to="/login" className="mr-4">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
