import axios from "axios";

/**
 * Data Source: SettingsDataSource
 * Fetches default user profile and preferences state via Axios and persists to localStorage.
 */
export const rawInitialSettings = {
  profile: {
    name: "Rani Maharani",
    username: "rani_sql",
    email: "rani.maharani@example.com",
    timezone: "Asia/Jakarta",
    bio: "SQL Novice yang sedang mendalami kueri SQL relasional dan optimasi indexing untuk data analytics.",
  },
  theme: "light",
  language: "Indonesia",
  font: "JetBrains Mono",
  reminderTime: "19:00",
  notifications: {
    levelUp: true,
    dailyChallenge: true,
    community: true,
    newsletter: false,
    hideLeaderboard: false,
  },
};

export class SettingsApiDataSource {
  async fetchSettingsData() {
    const response = await axios.get("/settings.json");
    return response.data;
  }
}
