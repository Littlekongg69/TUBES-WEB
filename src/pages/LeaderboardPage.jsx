
import { useMemo, useState } from "react";
import {
  Home, BookOpen, Gamepad2, Trophy, Settings, Search, Bell,
  Flame, Zap, Crown, Medal, ChevronLeft, ChevronRight,
  Eye, Target, TrendingUp, Database, CalendarDays, ListOrdered,
  BadgeCheck, Hourglass,
} from "lucide-react";

import "./LeaderboardPage.css";

const users = [
  { id: 1, name: "Kevin Sanjaya", username: "@kevinsanjaya", level: 12, title: "SQL Master & DBA", modules: 48, challenges: 120, streak: 45, xp: 12450, avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Ahmad Rizki", username: "@ahmadrizki", level: 9, title: "SQL Specialist", modules: 36, challenges: 85, streak: 28, xp: 9820, avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 3, name: "Dewi Lestari", username: "@dewilestari", level: 8, title: "SQL Practitioner", modules: 30, challenges: 70, streak: 19, xp: 8150, avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 4, name: "Dimas Pratama", username: "@dimaspratama", level: 7, title: "SQL Practitioner", modules: 25, challenges: 55, streak: 15, xp: 7420, avatar: "DP" },
  { id: 5, name: "Siti Nurhaliza", username: "@sitinur", level: 7, title: "Query Optimizer", modules: 24, challenges: 50, streak: 21, xp: 7180, avatar: "SN" },
  { id: 6, name: "Budi Wicaksono", username: "@budi_wicak", level: 6, title: "Data Analyst", modules: 22, challenges: 46, streak: 12, xp: 6890, avatar: "BW" },
  { id: 7, name: "Sarah Amelia", username: "@sarahamelia", level: 6, title: "SQL Apprentice", modules: 20, challenges: 40, streak: 9, xp: 6350, avatar: "SA" },
  { id: 8, name: "Fajar Ramadhan", username: "@fajar_r", level: 5, title: "Junior DBA", modules: 19, challenges: 38, streak: 14, xp: 5920, avatar: "FR" },
  { id: 9, name: "Maya Putri", username: "@mayaputri", level: 5, title: "SQL Practitioner", modules: 17, challenges: 35, streak: 8, xp: 5610, avatar: "MP" },
  { id: 10, name: "Hendra Gunawan", username: "@hendragun", level: 5, title: "SQL Practitioner", modules: 16, challenges: 32, streak: 11, xp: 5240, avatar: "HG" },
];

const currentUser = {
  name: "Rani Maharani",
  username: "@ranimaharani",
  level: 4,
  title: "SQL Novice",
  xp: 1420,
  position: 128,
  nextPosition: 1600,
};

const podiumUsers = [users[1], users[0], users[2]];

function LeaderboardPage() {
  const [period, setPeriod] = useState("Global");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.slice(3).filter((user) =>
      `${user.name} ${user.username}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const pageSize = 7;
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const visibleUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const podiumRankClass = (id) => {
    if (id === 1) return "gold";
    if (id === 2) return "silver";
    return "bronze";
  };

  return (
    <div className="leaderboard-layout">
      <aside className="leaderboard-sidebar">
        <div className="leaderboard-brand">
          <div className="leaderboard-brand-icon"><Database size={23} /></div>
          <div>
            <h2>SQL Quest</h2>
            <span>INTERACTIVE LAB</span>
          </div>
        </div>

        <nav className="leaderboard-nav">
          <a href="/dashboard"><Home size={18} />Beranda</a>
          <a href="/learning"><BookOpen size={18} />Belajar</a>
          <a href="#"><Gamepad2 size={18} />Game</a>
          <a href="/leaderboard" className="active"><ListOrdered size={18} />Peringkat</a>
          <a href="#"><Settings size={18} />Pengaturan</a>
        </nav>

        <div className="leaderboard-sidebar-bottom">
          <div className="leaderboard-target-card">
            <div className="target-header">
              <strong>TARGET HARIAN</strong>
              <b>80%</b>
            </div>
            <div className="target-progress"><span style={{ width: "80%" }} /></div>
            <small>4 dari 5 kuis selesai</small>
          </div>

          <div className="leaderboard-profile">
            <div className="profile-avatar">RM</div>
            <div>
              <strong>{currentUser.name}</strong>
              <span>{currentUser.title}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="leaderboard-main">
        <header className="leaderboard-topbar">
          <div className="leaderboard-search global-search">
            <Search size={17} />
            <input placeholder="Cari kueri, topik, sintaks..." />
            <kbd>Ctrl K</kbd>
          </div>

          <div className="leaderboard-topbar-actions">
            <div className="topbar-stat streak-stat"><Flame size={16} /> 6 Hari</div>
            <div className="topbar-stat xp-stat"><Zap size={16} /> 1.420 XP</div>
            <button className="leaderboard-notification"><Bell size={18} /></button>
            <div className="topbar-user">
              <div className="topbar-avatar">RM</div>
              <div><strong>Rani Maharani</strong><span>SQL Novice</span></div>
            </div>
          </div>
        </header>

        <section className="leaderboard-content">
          <div className="leaderboard-heading">
            <div className="heading-icon"><Trophy size={25} /></div>
            <div className="heading-copy">
              <div className="heading-title-row">
                <h1>Peringkat Pembelajar SQL</h1>
                <span className="league-label">LIGA MASTER</span>
              </div>
              <p>Bersaing secara sehat, kumpulkan XP dari lesson dan challenge, lalu raih posisi puncak!</p>
            </div>
            <div className="leaderboard-live">
              <span className="live-dot" />542 Pengguna Sedang Latihan Live
            </div>
          </div>

          <div className="leaderboard-toolbar">
            <div className="period-filters">
              {["Global", "Mingguan", "Bulanan"].map((item) => (
                <button
                  key={item}
                  className={period === item ? "selected" : ""}
                  onClick={() => { setPeriod(item); setPage(1); }}
                >
                  {item === "Global" ? <Target size={14} /> : <CalendarDays size={14} />}
                  {item === "Global" ? "Global (All-Time)" : item === "Mingguan" ? "Mingguan (Weekly)" : "Bulanan (Monthly)"}
                  {item === "Mingguan" && <small>Reset Sen 00:00 WIB</small>}
                </button>
              ))}
            </div>

            <div className="toolbar-right">
              <div className="leaderboard-search">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Cari pembelajar..."
                />
              </div>
              <span className="simulation-label"><Hourglass size={13} /> Simulasi Loading</span>
            </div>
          </div>

          <section className="leaderboard-podium-section">
            <div className="section-heading">
              <h2><Medal size={19} /> Panggung Juara Teratas</h2>
              <span>Diperbarui setiap 15 menit</span>
            </div>

            <div className="leaderboard-podium">
              {podiumUsers.map((user) => (
                <article key={user.id} className={`podium-card rank-${user.id}`}>
                  <div className={`podium-rank-badge ${podiumRankClass(user.id)}`}>
                    {user.id === 1 ? <Crown size={14} /> : <Medal size={14} />}
                    Peringkat {user.id}
                  </div>

                  <div className={`podium-avatar ${podiumRankClass(user.id)}`}>
                    <img src={user.avatar} alt={`Foto ${user.name}`} />
                    <span>{user.id}</span>
                  </div>

                  <h3>{user.name}</h3>
                  <p className="podium-title">Level {user.level} • {user.title}</p>

                  {user.id === 1 && <span className="champion-caption">🏆 Pertahankan #1 (3 Minggu)</span>}
                  {user.id !== 1 && <span className="podium-movement">↗ +{user.id === 2 ? 2 : 1} Posisi minggu ini</span>}

                  <div className="podium-stats">
                    <div><span>Penyelesaian</span><strong>{user.modules} Modul | {user.challenges} Challenge</strong></div>
                    <div><span>Aktivitas</span><strong><Flame size={14} /> {user.streak} Hari Streak</strong></div>
                    <div className="podium-total"><span>PEROLEHAN</span><strong>{user.xp.toLocaleString("id-ID")} <small>XP</small></strong></div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="leaderboard-table-section">
            <div className="table-section-heading">
              <h2><ListOrdered size={19} /> Daftar Peringkat 4 – 10</h2>
              <span><i /> Sinkronisasi XP otomatis</span>
            </div>

            <div className="leaderboard-table-wrap">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pembelajar / Pengguna</th>
                    <th>Modul &amp; Challenge</th>
                    <th>Streak Harian</th>
                    <th>Total XP</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong className="table-rank">{user.id}</strong>
                        <small className={user.id % 2 === 0 ? "rank-down" : "rank-up"}>
                          {user.id % 2 === 0 ? "↓1" : "↑1"}
                        </small>
                      </td>
                      <td>
                        <div className="table-user">
                          <div className="table-avatar">{user.avatar}</div>
                          <div>
                            <strong>{user.name} <BadgeCheck size={13} /></strong>
                            <span>{user.username} · <b>Level {user.level} – {user.title}</b></span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="table-modules">
                          <strong>{user.modules} Modul Selesai</strong>
                          <span>{user.challenges} Tantangan Selesai</span>
                        </div>
                      </td>
                      <td><span className="table-streak"><Flame size={14} /> {user.streak} Hari</span></td>
                      <td>
                        <div className="table-xp">
                          <strong>{user.xp.toLocaleString("id-ID")} XP</strong>
                          <span>+{user.id * 30} hari ini</span>
                        </div>
                      </td>
                      <td><button className="table-action" title={`Lihat ${user.name}`}><Eye size={17} /></button></td>
                    </tr>
                  ))}
                  {visibleUsers.length === 0 && (
                    <tr><td colSpan="6" className="empty-ranking">Pembelajar tidak ditemukan.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="leaderboard-pagination">
              <span>Menampilkan <b>{visibleUsers.length ? (page - 1) * pageSize + 1 : 0}–{(page - 1) * pageSize + visibleUsers.length} dari {filteredUsers.length}</b> Pembelajar Aktif • Halaman {page} dari {totalPages}</span>
              <div>
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Sebelumnya</button>
                <button className="current-page">{page}</button>
                <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Berikutnya</button>
              </div>
            </div>
          </section>

          <section className="leaderboard-my-position">
            <div className="my-position-rank">
              <span>POSISI KAMU</span>
              <strong>#{currentUser.position}</strong>
              <small>↗ +12 minggu ini</small>
            </div>
            <div className="my-position-avatar">RM</div>
            <div className="my-position-info">
              <h3>{currentUser.name} (Kamu) <span>Level {currentUser.level} • {currentUser.title}</span></h3>
              <p>2 Modul | 4 Challenge Selesai</p>
              <small>🔥 6 Hari Berturut-turut</small>
            </div>
            <div className="my-position-xp">
              <strong>{currentUser.xp.toLocaleString("id-ID")} <small>XP</small></strong>
              <span>Tersisa {currentUser.nextPosition - currentUser.xp} XP untuk naik ke Top 100!</span>
            </div>
            <a href="/learning" className="my-position-button">Lihat Misi XP Terdekat <ChevronRight size={17} /></a>
          </section>
        </section>
      </main>
    </div>
  );
}

export default LeaderboardPage;
