import { ApiResponse } from '../types/api';
import { SuspectSubmissionData, SuspectsResponseData } from '../types/suspect';
import axiosInstance from './api';

export const submitSuspect = async (suspectData: SuspectSubmissionData) => {
  try {
    const response = await axiosInstance.post('/submit-suspect', suspectData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Failed to submit data:', error.response.data);
      throw new Error(error.response.data.message || 'Error submitting data');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error setting up your request:', error.message);
      throw new Error('Error setting up request');
    }
  }
};

export const fetchSuspects = async () => {
  const { data } = await axiosInstance.get<ApiResponse<SuspectsResponseData>>('/suspects');
  return data.data;
};

export const fetchSuspectBySteamId = async (steamId: string) => {
  const response = await axiosInstance.get(`/suspect/${steamId}`);
  return response.data;
};

export const fetchSuspectCommentsBySteamId = async (steamId: string) => {
  const response = await axiosInstance.get(`/suspect/${steamId}/comments`);
  return response.data;
};

export const fetchEvidenceCommentsByEvidenceId = async (evidenceId: string) => {
  const response = await axiosInstance.get(`/evidence/${evidenceId}/comments`);
  return response.data;
};

export const addSuspectLink = async (steamId: string, linkData: { link: string; type: string }) => {
  try {
    const response = await axiosInstance.post(`/suspect/${steamId}/add_link`, linkData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Failed to add link:', error.response.data);
      throw new Error(error.response.data.message || 'Error adding link');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error setting up your request:', error.message);
      throw new Error('Error setting up request');
    }
  }
};

export const addRelationShip = async (steamId: string, linkData: { link: string; type: string }) => {
  try {
    const response = await axiosInstance.post(`/suspect/${steamId}/add_relationship`, linkData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Failed to add relationship:', error.response.data);
      throw new Error(error.response.data.message || 'Error adding relationship');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error setting up your request:', error.message);
      throw new Error('Error setting up request');
    }
  }
};
