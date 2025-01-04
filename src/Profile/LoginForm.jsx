import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../provider/Auth_provider.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const {signIn, googleLog} = useContext(AuthContext);
    const formRef = useRef(null);
    const nevigate = useNavigate();
    const location = useLocation();


    const [showPass, setShowPass] = useState(false);

    const PasswordVisibility = () => {
        setShowPass(!showPass);
    }

    const googleClick = () => {
            googleLog()
            .then((result) => {
                if(result.user){
                    nevigate(location?.state || '/');
                    alert('Successfully logged in');
                }
                
            })
            .catch((error) => {
                alert(error)
            })
    }
    
    const handlelogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const user = {email,password}
        console.log(user);
        signIn(email,password)
        .then(result =>{
            if(result.user){
                nevigate(location?.state || '/');
                console.log(result.user)
                alert('User is successfully loged in')
                formRef.current.reset();
            }
            
        })
        .catch(error=>{
            console.log(error.message)
            alert(error.message)
        })

    }


    return (
        <div className="flex justify-center items-center h-auto bg-gray-100">
            <form ref={formRef} onSubmit={handlelogin} className="w-full max-w-md bg-white p-6 my-28 rounded-lg shadow-md">
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder="abc@gmail.com"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='flex items-center form-control mb-5 relative'>
                    <input
                        type={showPass ? 'text': 'password'}
                        placeholder="Enter your password"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 "
                    />
                    <i
                        className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                        onClick={PasswordVisibility}
                    ></i>
                </div>

                <div className="form-control">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                        Login
                    </button>
                </div>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-dotted border-gray-300"></div>
                    <span className="mx-3 text-gray-500 font-medium">Or</span>
                    <div className="flex-grow border-t border-dotted border-gray-300"></div>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={googleClick} className="w-full bg-red-600 text-white font-medium py-3 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300">
                        <div className='pr-2'>
                            <i className="fa-brands fa-google"></i>
                        </div>
                        Log in with Google
                    </button>
                    <div className="flex items-center ">
                        <div className="flex-grow border-t border-dotted border-gray-300"></div>
                        <span className="mx-3 text-gray-500 font-medium">Or</span>
                        <div className="flex-grow border-t border-dotted border-gray-300"></div>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300">
                        <div className='pr-2'>
                            <i class="fa-brands fa-facebook"></i>
                        </div>
                        Log in with Facebook
                    </button>
                    <div className='mt-4 text-center'>
                        <p>Don't have an account? <Link to="/register" className="text-blue-600 underline pl-2">Registration</Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
