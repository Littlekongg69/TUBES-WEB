const AUTH_STORAGE_KEY = "sqlquest_active_user";

export const demoAuthAccounts = [
  {
    id: 1,
    name: "Rani Maharani",
    username: "ranimaharani",
    email: "rani.maharani@example.com",
    role: "SQL Novice • Level 4",
  },
  {
    id: 2,
    name: "Kevin Sanjaya",
    username: "kevinsanjaya",
    email: "kevin.sanjaya@example.com",
    role: "SQL Master & DBA • Level 12",
  },
];

export class AuthLocalDataSource {
  getDemoAccounts() {
    return demoAuthAccounts;
  }

  getActiveSession() {
    try {
      const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  saveActiveSession(user) {
    try {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return true;
    } catch {
      return false;
    }
  }
}

