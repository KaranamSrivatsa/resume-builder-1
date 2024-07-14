import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure } from '../authSlice';
import CustomInput from './CustomInput';
import REGEX from '../utils/Regex'

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const onSubmit = () => {
    const { email, password } = getValues();
    dispatch(loginStart());

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(loginSuccess({ email }));
        alert("Account created successfully!");
        navigate('/login');
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
        console.error("Error signing up:", error.message);
        if (error.code === 'auth/email-already-in-use') {
          alert("This email is already in use.");
        } else if (error.code === 'auth/invalid-email') {
          alert("Invalid email address.");
        } else if (error.code === 'auth/weak-password') {
          alert("Weak password. Please choose a stronger password.");
        } else {
          alert("Error signing up. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 transform -skew-y-8 bg-green-300 shadow-lg"></div>
        <div className="relative bg-white p-8 shadow-lg rounded-lg transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
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
             */}
              {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.[A-Za-z])(?=.[!@#$%^&.])(?=.\d)[A-Za-z\d!@#$%^&*.]{6,}$/,
                    message: 'Password must contain at least one letter, one number, and one special character'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
              <p className="text-red-600 text-sm">{errors.password?.message && String(errors.password.message)}</p> */}

          <CustomInput
          label={'Email address'}
          type={'email'}
          {...register('email', {
              required: 'Email is required',
              pattern: {
                  value: REGEX.EMAIL,
                  message: 'Invalid email address'
              }
          })}
          error={errors.email && errors.email.message}
          />      
          <CustomInput label={'password'} type={'password'} {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: REGEX.PASSWORD,
                    message: 'Password must contain at least one letter, one number, and one special character'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}  error={errors.password?.message && String(errors.password.message)} />          
            <CustomInput label={'Confirm Password'} type={'password'} {...register('confirmpassword', {
                  required: 'Confirm password is required',
                  validate: value => value === getValues('password') || "The passwords do not match"
                })} error={errors.password?.message && String(errors.password.message)} />          
            
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