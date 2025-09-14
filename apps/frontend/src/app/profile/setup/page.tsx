"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/lib/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type ProfileSetupData = {
  firstName: string;
  lastName: string;
  photoFile: File | null;
  photoPreviewUrl: string | null;
  age: string;
  city: string;
  country: string;
  bio: string;
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const [data, setData] = useState<ProfileSetupData>({
    firstName: "",
    lastName: "",
    photoFile: null,
    photoPreviewUrl: null,
    age: "",
    city: "",
    country: "",
    bio: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const totalSteps = 5;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const goNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      setData({ ...data, photoFile: null, photoPreviewUrl: null });
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setData({ ...data, photoFile: file, photoPreviewUrl: previewUrl });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      // Upload handling is not implemented; save fields and mark completed
      const payload = {
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        age: data.age ? Number(data.age) : undefined,
        city: data.city || undefined,
        country: data.country || undefined,
        bio: data.bio || undefined,
        profileCompleted: true,
      };

      const saved = await updateProfile(payload);

      // Update auth store with possibly enriched user data
      if (auth.user && auth.token) {
        dispatch(
          loginSuccess({
            user: { ...auth.user, name: saved.name },
            token: auth.token,
          })
        );
      }

      router.replace("/profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Set up your profile</h1>
          <p className="text-gray-600 mt-2">Help others get to know you. Complete these quick steps.</p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-600 text-right">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                <Input
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  placeholder="Enter your first name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <Input
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  placeholder="Enter your last name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-4">Profile photo</label>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full ring-4 ring-purple-50 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {data.photoPreviewUrl ? (
                        <img src={data.photoPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-400 text-sm">No photo</div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 px-3 py-1.5 text-xs rounded-full bg-purple-600 text-white shadow hover:bg-purple-700"
                    >
                      {data.photoPreviewUrl ? "Change" : "Upload"}
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  <div className="w-full">
                    <div
                      className="mt-2 w-full rounded-lg border-2 border-dashed border-gray-200 p-6 text-center hover:border-purple-300 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                    >
                      <p className="text-sm text-gray-600">
                        Drag and drop an image here, or <span className="text-purple-600 font-medium">browse</span>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
                    </div>
                  </div>

                  {data.photoPreviewUrl && (
                    <Button
                      variant="outline"
                      onClick={() => handlePhotoChange(null)}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Remove photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <Input
                  type="number"
                  min="13"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  placeholder="Your age"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Input
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder="City"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <Input
                    value={data.country}
                    onChange={(e) => setData({ ...data, country: e.target.value })}
                    placeholder="Country"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <Textarea
                value={data.bio}
                onChange={(e) => setData({ ...data, bio: e.target.value })}
                placeholder="Tell the community about yourself, your interests, and what you buy/sell."
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[120px]"
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Review</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p><span className="text-gray-500">Name:</span> {data.firstName} {data.lastName}</p>
                <p><span className="text-gray-500">Age:</span> {data.age || "—"}</p>
                <p><span className="text-gray-500">Location:</span> {data.city || "—"}, {data.country || "—"}</p>
                <p><span className="text-gray-500">Bio:</span> {data.bio || "—"}</p>
                {data.photoPreviewUrl && (
                  <div className="pt-2">
                    <img src={data.photoPreviewUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6" />
        <div className="sticky bottom-6">
          <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border border-gray-200 shadow-md rounded-xl px-4 py-3 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={currentStep === 0}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back
            </Button>
            {currentStep < totalSteps - 1 ? (
              <div className="flex items-center gap-3">
                <Button onClick={goNext} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Continue
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button onClick={handleSubmit} disabled={submitting} className="bg-purple-600 hover:bg-purple-700 text-white">
                  {submitting ? "Saving..." : "Finish setup"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-red-500"></div>
    </div>
  );
}


