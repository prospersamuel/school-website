// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../../hooks/useUser";
import { auth, db } from "../../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import AlertBox from "../../../components/Alertbox";
import { deleteUserAccount, reauthenticateUser } from "../../../services/Auth";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { FiUser, FiLock, FiSave, FiEdit, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLoader from "../../../components/AuthLoader";
import {
  validateField,
  PasswordStrengthIndicator,
} from "../../../services/Validate";

export default function ProfileTab() {
  const { user, userData, refreshUserData } = useUser();
  const [activeSection, setActiveSection] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // useEffect to update formData when userData loads
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || user?.displayName || "",
        email: user?.email || "",
        phone: userData.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [userData, user]);

  const [errors, setErrors] = useState({});

  // detect user type
  const hasPasswordAuth = user?.providerData?.some(
    (provider) => provider.providerId === "password"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Handle password validation with strength indicator
    if (name === "newPassword") {
      const validation = validateField("Password", value);
      setPasswordValidation(validation);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeSection === "personal") {
      // Use validateField for personal info validation
      const nameError = validateField("Full Name", formData.name);
      const phoneError = validateField("Phone Number", formData.phone);

      if (nameError) newErrors.name = nameError;
      if (phoneError) newErrors.phone = phoneError;
    }

    if (activeSection === "security" && hasPasswordAuth) {
      // Only validate password for email/password users
      // Use validateField for password validation
      if (formData.newPassword) {
        const passwordValidation = validateField(
          "Password",
          formData.newPassword
        );
        if (passwordValidation.error) {
          newErrors.newPassword = passwordValidation.error;
        }
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSavePersonalInfo = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });

      // Update Firestore user data
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        updatedAt: new Date(),
      });

      await refreshUserData();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // function to handle account deletion
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      if (!hasPasswordAuth) {
        // For Google users, we'll handle reauthentication in the modal
        // This function will be called after successful reauthentication
        await deleteUserAccount();
        toast.success("Account deleted successfully");
      } else {
        // For email/password users, use password
        if (!deletePassword) {
          toast.error("Please enter your password to confirm account deletion");
          setDeleteLoading(false);
          return;
        }

        await reauthenticateUser(deletePassword);
        await deleteUserAccount();
        toast.success("Account deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.code === "auth/invalid-credential") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/requires-recent-login") {
        toast.error("Session expired. Please log in again and try.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again in a few minutes.");
      } else if (error.code === "auth/popup-closed-by-user") {
        toast.error("Authentication cancelled. Please try again.");
      } else {
        toast.error(
          error.message || "Failed to delete account. Please try again."
        );
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  // Add this function for Google reauthentication
  const handleGoogleReauth = async () => {
    setDeleteLoading(true);
    try {
      await reauthenticateUser(""); // Empty password for Google users
      // If successful, proceed with account deletion
      await deleteUserAccount();
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error during Google reauthentication:", error);

      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Authentication cancelled. Please try again.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many attempts. Please try again in a few minutes.");
      } else if (error.code === "auth/user-mismatch") {
        toast.error("Authentication mismatch failure");
      } else {
        toast.error("Authentication failed. Please try again.");
      }
      setDeleteLoading(false);
    }
  };

  // function to handle the initial delete button click
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setDeletePassword("");
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Re-authenticate user before password change
      const credential = EmailAuthProvider.credential(
        user.email,
        formData.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, formData.newPassword);

      // Clear password fields and validation
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setPasswordValidation(null);

      toast.success("Password updated successfully!");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Current password is incorrect.");
      }else if(error.code === 'auth/network-request-failed'){
        toast.error("Network error. Check your connection.");
      }
       else {
        toast.error(
          error.message || "Failed to change password. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: userData?.name || "",
      email: user?.email || "",
      phone: userData?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setPasswordValidation(null);
    setIsEditing(false);
  };

  const menuItems = [
    { id: "personal", name: "Personal Info", icon: FiUser },
    { id: "security", name: "Security", icon: FiLock },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <AuthLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account information and security settings
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-6">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {(userData?.name || user.displayName || "S")
                      .charAt(0)
                      .toUpperCase()}
                    {/* {(userData?.name || user?.displayName || "S")
                      .split(" ")[1][0]
                      .toUpperCase()} */}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {userData?.name || user.displayName}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Verified
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsEditing(false);
                      setErrors({});
                      setPasswordValidation(null);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-all ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-lg rounded-md shadow-lg border border-white/50 p-8">
              {/* Personal Information Section */}
              {activeSection === "personal" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600">
                        Update your basic profile information
                      </p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                      >
                        <FiEdit size={18} />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-md text-sm hover:bg-gray-50 transition-colors"
                        >
                          <FiX size={18} />
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={handleSavePersonalInfo}
                          disabled={loading}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm transition-colors disabled:opacity-50"
                        >
                          <FiSave size={18} />
                          <span>{loading ? "Saving..." : "Save Changes"}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-md border transition-colors ${
                          errors.name
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } ${
                          !isEditing
                            ? "bg-gray-100 cursor-not-allowed text-gray-500"
                            : " border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field - Disabled */}
                    <div>
                      <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="Enter your email address"
                      />
                      <p className="mt-1 ml-1 text-xs text-gray-500">
                        Email address cannot be changed for security reasons.
                      </p>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block ml-1 text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-md border transition-colors ${
                          errors.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } ${
                          !isEditing
                            ? "bg-gray-100 cursor-not-allowed text-gray-500"
                            : " border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Account Type */}
                    <div>
                      <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <div className="px-4 py-3 cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 text-gray-500">
                        Student
                      </div>
                    </div>
                  </div>

                  {/* Read-only Information */}
                  {!isEditing && (
                    <div className="mt-8 p-6 bg-blue-50 rounded-md border border-blue-200">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-700 font-medium">
                            Member Since:
                          </span>
                          <p className="text-blue-900">
                            {userData?.createdAt
                              ? new Date(
                                  userData.createdAt.seconds * 1000
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-blue-700 font-medium">
                            Last Login:
                          </span>
                          <p className="text-blue-900">
                            {userData?.lastLoginAt
                              ? new Date(
                                  userData.lastLoginAt.seconds * 1000
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Security Section */}
              {/* Security Section */}
              {activeSection === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Security Settings
                    </h2>
                    <p className="text-gray-600">
                      Manage your password and account security
                    </p>
                  </div>

                  {/* Only show password change for email/password users */}
                  {hasPasswordAuth && (
                    <div className="space-y-6">
                      {/* Current Password */}
                      <div className="relative">
                        <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                          Current Password *
                        </label>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-md border transition-colors ${
                            errors.currentPassword
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter your current password"
                        />
                        {errors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.currentPassword}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-3 top-11 text-blue-500 hover:text-yellow-500 transition-colors"
                        >
                          {passwordVisible ? (
                            <FaEye size={18} />
                          ) : (
                            <FaEyeSlash size={18} />
                          )}
                        </button>
                      </div>

                      {/* New Password */}
                      <div className="relative">
                        <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-md border transition-colors ${
                            errors.newPassword
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.newPassword}
                          </p>
                        )}

                        {/* Password Strength Indicator */}
                        {passwordValidation && formData.newPassword && (
                          <PasswordStrengthIndicator
                            strength={passwordValidation.strength}
                            requirements={passwordValidation.requirements}
                          />
                        )}

                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-3 top-11 text-blue-500 hover:text-yellow-500 transition-colors"
                        >
                          {passwordVisible ? (
                            <FaEye size={18} />
                          ) : (
                            <FaEyeSlash size={18} />
                          )}
                        </button>
                      </div>

                      {/* Confirm Password */}
                      <div className="relative">
                        <label className="block text-sm ml-1 font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-md border transition-colors ${
                            errors.confirmPassword
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-3 top-11 text-blue-500 hover:text-yellow-500 transition-colors"
                        >
                          {passwordVisible ? (
                            <FaEye size={18} />
                          ) : (
                            <FaEyeSlash size={18} />
                          )}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleChangePassword}
                          disabled={
                            loading ||
                            !formData.currentPassword ||
                            !formData.newPassword ||
                            (passwordValidation &&
                              passwordValidation.strength < 5)
                          }
                          className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiLock size={18} />
                          <span>
                            {loading ? "Updating..." : "Update Password"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Show message for Google users instead of password form */}
                  {!hasPasswordAuth && (
                    <div className="p-6 bg-blue-50 rounded-md border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <FiLock className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-900 mb-1">
                            Password Management
                          </h3>
                          <p className="text-blue-700 text-sm">
                            Since you signed in with Google, password management
                            is handled through your Google account. You can
                            manage your password and security settings directly
                            in your Google Account.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Tips - Show for all users */}
                  {hasPasswordAuth && (
                    <div className="mt-8 p-6 bg-yellow-50 rounded-md border border-yellow-200">
                      <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                        Security Tips
                      </h3>
                      <ul className="space-y-2 text-sm text-yellow-800">
                        <li>
                          • Use a strong, unique password that you don't use
                          elsewhere
                        </li>
                        <li>• Change your password regularly</li>
                        <li>• Never share your password with anyone</li>
                        <li>• Log out from shared devices</li>
                        <li>
                          • Enable two-factor authentication in your Google
                          Account
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Delete Account Section - Show for all users */}
                  <div className="mt-8 p-6 bg-red-50 rounded-md border border-red-200">
                    <div className="flex items-start space-x-3">
                      <FiAlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 mb-2">
                          Delete Account
                        </h3>
                        <p className="text-red-700 text-sm mb-4">
                          Once you delete your account, there is no going back.
                          This action is permanent and all your data will be
                          erased immediately.
                        </p>
                        <button
                          onClick={handleDeleteClick}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                        >
                          <FiTrash2 size={16} />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Alert */}
      <AlertBox
        isOpen={showDeleteModal}
        type="error"
        title="Delete Account"
        message={
          <div className="text-left">
            <p className="mb-4 text-red-700">
              This action cannot be undone. All your data will be permanently
              deleted.
            </p>

            {!hasPasswordAuth ? (
              <div className="mt-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-blue-800 text-sm">
                    <strong>Google Account:</strong> You'll need to sign in with
                    Google again to confirm this action.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your password to confirm:
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Your current password"
                />
              </div>
            )}
          </div>
        }
        confirmText={deleteLoading ? "Processing..." : "Delete Account"}
        cancelText="Cancel"
        onConfirm={
          deleteLoading
            ? undefined
            : !hasPasswordAuth
            ? handleGoogleReauth
            : deletePassword
            ? handleDeleteAccount
            : undefined
        }
        onCancel={() => {
          setShowDeleteModal(false);
          setDeletePassword("");
          setDeleteLoading(false);
        }}
      />
    </div>
  );
}
