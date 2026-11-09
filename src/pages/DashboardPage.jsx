import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Flame,
  FolderKanban,
  GraduationCap,
  Play,
  RotateCcw,
  ShieldCheck,
  Star,
  Target,
  X,
  Zap,
} from "lucide-react";

import "../App.css";
import "./DashboardLayout.css";
import AppSidebar from "../components/AppSidebar";
import { useDashboard } from "../presentation/hooks/useDashboard";

const SANDBOX_PRESETS = {
  default: {
    title: "Sandbox Kueri SQL Interaktif",
    schema: "TABLE: learners (id, name, role, xp, streak)",
    query:
      "SELECT name, role, xp, streak\nFROM learners\nWHERE xp >= 1400\nORDER BY xp DESC;",
    columns: ["name", "role", "xp", "streak"],
    rows: [
      ["Kevin Sanjaya", "SQL Master & DBA", "3.890", "45 hari"],
      ["Ahmad Rizki", "SQL Specialist", "3.410", "28 hari"],
      ["Dewi Lestari", "SQL Practitioner", "3.120", "19 hari"],
      ["Rani Maharani", "SQL Novice", "1.420", "6 hari"],
    ],
  },
  1: {
    title: "Tantangan #01: Resep Cepat Saji Dapur",
    schema: "TABLE: kitchen_recipes (id, menu_name, prep_minutes, difficulty)",
    query:
      "SELECT id, menu_name, prep_minutes\nFROM kitchen_recipes\nWHERE prep_minutes < 25\nORDER BY prep_minutes ASC;",
    columns: ["id", "menu_name", "prep_minutes"],
    rows: [
      ["101", "Tumis Bawang Putih Udang", "12 mnt"],
      ["104", "Sup Telur Tomat Segar", "15 mnt"],
      ["108", "Nasi Goreng Kampung", "20 mnt"],
    ],
  },
  2: {
    title: "Tantangan #02: Filter Usia Pengguna Baru",
    schema: "TABLE: user_profiles (user_id, username, age, country)",
    query:
      "SELECT user_id, username, age\nFROM user_profiles\nWHERE age > 20\nORDER BY age DESC;",
    columns: ["user_id", "username", "age"],
    rows: [
      ["USR-04", "dimas_sql", "27"],
      ["USR-01", "rani_sql", "24"],
      ["USR-09", "siti_nur", "22"],
    ],
  },
};

