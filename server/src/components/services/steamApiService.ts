import axios from 'axios';
import { SteamUser } from '@/types/response/Steam';

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const BASE_URL = 'http://api.steampowered.com';

export class SteamApiService {
  static async getPlayerSummaries(steamIds: string): Promise<SteamUser[]> {
    const url = `${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamIds}&format=json`;
    try {
      const response = await axios.get(url);
      return response.data.response.players;
    } catch (error) {
      console.error('Error fetching player summaries:', error);
      throw error;
    }
  }

  static async getFriendList(steamId: string) {
    const url = `${BASE_URL}/ISteamUser/GetFriendList/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&relationship=friend&format=json`;
    try {
      const response = await axios.get(url);
      return response.data.friendslist.friends;
    } catch (error) {
      console.error('Error fetching friend list:', error);
      throw error;
    }
  }

  static async getOwnedGames(steamId: string) {
    const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json`;
    try {
      const response = await axios.get(url);
      return response.data.response.games;
    } catch (error) {
      console.error('Error fetching owned games:', error);
      throw error;
    }
  }

  static async resolveVanityURL(steamLink: string) {
    const splitUrl = steamLink.split('/').filter((part) => part !== '');
    const vanityURL = splitUrl[splitUrl.length - 1]; // Ensure we take the last non-empty segment
    const url = `${BASE_URL}/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanityURL}&format=json`;
    try {
      const response = await axios.get(url);
      if (response.data.response.success === 1) {
        return {
          success: true,
          steamId: response.data.response.steamid,
        };
      } else {
        return {
          success: false,
          steamId: vanityURL,
        };
      }
    } catch (error) {
      console.error('Error resolving Steam vanity URL:', error);
      throw error;
    }
  }
}
