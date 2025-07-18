"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { signIn, useSession } from "next-auth/react";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await registerUser(data);
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      setMessage("Registered and logged in successfully");
    } catch (err: any) {
      setMessage(`${err.message}`);
    }
  };

  if (session) {
    return (
      <div className="max-w-md mx-auto mt-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Sign Up for Listri</h1>
        <p className="text-center">You are already signed in as {session.user?.email}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Sign Up for Listri</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <Input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full">Sign Up</Button>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => signIn("google")}>Sign up with Google</Button>
        <Button variant="outline" onClick={() => signIn("github")}>Sign up with GitHub</Button>
      </div>
    </div>
  );
}
