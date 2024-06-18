import { AxiosResponse } from 'axios';
import { UserInfoResponse, UserResponse } from '../types/user';
import axiosInstance from './api';

type LoginData = {
  email: string;
  password: string;
};

export const fetchLoginData = async ({
  email,
  password
}: LoginData): Promise<AxiosResponse<UserResponse, any>> => {
  try {
    const encodedPassword = btoa(password);

    const response = await axiosInstance.post('/auth', { email, password: encodedPassword });
    return response.data;
  } catch {
    throw new Error('Failed to fetch data');
  }
};

export const fetchUserDetails = async (userId: string): Promise<UserInfoResponse> => {
  try {
    const response = await axiosInstance.get('/user/' + userId);
    return response.data;
  } catch {
    throw new Error('Failed to fetch user details');
  }
};

export const submitProfileUpdate = async (values: any) => {
  try {
    const response = await axiosInstance.put('/user', values);
    return response.data;
  } catch {
    throw new Error('Failed to submit profile update');
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch {
    throw new Error('Failed to logout');
  }
};
