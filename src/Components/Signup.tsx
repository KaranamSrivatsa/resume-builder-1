// components/Signup.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = async () => {
    const { email, password, cnfmpassword } = getValues();
    // if (password !== cnfmpassword) {
    //   console.error("Passwords do not match");
    //   return;
    // }
    navigate('/login');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully!");
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 transform -skew-y-8 bg-green-300 shadow-lg"></div>
        <div className="relative bg-white p-8 shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*[!@#$%^&*.])(?=.*\d)[A-Za-z\d!@#$%^&*.]{6,}$/,
                    message: 'Password must contain at least one letter and one number and one special character'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{errors.password?.message && String(errors.password.message)}</p>
            </div>
            <div>
              <label htmlFor="cnfmpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="cnfmpassword"
                type="password"
                {...register('cnfmpassword', {
                  required: 'Confirm password is required',
                  validate: value => value === getValues('password') || "The passwords do not match"
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{errors.cnfmpassword?.message && String(errors.cnfmpassword.message)}</p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-green-600 hover:text-green-500">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
