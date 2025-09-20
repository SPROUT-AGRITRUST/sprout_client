"use client";

import React, { useState } from "react";
import { Leaf } from "lucide-react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useToast } from "../../contexts/ToastContext";

export default function LoginForm() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [formattedMobile, setFormattedMobile] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();
  const { showError, showInfo } = useToast();

  // Local testing - no actual reCAPTCHA verification
  const setupRecaptcha = () => {
    // In local development, we don't need to set up actual reCAPTCHA
    console.log("Local development: bypassing reCAPTCHA setup");
    // Normally this would set up Firebase reCAPTCHA verification
  };

  // Format and validate phone number
  const formatPhoneNumber = (phone, code) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Check for valid phone number (adjust for your requirements)
    if (cleaned.length < 10) {
      return { isValid: false, formatted: "" };
    }
    return {
      isValid: true,
      formatted: `${code}${cleaned}`,
    };
  };

  // Local development - simulate sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpError("");

    const { isValid, formatted } = formatPhoneNumber(mobile, countryCode);
    if (!isValid) {
      showError("Please enter a valid phone number");
      return;
    }

    setFormattedMobile(formatted);
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      // For local development, we'll use a dummy confirmation object
      setConfirmationResult({
        confirm: (enteredOtp) => {
          // Local verification - check if OTP is 123456
          return new Promise((resolve, reject) => {
            if (enteredOtp === "123456") {
              resolve({
                user: {
                  uid: "local-dev-uid-" + Date.now(),
                  phoneNumber: formatted,
                  displayName: "Local Test User",
                  getIdToken: () => Promise.resolve("dummy-token"),
                },
              });
            } else {
              reject({ code: "auth/invalid-verification-code" });
            }
          });
        },
      });

      showInfo(`Dev mode: OTP sent to ${formatted} (use 123456)`);
    }, 1000); // 1 second delay to simulate network request

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  // Verify OTP - local development version
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOtpError("");

    if (!otp || otp.length < 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      setIsSubmitting(false);
      return;
    }

    try {
      // This works with our dummy confirmation object
      const userCredential = await confirmationResult.confirm(otp);
      // User signed in successfully
      const user = userCredential.user;
      console.log("DEV MODE: User signed in:", user);
      showInfo("Login successful! Welcome back.");

      // Set user data in local storage or context if needed
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          displayName: user.displayName || "",
        })
      );

      // In development, simulate successful login
      console.log("DEV MODE: Redirecting to home page");
      navigate("/");
    } catch (error) {
      console.error("OTP verification error:", error);
      if (error.code === "auth/invalid-verification-code") {
        setOtpError("Invalid verification code. Use 123456 for testing.");
      } else if (error.code === "auth/code-expired") {
        setOtpError("Verification code has expired. Please request a new one.");
        setConfirmationResult(null);
      } else {
        setOtpError(
          "Failed to verify OTP: " + (error.message || "Unknown error")
        );
      }
      showError("Verification failed");
    }
    setIsSubmitting(false);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      console.log("Google login successful:", result.user);

      // Notify Apps Script after successful login
      try {
        const idToken = await result.user.getIdToken();
        const resp = await fetch(
          "https://script.google.com/macros/s/AKfycby7F0wAQGisMApg4aqv5T0KCzngJs_185v5e5ZqtEo/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
          }
        );
        const json = await resp.json();
        console.log("Apps Script response:", json);
      } catch (notifyErr) {
        console.error("Sign-in or notify failed:", notifyErr);
      }
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      let errorMessage =
        "An error occurred during Google login. Please try again.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login was cancelled. Please try again.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked. Please allow popups for this site.";
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        errorMessage =
          "An account already exists with this email using a different sign-in method.";
      }
      showError(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back to GrowField
          </h1>
          <p className="text-gray-600">Sign in to your account to continue.</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-3"></div>
                Signing in...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>

          <button
            onClick={() => showInfo("Facebook login will be implemented soon!")}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with mobile
            </span>
          </div>
        </div>
        <form
          onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mobile Number *
            </label>
            <div className="flex">
              <select
                className="px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-800 font-medium"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={!!confirmationResult}
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+65">+65 (SG)</option>
                <option value="+971">+971 (UAE)</option>
              </select>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Enter mobile number (10 digits)"
                disabled={!!confirmationResult}
                pattern="[0-9]{10}"
                maxLength="10"
              />
            </div>
            {!confirmationResult && (
              <p className="text-xs text-gray-500 mt-1">
                You'll receive a one-time verification code
              </p>
            )}
          </div>
          {confirmationResult && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter 6-digit OTP (use 123456 for testing)
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                required
                className={`w-full px-4 py-3 border ${
                  otpError
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                } rounded-lg transition-colors duration-200 text-center tracking-widest text-xl`}
                placeholder="••••••"
                maxLength="6"
                pattern="[0-9]{6}"
                inputMode="numeric"
              />
              {otpError && (
                <p className="mt-1 text-sm text-red-600">{otpError}</p>
              )}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  OTP sent to {formattedMobile}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmationResult(null);
                    setOtp("");
                    setOtpError("");
                  }}
                  className="text-xs text-green-600 hover:text-green-800"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
          {/* Recaptcha container removed for local testing */}
          <div id="recaptcha-container" style={{ display: "none" }}></div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {confirmationResult ? "Verifying..." : "Sending OTP..."}
              </div>
            ) : confirmationResult ? (
              "Verify & Sign In"
            ) : (
              "Send OTP"
            )}
          </button>

          {/* Sign up link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
