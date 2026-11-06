import { useState } from "react";
import {
  BookOpen,
  Search,
  Bell,
  Flame,
  Zap,
  User,
  Shield,
  Palette,
  Lock,
  BellRing,
  Eye,
  EyeOff,
  Camera,
  Check,
  ShieldCheck,
  AlertTriangle,
  Clock,
  ChevronDown,
  Save,
  RotateCcw,
} from "lucide-react";

import "./SettingsPage.css";
import AppSidebar from "../components/AppSidebar";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("Indonesia");
  const [font, setFont] = useState("JetBrains Mono");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    levelUp: true,
    dailyChallenge: true,
    community: true,
    newsletter: false,
    hideLeaderboard: false,
  });

  const initialProfile = {
    name: "Rani Maharani",
    username: "rani_sql",
    email: "rani.maharani@example.com",
    timezone: "Asia/Jakarta",
    bio: "SQL Novice yang sedang mendalami query PostgreSQL dan optimasi query indexing untuk data analytics.",
  };

  const [profile, setProfile] = useState(initialProfile);

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [reminderTime, setReminderTime] = useState("19:00");
  const [saved, setSaved] = useState(true);

  const updateProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const updateNotification = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setSaved(false);
  };

  const updatePassword = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const selectTab = (tab) => {
    setActiveTab(tab);

    document.getElementById(`settings-${tab}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSave = () => {
    setSaved(true);
  };

  const handleReset = () => {
    setProfile(initialProfile);

    setPasswords({
      old: "",
      new: "",
      confirm: "",
    });

    setReminderTime("19:00");
    setTheme("dark");
    setLanguage("Indonesia");
    setFont("JetBrains Mono");

    setNotifications({
      levelUp: true,
      dailyChallenge: true,
      community: true,
      newsletter: false,
      hideLeaderboard: false,
    });

    setSaved(true);
  };

  const tabs = [
    { id: "profile", label: "Profil & Biodata", icon: User },
    { id: "security", label: "Keamanan & Kata Sandi", icon: Lock },
    { id: "appearance", label: "Tampilan & Bahasa", icon: Palette },
    { id: "notifications", label: "Notifikasi & Pengingat", icon: Bell },
    { id: "privacy", label: "Privasi & Zona Bahaya", icon: Shield },
  ];

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      className={`settings-toggle ${checked ? "enabled" : ""}`}
      onClick={onChange}
      aria-label="Ubah pengaturan"
      aria-pressed={checked}
    >
      <span />
    </button>
  );

  return (
    <div className="settings-layout">
      <AppSidebar />

      <main className="settings-main">
        {/* TOPBAR */}
        <header className="settings-topbar">
          <div className="settings-global-search">
            <Search size={17} />
            <input placeholder="Cari kueri, topik, sintaks..." />
            <kbd>Ctrl K</kbd>
          </div>

          <div className="settings-topbar-right">
            <div className="settings-stat streak">
              <Flame size={16} />
              6 Hari
            </div>

            <div className="settings-stat xp">
              <Zap size={16} />
              1.420 XP
            </div>

            <button className="settings-bell">
              <Bell size={18} />
            </button>

            <div className="settings-user">
              <div className="settings-user-avatar">R</div>
              <div>
                <strong>Rani Maharani</strong>
                <span>SQL Novice</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="settings-content">
          <div className="settings-page-heading">
            <div>
              <h1>Pengaturan Akun & Preferensi</h1>
              <p>
                Kelola profil pribadi, keamanan, notifikasi, serta tampilan
                antarmuka SQL Quest kamu.
              </p>
            </div>

            <div className="settings-verified-badge">
              <ShieldCheck size={16} />
              Status Akun: Terverifikasi
            </div>
          </div>

          {/* TABS */}
          <div className="settings-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? "active" : ""}
                  onClick={() => selectTab(tab.id)}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="settings-grid">
            {/* LEFT COLUMN */}
            <div className="settings-column">
              {/* PROFILE */}
              <section className="settings-card" id="settings-profile">
                <div className="settings-card-heading">
                  <div className="settings-heading-icon blue">
                    <User size={19} />
                  </div>

                  <div>
                    <h2>Informasi Profil</h2>
                    <p>
                      Perbarui avatar dan biodata publikmu di SQL Quest.
                    </p>
                  </div>
                </div>

                <div className="settings-avatar-editor">
                  <div className="settings-large-avatar">
                    R
                    <span>Lv 4</span>
                  </div>

                  <div className="settings-avatar-actions">
                    <button type="button" className="settings-upload-button">
                      <Camera size={15} />
                      Ganti Foto
                    </button>

                    <button type="button" className="settings-delete-photo">
                      Hapus
                    </button>

                    <small>
                      Format JPG, PNG atau GIF (Maks. 2MB).
                      Rekomendasi 400×400px.
                    </small>
                  </div>
                </div>

                <div className="settings-form-grid">
                  <div className="settings-field">
                    <label>Nama Lengkap</label>
                    <input
                      value={profile.name}
                      onChange={(e) =>
                        updateProfile("name", e.target.value)
                      }
                    />
                  </div>

                  <div className="settings-field">
                    <label>Username</label>
                    <div className="settings-input-prefix">
                      <span>@</span>
                      <input
                        value={profile.username}
                        onChange={(e) =>
                          updateProfile("username", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="settings-field full">
                    <label>Email Akun</label>
                    <div className="settings-email-input">
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          updateProfile("email", e.target.value)
                        }
                      />

                      <span>
                        <Check size={12} />
                        Terverifikasi
                      </span>
                    </div>
                  </div>

                  <div className="settings-field full">
                    <label>Zona Waktu / Timezone</label>
                    <div className="settings-select-wrap">
                      <select
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
                      <ChevronDown size={16} />
                    </div>
                  </div>

                  <div className="settings-field full">
                    <label>Bio Singkat</label>
                    <textarea
                      rows="3"
                      maxLength="160"
                      value={profile.bio}
                      onChange={(e) =>
                        updateProfile("bio", e.target.value)
                      }
                    />
                    <small className="settings-character-count">
                      {profile.bio.length}/160 Karakter
                    </small>
                  </div>
                </div>
              </section>

              {/* SECURITY */}
              <section className="settings-card" id="settings-security">
                <div className="settings-card-heading">
                  <div className="settings-heading-icon orange">
                    <Lock size={19} />
                  </div>

                  <div>
                    <h2>Keamanan Akun</h2>
                    <p>
                      Lindungi akun SQL Quest kamu dengan kata sandi yang kuat.
                    </p>
                  </div>
                </div>

                <div className="settings-password-fields">
                  <div className="settings-field">
                    <label>Kata Sandi Lama</label>
                    <div className="settings-password-input">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Masukkan kata sandi lama"
                        value={passwords.old}
                        onChange={(e) =>
                          updatePassword("old", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowOldPassword(!showOldPassword)
                        }
                      >
                        {showOldPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="settings-field">
                    <label>Kata Sandi Baru</label>
                    <div className="settings-password-input">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Masukkan kata sandi baru"
                        value={passwords.new}
                        onChange={(e) =>
                          updatePassword("new", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(!showNewPassword)
                        }
                      >
                        {showNewPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="settings-password-strength">
                    <span />
                    <span />
                    <span />
                    <strong>
                      {passwords.new.length >= 8 ? "Kuat" : "Belum kuat"}
                    </strong>
                  </div>

                  <div className="settings-field">
                    <label>Konfirmasi Kata Sandi Baru</label>
                    <div className="settings-password-input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi kata sandi baru"
                        value={passwords.confirm}
                        onChange={(e) =>
                          updatePassword("confirm", e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="settings-password-footer">
                    <span>Terakhir diubah 2 bulan yang lalu</span>
                    <button
                      type="button"
                      className="settings-primary-button"
                      onClick={() => {
                        if (
                          passwords.new &&
                          passwords.new === passwords.confirm
                        ) {
                          alert("Validasi kata sandi berhasil.");
                        } else {
                          alert(
                            "Pastikan kata sandi baru dan konfirmasi sama."
                          );
                        }
                      }}
                    >
                      Perbarui Kata Sandi
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="settings-column">
              {/* APPEARANCE */}
              <section className="settings-card" id="settings-appearance">
                <div className="settings-card-heading">
                  <div className="settings-heading-icon purple">
                    <Palette size={19} />
                  </div>

                  <div>
                    <h2>Tampilan & Preferensi Editor</h2>
                    <p>
                      Sesuaikan mode visual dan bahasa platform.
                    </p>
                  </div>
                </div>

                <div className="settings-field">
                  <label>Mode Tema Antarmuka</label>

                  <div className="settings-theme-options">
                    {[
                      { id: "light", label: "Terang" },
                      { id: "dark", label: "Gelap" },
                      { id: "system", label: "Sistem" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        className={`settings-theme-option ${
                          theme === item.id ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTheme(item.id);
                          setSaved(false);
                        }}
                      >
                        <div className={`theme-preview ${item.id}`}>
                          <span />
                          <span />
                          <span />
                        </div>
                        <strong>{item.label}</strong>
                        {theme === item.id && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="settings-field">
                  <label>Bahasa Antarmuka</label>
                  <div className="settings-select-wrap">
                    <select
                      value={language}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        setSaved(false);
                      }}
                    >
                      <option>Indonesia</option>
                      <option>English</option>
                    </select>
                    <ChevronDown size={16} />
                  </div>
                </div>

                <div className="settings-field">
                  <label>Font Editor Kueri SQL</label>
                  <div className="settings-font-options">
                    {["JetBrains Mono", "Fira Code", "Source Code"].map(
                      (item) => (
                        <button
                          key={item}
                          className={font === item ? "selected" : ""}
                          onClick={() => {
                            setFont(item);
                            setSaved(false);
                          }}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </section>

              {/* NOTIFICATIONS */}
              <section
                className="settings-card"
                id="settings-notifications"
              >
                <div className="settings-card-heading">
                  <div className="settings-heading-icon orange">
                    <BellRing size={19} />
                  </div>

                  <div>
                    <h2>Pengingat Streak & Notifikasi</h2>
                    <p>
                      Jangan sampai kehilangan api streak latihan harianmu.
                    </p>
                  </div>
                </div>

                <div className="settings-reminder-box">
                  <div className="settings-reminder-heading">
                    <strong>
                      <Clock size={16} />
                      Waktu Pengingat Harian
                    </strong>

                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => {
                        setReminderTime(e.target.value);
                        setSaved(false);
                      }}
                    />
                  </div>

                  <p>
                    Kami akan mengirimkan notifikasi 30 menit sebelum reset
                    misi harian.
                  </p>
                </div>

                <div className="settings-toggle-list">
                  <div className="settings-toggle-row">
                    <div>
                      <strong>Pencapaian & Level Up</strong>
                      <span>
                        Notifikasi saat XP bertambah dan lencana baru diraih
                      </span>
                    </div>
                    <Toggle
                      checked={notifications.levelUp}
                      onChange={() => updateNotification("levelUp")}
                    />
                  </div>

                  <div className="settings-toggle-row">
                    <div>
                      <strong>Tantangan Harian Baru</strong>
                      <span>
                        Informasi kuis query baru setiap pukul 00:00 WIB
                      </span>
                    </div>
                    <Toggle
                      checked={notifications.dailyChallenge}
                      onChange={() => updateNotification("dailyChallenge")}
                    />
                  </div>

                  <div className="settings-toggle-row">
                    <div>
                      <strong>Balasan Diskusi Komunitas</strong>
                      <span>
                        Pemberitahuan bila query jawabanmu dibahas
                      </span>
                    </div>
                    <Toggle
                      checked={notifications.community}
                      onChange={() => updateNotification("community")}
                    />
                  </div>

                  <div className="settings-toggle-row">
                    <div>
                      <strong>Email Newsletter & Tips Mingguan</strong>
                      <span>
                        Rangkuman trik indexing dan query optimization
                      </span>
                    </div>
                    <Toggle
                      checked={notifications.newsletter}
                      onChange={() => updateNotification("newsletter")}
                    />
                  </div>
                </div>
              </section>

              {/* PRIVACY */}
              <section className="settings-card" id="settings-privacy">
                <div className="settings-card-heading">
                  <div className="settings-heading-icon red">
                    <AlertTriangle size={19} />
                  </div>

                  <div>
                    <h2>Privasi & Zona Bahaya</h2>
                    <p>
                      Kelola visibilitas data dan status akun SQL Quest.
                    </p>
                  </div>
                </div>

                <div className="settings-privacy-box">
                  <div>
                    <strong>Sembunyikan dari Leaderboard Publik</strong>
                    <span>
                      Nama dan peringkatmu tidak akan muncul di klasemen publik
                    </span>
                  </div>

                  <Toggle
                    checked={notifications.hideLeaderboard}
                    onChange={() => updateNotification("hideLeaderboard")}
                  />
                </div>

                <div className="settings-danger-box">
                  <h3>Hapus Akun Permanen</h3>
                  <p>
                    Menghapus akun akan menghilangkan seluruh riwayat XP,
                    streak, serta sertifikat modul yang telah diselesaikan.
                    Tindakan ini tidak dapat dibatalkan.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Apakah kamu yakin ingin menghapus akun secara permanen?"
                      );

                      if (confirmed) {
                        alert(
                          "Fitur penghapusan akun belum terhubung ke backend."
                        );
                      }
                    }}
                  >
                    <AlertTriangle size={15} />
                    Hapus Akun Permanen
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* SAVE BAR */}
        <div className="settings-save-bar">
          <div className="settings-save-status">
            <span className={saved ? "saved" : ""} />
            {saved
              ? "Semua perubahan telah disimpan"
              : "Ada perubahan yang belum disimpan"}
          </div>

          <div className="settings-save-actions">
            <button
              type="button"
              className="settings-reset-button"
              onClick={handleReset}
            >
              <RotateCcw size={14} />
              Batal / Reset
            </button>

            <button
              type="button"
              className="settings-save-button"
              onClick={handleSave}
            >
              <Save size={15} />
              Simpan Perubahan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;