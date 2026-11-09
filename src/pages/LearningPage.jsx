
import { useState } from "react";
import {
  Home,
  BookOpen,
  Gamepad2,
  Trophy,
  Settings,
  Search,
  Bell,
  Flame,
  Zap,
  ChevronDown,
  Clock,
  CheckCircle2,
  Lock,
  Play,
  SlidersHorizontal,
  Code2,
} from "lucide-react";

import "./LearningPage.css";

// =========================================
// DATA MODUL PEMBELAJARAN
// =========================================

const modules = [
  {
    id: 1,
    title: "Dasar SELECT & Filtering WHERE",
    description:
      "Pelajari struktur fundamental pengambilan data relasional, aliasing kolom, dan pemfilteran logika kompleks dengan operator AND/OR/IN.",
    duration: "20 Menit",
    lessons: 5,
    xp: 150,
    progress: 100,
    status: "completed",
  },
  {
    id: 2,
    title: "Pengelompokan GROUP BY & HAVING",
    description:
      "Analisis data agregat menggunakan fungsi COUNT, SUM, AVG serta menyaring hasil grup data secara presisi.",
    duration: "30 Menit",
    lessons: 6,
    xp: 180,
    progress: 100,
    status: "completed",
  },
  {
    id: 3,
    title: "Relasi Multi-Tabel: INNER & LEFT JOIN",
    description:
      "Kuasai cara menggabungkan data antar entitas dengan berbagai tipe relasi database relasional.",
    duration: "35 Menit",
    lessons: 7,
    xp: 220,
    progress: 57,
    status: "in-progress",
  },
  {
    id: 4,
    title: "Subquery & Common Table Expressions (CTE)",
    description:
      "Tingkatkan keterbacaan kueri rumit dengan teknik modularisasi query PostgreSQL menggunakan CTE.",
    duration: "40 Menit",
    lessons: 6,
    xp: 250,
    progress: 33,
    status: "in-progress",
  },
  {
    id: 5,
    title: "Window Functions: ROW_NUMBER & RANK",
    description:
      "Analisis data sekuensial dan perankingan dinamis tanpa mengubah jumlah baris melalui OVER, PARTITION BY, dan DENSE_RANK.",
    duration: "45 Menit",
    lessons: 8,
    xp: 280,
    progress: 0,
    status: "locked",
  },
  {
    id: 6,
    title: "Agregasi Lanjutan & Pivot Data",
    description:
      "Transformasi baris menjadi kolom dengan fungsi CROSSTAB, ROLLUP, dan CUBE untuk pelaporan intelijen bisnis.",
    duration: "35 Menit",
    lessons: 6,
    xp: 300,
    progress: 0,
    status: "locked",
  },
  {
    id: 7,
    title: "Optimasi Query & Indexing",
    description:
      "Pelajari cara meningkatkan performa database dengan indeks dan analisis query.",
    duration: "40 Menit",
    lessons: 7,
    xp: 350,
    progress: 0,
    status: "locked",
  },
  {
    id: 8,
    title: "Capstone Quest",
    description:
      "Terapkan seluruh kemampuan SQL melalui tantangan proyek database yang komprehensif.",
    duration: "60 Menit",
    lessons: 10,
    xp: 500,
    progress: 0,
    status: "locked",
    isCapstone: true,
  },
];

// =========================================
// HALAMAN LEARNING
// =========================================

function LearningPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filters = [
    { label: "Semua", count: 8 },
    { label: "Sedang Berjalan", count: 2 },
    { label: "Selesai", count: 2 },
  ];

  // FILTER DAN PENCARIAN MODUL
  const filteredModules = modules.filter((module) => {
    const matchesSearch = module.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "Semua" ||
      (activeFilter === "Sedang Berjalan" &&
        module.status === "in-progress") ||
      (activeFilter === "Selesai" &&
        module.status === "completed");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="learning-layout">
      {/* =====================================
          SIDEBAR
      ===================================== */}

            <nav className="sidebar-navigation">
        <a href="/dashboard" className="sidebar-link">
            <Home size={19} />
            <span>Beranda</span>
        </a>

        <a href="/learning" className="sidebar-link active">
            <BookOpen size={19} />
            <span>Belajar</span>
        </a>

        <a href="#" className="sidebar-link">
            <Gamepad2 size={19} />
            <span>Game</span>
        </a>

        <a href="#" className="sidebar-link">
            <Trophy size={19} />
            <span>Peringkat</span>
        </a>

        <a href="#" className="sidebar-link">
            <Settings size={19} />
            <span>Pengaturan</span>
        </a>
        </nav>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="learning-main">

        {/* TOPBAR */}

        <header className="learning-topbar">
          <div className="topbar-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Cari kueri, topik, sintaks..."
            />
          </div>

          <div className="topbar-user">
            <div className="topbar-streak">
              <Flame size={17} />
              <span>6 Hari</span>
            </div>

            <div className="topbar-xp">
              <Zap size={17} />
              <span>1.420 XP</span>
            </div>

            <button
              className="topbar-notification"
              aria-label="Notifikasi"
            >
              <Bell size={19} />
            </button>

            <div className="topbar-avatar">
              H
            </div>
          </div>
        </header>

        {/* =====================================
            LEARNING INTRO
        ===================================== */}

        <section className="learning-intro">

          {/* PAGE HEADING */}

          <div className="learning-heading">
            <span className="learning-eyebrow">
              KURIKULUM TERPADU
            </span>

            <h1>
              Modul Pembelajaran SQL
            </h1>

            <p>
              Kuasai query PostgreSQL dari tingkat dasar
              hingga mahir dengan kuis interaktif dan
              simulasi konsol nyata.
            </p>
          </div>

          {/* TRACK PROGRESS */}

          <div className="track-card">
            <div className="track-progress-circle">
              <strong>25%</strong>
            </div>

            <div className="track-content">
              <h3>
                SQL Beginner Track
              </h3>

              <span>
                2 dari 8 Modul Selesai
              </span>

              <small>
                <span className="track-dot" />
                Tersisa 6 Modul
              </small>
            </div>

            <span className="track-star">
              ✦
            </span>
          </div>
        </section>

        {/* =====================================
            MODULE SECTION
        ===================================== */}

        <section className="module-section">

          {/* MODULE HEADING */}

          <div className="module-heading">
            <div>
              <h2>
                Materi Pembelajaran
              </h2>

              <p>
                Pilih modul dan lanjutkan perjalanan belajarmu.
              </p>
            </div>

            <button className="sort-button">
              <SlidersHorizontal size={15} />
              Skeleton
              <ChevronDown size={14} />
            </button>
          </div>

          {/* FILTER DAN SEARCH */}

          <div className="module-toolbar">

            <div className="module-filters">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  className={
                    activeFilter === filter.label
                      ? "filter-button active"
                      : "filter-button"
                  }
                  onClick={() =>
                    setActiveFilter(filter.label)
                  }
                >
                  {filter.label}

                  <span>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="module-toolbar-actions">
              <div className="module-search">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Cari materi atau topik SQL..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>

              <button className="sort-button">
                <SlidersHorizontal size={15} />
                Skeleton
              </button>
            </div>
          </div>

          {/* =====================================
              MODULE CARDS
          ===================================== */}

          <div className="module-grid">
            {filteredModules.map((module) => (
              <article
                className={`module-card ${
                  module.isCapstone ? "capstone-card" : ""
                }`}
                key={module.id}
              >

                {/* CARD HEADER */}

                <div className="module-card-top">

                  <div className="module-card-labels">
                    <span className="module-number">
                      {module.isCapstone
                        ? "CAPSTONE QUEST"
                        : `MODUL ${String(module.id).padStart(2, "0")}`}
                    </span>

                    <span className="module-xp">
                      <Zap size={12} />
                      +{module.xp} XP
                    </span>
                  </div>

                  <span
                    className={`module-status ${module.status}`}
                  >
                    {module.status === "completed" && (
                      <>
                        <CheckCircle2 size={13} />
                        Selesai
                      </>
                    )}

                    {module.status === "in-progress" && (
                      <>
                        <Play size={12} />
                        Sedang Berjalan
                      </>
                    )}

                    {module.status === "locked" && (
                      <>
                        <Lock size={12} />
                        Terkunci
                      </>
                    )}
                  </span>
                </div>

                {/* MODULE INFORMATION */}

                <h3>
                  {module.title}
                </h3>

                <p className="module-description">
                  {module.description}
                </p>

                {/* MODULE METADATA */}

                <div className="module-meta">
                  <span>
                    <Clock size={14} />
                    {module.duration}
                  </span>

                  <span>
                    <BookOpen size={14} />
                    {module.lessons} Lesson
                  </span>
                </div>

                {/* MODULE PROGRESS */}

                <div className="module-progress">
                  <div className="module-progress-label">
                    <span>
                      Progress
                    </span>

                    <strong>
                      {module.progress}%
                    </strong>
                  </div>

                  <div className="module-progress-track">
                    <div
                      style={{
                        width: `${module.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* MODULE ACTION */}

                <button
                  className={`module-action ${module.status}`}
                  disabled={module.status === "locked"}
                >
                  {module.status === "completed" &&
                    "Ulas Kembali"}

                  {module.status === "in-progress" &&
                    "Lanjutkan Belajar"}

                  {module.status === "locked" &&
                    "Cek Syarat"}

                  {module.status !== "locked" && (
                    <span>→</span>
                  )}
                </button>

              </article>
            ))}
          </div>

          {/* EMPTY STATE */}

          {filteredModules.length === 0 && (
            <div className="module-empty">
              Materi tidak ditemukan.
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default LearningPage;
