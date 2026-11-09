import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Flame,
  Zap,
  User,
  Shield,
  Palette,
  Lock,
  Check,
  ShieldCheck,
  AlertTriangle,
  Save,
  RotateCcw,
} from "lucide-react";

import "./SettingsPage.css";
import AppSidebar from "../components/AppSidebar";
import { useSettings } from "../presentation/hooks/useSettings";

const THEME_LABELS = {
  light: "Mode Terang",
  dark: "Mode Gelap",
  system: "Ikuti Sistem",
};

function SettingsPage() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const notifPanelRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const settingsState = useSettings();
  const {
    theme,
    language,
    font,
    profile,
    notifications,
    reminderTime,
    saved,
    loading,
    error,
    retryFetch,
    feedback,
    handleSave,
    handleReset,
  } = settingsState;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape" && notifOpen) {
        setNotifOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (
        notifOpen &&
        notifPanelRef.current &&
        !notifPanelRef.current.contains(event.target)
      ) {
        setNotifOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    if (
      q.includes("sandi") ||
      q.includes("password") ||
      q.includes("keamanan")
    ) {
      navigate("/settings/security");
      return;
    }
    if (
      q.includes("tema") ||
      q.includes("dark") ||
      q.includes("bahasa") ||
      q.includes("font")
    ) {
      navigate("/settings/appearance");
      return;
    }
    if (
      q.includes("notifikasi") ||
      q.includes("pengingat") ||
      q.includes("streak")
    ) {
      navigate("/settings/notifications");
      return;
    }
    if (
      q.includes("privasi") ||
      q.includes("hapus") ||
      q.includes("leaderboard")
    ) {
      navigate("/settings/privacy");
      return;
    }
    if (q.includes("profil") || q.includes("nama") || q.includes("bio")) {
      navigate("/profile");
      return;
    }
    navigate("/learning");
  };

  const tabs = [
    {
      id: "security",
      path: "/settings/security",
      label: "Keamanan & Kata Sandi",
      icon: Lock,
    },
    {
      id: "appearance",
      path: "/settings/appearance",
      label: "Tampilan & Bahasa",
      icon: Palette,
    },
    {
      id: "notifications",
      path: "/settings/notifications",
      label: "Notifikasi & Pengingat",
      icon: Bell,
    },
    {
      id: "privacy",
      path: "/settings/privacy",
      label: "Privasi & Data Akun",
      icon: Shield,
    },
  ];

  const userInitials = (profile.name || "Rani Maharani")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const activeNotifCount = [
    notifications?.levelUp,
    notifications?.dailyChallenge,
    notifications?.community,
    notifications?.newsletter,
  ].filter(Boolean).length;

  return (
    <div className="settings-layout">
      <AppSidebar />

      <main className="settings-main">
        <header className="settings-topbar">
          <form
            className="settings-global-search"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <Search size={16} aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengaturan (sandi, tema, notifikasi)..."
              aria-label="Cari pengaturan akun"
            />
            <kbd aria-hidden="true">Ctrl K</kbd>
          </form>

          <div className="settings-topbar-right">
            <div className="settings-stat streak" title="Streak belajar aktif">
              <Flame size={15} aria-hidden="true" />
              <span>6 Hari</span>
            </div>

            <div className="settings-stat xp" title="Total poin pengalaman">
              <Zap size={15} aria-hidden="true" />
              <span>1.420 XP</span>
            </div>

            <div className="settings-notif-wrap" ref={notifPanelRef}>
              <button
                type="button"
                className="settings-bell"
                aria-label="Buka panel notifikasi"
                aria-expanded={notifOpen}
                aria-controls="settings-notif-popover"
                onClick={() => setNotifOpen((prev) => !prev)}
              >
                <Bell size={17} aria-hidden="true" />
                <span className="settings-bell-dot" aria-hidden="true" />
              </button>

              {notifOpen && (
                <div
                  id="settings-notif-popover"
                  className="settings-notif-popover"
                  role="dialog"
                  aria-label="Ringkasan notifikasi"
                >
                  <div className="settings-notif-header">
                    <strong>Notifikasi Latihan</strong>
                    <span>Jadwal: {reminderTime} WIB</span>
                  </div>
                  <ul className="settings-notif-list">
                    <li>
                      <strong>Pengingat Streak Aktif</strong>
                      <span>
                        Selesaikan 1 tantangan kueri sebelum pukul 23:59 WIB
                        untuk menjaga streak 6 hari.
                      </span>
                    </li>
                    <li>
                      <strong>Preferensi Tersinkronisasi</strong>
                      <span>
                        Pengaturan tema dan font editor disimpan secara lokal
                        pada perangkat ini.
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="settings-notif-link"
                    onClick={() => {
                      setNotifOpen(false);
                      navigate("/settings/notifications");
                    }}
                  >
                    Buka pengaturan notifikasi
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="settings-user-button"
              aria-label="Buka profil pengguna"
              onClick={() => navigate("/profile")}
            >
              <div className="settings-user-avatar" aria-hidden="true">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt=""
                    width="36"
                    height="36"
                  />
                ) : (
                  userInitials
                )}
              </div>
              <div className="settings-user-meta">
                <strong>{profile.name || "Rani Maharani"}</strong>
                <span>Level 4 • {profile.role || "SQL Novice"}</span>
              </div>
            </button>
          </div>
        </header>

        <div className="settings-content">
          <div className="settings-page-heading">
            <div>
              <div className="settings-heading-brand">
                <h1>Pengaturan Akun & Preferensi</h1>
                <span className="settings-brand-dot" aria-hidden="true" />
              </div>
              <span className="settings-heading-subline">
                ACCOUNT • WORKSPACE • SECURITY
              </span>
              <p>
                Konfigurasi kata sandi, skema tema antarmuka, jadwal pengingat
                latihan, dan kendali privasi data akun.
              </p>
            </div>

            <div className="profile-header-actions">
              <div className="settings-verified-badge">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>Email Terverifikasi</span>
              </div>

              <button
                type="button"
                className="profile-goto-settings"
                onClick={() => navigate("/profile")}
              >
                <User size={15} aria-hidden="true" />
                <span>Buka Profil</span>
              </button>
            </div>
          </div>

          <nav
            className="settings-tabs"
            aria-label="Kategori pengaturan akun"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{tab.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {feedback.message && (
            <div
              className={`settings-feedback-banner ${feedback.type}`}
              role={feedback.type === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {feedback.type === "error" ? (
                <AlertTriangle size={16} aria-hidden="true" />
              ) : (
                <Check size={16} aria-hidden="true" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {loading ? (
            <div className="status-screen" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Memuat konfigurasi akun...</p>
            </div>
          ) : error ? (
            <div className="status-screen" role="alert">
              <p>{error}</p>
              <button type="button" onClick={retryFetch}>
                Muat Ulang Data
              </button>
            </div>
          ) : (
            <div className="settings-workspace">
              <div className="settings-workspace-main">
                <Outlet context={settingsState} />
              </div>

              <aside
                className="settings-summary-aside"
                aria-label="Ringkasan konfigurasi aktif"
              >
                <article className="settings-card settings-summary-card">
                  <header className="settings-section-header">
                    <div className="settings-summary-head">
                      <h2>Status Konfigurasi</h2>
                      <span
                        className={`settings-sync-pill ${saved ? "synced" : "pending"
                          }`}
                      >
                        {saved ? "Tersinkron" : "Belum Disimpan"}
                      </span>
                    </div>
                    <p>
                      Ringkasan preferensi lingkungan belajar SQL yang aktif
                      pada peramban ini.
                    </p>
                  </header>

                  <dl className="profile-telemetry-list">
                    <div className="profile-telemetry-row">
                      <dt>Skema Tema</dt>
                      <dd>{THEME_LABELS[theme] || "Mode Terang"}</dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Bahasa Pengantar</dt>
                      <dd>{language || "Indonesia"}</dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Font Konsol SQL</dt>
                      <dd className="settings-mono-dd">
                        {font || "JetBrains Mono"}
                      </dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Jam Pengingat</dt>
                      <dd className="settings-mono-dd">
                        {reminderTime || "19:30"} WIB
                      </dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Kanal Notifikasi</dt>
                      <dd>{activeNotifCount} / 4 Aktif</dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Visibilitas Klasemen</dt>
                      <dd>
                        {notifications?.hideLeaderboard
                          ? "Tersembunyi (Privat)"
                          : "Publik"}
                      </dd>
                    </div>
                  </dl>

                  <div className="settings-summary-footer">
                    <button
                      type="button"
                      className="settings-summary-action"
                      onClick={() => navigate("/profile")}
                    >
                      <User size={15} aria-hidden="true" />
                      <span>Kelola Identitas & Sertifikat Profil</span>
                    </button>
                  </div>
                </article>
              </aside>
            </div>
          )}
        </div>

        <footer className="settings-save-bar">
          <div
            className="settings-save-status"
            role="status"
            aria-live="polite"
          >
            <span className={saved ? "saved" : ""} aria-hidden="true" />
            {saved
              ? "Seluruh preferensi telah tersimpan di perangkat"
              : "Terdapat perubahan preferensi yang belum disimpan"}
          </div>

          <div className="settings-save-actions">
            <button
              type="button"
              className="settings-reset-button"
              onClick={handleReset}
            >
              <RotateCcw size={15} aria-hidden="true" />
              <span>Kembalikan Semula</span>
            </button>

            <button
              type="button"
              className="settings-save-button"
              onClick={handleSave}
            >
              <Save size={15} aria-hidden="true" />
              <span>Simpan Preferensi</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default SettingsPage;
