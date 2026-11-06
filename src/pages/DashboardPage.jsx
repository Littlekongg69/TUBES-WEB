import { useEffect, useState } from "react";
import axios from "axios";

import {
  Bell,
  Code2,
  ArrowRight,
  Flame,
  CalendarDays,
  Check,
  CircleCheck,
  BookOpen,
  GraduationCap,
  Award,
  Zap,
  Flag,
  Clock,
  Compass,
  Trophy,
  TrendingUp,
  ListChecks,
  ChevronUp,
  Play,
  RotateCcw,
  Star,
  Target,
} from "lucide-react";

import "../App.css";

function DashboardPage() {
  // STATE
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // MENGAMBIL DATA JSON MENGGUNAKAN AXIOS
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("/dashboard.json");

        setDashboardData(response.data);
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        setError("Data dashboard gagal dimuat. Silakan coba kembali.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // TAMPILAN LOADING
  if (loading) {
    return (
      <div className="status-screen">
        <div className="loading-spinner"></div>
        <p>Memuat dashboard...</p>
      </div>
    );
  }

  // TAMPILAN ERROR
  if (error || !dashboardData) {
    return (
      <div className="status-screen">
        <p>{error || "Data dashboard tidak tersedia."}</p>
        <button onClick={() => window.location.reload()}>
          Coba Lagi
        </button>
      </div>
    );
  }

  // MENGAMBIL DATA DARI JSON
  const {
    user,
    learning,
    dailyChallenge,
    weeklyActivity,
    statistics,
    leaderboard,
    quests,
  } = dashboardData;

  const xpPercentage = (user.xp / user.maxXp) * 100;
  const learningPercentage =
    (learning.completedModules / learning.totalModules) * 100;

  const remainingXp = user.maxXp - user.xp;

  return (
    <main className="dashboard">

      {/* HEADER */}
      <header className="page-header">
        <div className="page-heading">
          <div className="heading-title">
            <h1>Beranda</h1>

            <button className="notification-button" aria-label="Notifikasi">
              <Bell size={21} />
              <span className="notification-count">2</span>
            </button>
          </div>

          <p>
            Kuasai PostgreSQL
            <br />
            selangkah demi
            <br />
            selangkah
          </p>
        </div>

        <div className="header-actions">
          <button className="button button-light">
            <Code2 size={19} />
            Buka Sandbox
          </button>

          <button className="button button-primary">
            Lanjut Belajar Terakhir
            <ArrowRight size={20} />
          </button>
        </div>
      </header>

      {/* KOLOM KONTEN */}
      <div className="dashboard-grid">

        {/* KOLOM KIRI */}
        <section className="left-column">

          {/* KARTU SAMBUTAN */}
          <article className="welcome-card">
            <div className="welcome-top">
              <div>
                <h2>Hai, {user.name}! 👋</h2>
                <p>
                  Level {user.level} • {user.role}
                </p>
              </div>

              <span className="streak-badge">
                <Flame size={17} />
                {user.streak} Hari
              </span>
            </div>

            <div className="xp-section">
              <div className="xp-label">
                <span>XP LEVEL {user.level}</span>
                <strong>
                  {user.xp} / {user.maxXp} XP
                </strong>
              </div>

              <div className="progress-track xp-track">
                <div
                  className="progress-fill xp-fill"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>

              <div className="xp-footer">
                <span>
                  <Zap size={15} />
                  {remainingXp} XP lagi ke Level {user.level + 1}
                </span>

                <strong>{Math.round(xpPercentage)}% Selesai</strong>
              </div>
            </div>
          </article>

          {/* PROGRESS BELAJAR */}
          <article className="card learning-card">
            <div className="card-heading">
              <div className="heading-with-icon">
                <span className="icon-box blue-icon">
                  <BookOpen size={23} />
                </span>

                <h3>Progress Belajar</h3>
              </div>

              <span className="recommend-badge">
                Direkomendasikan
              </span>
            </div>

            <p className="muted-text">
              {learning.course} ({learning.completedModules}/
              {learning.totalModules} modul = {Math.round(learningPercentage)}%)
            </p>

            <div className="progress-track learning-track">
              <div
                className="progress-fill learning-fill"
                style={{ width: `${learningPercentage}%` }}
              />
            </div>

            <div className="learning-stats">
              <div className="stat-mini">
                <span className="mini-icon">
                  <GraduationCap size={23} />
                </span>

                <div>
                  <strong>{learning.paths} Path</strong>
                  <span>Kursus</span>
                </div>
              </div>

              <div className="stat-mini">
                <span className="mini-icon gold-icon">
                  <Award size={23} />
                </span>

                <div>
                  <strong>
                    {learning.completedBadges}/{learning.totalBadges}
                  </strong>
                  <span>Badge</span>
                </div>
              </div>
            </div>

            <div className="next-lesson">
              <div className="lesson-indicator" />

              <div className="lesson-text">
                <small>LANGKAH SELANJUTNYA</small>
                <strong>{learning.nextLesson}</strong>
              </div>

              <button className="continue-button">
                Lanjutkan <ArrowRight size={17} />
              </button>
            </div>
          </article>

          {/* TANTANGAN HARIAN */}
          <article className="daily-challenge">
            <div className="challenge-heading">
              <div className="heading-with-icon">
                <span className="icon-box orange-icon">
                  <Flag size={21} />
                </span>

                <div>
                  <small>MISI AKTIF</small>
                  <h3>{dailyChallenge.title}</h3>
                </div>
              </div>

              <span className="xp-reward">
                <Star size={15} />
                +{dailyChallenge.reward} XP
              </span>
            </div>

            <h4>{dailyChallenge.description}</h4>

            <div className="challenge-progress-label">
              <span>Progress Misi</span>

              <strong>
                {dailyChallenge.completed} / {dailyChallenge.total} Selesai
              </strong>
            </div>

            <div className="progress-track challenge-track">
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
                <Clock size={16} />
                Reset dalam {dailyChallenge.resetTime}
              </span>

              <button>
                Mulai Misi <ArrowRight size={15} />
              </button>
            </div>
          </article>

          {/* TANTANGAN KUERI */}
          <section className="quest-section">
            <div className="section-heading">
              <div className="heading-with-icon">
                <Compass size={21} className="section-icon" />
                <h3>Tantangan Kueri Rekomendasi</h3>
              </div>

              <button>Lihat Semua</button>
            </div>

            <div className="quest-grid">
              {quests.map((quest) => (
                <article className="quest-card" key={quest.id}>
                  <div className="quest-badges">
                    <span className="difficulty-badge">
                      {quest.difficulty}
                    </span>

                    {quest.completed ? (
                      <span className="completed-badge">
                        Selesai ✓
                      </span>
                    ) : (
                      <span className="quest-xp">
                        +{quest.reward} XP
                      </span>
                    )}
                  </div>

                  <h4>{quest.title}</h4>

                  <p>{quest.description}</p>

                  <div className="quest-footer">
                    <span>{quest.mode}</span>

                    <button
                      className={
                        quest.completed ? "completed-button" : ""
                      }
                      aria-label={
                        quest.completed
                          ? "Ulangi tantangan"
                          : "Mulai tantangan"
                      }
                    >
                      {quest.completed ? (
                        <RotateCcw size={17} />
                      ) : (
                        <Play size={16} fill="currentColor" />
                      )}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>

        {/* KOLOM KANAN */}
        <section className="right-column">

          {/* STREAK MINGGUAN */}
          <article className="card weekly-card">
            <div className="card-heading">
              <div className="heading-with-icon">
                <span className="icon-box calendar-icon">
                  <CalendarDays size={21} />
                </span>

                <h3>Minggu Ini</h3>
              </div>

              <span className="weekly-badge">
                <CircleCheck size={15} />
                {weeklyActivity.streak} hari berturut-turut
              </span>
            </div>

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
                  >
                    {item.completed ? (
                      <Check size={21} />
                    ) : (
                      <span>−</span>
                    )}
                  </div>

                  <span>{item.day}</span>
                </div>
              ))}
            </div>

            <div className="weekly-note">
              <Trophy size={19} />

              <p>
                Luar biasa! Pertahankan konsistensi latihan untuk bonus
                multiplier{" "}
                <strong>{weeklyActivity.bonusMultiplier}× XP</strong> di
                akhir pekan ini.
              </p>
            </div>
          </article>

          {/* STATISTIK */}
          <div className="quick-stats">
            <article className="card quick-stat-card">
              <div className="quick-stat-top">
                <span className="icon-box green-icon">
                  <Target size={25} />
                </span>

                <TrendingUp size={19} className="trend-icon" />
              </div>

              <strong className="big-stat">
                {statistics.accuracy}%
              </strong>

              <span className="stat-description">
                Akurasi ({statistics.accuracyPeriod} hari)
              </span>
            </article>

            <article className="card quick-stat-card">
              <div className="quick-stat-top">
                <span className="icon-box blue-icon">
                  <ListChecks size={25} />
                </span>

                <span className="today-badge">Hari ini</span>
              </div>

              <strong className="big-stat">
                {statistics.completedMissions} / {statistics.totalMissions}
              </strong>

              <span className="stat-description">
                Misi Selesai
              </span>
            </article>
          </div>

          {/* LEADERBOARD */}
          <article className="card leaderboard-card">
            <div className="card-heading">
              <div className="heading-with-icon">
                <span className="icon-box blue-icon">
                  <TrendingUp size={22} />
                </span>

                <h3>Peringkat {leaderboard.group}</h3>
              </div>

              <span className="top-label">Top 3</span>
            </div>

            <div className="leader-list">
              {leaderboard.topPlayers.map((player, index) => (
                <div className="leader-item" key={player.rank}>
                  <span
                    className={`rank ${
                      index === 0 ? "rank-first" : ""
                    }`}
                  >
                    {player.rank}
                  </span>

                  <span className="avatar">
                    {player.initials}
                  </span>

                  <div className="leader-info">
                    <strong>{player.name}</strong>
                    <span>
                      {player.xp.toLocaleString("id-ID")} XP
                    </span>
                  </div>

                  <Award
                    className={`leader-award ${
                      index === 0 ? "gold-award" : ""
                    }`}
                    size={20}
                  />
                </div>
              ))}
            </div>

            <div className="my-rank">
              <span className="my-rank-number">
                #{leaderboard.currentUser.rank}
              </span>

              <div>
                <strong>
                  {leaderboard.currentUser.name} (Kamu)
                </strong>

                <span>
                  {leaderboard.currentUser.xp.toLocaleString("id-ID")} XP
                  {" • "}
                  {leaderboard.currentUser.status}
                </span>
              </div>

              <ChevronUp size={20} />
            </div>

            <button className="leaderboard-link">
              Lihat Papan Peringkat Lengkap
              <ArrowRight size={17} />
            </button>
          </article>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
