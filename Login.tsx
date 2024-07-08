import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate() 
  const onSubmit = async () => {
    // navigate('/about')
    const { email, password } = getValues();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate('/about'); // Navigate to the /about page after successful login
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      if (error.code === 'auth/user-not-found') {
        alert("No user found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        alert("Incorrect password.");
      } else {
        alert("Error logging in. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 transform -skew-y-6 bg-blue-300 shadow-sm"></div>
        <div className="relative bg-white p-8 shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{errors.email && String(errors.email.message)}</p>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{errors.password && String(errors.password.message)}</p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-500">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
