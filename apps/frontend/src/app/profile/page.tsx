"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Camera,
  Shield,
  Settings,
  Heart,
  Package,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  joinDate: string;
  totalListings: number;
  totalSales: number;
  rating: number;
  reviews: number;
}

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    bio: ''
  });

  // Mock profile data - replace with actual API call
  useEffect(() => {
    const mockProfile: UserProfile = {
      id: '1',
      email: user?.email || 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'I love buying and selling quality items. Always looking for great deals and happy to negotiate!',
      avatar: '/images/avatar.jpg',
      joinDate: '2023-06-15',
      totalListings: 12,
      totalSales: 8,
      rating: 4.8,
      reviews: 23
    };

    setTimeout(() => {
      setProfile(mockProfile);
      setEditForm({
        firstName: mockProfile.firstName,
        lastName: mockProfile.lastName,
        phone: mockProfile.phone,
        location: mockProfile.location,
        bio: mockProfile.bio
      });
      setLoading(false);
    }, 1000);
  }, [user]);

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    if (profile) {
      setProfile({
        ...profile,
        ...editForm
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-gray-600">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    {isEditing ? (
                      <Input
                        value={editForm.firstName}
                        onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                        placeholder="First name"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    {isEditing ? (
                      <Input
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        placeholder="Last name"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <Input
                      value={editForm.phone}
                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      placeholder="Phone number"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{profile.phone}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <Input
                      value={editForm.location}
                      onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                      placeholder="City, State"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{profile.location}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Listings</span>
                  <span className="font-semibold text-blue-600">{profile.totalListings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-semibold text-green-600">{profile.totalSales}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold text-yellow-600">{profile.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-semibold text-gray-900">{profile.reviews}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    My Listings
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorites
                  </Button>
                </Link>
                <Link href="/messages">
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link href="/security">
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 