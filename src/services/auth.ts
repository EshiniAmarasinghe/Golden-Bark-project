/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/auth.ts
import api from "./axios";

export interface UserProfile {
  id?: string;
  name_with_initials: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  whatsapp_number: string;
  country_id: string;
  country?: {
    country_name?: any;
  };
  referral_code?: string;
  joined_date?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserProfile;
  data?: UserProfile;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterCandidatePayload extends UserProfile {
  password: string;
  password_confirmation: string;
}

// ===== LOGIN =====
export const loginCandidate = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/login", {
    email,
    password,
    role: "candidate",
  });

  const data = response.data;

  // Save token
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  // Save user profile
  const user = data.user || data.data;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return data;
};

// ===== REGISTER =====
export const registerCandidate = async (
  payload: RegisterCandidatePayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/register/candidate",
    payload
  );

  const data = response.data;

  // Save token
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  // Save user profile
  const user = data.user || data.data;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return data;
};

// ===== GET USER PROFILE =====
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await api.get<AuthResponse>("/api/profile");
  const user = response.data.user || response.data.data;

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }

  throw new Error("No user data received");
};

// ===== UPDATE USER PROFILE =====
export const updateUserProfile = async (
  updates: Partial<UserProfile>
): Promise<AuthResponse> => {
  const response = await api.put<AuthResponse>("/api/profile", updates);

  const data = response.data;
  const user = data.user || data.data;

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  return data;
};

// ===== LOGOUT =====
export const logout = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// ===== GET STORED USER =====
export const getStoredUser = (): UserProfile | null => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

// ===== CHECK AUTH STATUS =====
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};
