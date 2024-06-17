export type SuspectData = {
  suspectId: string;
  videoLink: string;
  description: string;
  steamLink: string;
  faceitLink?: string;
  steamRepLink?: string;
  submittedCount: number;
  steamId: string;
  type: string;
  name: string;
  links: Array<{
    _id: string;
    steamId: string;
    link: string;
  }>;
  [key: string]: any;
};
