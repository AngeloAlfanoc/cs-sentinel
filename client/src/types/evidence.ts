export type EvidenceData = {
  _id: string;
  description: string;
  videoLink: string;
  type: string;
  steamId: string;
  steamLink?: string;
  imagesUrls?: string[];
  demoUrl?: string;
};

export type EvidenceReponseData = {
  data: { data: EvidenceData[] };
};
