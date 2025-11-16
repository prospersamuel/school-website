// src/pages/VerifyEmailPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import toast from "react-hot-toast";
import { FiMail, FiRefreshCw, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { updateUserVerificationStatus, resendVerificationEmail } from "../../services/Auth";

export default function VerifyEmailPage() {
  const [emailVerified, setEmailVerified] = useState(auth.currentUser?.emailVerified);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    const checkEmailVerification = async () => {
      setChecking(true);
      try {
        await auth.currentUser.reload();
        const updatedUser = auth.currentUser;
        
        if (updatedUser.emailVerified) {
          // Update Firestore and redirect
          await updateUserVerificationStatus(updatedUser.uid);
          setEmailVerified(true);
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/dashboard"), 1500);
        }
      } catch (error) {
        console.error("Error checking verification:", error);
      } finally {
        setChecking(false);
      }
    };

    // Check immediately
    checkEmailVerification();

    // Then set up interval for polling
    const interval = setInterval(checkEmailVerification, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleResend = async () => {
    setSending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email resent! Check your inbox.");
    } catch (err) {
      console.error(err);
      toast.error("Error resending verification email.");
    }
    setSending(false);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p>No user found. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-md shadow-2xl p-8 max-w-md w-full border border-white/50">
        <div className="flex flex-col items-center text-center">
          
          {/* Animated Email Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <FiMail className="text-white text-2xl" />
            </div>
          </div>
          
          {/* Status Indicator */}
          {emailVerified ? (
            <div className="bg-green-100 border border-green-200 rounded-md p-4 mb-6 w-full">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <FiCheckCircle className="text-green-500 text-xl" />
                <span className="font-semibold">Email Verified Successfully!</span>
              </div>
              <p className="text-green-600 text-sm mt-2">Redirecting to dashboard...</p>
            </div>
          ) : (
            <div className="bg-blue-100 border border-blue-200 rounded-md p-4 mb-6 w-full">
              <div className="flex items-center justify-center gap-2 text-blue-700">
                <FiMail className="text-blue-500" />
                <span className="font-semibold">Verification Required</span>
              </div>
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {emailVerified ? 'Email Verified!' : 'Verify Your Email'}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {emailVerified 
              ? 'Your email has been successfully verified.'
              : `We've sent a verification link to`
            }
          </p>
          
          {!emailVerified && (
            <>
              <div className="bg-gray-100 rounded-md p-3 mb-4 w-full">
                <p className="font-medium text-gray-800 text-sm">
                  {auth.currentUser?.email}
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Click the link in the email to verify your account. 
                <br />
                <span className="text-xs">Can't find it? Check your spam folder.</span>
              </p>
              
              {/* Progress Animation */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full animate-pulse"></div>
              </div>
            </>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col gap-3 w-full">
            {!emailVerified && (
              <button
                onClick={handleResend}
                disabled={sending}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-md font-semibold transition-all ${
                  sending
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105"
                }`}
              >
                {sending ? (
                  <>
                    <FiRefreshCw className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiMail className="mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
            )}
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-600 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Login
            </button>
          </div>
          
          {/* Auto-check Status */}
          {!emailVerified && (
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <FiRefreshCw className="mr-2 text-gray-400 animate-spin" />
              <span>Automatically checking for verification...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}