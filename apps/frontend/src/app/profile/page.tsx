"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProfile, updateProfile, getListings } from "@/lib/api";
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
  MessageSquare,
  Star,
  TrendingUp,
  DollarSign
} from "lucide-react";
import Link from "next/link";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  age?: number;
  city?: string;
  country?: string;
  bio?: string;
  profileCompleted: boolean;
  createdAt: string;
  // Calculated stats
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
    age: '',
    city: '',
    country: '',
    bio: ''
  });

  // Load profile data from API
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const profileData = await getProfile();
        
        // Fetch user's listings to calculate stats
        const listings = await getListings();
        const userListings = listings.filter((listing: any) => listing.user.id === profileData.id);
        
        // Calculate stats
        const totalListings = userListings.length;
        const totalSales = userListings.filter((listing: any) => listing.isSold).length;
        
        // For now, use default values for rating and reviews (these would come from a reviews system)
        const rating = 0; // No reviews yet
        const reviews = 0; // No reviews yet

        const profileWithStats: UserProfile = {
          ...profileData,
          totalListings,
          totalSales,
          rating,
          reviews
        };

        console.log('Profile data received:', profileData);
        console.log('Profile with stats:', profileWithStats);
        setProfile(profileWithStats);
        setEditForm({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          age: profileData.age?.toString() || '',
          city: profileData.city || '',
          country: profileData.country || '',
          bio: profileData.bio || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
        // Set default profile if API fails
        const defaultProfile: UserProfile = {
          id: user.id,
          email: user.email,
          name: user.email.split('@')[0],
          firstName: '',
          lastName: '',
          avatarUrl: '',
          age: undefined,
          city: '',
          country: '',
          bio: '',
          profileCompleted: false,
          createdAt: new Date().toISOString(),
          totalListings: 0,
          totalSales: 0,
          rating: 0,
          reviews: 0
        };
        setProfile(defaultProfile);
        setEditForm({
          firstName: '',
          lastName: '',
          age: '',
          city: '',
          country: '',
          bio: ''
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!profile) return;

    try {
      const updateData = {
        firstName: editForm.firstName || undefined,
        lastName: editForm.lastName || undefined,
        age: editForm.age ? parseInt(editForm.age) : undefined,
        city: editForm.city || undefined,
        country: editForm.country || undefined,
        bio: editForm.bio || undefined,
        profileCompleted: true
      };

      const updatedProfile = await updateProfile(updateData);
      
      // Update local state with the response
      setProfile({
        ...profile,
        ...updatedProfile,
        // Keep calculated stats
        totalListings: profile.totalListings,
        totalSales: profile.totalSales,
        rating: profile.rating,
        reviews: profile.reviews
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // You could add a toast notification here
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        age: profile.age?.toString() || '',
        city: profile.city || '',
        country: profile.country || '',
        bio: profile.bio || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Profile not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-lg text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Personal Information</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </Button>
                ) : (
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleSave}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
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
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-600" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full hover:bg-purple-700 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {profile.name || 'User'}
                    </h3>
                    <p className="text-gray-600 text-sm">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
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
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 text-lg">{profile.firstName || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    {isEditing ? (
                      <Input
                        value={editForm.lastName}
                        onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                        placeholder="Last name"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 text-lg">{profile.lastName || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{profile.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({...editForm, age: e.target.value})}
                      placeholder="Age"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900 text-lg">{profile.age || 'Not provided'}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    {isEditing ? (
                      <Input
                        value={editForm.city}
                        onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                        placeholder="City"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-900 text-lg">{profile.city || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    {isEditing ? (
                      <Input
                        value={editForm.country}
                        onChange={(e) => setEditForm({...editForm, country: e.target.value})}
                        placeholder="Country"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-900 text-lg">{profile.country || 'Not provided'}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[80px]"
                    />
                  ) : (
                    <p className="text-gray-900 leading-relaxed">{profile.bio || 'No bio provided yet. Click "Edit Profile" to add one!'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Stats Card */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Listings</span>
                  </div>
                  <span className="font-bold text-gray-900">{profile.totalListings}</span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Sales</span>
                  </div>
                  <span className="font-bold text-gray-900">{profile.totalSales}</span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex items-center justify-between py-1.5 min-w-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                    <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                      <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Rating</span>
                  </div>
                  <span className="font-medium text-gray-500 text-sm whitespace-nowrap flex-shrink-0 ml-2">
                    {profile.rating > 0 ? `${profile.rating}/5` : 'N/A'}
                  </span>
                </div>
                
                <div className="border-t border-gray-100"></div>
                
                <div className="flex items-center justify-between py-1.5 min-w-0">
                  <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium text-sm">Reviews</span>
                  </div>
                  <span className="font-medium text-gray-500 text-sm whitespace-nowrap flex-shrink-0 ml-2">
                    {profile.reviews > 0 ? profile.reviews : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm border-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div>
                  <Link href="/dashboard" className="block mb-4">
                    <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3 px-4 h-auto">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-purple-50 rounded-md">
                          <Package className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium">My Listings</span>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/messages" className="block mb-4">
                    <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3 px-4 h-auto">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-blue-50 rounded-md">
                          <MessageSquare className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Messages</span>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/post-item" className="block">
                    <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-3 px-4 h-auto">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-green-50 rounded-md">
                          <Package className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium">Post New Item</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 