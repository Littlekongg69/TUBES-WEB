import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Flame,
  Zap,
  Camera,
  Check,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Save,
  RotateCcw,
  Award,
  Settings,
  Trash2,
} from "lucide-react";

import "./SettingsPage.css";
import AppSidebar from "../components/AppSidebar";
import { useSettings } from "../presentation/hooks/useSettings";

function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const notifPanelRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const {
    profile,
    reminderTime,
    saved,
    loading,
    error,
    retryFetch,
    profileErrors,
    feedback,
    updateProfile,
    handleAvatarUpload,
    handleAvatarRemove,
    handleSave,
    handleReset,
  } = useSettings();

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
    if (!q) {
      navigate("/learning");
      return;
    }
    if (q.includes("sandi") || q.includes("password") || q.includes("keamanan")) {
      navigate("/settings/security");
      return;
    }
    if (q.includes("tema") || q.includes("dark") || q.includes("bahasa") || q.includes("font")) {
      navigate("/settings/appearance");
      return;
    }
    if (q.includes("notifikasi") || q.includes("pengingat") || q.includes("streak")) {
      navigate("/settings/notifications");
      return;
    }
    if (q.includes("privasi") || q.includes("hapus")) {
      navigate("/settings/privacy");
      return;
    }
    navigate("/learning");
  };

  const badges = [
    {
      id: "select-pioneer",
      code: "SELECT .. WHERE",
      title: "SELECT Pioneer",
      desc: "Menyelesaikan seluruh latihan penyaringan baris dasar pada modul Pengenalan SQL.",
      earned: true,
    },
    {
      id: "aggregation-pro",
      code: "GROUP BY .. HAVING",
      title: "Aggregation Pro",
      desc: "Menyelesaikan kueri agregasi laporan penjualan tanpa kesalahan sintaks.",
      earned: true,
    },
    {
      id: "streak-7d",
      code: "STREAK >= 6D",
      title: "Konsistensi Latihan",
      desc: "Menjalankan kueri latihan harian selama 6 hari berturut-turut.",
      earned: true,
    },
    {
      id: "join-architect",
      code: "INNER / LEFT JOIN",
      title: "JOIN Architect",
      desc: "Selesaikan modul relasi multi-tabel untuk membuka lencana kompetensi ini.",
      earned: false,
    },
  ];

  const userInitial = (profile.name || "R")[0].toUpperCase();

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
              placeholder="Cari modul SQL atau pengaturan..."
              aria-label="Cari modul SQL atau pengaturan"
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
                aria-controls="topbar-notif-popover"
                onClick={() => setNotifOpen((prev) => !prev)}
              >
                <Bell size={17} aria-hidden="true" />
                <span className="settings-bell-dot" aria-hidden="true" />
              </button>

              {notifOpen && (
                <div
                  id="topbar-notif-popover"
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
                        Selesaikan 1 tantangan kueri sebelum pukul 23:59 WIB untuk menjaga streak 6 hari.
                      </span>
                    </li>
                    <li>
                      <strong>Lencana SELECT Pioneer Diraih</strong>
                      <span>
                        Modul dasar SELECT & WHERE telah tercatat pada profil pembelajar.
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
                    Atur jadwal pengingat
                  </button>
                </div>
              )}
            </div>

            <div className="settings-user">
              <div className="settings-user-avatar" aria-hidden="true">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt=""
                    width="36"
                    height="36"
                  />
                ) : (
                  userInitial
                )}
              </div>
              <div>
                <strong>{profile.name || "Rani Maharani"}</strong>
                <span>Level 4 • SQL Novice</span>
              </div>
            </div>
          </div>
        </header>

        <div className="settings-content">
          <div className="settings-page-heading">
            <div>
              <h1>Profil & Biodata Pembelajar</h1>
              <p>
                Perbarui identitas akun, zona waktu belajar, dan periksa catatan progres kurikulum SQL.
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
                onClick={() => navigate("/settings/security")}
              >
                <Settings size={15} aria-hidden="true" />
                <span>Pengaturan Akun</span>
              </button>
            </div>
          </div>

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
              <p>Memuat profil pembelajar...</p>
            </div>
          ) : error ? (
            <div className="status-screen" role="alert">
              <p>{error}</p>
              <button type="button" onClick={retryFetch}>
                Muat Ulang Data
              </button>
            </div>
          ) : (
            <div className="settings-grid">
              <div className="settings-column">
                <section
                  className="settings-card"
                  id="settings-profile"
                  aria-labelledby="heading-profile"
                >
                  <header className="settings-section-header">
                    <div>
                      <h2 id="heading-profile">Identitas & Biodata</h2>
                      <p>
                        Informasi ini ditampilkan pada papan peringkat dan diskusi kueri komunitas.
                      </p>
                    </div>
                  </header>

                  <div className="settings-avatar-editor">
                    <div className="settings-large-avatar">
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={`Foto profil ${profile.name || "pengguna"}`}
                          width="80"
                          height="80"
                        />
                      ) : (
                        <span aria-hidden="true">{userInitial}</span>
                      )}
                      <small className="settings-level-tag">Lv 4</small>
                    </div>

                    <div className="settings-avatar-actions">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="settings-sr-only"
                        aria-label="Pilih file foto profil"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleAvatarUpload(file);
                          }
                          e.target.value = "";
                        }}
                      />

                      <button
                        type="button"
                        className="settings-upload-button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera size={15} aria-hidden="true" />
                        <span>Unggah Foto</span>
                      </button>

                      <button
                        type="button"
                        className="settings-delete-photo"
                        disabled={!profile.avatarUrl}
                        onClick={handleAvatarRemove}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        <span>Hapus Foto</span>
                      </button>

                      <small>
                        Format JPG, PNG, GIF, atau WebP (maks. 2MB, rasio 1:1).
                      </small>
                    </div>
                  </div>

                  <form
                    className="settings-form-grid"
                    onSubmit={handleSave}
                    noValidate
                  >
                    <div className="settings-field">
                      <label htmlFor="profile-name">Nama Lengkap</label>
                      <input
                        id="profile-name"
                        type="text"
                        required
                        minLength={3}
                        value={profile.name}
                        aria-invalid={Boolean(profileErrors.name)}
                        aria-describedby={
                          profileErrors.name ? "error-profile-name" : undefined
                        }
                        onChange={(e) =>
                          updateProfile("name", e.target.value)
                        }
                      />
                      {profileErrors.name && (
                        <small
                          id="error-profile-name"
                          className="settings-field-error"
                          role="alert"
                        >
                          {profileErrors.name}
                        </small>
                      )}
                    </div>

                    <div className="settings-field">
                      <label htmlFor="profile-username">Username</label>
                      <div className="settings-input-prefix">
                        <span aria-hidden="true">@</span>
                        <input
                          id="profile-username"
                          type="text"
                          required
                          value={profile.username}
                          aria-invalid={Boolean(profileErrors.username)}
                          aria-describedby={
                            profileErrors.username
                              ? "error-profile-username"
                              : undefined
                          }
                          onChange={(e) =>
                            updateProfile("username", e.target.value)
                          }
                        />
                      </div>
                      {profileErrors.username && (
                        <small
                          id="error-profile-username"
                          className="settings-field-error"
                          role="alert"
                        >
                          {profileErrors.username}
                        </small>
                      )}
                    </div>

                    <div className="settings-field full">
                      <label htmlFor="profile-email">Alamat Email</label>
                      <div className="settings-email-input">
                        <input
                          id="profile-email"
                          type="email"
                          required
                          value={profile.email}
                          aria-invalid={Boolean(profileErrors.email)}
                          aria-describedby={
                            profileErrors.email
                              ? "error-profile-email"
                              : undefined
                          }
                          onChange={(e) =>
                            updateProfile("email", e.target.value)
                          }
                        />

                        <span>
                          <Check size={13} aria-hidden="true" />
                          Terverifikasi
                        </span>
                      </div>
                      {profileErrors.email && (
                        <small
                          id="error-profile-email"
                          className="settings-field-error"
                          role="alert"
                        >
                          {profileErrors.email}
                        </small>
                      )}
                    </div>

                    <div className="settings-field full">
                      <label htmlFor="profile-timezone">Zona Waktu</label>
                      <div className="settings-select-wrap">
                        <select
                          id="profile-timezone"
                          value={profile.timezone}
                          onChange={(e) =>
                            updateProfile("timezone", e.target.value)
                          }
                        >
                          <option value="Asia/Jakarta">
                            Asia/Jakarta (WIB, UTC+7)
                          </option>
                          <option value="Asia/Makassar">
                            Asia/Makassar (WITA, UTC+8)
                          </option>
                          <option value="Asia/Jayapura">
                            Asia/Jayapura (WIT, UTC+9)
                          </option>
                        </select>
                        <ChevronDown size={16} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="settings-field full">
                      <label htmlFor="profile-bio">Catatan Fokus Belajar</label>
                      <textarea
                        id="profile-bio"
                        rows="3"
                        maxLength="160"
                        value={profile.bio}
                        aria-invalid={Boolean(profileErrors.bio)}
                        onChange={(e) =>
                          updateProfile("bio", e.target.value)
                        }
                      />
                      <small className="settings-character-count">
                        {profile.bio.length}/160 karakter
                      </small>
                      {profileErrors.bio && (
                        <small className="settings-field-error" role="alert">
                          {profileErrors.bio}
                        </small>
                      )}
                    </div>
                  </form>
                </section>
              </div>

              <div className="settings-column">
                <section
                  className="settings-card"
                  aria-labelledby="heading-stats"
                >
                  <header className="settings-section-header">
                    <div>
                      <h2 id="heading-stats">Catatan Progres Kurikulum</h2>
                      <p>
                        Data akumulasi latihan kueri dan posisi klasemen saat ini.
                      </p>
                    </div>
                  </header>

                  <div className="profile-xp-banner">
                    <div className="profile-xp-heading">
                      <div>
                        <span className="profile-xp-label">
                          Progres Menuju Level 5 (SQL Practitioner)
                        </span>
                        <strong>1.420 / 2.000 XP</strong>
                      </div>
                      <span className="profile-xp-pct">71%</span>
                    </div>
                    <div
                      className="profile-xp-track"
                      role="progressbar"
                      aria-valuenow={71}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Progres menuju Level 5"
                    >
                      <div className="profile-xp-fill" style={{ width: "71%" }} />
                    </div>
                  </div>

                  <dl className="profile-telemetry-list">
                    <div className="profile-telemetry-row">
                      <dt>Streak Latihan Aktif</dt>
                      <dd>6 Hari Berturut-turut</dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Modul Kurikulum Selesai</dt>
                      <dd>2 dari 8 Modul</dd>
                    </div>
                    <div className="profile-telemetry-row">
                      <dt>Posisi Papan Peringkat</dt>
                      <dd>#128 Liga Master</dd>
                    </div>
                  </dl>
                </section>

                <section
                  className="settings-card"
                  aria-labelledby="heading-badges"
                >
                  <header className="settings-section-header">
                    <div>
                      <h2 id="heading-badges">Kompetensi Kueri & Lencana</h2>
                      <p>
                        Bukti penyelesaian modul praktik SQL.
                      </p>
                    </div>
                  </header>

                  <div className="profile-badge-list">
                    {badges.map((badge) => (
                      <article
                        key={badge.id}
                        className={`profile-badge-item ${
                          badge.earned ? "earned" : "locked"
                        }`}
                      >
                        <div className="profile-badge-medal" aria-hidden="true">
                          <Award size={18} />
                        </div>
                        <div className="profile-badge-copy">
                          <div className="profile-badge-title-row">
                            <strong>{badge.title}</strong>
                            <code>{badge.code}</code>
                          </div>
                          <span>{badge.desc}</span>
                        </div>
                        <span className="profile-badge-tag">
                          {badge.earned ? "Tercapai" : "Belum Terbuka"}
                        </span>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
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
              ? "Seluruh perubahan profil telah tersimpan"
              : "Terdapat perubahan profil yang belum disimpan"}
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
              <span>Simpan Profil</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default ProfilePage;
