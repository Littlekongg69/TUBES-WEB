import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  Bell,
  Flame,
  Zap,
  Clock,
  CheckCircle2,
  Lock,
  Play,
  RotateCw,
  X,
} from "lucide-react";

import "./LearningPage.css";
import AppSidebar from "../components/AppSidebar";
import { useLearning } from "../presentation/hooks/useLearning";

const MODULE_SQL_SAMPLES = {
  1: "SELECT id, name, email\nFROM users\nWHERE status = 'ACTIVE' AND role IN ('ANALYST', 'DBA')\nORDER BY created_at DESC;",
  2: "SELECT department, COUNT(*) AS total_staff, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 5;",
  3: "SELECT o.order_id, c.full_name, o.total_amount\nFROM orders o\nINNER JOIN customers c ON c.customer_id = o.customer_id\nWHERE o.order_date >= '2026-01-01';",
  4: "WITH regional_sales AS (\n  SELECT region, SUM(amount) AS total_sales\n  FROM invoices\n  GROUP BY region\n)\nSELECT * FROM regional_sales WHERE total_sales > 50000;",
};

function LearningPage() {
  const navigate = useNavigate();
  const {
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    filters,
    filteredModules,
    loading,
    error,
    retryFetch,
    triggerSimulatedLoading,
  } = useLearning();

  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const searchInputRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape") {
        if (selectedModule) {
          setSelectedModule(null);
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
  }, [notifOpen, selectedModule]);

  return (
    <div className="learning-layout">
      <AppSidebar />

      <main className="learning-main">
        <header className="learning-topbar">
          <div className="topbar-search">
            <Search size={16} aria-hidden="true" />

            <input
              ref={searchInputRef}
              type="search"
              placeholder="Cari modul, sintaks (SELECT, JOIN, CTE)..."
              aria-label="Cari modul atau sintaks SQL"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd aria-hidden="true">Ctrl K</kbd>
          </div>

          <div className="topbar-user">
            <div className="topbar-streak" title="Streak belajar aktif">
              <Flame size={15} aria-hidden="true" />
              <span>6 Hari</span>
            </div>

            <div className="topbar-xp" title="Total poin pengalaman">
              <Zap size={15} aria-hidden="true" />
              <span>1.420 XP</span>
            </div>

            <div className="learning-notif-wrap" ref={notifRef}>
              <button
                type="button"
                className="topbar-notification"
                aria-label="Buka panel notifikasi"
                aria-expanded={notifOpen}
                aria-controls="learning-notif-popover"
                onClick={() => setNotifOpen((prev) => !prev)}
              >
                <Bell size={17} aria-hidden="true" />
                <span className="learning-bell-dot" aria-hidden="true" />
              </button>

              {notifOpen && (
                <div
                  id="learning-notif-popover"
                  className="learning-notif-popover"
                  role="dialog"
                  aria-label="Notifikasi modul"
                >
                  <div className="learning-notif-header">
                    <strong>Progres Kurikulum</strong>
                    <span>2 / 8 Selesai</span>
                  </div>
                  <p>
                    Modul 03 (Relasi Multi-Tabel: INNER & LEFT JOIN) sudah mencapai 57%. Selesaikan 3 lesson tersisa untuk mendapatkan +220 XP.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNotifOpen(false);
                      navigate("/settings/notifications");
                    }}
                  >
                    Pengaturan Pengingat
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="learning-user-button"
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

        <div className="learning-content">
          <section className="learning-intro" aria-label="Pengantar kurikulum">
            <div className="learning-heading">
              <h1>Modul Pembelajaran SQL</h1>

              <p>
                Pelajari kueri SQL relasional dari penyaringan baris dasar, pengelompokan agregat, relasi multi-tabel, hingga optimasi indeks secara bertahap.
              </p>
            </div>

            <div className="track-card">
              <div className="track-content">
                <div className="track-header-row">
                  <h2>Jalur Fundamental & Analitik</h2>
                  <strong className="track-pct-badge">25%</strong>
                </div>
                <div
                  className="track-linear-bar"
                  role="progressbar"
                  aria-label="Progres jalur kurikulum 25 persen"
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: "25%" }} />
                </div>
                <span>2 dari 8 Modul Selesai • 6 Modul Tersisa</span>
              </div>
            </div>
          </section>

          <section
            className="module-section"
            aria-label="Daftar materi pembelajaran"
          >
            <div className="module-toolbar">
              <div
                className="module-filters"
                role="tablist"
                aria-label="Filter status modul"
              >
                {filters.map((filter) => (
                  <button
                    key={filter.label}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === filter.label}
                    className={
                      activeFilter === filter.label
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() => setActiveFilter(filter.label)}
                  >
                    <span>{filter.label}</span>
                    <code>{filter.count}</code>
                  </button>
                ))}
              </div>

              <div className="module-toolbar-actions">
                <div className="module-search">
                  <Search size={15} aria-hidden="true" />

                  <input
                    type="search"
                    placeholder="Filter judul atau deskripsi modul..."
                    aria-label="Filter judul atau deskripsi modul"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="sort-button"
                  onClick={triggerSimulatedLoading}
                >
                  <RotateCw size={14} aria-hidden="true" />
                  <span>Segarkan Daftar</span>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="status-screen" role="status" aria-live="polite">
                <div className="loading-spinner" aria-hidden="true" />
                <p>Memuat daftar modul pembelajaran...</p>
              </div>
            ) : error ? (
              <div className="status-screen" role="alert">
                <p>{error}</p>
                <button type="button" onClick={retryFetch}>
                  Muat Ulang Modul
                </button>
              </div>
            ) : (
              <>
                <div className="module-grid">
                  {filteredModules.map((module) => (
                    <article
                      className={`module-card ${
                        module.isCapstone ? "capstone-card" : ""
                      }`}
                      key={module.id}
                    >
                      <div className="module-card-top">
                        <div className="module-card-labels">
                          <span className="module-number">
                            {module.isCapstone
                              ? "CAPSTONE_LAB"
                              : `MODUL_${String(module.id).padStart(2, "0")}`}
                          </span>

                          <span className="module-xp">+{module.xp} XP</span>
                        </div>

                        <span className={`module-status ${module.status}`}>
                          {module.status === "completed" && (
                            <>
                              <CheckCircle2 size={14} aria-hidden="true" />
                              <span>Selesai</span>
                            </>
                          )}

                          {module.status === "in-progress" && (
                            <>
                              <Play size={13} aria-hidden="true" />
                              <span>Sedang Berjalan</span>
                            </>
                          )}

                          {module.status === "locked" && (
                            <>
                              <Lock size={13} aria-hidden="true" />
                              <span>Terkunci</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h3>{module.title}</h3>

                      <p className="module-description">{module.description}</p>

                      <div className="module-meta">
                        <span>
                          <Clock size={14} aria-hidden="true" />
                          {module.duration}
                        </span>

                        <span>
                          <BookOpen size={14} aria-hidden="true" />
                          {module.lessons} Materi Latihan
                        </span>
                      </div>

                      <div className="module-progress">
                        <div className="module-progress-label">
                          <span>Penyelesaian</span>
                          <strong>{module.progress}%</strong>
                        </div>

                        <div
                          className="module-progress-track"
                          role="progressbar"
                          aria-label={`Progres ${module.title}`}
                          aria-valuenow={module.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            style={{
                              width: `${module.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`module-action ${module.status}`}
                        disabled={module.status === "locked"}
                        onClick={() => setSelectedModule(module)}
                      >
                        {module.status === "completed" && "Tinjau Materi & Kueri"}
                        {module.status === "in-progress" && "Lanjutkan Modul"}
                        {module.status === "locked" &&
                          "Selesaikan Modul Sebelumnya"}
                      </button>
                    </article>
                  ))}
                </div>

                {filteredModules.length === 0 && (
                  <div className="module-empty" role="status">
                    <p>Tidak ada modul yang cocok dengan kata kunci pencarian.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveFilter("Semua");
                        setSearch("");
                      }}
                    >
                      Reset Filter Pencarian
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {selectedModule && (
          <div
            className="learning-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="module-preview-title"
          >
            <div className="learning-modal">
              <div className="learning-modal-header">
                <div>
                  <h2 id="module-preview-title">{selectedModule.title}</h2>
                  <span className="module-number">
                    MODUL_{String(selectedModule.id).padStart(2, "0")} • +
                    {selectedModule.xp} XP
                  </span>
                </div>
                <button
                  type="button"
                  className="learning-modal-close"
                  aria-label="Tutup rincian modul"
                  onClick={() => setSelectedModule(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <p className="learning-modal-desc">
                {selectedModule.description}
              </p>

              <dl className="learning-modal-meta">
                <div>
                  <dt>Estimasi Durasi</dt>
                  <dd>{selectedModule.duration}</dd>
                </div>
                <div>
                  <dt>Jumlah Latihan</dt>
                  <dd>{selectedModule.lessons} Studi Kasus</dd>
                </div>
                <div>
                  <dt>Progres Saat Ini</dt>
                  <dd>{selectedModule.progress}% Selesai</dd>
                </div>
              </dl>

              <div className="learning-modal-code">
                <span>Contoh Sintaks Kueri Modul:</span>
                <pre>
                  <code>
                    {MODULE_SQL_SAMPLES[selectedModule.id] ||
                      MODULE_SQL_SAMPLES[1]}
                  </code>
                </pre>
              </div>

              <div className="learning-modal-footer">
                <span>Tekan Escape untuk menutup pratinjau</span>
                <button
                  type="button"
                  className="module-action in-progress"
                  onClick={() => setSelectedModule(null)}
                >
                  Tutup Pratinjau
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default LearningPage;
