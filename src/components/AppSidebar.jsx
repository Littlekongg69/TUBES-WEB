import { NavLink, useNavigate } from "react-router-dom";
import {
  Database,
  House,
  BookOpen,
  Gamepad2,
  Trophy,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

import "./AppSidebar.css";
import { useTheme } from "../presentation/hooks/useTheme";

const menuItems = [
  {
    label: "Beranda",
    path: "/dashboard",
    icon: House,
  },
  {
    label: "Belajar",
    path: "/learning",
    icon: BookOpen,
  },
  {
    label: "Game",
    path: "/game",
    icon: Gamepad2,
  },
  {
    label: "Peringkat",
    path: "/leaderboard",
    icon: Trophy,
  },
  {
    label: "Profil",
    path: "/profile",
    icon: User,
  },
  {
    label: "Pengaturan",
    path: "/settings",
    icon: Settings,
  },
];

function AppSidebar() {
  const navigate = useNavigate();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <aside className="app-sidebar" aria-label="Bilah sisi aplikasi">
      <div className="app-sidebar-brand">
        <div className="app-sidebar-logo" aria-hidden="true">
          <Database size={22} strokeWidth={2.2} />
        </div>

        <div className="app-sidebar-brand-text">
          <h2>SQL Quest</h2>
          <span>INTERACTIVE SQL LAB</span>
        </div>
      </div>

      <nav className="app-sidebar-navigation" aria-label="Navigasi utama">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `app-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={2.1} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="app-sidebar-footer">
        <button
          type="button"
          className="app-sidebar-theme-toggle"
          onClick={toggleDarkMode}
          aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
        >
          {isDark ? (
            <Sun size={18} strokeWidth={2.1} aria-hidden="true" />
          ) : (
            <Moon size={18} strokeWidth={2.1} aria-hidden="true" />
          )}
          <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
        </button>

        <button
          type="button"
          className="app-sidebar-logout"
          onClick={() => navigate("/login")}
        >
          <LogOut size={18} strokeWidth={2.1} aria-hidden="true" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
