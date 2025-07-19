"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  User, 
  Menu, 
  Home, 
  Store, 
  MessageCircle, 
  Settings, 
  LogOut,
  ChevronDown,
  Bell
} from "lucide-react";

export default function Header() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors shadow-sm">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Listri</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const query = formData.get('search') as string;
                if (query.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                }
              }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="search"
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Post Item Button */}
            <Link href="/post-item">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 font-medium shadow-sm">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Sell</span>
              </Button>
            </Link>

            {!mounted ? null : !isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Messages Link */}
                <Link href="/messages">
                  <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative px-4 py-2 rounded-lg">
                    <MessageCircle className="w-5 h-5" />
                    <span className="hidden sm:block ml-2 font-medium">Messages</span>
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </Link>

                {/* Notifications */}
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 p-2 rounded-lg relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
                </Button>

                {/* User Menu */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-purple-200">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.email?.split('@')[0] || 'User'}
                      </div>
                      <div className="text-xs text-gray-500">View Profile</div>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <Card className="absolute right-0 mt-3 w-64 bg-white shadow-lg border-0">
                      <CardContent className="p-2">
                        <div className="p-3 border-b border-gray-100">
                          <div className="text-sm font-semibold text-gray-900">
                            {user?.email?.split('@')[0] || 'User'}
                          </div>
                          <div className="text-xs text-gray-500">{user?.email}</div>
                        </div>
                        <div className="py-2">
                          <Link 
                            href="/dashboard" 
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Home className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link 
                            href="/profile" 
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </Link>
                          <Link 
                            href="/settings" 
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </Link>
                          <div className="border-t border-gray-100 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
