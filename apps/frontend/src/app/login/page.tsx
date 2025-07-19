"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/api"; 
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginUser(data);
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      setMessage("Logged in successfully");
    } catch (err: any) {
      setMessage(`${err.message}`);
    }
  };

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">You are signed in as {session.user?.email}</p>
          </div>
          <Button onClick={() => signOut()} className="w-full">Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Informational */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="text-4xl font-bold text-gray-900 mb-8">listri</div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get started quickly</h3>
              <p className="text-gray-600">Sign in to access your marketplace dashboard and manage your listings.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Buy and sell with confidence</h3>
              <p className="text-gray-600">Secure payments, real-time messaging, and trusted marketplace features.</p>
            </div>
            
        <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join our community</h3>
              <p className="text-gray-600">Connect with buyers and sellers in a safe, modern marketplace environment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="mt-2 text-gray-600">Welcome back to Listri</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register("email")} 
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            
        <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                {...register("password")} 
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-medium"
            >
              Sign in
            </Button>
            
            {message && <p className="text-center text-sm">{message}</p>}
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              onClick={() => signIn("google")}
              className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => signIn("github")}
              className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Sign in with GitHub
            </Button>
          </div>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Gradient at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-red-500"></div>
    </div>
  );
}
