import React, { useContext, useRef } from 'react';
import { AuthContext } from '../provider/Auth_provider.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';




// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const RegisterForm = () => {

    const {CreateUser} = useContext(AuthContext);
    const formRef = useRef(null);
    const nevigate = useNavigate();
    const location = useLocation();
    
    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (pattern.test(email)) {
            const user = {name,email,password}
            console.log(user);
            CreateUser(email,password)
                .then (result =>{
                    if(result.user){
                        nevigate(location?.state || '/');
                        console.log(result)
                        alert('Registerd susscesfull')
                        formRef.current.reset();    
                    }
                    
        })
        } else {
            alert('Invalid email');
    }   
  
        
    }

    return (
        <div className="flex justify-center items-center h-auto bg-gray-100">
            <form ref={formRef} onSubmit={handleRegister} className="w-full max-w-md bg-white p-6 my-28 rounded-lg shadow-md">
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">User Name</label>
                    <input
                        type="text"
                        name='name'
                        placeholder="Username"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        name='email'
                        placeholder="abc@gmail.com"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        name='password'
                        placeholder="Enter your password"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                {/* <div className="form-control mb-5">
                    <label className="label font-semibold text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Re-enter your password"
                        className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}
                <div className="form-control mt-6">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        Sign Up
                    </button>
                </div>
                <div className='mt-4 text-center'>
                    <p>Already have an account? <Link href="/login" class="text-blue-600 underline pl-2">Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
