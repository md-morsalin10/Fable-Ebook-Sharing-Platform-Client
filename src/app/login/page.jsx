"use client";
import React from "react";
import Link from "next/link"; 
import { Envelope, Key, ArrowRight } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  // 📩 স্টেট ছাড়া ডিরেক্ট ফর্ম ডেটা হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());

    console.log("Submitting Login Credentials:", credentials);

    // Better-Auth বা আপনার কাস্টম authClient দিয়ে সাইন-ইন করা
    const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
    });

    if (data) {
        toast.success('Welcome Back!');
        router.push(redirectTo); 
    }
    if (error) {
        toast.error(error.message || "Invalid credentials");
    }
  };

  const handleGoogleAuth = async () => {
    try {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    } catch (err) {
        toast.error("Google Sign-In failed. Please try again.");
        console.error(err);
    }
  };

  return (
    <div className="bg-[#0B0F17] text-white min-h-screen flex flex-col justify-between items-center px-4 py-8 relative overflow-hidden select-none">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Brand Logo & Tagline */}
      <div className="text-center mt-4 z-10">
        <h1 className="text-3xl font-serif font-bold text-[#E5BA73] tracking-wide mb-1">Fable</h1>
        <p className="text-xs text-gray-400 tracking-wide font-light">The Private Digital Gallery for Authors.</p>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-[#111622]/60 border border-gray-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 my-8 shadow-2xl z-10">
        
        {/* Login/Register Tabs */}
        <div className="flex border-b border-gray-800 mb-6 text-sm font-medium">
          <div className="w-1/2 text-center pb-3 text-[#E5BA73] border-b-2 border-[#E5BA73] relative font-semibold">
            Login
          </div>
          <Link href={`/register?redirect=${redirectTo}`} className="w-1/2 text-center pb-3 text-gray-500 hover:text-gray-300 transition-colors">
            Register
          </Link>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif text-white font-medium mb-1">Welcome Back</h2>
          <p className="text-xs text-gray-400 font-light">Please enter your credentials to access your library.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Envelope style={{ width: "16px", height: "16px" }} />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="author@fable.com"
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5BA73]/50 transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-gray-400">Password</label>
              <Link href="/forgot-password" className="text-[10px] text-[#E5BA73]/80 hover:text-[#E5BA73] transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Key style={{ width: "16px", height: "16px" }} />
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5BA73]/50 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E5BA73] text-[#0B0F17] py-3 rounded-xl text-sm font-bold shadow-lg shadow-amber-950/20 hover:bg-[#d4a75e] transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
          >
            <span>Login to Fable</span>
            <ArrowRight style={{ width: "16px", height: "16px" }} />
          </button>
        </form>

        {/* Divider line */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-800/80"></div>
          <span className="flex-shrink mx-4 text-[10px] tracking-widest text-gray-500 uppercase font-medium">Or Continue With</span>
          <div className="flex-grow border-t border-gray-800/80"></div>
        </div>

        {/* Google Authentication Button */}
        <button
          onClick={handleGoogleAuth}
          type="button"
          className="w-full bg-transparent border border-gray-800 hover:border-gray-700 rounded-xl py-3 px-4 text-sm font-medium text-gray-200 transition-colors duration-200 flex items-center justify-center space-x-3"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.33 2.69 1.414 6.614l3.852 3.151z"/>
            <path fill="#4285F4" d="M23.49 12.275c0-.796-.073-1.564-.2-2.304H12v4.51h6.46c-.277 1.474-1.11 2.724-2.36 3.564l3.665 2.847c2.14-1.977 3.37-4.89 3.37-8.617z"/>
            <path fill="#FBBC05" d="M5.266 14.235A7.16 7.16 0 014.91 12c0-.791.132-1.55.356-2.265L1.414 6.614A11.93 11.93 0 000 12c0 1.923.455 3.736 1.259 5.35l4.007-3.115z"/>
            <path fill="#34A853" d="M16.1 18.045c-1.182.795-2.686 1.264-4.1 1.264-3.41 0-6.3-2.136-7.334-5.118l-4.007 3.115C2.586 21.23 6.514 24 12 24c3.245 0 6.005-1.073 8.023-2.918l-3.923-3.037z"/>
          </svg>
          <span>Google Authentication</span>
        </button>

      </div>

      {/* Footer Branding */}
      <div className="flex items-center space-x-6 text-xs text-gray-500 font-light mt-2 z-10">
        <Link href="/help" className="hover:text-gray-300 transition-colors">Help Center</Link>
        <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
        <span>© 2026 Fable</span>
      </div>

    </div>
  );
};

export default LoginPage;