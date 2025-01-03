import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-20">
            <div className="mb-6 text-center w-full max-w-md">
                <p className="text-lg text-amber-700 font-semibold">
                    Create an account or log in to explore exclusive recipes and save your favorites for a personalized cooking experience!
                </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                    {isLogin ? 'Welcome Back!' : 'Create an Account'}
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    {isLogin
                        ? 'Please login to continue.'
                        : 'Fill in the details to register.'}
                </p>
                {isLogin ? <LoginForm> </LoginForm> : <RegisterForm></RegisterForm>
                }
                <p className="text-center mt-6 text-gray-600">
                    {isLogin
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                    <button
                        onClick={toggleForm}
                        className="text-blue-600 font-bold hover:underline">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
