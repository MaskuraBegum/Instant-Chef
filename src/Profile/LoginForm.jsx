import React from 'react';

const LoginForm = () => {
    return (
        <form>
            <div className="form-control mb-5">
                <label className="label font-semibold text-gray-700">Email</label>
                <input
                    type="email"
                    placeholder="abc@gmail.com"
                    className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="form-control mb-5">
                <label className="label font-semibold text-gray-700">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="form-control mt-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
