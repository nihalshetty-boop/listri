"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChatProvider } from "@/contexts/ChatContext";
import { useEffect, useState } from "react";

interface ChatProviderWrapperProps {
  children: React.ReactNode;
}

export default function ChatProviderWrapper({ children }: ChatProviderWrapperProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [userId, setUserId] = useState<string>("test-user");

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    } else {
      // Use a test user for debugging when no user is logged in
      setUserId("test-user");
    }
  }, [user?.id]);

  return (
    <ChatProvider userId={userId}>
      {children}
    </ChatProvider>
  );
} 