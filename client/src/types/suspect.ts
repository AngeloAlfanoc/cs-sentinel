import { EvidenceData } from './evidence';

export type SuspectData = {
  name: string[];
  suspectId: string;
  description: string;
  steamId: string;
  submittedCount?: number;
  avatar?: string;
  personaName?: string;
  profileUrl?: string;
  faceitLink?: string;
  evidence: EvidenceData[];
  links: SuspectLink[];
};

export type SuspectsResponseData = {
  data: SuspectData[];
};

export type SuspectSubmissionData = {
  evidenceName: string;
  suspectId?: string;
  submittedCount?: number;
  videoLink: string;
  description: string;
  faceitLink?: string;
  type?: string;
};

export type SuspectLink = {
  link: string;
  linkId: string;
  steamId: string;
  type: string;
};
