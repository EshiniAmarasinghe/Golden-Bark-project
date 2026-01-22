import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerCandidate,
  loginCandidate,
  type RegisterCandidatePayload,
} from "../services/auth";
import axios from "axios";

interface FormData {
  name_with_initials: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  country_id: string;
  whatsapp_number: string;
  referral_code: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name_with_initials: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    country_id: "",
    whatsapp_number: "",
    referral_code: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const countries = [
    { id: "1", name: "United States" },
    { id: "2", name: "United Kingdom" },
    { id: "3", name: "Canada" },
    { id: "4", name: "Australia" },
    { id: "5", name: "Sri Lanka" },
    { id: "6", name: "India" },
    { id: "7", name: "Singapore" },
    { id: "8", name: "UAE" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isLongEnough,
    ].filter(Boolean).length;

    if (strength === 0) setPasswordStrength("");
    else if (strength <= 2) setPasswordStrength("weak");
    else if (strength <= 3) setPasswordStrength("medium");
    else setPasswordStrength("strong");
  };

  const validatePassword = (password: string): string => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return "Password must include uppercase, lowercase, number, and special character";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const validateLogin = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name_with_initials.trim()) {
      newErrors.name_with_initials = "Name with initials is required";
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.country_id) {
      newErrors.country_id = "Country is required";
    }
    if (!formData.whatsapp_number.trim()) {
      newErrors.whatsapp_number = "WhatsApp number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm password";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = isLogin ? validateLogin() : validateRegister();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await loginCandidate(formData.email, formData.password);
        alert("✅ Login successful!");
        navigate("/profile");
      } else {
        const payload: RegisterCandidatePayload = {
          name_with_initials: formData.name_with_initials,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          country_id: formData.country_id,
          whatsapp_number: formData.whatsapp_number,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          referral_code: formData.referral_code,
        };
        await registerCandidate(payload);
        alert("✅ Registration successful!");
        navigate("/profile");
      }
    } catch (error: unknown) {
      let serverMessage = "An unexpected error occurred";

      if (axios.isAxiosError(error)) {
        serverMessage =
          error.response?.data?.message ?? error.message ?? "Connection failed";
      } else if (error instanceof Error) {
        serverMessage = error.message;
      }

      alert(`❌ Error: ${serverMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name_with_initials: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      country_id: "",
      whatsapp_number: "",
      referral_code: "",
    });
    setErrors({});
    setPasswordStrength("");
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center p-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-linear-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center transform rotate-12">
                <span className="text-white font-bold text-3xl transform -rotate-12">
                  C
                </span>
              </div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-amber-900 to-yellow-700 bg-clip-text text-transparent">
                Ceylon Golden Bark
              </h1>
            </div>
            <p className="text-amber-700 font-semibold">
              Premium Ceylon Cinnamon
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex bg-amber-50">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 font-bold text-lg transition-all ${
                isLogin
                  ? "bg-amber-500 text-amber-900 shadow-md"
                  : "text-amber-600 hover:bg-amber-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 font-bold text-lg transition-all ${
                !isLogin
                  ? "bg-amber-500 text-amber-900 shadow-md"
                  : "text-amber-600 hover:bg-amber-100"
              }`}
            >
              Register
            </button>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <p className="text-amber-600 mb-8">
              {isLogin
                ? "Sign in to continue shopping"
                : "Register to enjoy premium Ceylon cinnamon products"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      Name with Initials *
                    </label>
                    <input
                      type="text"
                      name="name_with_initials"
                      value={formData.name_with_initials}
                      onChange={handleInputChange}
                      placeholder="J.A. Perera"
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.name_with_initials
                          ? "border-red-500"
                          : "border-amber-200 focus:border-yellow-500"
                      }`}
                    />
                    {errors.name_with_initials && (
                      <p className="text-red-500 text-xs mt-1">
                        ⚠️ {errors.name_with_initials}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.first_name
                            ? "border-red-500"
                            : "border-amber-200 focus:border-yellow-500"
                        }`}
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠️ {errors.first_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.last_name
                            ? "border-red-500"
                            : "border-amber-200 focus:border-yellow-500"
                        }`}
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠️ {errors.last_name}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-amber-200 focus:border-yellow-500"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+94 77 567 8900"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-500"
                            : "border-amber-200 focus:border-yellow-500"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠️ {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-amber-900 font-semibold mb-2">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp_number"
                        value={formData.whatsapp_number}
                        onChange={handleInputChange}
                        placeholder="+94 77 567 8900"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.whatsapp_number
                            ? "border-red-500"
                            : "border-amber-200 focus:border-yellow-500"
                        }`}
                      />
                      {errors.whatsapp_number && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠️ {errors.whatsapp_number}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      Country *
                    </label>
                    <select
                      name="country_id"
                      value={formData.country_id}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.country_id
                          ? "border-red-500"
                          : "border-amber-200 focus:border-yellow-500"
                      }`}
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.country_id && (
                      <p className="text-red-500 text-xs mt-1">
                        ⚠️ {errors.country_id}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-amber-900 font-semibold mb-2">
                      Referral Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="referral_code"
                      value={formData.referral_code}
                      onChange={handleInputChange}
                      placeholder="Enter referral code"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:border-yellow-500 transition-all"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-red-500"
                        : "border-amber-200 focus:border-yellow-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠️ {errors.password}
                  </p>
                )}
                {!isLogin && passwordStrength && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "weak"
                            ? "bg-red-500"
                            : passwordStrength === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "medium" ||
                          passwordStrength === "strong"
                            ? "bg-yellow-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <div
                        className={`h-1 flex-1 rounded ${
                          passwordStrength === "strong"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.password_confirmation
                        ? "border-red-500"
                        : "border-amber-200 focus:border-yellow-500"
                    }`}
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-xs mt-1">
                      ⚠️ {errors.password_confirmation}
                    </p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-yellow-600 rounded"
                    />
                    <span className="text-amber-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-yellow-600 hover:text-yellow-700 font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting
                  ? "Processing..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>
          </div>

          <div className="bg-amber-50 px-8 py-6 text-center">
            <p className="text-amber-700">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-yellow-600 hover:text-yellow-700 font-bold hover:underline"
              >
                {isLogin ? "Register Now" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
