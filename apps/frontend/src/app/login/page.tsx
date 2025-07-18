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
      <div className="max-w-md mx-auto mt-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Login to Listri</h1>
        <p className="text-center">Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()} className="w-full">Sign out</Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Login to Listri</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
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
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => signIn("google")}>Sign in with Google</Button>
        <Button variant="outline" onClick={() => signIn("github")}>Sign in with GitHub</Button>
      </div>
    </div>
  );
}
