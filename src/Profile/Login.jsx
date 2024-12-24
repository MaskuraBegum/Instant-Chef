import React, { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-20">
            <div className="mb-6 text-center w-full max-w-md">
                <p className="text-lg text-amber-800 font-semibold">
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
                <form>
                    {!isLogin && (
                        <div className="form-control mb-5">
                            <label className="label font-semibold text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                    <div className="form-control mb-5">
                        <label className="label font-semibold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="form-control mb-5">
                        <label className="label font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-control mb-5">
                            <label className="label font-semibold text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                    <div className="form-control mt-6">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
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
