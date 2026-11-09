import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Lock,
  Star,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";

import "./GamePage.css";
import AppSidebar from "../components/AppSidebar";
import { useGame } from "../presentation/hooks/useGame";

function ComingSoonBanner() {
  return (
    <div className="game-comingsoon-banner" aria-hidden="true">
      <div className="game-comingsoon-banner-inner">
        <span className="game-comingsoon-banner-icon">
          <Lock size={18} />
        </span>
        <strong>COMING SOON</strong>
        <span>Segera Hadir</span>
      </div>
    </div>
  );
}

function GamePage() {
  const navigate = useNavigate();
  const {
    missions,
    earnedXp,
    soundEnabled,
    setSoundEnabled,
    loading,
    error,
    retryFetch,
  } = useGame();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedComingSoon, setSelectedComingSoon] = useState(null);

  useEffect(() => {
    if (!selectedComingSoon) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedComingSoon(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedComingSoon]);

  const logicMissions = missions.filter((m) => m.category === "logika");
  const tableMissions = missions.filter((m) => m.category !== "logika");

  const renderGameCard = (mission) => {
    const diffClass =
      mission.difficulty === "Sedang" ? "diff-medium" : "diff-easy";

    return (
      <article
        key={mission.id}
        className={`arcade-card coming-soon-card ${
          mission.featured ? "featured" : ""
        }`}
      >
        <div
          className="arcade-card-media"
          onClick={() => setSelectedComingSoon(mission)}
          role="button"
          tabIndex={-1}
          aria-hidden="true"
        >
          <ComingSoonBanner />

          {mission.featured && (
            <span className="arcade-featured-badge">
              <Star size={12} fill="currentColor" aria-hidden="true" />
              <span>Unggulan</span>
            </span>
          )}

          <code className={`arcade-snippet-pill pos-${mission.snippetPos}`}>
            {mission.snippet}
          </code>
        </div>

        <div className="arcade-card-body">
          <div className="arcade-title-row">
            <h3>Coming Soon</h3>
            <span className={`arcade-diff-badge ${diffClass}`}>
              {mission.difficulty}
            </span>
          </div>

          <p className="arcade-card-desc">{mission.cardSummary}</p>

          <div className="arcade-tag-list" aria-label="Topik materi SQL">
            {(mission.tags || []).map((tag) => (
              <span key={tag} className="arcade-tag">
                {tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className="arcade-play-cta coming-soon-cta"
            onClick={() => setSelectedComingSoon(mission)}
          >
            <span className="arcade-play-left">
              <span className="arcade-play-icon coming-soon" aria-hidden="true">
                <Clock size={11} />
              </span>
              <span>Coming Soon</span>
            </span>
            <ArrowRight size={16} className="arcade-play-arrow" aria-hidden="true" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="game-layout">
      <AppSidebar />

      <main className="game-main">
        <header className="game-topbar">
          <div className="game-topbar-left">
            <div className="game-catalog-title-wrap">
              <div className="game-catalog-heading-row">
                <h1>Arena Game SQL Interaktif</h1>
                <span className="game-global-comingsoon-pill">
                  <Clock size={12} aria-hidden="true" />
                  <span>Coming Soon</span>
                </span>
              </div>
              <span>
                Seluruh mini-game studi kasus SQL sedang dalam tahap akhir pengembangan
              </span>
            </div>
          </div>

          <div className="game-topbar-controls">
            <div className="game-xp-pill">
              <Zap size={15} aria-hidden="true" />
              <span>+{earnedXp} XP Sesi</span>
            </div>

            <button
              type="button"
              className="game-audio-btn"
              aria-label={
                soundEnabled ? "Matikan efek suara" : "Aktifkan efek suara"
              }
              aria-pressed={soundEnabled}
              onClick={() => setSoundEnabled((prev) => !prev)}
            >
              {soundEnabled ? (
                <Volume2 size={17} aria-hidden="true" />
              ) : (
                <VolumeX size={17} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              className="game-user-button"
              aria-label="Buka profil pengguna"
              onClick={() => navigate("/profile")}
            >
              <div className="game-user-avatar" aria-hidden="true">
                RM
              </div>
              <div>
                <strong>Rani Maharani</strong>
                <span>Level 4 • SQL Novice</span>
              </div>
            </button>
          </div>
        </header>

        <div className="game-content">
          {loading ? (
            <div className="status-screen" role="status" aria-live="polite">
              <div className="loading-spinner" aria-hidden="true" />
              <p>Memuat katalog permainan SQL...</p>
            </div>
          ) : error ? (
            <div className="status-screen" role="alert">
              <p>{error}</p>
              <button type="button" onClick={retryFetch}>
                Muat Ulang Permainan
              </button>
            </div>
          ) : (
            <div className="arcade-catalog">
              {(categoryFilter === "all" || categoryFilter === "logika") && (
                <section
                  className="arcade-category-section"
                  aria-labelledby="cat-logika-heading"
                >
                  <div className="arcade-category-header">
                    <div className="arcade-category-title">
                      <h2 id="cat-logika-heading">Logika & Algoritma SQL</h2>
                      <span className="arcade-category-count">
                        {logicMissions.length}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="arcade-see-all"
                      onClick={() =>
                        setCategoryFilter((prev) =>
                          prev === "logika" ? "all" : "logika"
                        )
                      }
                    >
                      <span>
                        {categoryFilter === "logika"
                          ? "Tampilkan Semua"
                          : "Lihat Semua"}
                      </span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="arcade-card-grid">
                    {logicMissions.map(renderGameCard)}
                  </div>
                </section>
              )}

              {(categoryFilter === "all" || categoryFilter === "tabel") && (
                <section
                  className="arcade-category-section"
                  aria-labelledby="cat-tabel-heading"
                >
                  <div className="arcade-category-header">
                    <div className="arcade-category-title">
                      <h2 id="cat-tabel-heading">SQL</h2>
                      <span className="arcade-category-count">11</span>
                    </div>

                    <button
                      type="button"
                      className="arcade-see-all"
                      onClick={() =>
                        setCategoryFilter((prev) =>
                          prev === "tabel" ? "all" : "tabel"
                        )
                      }
                    >
                      <span>
                        {categoryFilter === "tabel"
                          ? "Tampilkan Semua"
                          : "Lihat Semua"}
                      </span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="arcade-card-grid">
                    {tableMissions.map(renderGameCard)}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {selectedComingSoon && (
          <div
            className="game-comingsoon-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comingsoon-modal-title"
          >
            <div className="game-comingsoon-modal">
              <div className="game-comingsoon-modal-media">
                <ComingSoonBanner />
                <button
                  type="button"
                  className="game-comingsoon-close"
                  aria-label="Tutup informasi game"
                  onClick={() => setSelectedComingSoon(null)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="game-comingsoon-modal-body">
                <div className="arcade-title-row">
                  <h2 id="comingsoon-modal-title">Coming Soon</h2>
                  <span
                    className={`arcade-diff-badge ${
                      selectedComingSoon.difficulty === "Sedang"
                        ? "diff-medium"
                        : "diff-easy"
                    }`}
                  >
                    {selectedComingSoon.difficulty}
                  </span>
                  <span className="game-modal-xp-tag">
                    +{selectedComingSoon.xpReward} XP
                  </span>
                </div>

                <p className="game-comingsoon-desc">
                  Permainan interaktif ini sedang dalam tahap pengembangan dan akan segera hadir (<em>Coming Soon</em>). Kamu tetap dapat mempelajari materi kueri terkait melalui halaman Modul Belajar.
                </p>

                <div className="game-comingsoon-preview-box">
                  <span>Fokus Sintaks Permainan:</span>
                  <code>{selectedComingSoon.snippet}</code>
                </div>

                <div className="arcade-tag-list">
                  {(selectedComingSoon.tags || []).map((tag) => (
                    <span key={tag} className="arcade-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="game-comingsoon-actions">
                  <button
                    type="button"
                    className="game-comingsoon-secondary"
                    onClick={() => setSelectedComingSoon(null)}
                  >
                    Tutup Pratinjau
                  </button>
                  <button
                    type="button"
                    className="game-comingsoon-primary"
                    onClick={() => {
                      setSelectedComingSoon(null);
                      navigate("/learning");
                    }}
                  >
                    <span>Buka Modul Belajar</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default GamePage;
