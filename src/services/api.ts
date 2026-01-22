// src/services/api.ts
import api from "./axios"; 
import type { RegisterCandidatePayload } from "./auth";

export const registerCandidate = async (payload: RegisterCandidatePayload) => {
  // Use the proxy prefix
  const response = await api.post("/api/register/candidate", payload);
  return response.data;
};

export const loginCandidate = async (email: string, password: string) => {
  // Use the proxy prefix + the correct API path
  const response = await api.post("/api/login", { email, password,role:"candidate"});
  return response.data;
};