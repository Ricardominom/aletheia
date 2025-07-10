import { User, ApiResponse, AuthResponse } from '../types';

const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'Manfred Reyes Villa',
  role: 'admin',
  imageUrl: 'https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg',
};

export const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  if (email === 'admin' && password === '1234admin') {
    return {
      data: {
        user: { ...MOCK_USER, role: 'admin' },
        token: 'mock-admin-token',
      },
      status: 200,
    };
  }

  if (email === 'editor' && password === '1234editor') {
    return {
      data: {
        user: { ...MOCK_USER, role: 'editor' },
        token: 'mock-editor-token',
      },
      status: 200,
    };
  }

  throw new Error('Invalid credentials');
};

export const logout = async (): Promise<ApiResponse<void>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: undefined, status: 200 };
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: MOCK_USER, status: 200 };
};