function DashboardPage() {
  const navigate = useNavigate();
  const { dashboardData, loading, error, retryFetch } = useDashboard();

  const [notifOpen, setNotifOpen] = useState(false);
  const [sandboxKey, setSandboxKey] = useState(null);
  const [sandboxSql, setSandboxSql] = useState("");
  const [sandboxExecuted, setSandboxExecuted] = useState(true);
  const notifRef = useRef(null);

  const openSandbox = (key = "default") => {
    const preset = SANDBOX_PRESETS[key] || SANDBOX_PRESETS.default;
    setSandboxKey(key);
    setSandboxSql(preset.query);
    setSandboxExecuted(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (sandboxKey !== null) {
          setSandboxKey(null);
        }
        if (notifOpen) {
          setNotifOpen(false);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (
        notifOpen &&
        notifRef.current &&
        !notifRef.current.contains(event.target)
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
  }, [notifOpen, sandboxKey]);

  if (loading) {
    return (
      <div className="dashboard-layout">
        <AppSidebar />
        <div className="dashboard-main">
          <div className="status-screen" role="status" aria-live="polite">
            <div className="loading-spinner" aria-hidden="true" />
            <p>Memuat ringkasan beranda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="dashboard-layout">
        <AppSidebar />
        <div className="dashboard-main">
          <div className="status-screen" role="alert">
            <p>{error || "Data beranda tidak tersedia."}</p>
            <button type="button" onClick={retryFetch}>
              Muat Ulang Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    user,
    learning,
    dailyChallenge,
    weeklyActivity,
    statistics,
    leaderboard,
    quests,
  } = dashboardData;

  const xpPercentage = dashboardData.xpPercentage;
  const learningPercentage = dashboardData.learningPercentage;
  const remainingXp = dashboardData.remainingXp;
  const activePreset =
    sandboxKey !== null
      ? SANDBOX_PRESETS[sandboxKey] || SANDBOX_PRESETS.default
      : null;

  const userInitials = (user.name || "LK")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="dashboard-layout">
      <AppSidebar />
      <div className="dashboard-main">
        <main className="dashboard">
          <header className="page-header">
            <div className="page-heading">
              <div className="heading-title">
                <div className="heading-brand-wrap">
                  <h1>Beranda</h1>
                  <span className="brand-dot-pill" aria-hidden="true" />
                </div>
                <span className="heading-subline">LEARN • PLAY • BUILD</span>
              </div>
              <p>
                Pantau capaian kurikulum SQL, evaluasi akurasi kueri, dan selesaikan tantangan harian.
              </p>
            </div>

            <div className="header-actions">
              <button
                type="button"
                className="button button-light"
                onClick={() => openSandbox("default")}
              >
                <Code2 size={16} aria-hidden="true" />
                <span>Buka Konsol Sandbox</span>
              </button>

              <button
                type="button"
                className="button button-primary"
                onClick={() => navigate("/learning")}
              >
                <span>Lanjutkan Modul</span>
              </button>

              <div className="dashboard-notif-wrap" ref={notifRef}>
                <button
                  type="button"
                  className="notification-button"
                  aria-label="Buka notifikasi (2 belum dibaca)"
                  aria-expanded={notifOpen}
                  aria-controls="dashboard-notif-popover"
                  onClick={() => setNotifOpen((prev) => !prev)}
                >
                  <Bell size={17} aria-hidden="true" />
                  <span className="notification-count">2</span>
                </button>

                {notifOpen && (
                  <div
                    id="dashboard-notif-popover"
                    className="dashboard-notif-popover"
                    role="dialog"
                    aria-label="Daftar pemberitahuan"
                  >
                    <div className="dashboard-notif-header">
                      <strong>Pemberitahuan Aktif</strong>
                      <span>2 Baru</span>
                    </div>
                    <ul className="dashboard-notif-list">
                      <li>
                        <strong>Misi Harian Belum Selesai</strong>
                        <span>
                          {dailyChallenge.description} (+{dailyChallenge.reward} XP) sebelum reset dalam {dailyChallenge.resetTime}.
                        </span>
                      </li>
                      <li>
                        <strong>Bonus Streak Mingguan</strong>
                        <span>
                          Pertahankan latihan {weeklyActivity.streak} hari berturut-turut untuk multiplier {weeklyActivity.bonusMultiplier}x XP.
                        </span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="dashboard-notif-action"
                      onClick={() => {
                        setNotifOpen(false);
                        navigate("/settings/notifications");
                      }}
                    >
                      Atur Pengingat Notifikasi
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="dashboard-user-button"
                aria-label="Buka profil pengguna"
                onClick={() => navigate("/profile")}
              >
                <div className="topbar-avatar" aria-hidden="true">
                  {userInitials}
                </div>
                <div className="dashboard-user-meta">
                  <strong>{user.name || "Loki"}</strong>
                  <span>Level {user.level} • {user.role || "SQL Learner"}</span>
                </div>
              </button>
            </div>
          </header>

          <div className="dashboard-grid">
            <section
              className="left-column"
              aria-label="Ringkasan progres dan tantangan"
            >
              {/* Hero / Welcome Card matching mobile layout */}
              <article className="welcome-card">
                <div className="welcome-top">
                  <div>
                    <h2>Hai, {user.name} 👋</h2>
                    <p>Siap melanjutkan petualangan kueri SQL hari ini?</p>
                  </div>

                  <span className="streak-badge">
                    <Flame size={15} aria-hidden="true" />
                    <span>Streak {user.streak} Hari</span>
                  </span>
                </div>

                <div className="xp-section">
                  <div className="xp-label">
                    <span>Level {user.level}</span>
                    <strong>
                      {user.xp.toLocaleString("id-ID")} / {user.maxXp.toLocaleString("id-ID")} XP
                    </strong>
                  </div>

                  <div
                    className="progress-track xp-track"
                    role="progressbar"
                    aria-label="Progres XP level"
                    aria-valuenow={Math.round(xpPercentage)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="progress-fill xp-fill"
                      style={{ width: `${xpPercentage}%` }}
                    />
                  </div>

                  <div className="xp-footer">
                    <span>
                      <Zap size={14} aria-hidden="true" />
                      Butuh {remainingXp} XP lagi menuju Level {user.level + 1}
                    </span>

                    <strong>{Math.round(xpPercentage)}% Tercapai</strong>
                  </div>
                </div>
              </article>

              {/* Progress Belajar Card matching mobile UI layout */}
              <article className="card learning-card">
                <header className="card-heading">
                  <div className="learning-card-title-row">
                    <div className="learning-shield-icon" aria-hidden="true">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h3>Progress Belajar</h3>
                      <span className="learning-subline">
                        {learning.completedModules} / {learning.totalModules} modul selesai
                      </span>
                    </div>
                  </div>

                  <span className="progress-pill-badge">
                    {Math.round(learningPercentage)}%
                  </span>
                </header>

                <div
                  className="progress-track learning-track"
                  role="progressbar"
                  aria-label="Progres kursus pembelajaran"
                  aria-valuenow={Math.round(learningPercentage)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-fill learning-fill"
                    style={{ width: `${learningPercentage}%` }}
                  />
                </div>

                {/* 3 Metric Tiles matching mobile reference */}
                <div className="learning-tiles-row">
                  <div className="learning-tile">
                    <div className="learning-tile-icon icon-course" aria-hidden="true">
                      <FolderKanban size={16} />
                    </div>
                    <div>
                      <strong>{learning.paths}</strong>
                      <span>Kursus</span>
                    </div>
                  </div>

                  <div className="learning-tile">
                    <div className="learning-tile-icon icon-cert" aria-hidden="true">
                      <GraduationCap size={16} />
                    </div>
                    <div>
                      <strong>5</strong>
                      <span>Sertifikat</span>
                    </div>
                  </div>

                  <div className="learning-tile">
                    <div className="learning-tile-icon icon-badge" aria-hidden="true">
                      <Star size={16} />
                    </div>
                    <div>
                      <strong>{learning.completedBadges}</strong>
                      <span>Badge</span>
                    </div>
                  </div>
                </div>

                <div className="next-lesson">
                  <div className="lesson-indicator" aria-hidden="true" />

                  <div className="lesson-text">
                    <span className="lesson-category">Materi Lanjutan</span>
                    <strong>{learning.nextLesson}</strong>
                  </div>

                  <button
                    type="button"
                    className="continue-button"
                    onClick={() => navigate("/learning")}
                  >
                    Buka Modul
                  </button>
                </div>
              </article>

              {/* Tantangan Harian Card */}
              <article className="card daily-challenge">
                <header className="challenge-heading">
                  <div className="challenge-title-group">
                    <div className="challenge-badge-icon" aria-hidden="true">
                      <Zap size={18} />
                    </div>
                    <div>
                      <h3>{dailyChallenge.title}</h3>
                      <p className="challenge-subline">{dailyChallenge.description}</p>
                    </div>
                  </div>

                  <span className="xp-reward">+{dailyChallenge.reward} XP</span>
                </header>

                <div className="challenge-progress-label">
                  <span>Status Penyelesaian</span>
                  <strong>
                    {dailyChallenge.completed} / {dailyChallenge.total} Selesai
                  </strong>
                </div>

                <div
                  className="progress-track challenge-track"
                  role="progressbar"
                  aria-label="Progres tantangan harian"
                  aria-valuenow={Math.round(
                    (dailyChallenge.completed / dailyChallenge.total) * 100
                  )}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (dailyChallenge.completed / dailyChallenge.total) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="challenge-footer">
                  <span>
                    <Clock size={15} aria-hidden="true" />
                    Batas waktu: {dailyChallenge.resetTime}
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate("/learning")}
                  >
                    Kerjakan Misi Harian
                  </button>
                </div>
              </article>

              {/* Studi Kasus Kueri SQL */}
              <section
                className="quest-section"
                aria-label="Tantangan kueri rekomendasi"
              >
                <div className="section-heading">
                  <div>
                    <h3>Studi Kasus Kueri SQL</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/learning")}
                  >
                    Lihat Semua Modul
                  </button>
                </div>

                {quests.length === 0 ? (
                  <div className="dashboard-empty-card" role="status">
                    <p>Belum ada studi kasus kueri aktif saat ini.</p>
                  </div>
                ) : (
                  <div className="quest-grid">
                    {quests.map((quest) => (
                      <article className="quest-card" key={quest.id}>
                        <div className="quest-badges">
                          <span className="difficulty-badge">
                            Tingkat: {quest.difficulty}
                          </span>

                          {quest.completed ? (
                            <span className="completed-badge">Tercapai</span>
                          ) : (
                            <span className="quest-xp">+{quest.reward} XP</span>
                          )}
                        </div>

                        <h4>{quest.title}</h4>

                        <p>{quest.description}</p>

                        <div className="quest-footer">
                          <code>{quest.mode}</code>

                          <button
                            type="button"
                            className={
                              quest.completed ? "completed-button" : ""
                            }
                            onClick={() => openSandbox(quest.id)}
                            aria-label={
                              quest.completed
                                ? `Ulangi tantangan ${quest.title}`
                                : `Mulai tantangan ${quest.title}`
                            }
                          >
                            {quest.completed ? (
                              <>
                                <RotateCcw size={14} aria-hidden="true" />
                                <span>Ulangi</span>
                              </>
                            ) : (
                              <>
                                <Play size={14} aria-hidden="true" />
                                <span>Uji Kueri</span>
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </section>

            <section
              className="right-column"
              aria-label="Statistik mingguan dan peringkat"
            >
              {/* Minggu Ini Card matching mobile UI */}
              <article className="card weekly-card">
                <header className="card-heading">
                  <div>
                    <h3>Minggu Ini</h3>
                  </div>

                  <span className="weekly-badge">
                    {weeklyActivity.streak} hari berturut-turut
                  </span>
                </header>

                <div className="week-days">
                  {weeklyActivity.days.map((item, index) => (
                    <div
                      className={`day-item ${index === 6 ? "today" : ""}`}
                      key={item.day}
                    >
                      <div
                        className={`day-circle ${
                          item.completed ? "day-done" : "day-empty"
                        }`}
                        role="status"
                        aria-label={`Hari ${item.day}: ${
                          item.completed ? "Selesai" : "Belum latihan"
                        }`}
                      >
                        {item.completed ? (
                          <Check size={16} aria-hidden="true" />
                        ) : (
                          <span className="day-dot" aria-hidden="true" />
                        )}
                      </div>

                      <span>{item.day}</span>
                    </div>
                  ))}
                </div>

                <div className="weekly-note">
                  <p>
                    Pertahankan jadwal latihan harian untuk multiplier bonus{" "}
                    <strong>{weeklyActivity.bonusMultiplier}x XP</strong> pada akhir pekan.
                  </p>
                </div>
              </article>

              {/* Metrik Cepat Pair matching mobile bottom row */}
              <div className="quick-stats">
                <article className="card quick-stat-card">
                  <div className="quick-stat-head">
                    <div className="quick-stat-icon accuracy" aria-hidden="true">
                      <Target size={18} />
                    </div>
                    <strong className="big-stat">{statistics.accuracy}%</strong>
                  </div>
                  <span className="stat-description">
                    Akurasi Kueri ({statistics.accuracyPeriod} hari terakhir)
                  </span>
                </article>

                <article className="card quick-stat-card">
                  <div className="quick-stat-head">
                    <div className="quick-stat-icon missions" aria-hidden="true">
                      <CheckCircle2 size={18} />
                    </div>
                    <strong className="big-stat">
                      {statistics.completedMissions}/{statistics.totalMissions}
                    </strong>
                  </div>
                  <span className="stat-description">
                    Target Misi Selesai
                  </span>
                </article>
              </div>

              {/* Klasemen Liga Card */}
              <article className="card leaderboard-card">
                <header className="card-heading">
                  <div>
                    <h3>Klasemen {leaderboard.group}</h3>
                  </div>

                  <span className="top-label">3 Teratas</span>
                </header>

                {leaderboard.topPlayers.length === 0 ? (
                  <div className="dashboard-empty-card" role="status">
                    <p>Data peringkat liga sedang dimuat.</p>
                  </div>
                ) : (
                  <div className="leader-list">
                    {leaderboard.topPlayers.map((player, index) => (
                      <div className="leader-item" key={player.rank}>
                        <span
                          className={`rank ${index === 0 ? "rank-first" : ""}`}
                        >
                          #{player.rank}
                        </span>

                        <span className="avatar" aria-hidden="true">
                          {player.initials}
                        </span>

                        <div className="leader-info">
                          <strong>{player.name}</strong>
                          <span>Peringkat #{player.rank}</span>
                        </div>

                        <strong className="leader-xp-value">
                          {player.xp.toLocaleString("id-ID")} XP
                        </strong>
                      </div>
                    ))}
                  </div>
                )}

                <div className="my-rank">
                  <span className="my-rank-number">
                    #{leaderboard.currentUser.rank}
                  </span>

                  <div>
                    <strong>{leaderboard.currentUser.name} (Kamu)</strong>

                    <span>
                      {leaderboard.currentUser.xp.toLocaleString("id-ID")} XP •{" "}
                      {leaderboard.currentUser.status}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="leaderboard-link"
                  onClick={() => navigate("/leaderboard")}
                >
                  Buka Papan Peringkat Lengkap
                </button>
              </article>
            </section>
          </div>
        </main>

        {activePreset && (
          <div
            className="dashboard-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sandbox-modal-title"
          >
            <div className="dashboard-sandbox-modal">
              <div className="dashboard-sandbox-header">
                <div>
                  <h2 id="sandbox-modal-title">{activePreset.title}</h2>
                  <span className="card-code">{activePreset.schema}</span>
                </div>
                <button
                  type="button"
                  className="dashboard-modal-close"
                  aria-label="Tutup konsol sandbox"
                  onClick={() => setSandboxKey(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="dashboard-sandbox-body">
                <label htmlFor="sandbox-sql-editor">Editor Kueri SQL</label>
                <textarea
                  id="sandbox-sql-editor"
                  rows={4}
                  value={sandboxSql}
                  onChange={(e) => {
                    setSandboxSql(e.target.value);
                    setSandboxExecuted(false);
                  }}
                />

                <div className="dashboard-sandbox-actions">
                  <span>Tekan Escape untuk menutup jendela</span>
                  <div>
                    <button
                      type="button"
                      className="button button-light"
                      onClick={() => {
                        setSandboxSql(activePreset.query);
                        setSandboxExecuted(true);
                      }}
                    >
                      Reset Kueri
                    </button>
                    <button
                      type="button"
                      className="button button-primary"
                      onClick={() => setSandboxExecuted(true)}
                    >
                      Jalankan Kueri
                    </button>
                  </div>
                </div>

                {sandboxExecuted && (
                  <div className="dashboard-sandbox-results">
                    <div className="dashboard-sandbox-results-head">
                      <strong>Hasil Eksekusi Kueri</strong>
                      <span>{activePreset.rows.length} baris dikembalikan</span>
                    </div>
                    <div className="dashboard-sandbox-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            {activePreset.columns.map((col) => (
                              <th key={col} scope="col">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activePreset.rows.map((row, idx) => (
                            <tr key={idx}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
