
import { NavLink } from "react-router-dom";
import {
  Database,
  House,
  BookOpen,
  Gamepad2,
  Trophy,
  Settings,
} from "lucide-react";

import "./AppSidebar.css";

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
    label: "Pengaturan",
    path: "/profile",
    icon: Settings,
  },
];

function AppSidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar-brand">
        <div className="app-sidebar-logo">
          <Database size={23} strokeWidth={2.2} />
        </div>

        <div className="app-sidebar-brand-text">
          <h2>SQL Quest</h2>
          <span>INTERACTIVE LAB</span>
        </div>
      </div>

      <nav className="app-sidebar-navigation">
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
              <Icon size={20} strokeWidth={2.1} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default AppSidebar;
