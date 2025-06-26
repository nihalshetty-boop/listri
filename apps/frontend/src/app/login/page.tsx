"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/api"; 
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
  console.log("Auth state:", auth);


  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginUser(data);
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      setMessage("Logged in successfully");
    } catch (err: any) {
      setMessage(`${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Login to Listri</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full">Login</Button>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}
