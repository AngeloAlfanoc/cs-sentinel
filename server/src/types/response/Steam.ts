export interface SteamUser {
  steamid: string; // 64bit SteamID of the user
  personaname: string; // The player's persona name (display name)
  profileurl: string; // The full URL of the player's Steam Community profile
  avatar: string; // The full URL of the player's 32x32px avatar. Default avatar URL if not set
  avatarmedium: string; // The full URL of the player's 64x64px avatar. Default avatar URL if not set
  avatarfull: string; // The full URL of the player's 184x184px avatar. Default avatar URL if not set
  personastate: 0 | 1 | 2 | 3 | 4 | 5 | 6; // The user's current status. 0-Offline, 1-Online, etc. Special case for private profiles
  communityvisibilitystate: 1 | 3; // Visibility state: 1-Not visible to you, 3-Public
  loccountrycode: string;
  personastateflags: 0;
  timecreated: number;
  lastLogoff: number;
  profileState: number;
}
