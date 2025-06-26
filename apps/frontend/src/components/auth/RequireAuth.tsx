"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [auth.isLoggedIn, router]);

  if (!checked) return null;

  return <>{children}</>;
}
