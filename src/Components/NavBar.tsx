import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../authSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebase';

const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error: any) { // Explicitly typing error as any to resolve TS18046
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">Your App</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/home" className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/home' ? 'bg-gray-900 text-white' : ''}`}>
                  Home
                </Link>
                {user && (
                 <Link to="/about" className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/about' ? 'bg-gray-900 text-white' : ''}`}>
                  About
                </Link>
                )}
                {user ? (
                  <>
                    <span className="text-gray-300">Welcome, {user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/login' ? 'bg-gray-900 text-white' : ''}`}>
                      Login
                    </Link>
                    <Link to="/signup" className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${pathname === '/signup' ? 'bg-gray-900 text-white' : ''}`}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
