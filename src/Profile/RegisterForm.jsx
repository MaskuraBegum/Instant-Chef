import React from 'react';

const RegisterForm = () => {
    return (
        <div className="flex justify-center items-center h-auto bg-gray-100">
            <form className="w-full max-w-md bg-white p-6 my-28 rounded-lg shadow-md">
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">User Name</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-control mt-6">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        Sign Up
                    </button>
                </div>
                <div className='mt-4 text-center'>
                    <p>Already have an account? <a href="/login" class="text-blue-600 underline pl-2">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
