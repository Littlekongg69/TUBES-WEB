import axios from "axios";

export const rawLeaderboardUsers = [
  { id: 1, name: "Kevin Sanjaya", username: "@kevinsanjaya", level: 12, title: "SQL Master & DBA", modules: 48, challenges: 120, streak: 45, xp: 12450, avatar: "KS" },
  { id: 2, name: "Ahmad Rizki", username: "@ahmadrizki", level: 9, title: "SQL Specialist", modules: 36, challenges: 85, streak: 28, xp: 9820, avatar: "AR" },
  { id: 3, name: "Dewi Lestari", username: "@dewilestari", level: 8, title: "SQL Practitioner", modules: 30, challenges: 70, streak: 19, xp: 8150, avatar: "DL" },
  { id: 4, name: "Dimas Pratama", username: "@dimaspratama", level: 7, title: "SQL Practitioner", modules: 25, challenges: 55, streak: 15, xp: 7420, avatar: "DP" },
  { id: 5, name: "Siti Nurhaliza", username: "@sitinur", level: 7, title: "Query Optimizer", modules: 24, challenges: 50, streak: 21, xp: 7180, avatar: "SN" },
  { id: 6, name: "Budi Wicaksono", username: "@budi_wicak", level: 6, title: "Data Analyst", modules: 22, challenges: 46, streak: 12, xp: 6890, avatar: "BW" },
  { id: 7, name: "Sarah Amelia", username: "@sarahamelia", level: 6, title: "SQL Apprentice", modules: 20, challenges: 40, streak: 9, xp: 6350, avatar: "SA" },
  { id: 8, name: "Fajar Ramadhan", username: "@fajar_r", level: 5, title: "Junior DBA", modules: 19, challenges: 38, streak: 14, xp: 5920, avatar: "FR" },
  { id: 9, name: "Maya Putri", username: "@mayaputri", level: 5, title: "SQL Practitioner", modules: 17, challenges: 35, streak: 8, xp: 5610, avatar: "MP" },
  { id: 10, name: "Hendra Gunawan", username: "@hendragun", level: 5, title: "SQL Practitioner", modules: 16, challenges: 32, streak: 11, xp: 5240, avatar: "HG" },
];

export const rawCurrentUserStanding = {
  name: "Rani Maharani",
  username: "@ranimaharani",
  level: 4,
  title: "SQL Novice",
  xp: 1420,
  position: 128,
  nextPosition: 1600,
};

export class LeaderboardApiDataSource {
  async fetchLeaderboardData() {
    const response = await axios.get("/leaderboard.json");
    return response.data;
  }
}
