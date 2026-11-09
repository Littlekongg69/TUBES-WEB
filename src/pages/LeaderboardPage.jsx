import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Flame,
  Zap,
  Crown,
  Medal,
  Eye,
  Target,
  CalendarDays,
  BadgeCheck,
  RotateCw,
  X,
} from "lucide-react";

import "./LeaderboardPage.css";
import AppSidebar from "../components/AppSidebar";
import { useLeaderboard } from "../presentation/hooks/useLeaderboard";

function LeaderboardPage() {
  const navigate = useNavigate();
  const {
    period,
    setPeriod,
    search,
    setSearch,
    page,
    setPage,
    users,
    podiumUsers,
    currentUser,
    filteredUsers,
    visibleUsers,
    pageSize,
    totalPages,
    podiumRankClass,
    loading,
    error,
    retryFetch,
    triggerSimulatedLoading,
  } = useLeaderboard();

  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchInputRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape") {
        if (selectedUser) {
          setSelectedUser(null);
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
  }, [notifOpen, selectedUser]);

  const totalParticipants = users?.length || podiumUsers.length + filteredUsers.length;

  return (
    <div className="leaderboard-layout">
      <AppSidebar />

      <main className="leaderboard-main">
        <header className="leaderboard-topbar">
          <div className="leaderboard-search global-search">
            <Search size={16} aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari nama atau username pembelajar..."
              aria-label="Cari nama atau username pembelajar"
            />
            <kbd aria-hidden="true">Ctrl K</kbd>
          </div>

          <div className="leaderboard-topbar-actions">
            <div className="topbar-stat streak-stat" title="Streak belajar aktif">
              <Flame size={15} aria-hidden="true" />
              <span>6 Hari</span>
            </div>
            <div className="topbar-stat xp-stat" title="Total poin pengalaman">
              <Zap size={15} aria-hidden="true" />
              <span>1.420 XP</span>
            </div>

            <div className="leaderboard-notif-wrap" ref={notifRef}>
              <button
                type="button"
                className="leaderboard-notification"
                aria-label="Buka panel notifikasi"
                aria-expanded={notifOpen}
                aria-controls="leaderboard-notif-popover"
                onClick={() => setNotifOpen((prev) => !prev)}
              >
                <Bell size={17} aria-hidden="true" />
                <span className="leaderboard-bell-dot" aria-hidden="true" />
              </button>

              {notifOpen && (
                <div
                  id="leaderboard-notif-popover"
                  className="leaderboard-notif-popover"
                  role="dialog"
                  aria-label="Notifikasi peringkat"
                >
                  <div className="leaderboard-notif-header">
                    <strong>Status Liga Master</strong>
                    <span>Posisi #{currentUser.position}</span>
                  </div>
                  <p>
                    Kamu membutuhkan{" "}
                    {Math.max(0, currentUser.nextPosition - currentUser.xp)} XP
                    tambahan untuk naik ke jajaran 100 besar pada periode{" "}
                    {period}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifOpen(false);
                      navigate("/settings/privacy");
                    }}
                  >
                    Atur Visibilitas Peringkat
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="topbar-user"
              aria-label="Buka profil pengguna"
              onClick={() => navigate("/profile")}
            >
              <div className="topbar-avatar" aria-hidden="true">
                RM
              </div>
              <div>
                <strong>Rani Maharani</strong>
                <span>Level 4 • SQL Novice</span>
              </div>
            </button>
          </div>
        </header>

        <section
          className="leaderboard-content"
          aria-label="Papan peringkat pembelajar SQL"
        >
          <div className="leaderboard-heading">
            <div className="heading-copy">
              <div className="heading-title-row">
                <h1>Klasemen Pembelajar SQL</h1>
                <span className="league-label">LIGA MASTER</span>
              </div>
              <p>
                Urutan peringkat dihitung berdasarkan akumulasi XP penyelesaian modul kurikulum dan tantangan kueri.
              </p>
            </div>
            <div className="leaderboard-live" role="status">
              <span className="live-dot" aria-hidden="true" />
              <span>
                Data Tercatat: {totalParticipants} Pembelajar • Periode {period}
              </span>
            </div>
          </div>

          <div className="leaderboard-toolbar">
            <div
              className="period-filters"
              role="tablist"
              aria-label="Periode peringkat"
            >
              {["Global", "Mingguan", "Bulanan"].map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={period === item}
                  className={period === item ? "selected" : ""}
                  onClick={() => {
                    setPeriod(item);
                    setPage(1);
                  }}
                >
                  {item === "Global" ? (
                    <Target size={14} aria-hidden="true" />
                  ) : (
                    <CalendarDays size={14} aria-hidden="true" />
                  )}
                  <span>
                    {item === "Global"
                      ? "Akumulasi Total"
                      : item === "Mingguan"
                      ? "Periode Mingguan"
                      : "Periode Bulanan"}
                  </span>
                </button>
              ))}
            </div>

            <div className="toolbar-right">
              <div className="leaderboard-search">
                <Search size={15} aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Filter daftar peringkat..."
                  aria-label="Filter daftar peringkat"
                />
              </div>
              <button
                type="button"
                className="simulation-label"
                onClick={triggerSimulatedLoading}
              >
                <RotateCw size={14} aria-hidden="true" />
                <span>Segarkan Data</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="status-screen" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Memuat papan peringkat...</p>
            </div>
          ) : error ? (
            <div className="status-screen" role="alert">
              <p>{error}</p>
              <button type="button" onClick={retryFetch}>
                Muat Ulang Data
              </button>
            </div>
          ) : (
            <>
              <section
                className="leaderboard-podium-section"
                aria-label="Panggung juara 3 teratas"
              >
                <div className="section-heading">
                  <div>
                    <h2>Tiga Pembelajar Teratas ({period})</h2>
                  </div>
                  <span>Diurutkan berdasarkan perolehan XP</span>
                </div>

                <div className="leaderboard-podium">
                  {podiumUsers.map((user) => (
                    <article
                      key={user.id}
                      className={`podium-card rank-${user.id}`}
                    >
                      <div
                        className={`podium-rank-badge ${podiumRankClass(
                          user.id
                        )}`}
                      >
                        {user.id === 1 ? (
                          <Crown size={14} aria-hidden="true" />
                        ) : (
                          <Medal size={14} aria-hidden="true" />
                        )}
                        <span>Peringkat #{user.id}</span>
                      </div>

                      <div
                        className={`podium-avatar ${podiumRankClass(user.id)}`}
                        aria-hidden="true"
                      >
                        <strong>{user.avatar}</strong>
                        <span>#{user.id}</span>
                      </div>

                      <h3>{user.name}</h3>
                      <p className="podium-title">
                        Level {user.level} • {user.title}
                      </p>

                      <dl className="podium-stats">
                        <div>
                          <dt>Penyelesaian</dt>
                          <dd>
                            {user.modules} Modul • {user.challenges} Kueri
                          </dd>
                        </div>
                        <div>
                          <dt>Konsistensi</dt>
                          <dd>{user.streak} Hari Berturut-turut</dd>
                        </div>
                        <div className="podium-total">
                          <dt>PEROLEHAN XP</dt>
                          <dd>
                            {user.xp.toLocaleString("id-ID")} <small>XP</small>
                          </dd>
                        </div>
                      </dl>

                      <button
                        type="button"
                        className="podium-inspect-btn"
                        onClick={() => setSelectedUser(user)}
                      >
                        Lihat Rincian Capaian
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section
                className="leaderboard-table-section"
                aria-label="Tabel peringkat pembelajar"
              >
                <div className="table-section-heading">
                  <div>
                    <h2>
                      {search.trim()
                        ? `Hasil Pencarian Peringkat (${filteredUsers.length})`
                        : "Daftar Peringkat 4 sampai 10"}
                    </h2>
                  </div>
                  <span>Menampilkan data periode {period}</span>
                </div>

                <div className="leaderboard-table-wrap">
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th scope="col">Peringkat</th>
                        <th scope="col">Pembelajar</th>
                        <th scope="col">Capaian Materi</th>
                        <th scope="col">Streak Aktif</th>
                        <th scope="col">Total XP</th>
                        <th scope="col">Rincian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleUsers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <strong className="table-rank">#{user.id}</strong>
                          </td>
                          <td>
                            <div className="table-user">
                              <div className="table-avatar" aria-hidden="true">
                                {user.avatar}
                              </div>
                              <div>
                                <strong>
                                  <span>{user.name}</span>
                                  <BadgeCheck size={14} aria-hidden="true" />
                                </strong>
                                <span>
                                  {user.username} •{" "}
                                  <b>
                                    Level {user.level} ({user.title})
                                  </b>
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="table-modules">
                              <strong>{user.modules} Modul Selesai</strong>
                              <span>{user.challenges} Kueri Tervalidasi</span>
                            </div>
                          </td>
                          <td>
                            <span className="table-streak">
                              <Flame size={14} aria-hidden="true" />
                              <span>{user.streak} Hari</span>
                            </span>
                          </td>
                          <td>
                            <div className="table-xp">
                              <strong>
                                {user.xp.toLocaleString("id-ID")} XP
                              </strong>
                              <span>Periode {period}</span>
                            </div>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="table-action"
                              aria-label={`Lihat rincian ${user.name}`}
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye size={16} aria-hidden="true" />
                              <span>Rincian</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {visibleUsers.length === 0 && (
                        <tr>
                          <td colSpan="6" className="empty-ranking">
                            Tidak ada pembelajar yang cocok dengan kata kunci pencarian.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="leaderboard-pagination">
                  <span>
                    Menampilkan{" "}
                    <b>
                      {visibleUsers.length ? (page - 1) * pageSize + 1 : 0} sampai{" "}
                      {(page - 1) * pageSize + visibleUsers.length} dari{" "}
                      {filteredUsers.length}
                    </b>{" "}
                    pembelajar • Halaman {page} dari {totalPages}
                  </span>
                  <div>
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Sebelumnya
                    </button>
                    <button
                      type="button"
                      className="current-page"
                      aria-current="page"
                    >
                      {page}
                    </button>
                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Berikutnya
                    </button>
                  </div>
                </div>
              </section>

              <section
                className="leaderboard-my-position"
                aria-label="Posisi peringkat kamu"
              >
                <div className="my-position-rank">
                  <span>POSISI KAMU</span>
                  <strong>#{currentUser.position}</strong>
                </div>
                <div className="my-position-avatar" aria-hidden="true">
                  RM
                </div>
                <div className="my-position-info">
                  <h3>
                    {currentUser.name} (Kamu){" "}
                    <span>
                      Level {currentUser.level} • {currentUser.title}
                    </span>
                  </h3>
                  <p>2 Modul Selesai • 4 Tantangan Kueri • Streak 6 Hari</p>
                </div>
                <div className="my-position-xp">
                  <strong>
                    {currentUser.xp.toLocaleString("id-ID")} <small>XP</small>
                  </strong>
                  <span>
                    Selisih{" "}
                    {Math.max(0, currentUser.nextPosition - currentUser.xp)} XP
                    menuju 100 besar
                  </span>
                </div>
                <button
                  type="button"
                  className="my-position-button"
                  onClick={() => navigate("/learning")}
                >
                  Tambah XP di Modul Belajar
                </button>
              </section>
            </>
          )}
        </section>

        {selectedUser && (
          <div
            className="leaderboard-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="learner-modal-title"
          >
            <div className="leaderboard-modal">
              <div className="leaderboard-modal-header">
                <div className="leaderboard-modal-identity">
                  <div className="table-avatar" aria-hidden="true">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h2 id="learner-modal-title">{selectedUser.name}</h2>
                    <span className="leaderboard-section-code">
                      Peringkat #{selectedUser.id} • {selectedUser.username || "@sql_learner"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="leaderboard-modal-close"
                  aria-label="Tutup rincian pembelajar"
                  onClick={() => setSelectedUser(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <dl className="leaderboard-modal-stats">
                <div>
                  <dt>Level & Peran</dt>
                  <dd>
                    Level {selectedUser.level} • {selectedUser.title}
                  </dd>
                </div>
                <div>
                  <dt>Total XP ({period})</dt>
                  <dd>{selectedUser.xp.toLocaleString("id-ID")} XP</dd>
                </div>
                <div>
                  <dt>Modul Diselesaikan</dt>
                  <dd>{selectedUser.modules} Modul</dd>
                </div>
                <div>
                  <dt>Tantangan Kueri</dt>
                  <dd>{selectedUser.challenges} Kueri</dd>
                </div>
                <div>
                  <dt>Streak Harian</dt>
                  <dd>{selectedUser.streak} Hari Berturut-turut</dd>
                </div>
              </dl>

              <div className="leaderboard-modal-footer">
                <span>Tekan Escape untuk menutup rincian</span>
                <button
                  type="button"
                  className="my-position-button"
                  onClick={() => setSelectedUser(null)}
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default LeaderboardPage;
