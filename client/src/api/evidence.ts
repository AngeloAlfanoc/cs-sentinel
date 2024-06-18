import axiosInstance from './api';

export const fetchEvidenceBySteamId = async (steamId: string) => {
  const response = await axiosInstance.get(`/evidence-steamId/${steamId}`);
  return response.data;
};

export const fetchEvidencesByFlagged = async () => {
  const response = await axiosInstance.get('/evidences/flagged');
  return response.data;
};

export const fetchEvidenceById = async (evidenceId: string) => {
  const response = await axiosInstance.get(`/evidence/${evidenceId}`);
  return response.data;
};

export const flagEvidenceByUser = async (evidenceId: string) => {
  const response = await axiosInstance.post(`/evidence/flag/${evidenceId}`);
  return response.data;
}
