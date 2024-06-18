import { SteamUser } from './steam';

export type LoginData = {
  email: string;
  password: string;
};

export type UserToken = {
  token: string;
  user: User;
};

export type User = {
  id?: string;
  email: string;
  username: string;
  signupDate: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
};

export type UserResponse = {
  message: string;
  token: string;
  user: User;
};

export type UserInfoResponse = {
  data: {
    message: string;
    user: User;
    steam: SteamUser;
  };
};
