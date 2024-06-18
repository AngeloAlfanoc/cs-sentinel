// Define the type for the decoded token data structure
export type decodeType = {
  user: {
    id: string;
    email: string;
  };
  iat: number;
  exp: number;
};
