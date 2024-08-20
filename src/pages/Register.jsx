import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors,  register } from '../redux/features/userSlice';
import { toast } from 'react-toastify';
import { ImSpinner3 } from "react-icons/im";
import OAuth from '../components/OAuth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName:Yup.string().required('Required'),
      lastName:Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('password', values.password); // Ensure this is correct
      formData.append('confirmPassword', values.confirmPassword);
  
      // console.log('Form data:', formData); // Debugging
      dispatch(register(formData));
  }
  
  });

  useEffect(() => {
    if (error) {
        toast.error(error);
        dispatch(clearAllUserErrors());
    }

    if (user) {
        toast.success('Registered successfully');
        navigate('/login');
    }
}, [error, user, navigate, dispatch]);



  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[30%]">
        <div className="flex flex-col items-center mb-6">
          <FaRegUserCircle className="text-6xl text-blue-500 mb-2" />
          <h2 className="text-2xl font-bold">Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First Name..."
            className="focus:outline-none border border-gray-300 p-2 rounded-lg w-full"
          />
          {touched.firstName && errors.firstName ? (
            <p className="text-red-500 text-xs">{errors.firstName}</p>
          ) : null}
          <input
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Last Name..."
            className="focus:outline-none border border-gray-300 p-2 rounded-lg w-full"
          />
          {touched.lastName && errors.lastName ? (
            <p className="text-red-500 text-xs">{errors.lastName}</p>
          ) : null}
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email..."
            className="focus:outline-none border border-gray-300 p-2 rounded-lg w-full"
          />
          {touched.email && errors.email ? (
            <p className="text-red-500 text-xs">{errors.email}</p>
          ) : null}

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password..."
              className="focus:outline-none border border-gray-300 p-2 rounded-lg w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {touched.password && errors.password ? (
            <p className="text-red-500 text-xs">{errors.password}</p>
          ) : null}

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm Password..."
              className="focus:outline-none border border-gray-300 p-2 rounded-lg w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword ? (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          ) : null}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg uppercase font-bold hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            {loading && (
              <ImSpinner3 className="animate-spin mr-2 text-2xl" /> // Spinner icon with animation
            )}
            Signup
          </button>
          <OAuth/>
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link className="text-blue-500 hover:underline" to="/login">
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
