//* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getStoredUser,
  logout,
  updateUserProfile,
  type UserProfile,
} from "../services/auth";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [editedUser, setEditedUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load user on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
    setEditedUser(storedUser);
    setIsLoading(false);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedUser) {
      setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSave = async () => {
    if (!editedUser) return;

    setIsSaving(true);
    try {
      const updates: Partial<UserProfile> = {
        name_with_initials: editedUser.name_with_initials,
        first_name: editedUser.first_name,
        last_name: editedUser.last_name,
        phone: editedUser.phone,
        whatsapp_number: editedUser.whatsapp_number,
      };

      await updateUserProfile(updates);
      setUser(editedUser);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (error: unknown) {
      let serverMessage = "Failed to update profile";

      if (axios.isAxiosError(error)) {
        serverMessage =
          error.response?.data?.message ?? error.message ?? serverMessage;
      } else if (error instanceof Error) {
        serverMessage = error.message;
      }

      alert(`❌ Error: ${serverMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    alert("✅ Logged out successfully");
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      logout();
      alert("❌ Account deleted successfully.");
      navigate("/login");
    }
  };

  const handleCopyReferralCode = () => {
    if (user?.referral_code) {
      navigator.clipboard.writeText(user.referral_code);
      alert("✅ Referral code copied!");
    }
  };

  const orderHistory = [
    { id: "1234", date: "2024-12-15", total: 45.99, status: "Delivered" },
    { id: "1235", date: "2024-12-20", total: 32.5, status: "Processing" },
    { id: "1236", date: "2024-12-25", total: 28.99, status: "Shipped" },
  ];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-900 mx-auto mb-4"></div>
          <p className="text-amber-900 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  const initials =
    user?.first_name && user?.last_name
      ? `${user?.first_name[0]}${user?.last_name[0]}`
      : "U";

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-900 via-yellow-700 to-amber-900 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-linear-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl">
              {initials}
            </div>
            {user && (
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {user?.name_with_initials}
                </h1>
                <p className="text-yellow-100 text-lg mb-2">{user?.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    📍 {user?.country?.country_name || "Not specified"}
                  </span>
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                    📅 Member since{" "}
                    {user?.joined_date
                      ? new Date(user?.joined_date).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>
            )}
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-white hover:bg-yellow-50 text-amber-900 font-bold rounded-full transition-all shadow-lg hover:shadow-xl"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {["profile", "orders", "settings"].map((tab: any, index: number) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab
                  ? "bg-amber-900 text-white shadow-lg"
                  : "bg-white text-amber-900 hover:bg-amber-100"
              }`}
            >
              {tab === "profile" && "👤 Profile"}
              {tab === "orders" && "📦 Orders"}
              {tab === "settings" && "⚙️ Settings"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "profile" && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  Personal Information
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Name with Initials
                      </label>
                      <input
                        type="text"
                        name="name_with_initials"
                        value={editedUser?.name_with_initials || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                          isEditing
                            ? "border-amber-200 focus:border-yellow-500 focus:outline-none"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                      />
                      <p className="text-xs text-amber-600 mt-1">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={editedUser?.first_name || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                          isEditing
                            ? "border-amber-200 focus:border-yellow-500 focus:outline-none"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={editedUser?.last_name || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                          isEditing
                            ? "border-amber-200 focus:border-yellow-500 focus:outline-none"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editedUser?.phone || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                          isEditing
                            ? "border-amber-200 focus:border-yellow-500 focus:outline-none"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp_number"
                        value={editedUser?.whatsapp_number || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all ${
                          isEditing
                            ? "border-amber-200 focus:border-yellow-500 focus:outline-none"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-lg ${
                          isSaving
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white"
                        }`}
                      >
                        {isSaving ? "Saving..." : "✓ Save Changes"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl transition-all"
                      >
                        ✕ Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  Order History
                </h2>

                <div className="space-y-4">
                  {orderHistory.map((order: any, index: number) => (
                    <div
                      key={index}
                      className="bg-amber-50 p-6 rounded-2xl flex justify-between items-center hover:shadow-md transition-all"
                    >
                      <div>
                        <p className="font-bold text-amber-900">
                          Order #{order?.id}
                        </p>
                        <p className="text-sm text-amber-600">{order?.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-600">
                          ${order?.total}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order?.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order?.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order?.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-amber-900 mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-yellow-500 focus:outline-none"
                      />
                      <button className="w-full py-3 bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-bold rounded-xl transition-all shadow-lg">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="border-t-2 border-amber-100 pt-6">
                    <h3 className="text-lg font-bold text-red-600 mb-4">
                      Danger Zone
                    </h3>
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Referral Code */}
            <div className="bg-linear-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-lg text-white">
              <h3 className="text-xl font-bold mb-3">🎁 Your Referral Code</h3>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <p className="text-3xl font-bold text-center tracking-wider">
                  {user?.referral_code || "N/A"}
                </p>
              </div>
              <p className="text-sm text-white/80">
                Share with friends to earn rewards!
              </p>
              <button
                onClick={handleCopyReferralCode}
                className="w-full mt-4 py-2 bg-white text-amber-900 font-bold rounded-lg hover:bg-yellow-50 transition-all"
              >
                Copy Code
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-xl transition-all text-left px-4">
                  📦 Track Orders
                </button>
                <button className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-xl transition-all text-left px-4">
                  ❤️ Wishlist
                </button>
                <button className="w-full py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-xl transition-all text-left px-4">
                  📍 Addresses
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-all text-left px-4"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
