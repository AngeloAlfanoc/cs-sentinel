// @ts-ignore
import Faceit from 'faceit-js-api';
import { SteamUser } from '@/types/response/Steam';
const STEAM_API_KEY = process.env.FACEIT_API_KEY;
const faceit = new Faceit(STEAM_API_KEY);
export class FaceitAPIService {
  static async getPlayer(steamId: string): Promise<SteamUser[]> {
    try {
      const player = await faceit.getPlayerInfoBySteamID(steamId);
      return player;
    } catch (error) {
      console.error('Error fetching player summaries:', error);
      throw error;
    }
  }
}
