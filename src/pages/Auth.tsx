import React, {useState} from "react";
import auth_cart from '../assets/auth_cart.png'
import { ShoppingCartOutlined } from '@ant-design/icons';
import {message} from "antd";
import {register} from "../api/userApi.ts";
import {useNavigate} from "react-router-dom";
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



export default function Auth() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [isLogin, setIsLogin] = useState(true);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkFullname = (): boolean=>{
        if(fullname.length <  3){
            messageApi.error('fullname is too short, it should be more than 3 characters');
            return false;
        }
        return true;
    }
    const checkEmail = (): boolean => {
        if(!isValidEmail(email)) {
            messageApi.error('email is invalid');
            return false;
        }
        return true;
    }
    const checkPassword = (): boolean => {
        if(password.length <  6){
            messageApi.error('password is too short, it should be more than 6 characters');
            return false;
        }
        return true;
    }
    const checkConfirmPassword = (): boolean => {
        if(password !== confirmPassword){
            messageApi.error('two passwords are not the same');
            return false;
        }
        return true;
    }


    const onClick = ()=>{
        console.log("clicked", isLogin ? 'Login' : 'Sign up');
        if(!isLogin){
            if(checkFullname() && checkEmail() && checkPassword() && checkConfirmPassword()){
                register(fullname, email, password).then((result) => {
                    if(result.status == 'success') {
                        messageApi.success(result.message)
                        setIsLogin(true)
                    }else
                        messageApi.error(result.message)
                });
            }
        }
    }
    return (
        <div className="flex items-center justify-center h-full">
            {contextHolder}
            <div className="flex min-h-screen bg-[#f7e8e6]">
                {/* Left Section with Image */}
                <div className="hidden md:flex items-center justify-center w-1/2 bg-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 flex items-center w-3/4 mx-auto gap-2">
                            <span className="text-gray-800"><ShoppingCartOutlined /> NEOMART</span>
                        </h1>
                        <img
                            src={auth_cart}
                            alt="Shopping Illustration"
                            className="w-3/4 mx-auto mt-6 rounded-2xl"
                        />
                    </div>
                </div>

                {/* Right Section with Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <div className="bg-[#f7e8e6] rounded-lg p-10 w-full max-w-md shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Happy Shopping</h2>
                        <p className="text-lg text-center text-gray-600 mt-2 font-semibold">
                            {isLogin ? "LOGIN TO YOUR ACCOUNT" : "CREATE NEW ACCOUNT"}
                        </p>

                        <div className="mt-6">
                            {!isLogin && <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-2"
                                onChange={(e) => setFullname(e.target.value)}
                            />}
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-4"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {isLogin ? (
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-4"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            ) : (
                                <div className="flex gap-2 mt-4">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-1/2 p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="w-1/2 p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Primary Button */}
                            <button
                                className={`w-full mt-6 font-semibold py-3 rounded-3xl shadow-md transition duration-300
                                ${isLogin ? 'bg-white text-pink-500' : 'bg-pink-500 text-white'}`}
                                style={isLogin ? {
                                    background: 'linear-gradient(to right, white 3px, white calc(100% - 3px))',
                                    boxShadow: '0 0 0 3px white, 0 1px 2px rgba(0, 0, 0, 0.05)'
                                } : {}}
                                onClick={onClick}
                            >
                                {isLogin ? 'Login' : 'Sign up'}
                            </button>

                            {/* Keep me logged in & Forgot Password (only for login) */}
                            {isLogin && (
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="keepLoggedIn"
                                            className="w-5 h-5 mr-2 accent-pink-500 cursor-pointer rounded-md"
                                        />
                                        <label htmlFor="keepLoggedIn" className="text-gray-600 text-sm font-bold">
                                            Keep me logged in
                                        </label>
                                    </div>
                                    <a href="#" className="text-pink-500 text-sm hover:underline font-bold">
                                        Forgot Password
                                    </a>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="flex items-center justify-center my-4">
                                <span className="border-b w-1/4"></span>
                                <span className="mx-2 text-gray-500 text-sm">Or</span>
                                <span className="border-b w-1/4"></span>
                            </div>

                            {/* Secondary Button */}
                            <button
                                className={`w-full font-semibold py-3 rounded-3xl shadow-md transition duration-300 
                                ${!isLogin ? 'bg-white text-pink-500' : 'bg-pink-500 text-white'}`}
                                style={!isLogin ? {
                                    background: 'linear-gradient(to right, white 3px, white calc(100% - 3px))',
                                    boxShadow: '0 0 0 3px white, 0 1px 2px rgba(0, 0, 0, 0.05)'
                                } : {}}
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {!isLogin ? 'Login' : 'Sign up'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}