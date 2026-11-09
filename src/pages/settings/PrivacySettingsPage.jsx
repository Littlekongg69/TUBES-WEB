import { useEffect, useState } from "react";
import { AlertTriangle, Download, Shield, Trash2 } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Toggle = ({ checked, onChange, label = "Ubah pengaturan" }) => (
  <button
    type="button"
    role="switch"
    className={`settings-toggle ${checked ? "enabled" : ""}`}
    onClick={onChange}
    aria-label={label}
    aria-checked={checked}
  >
    <span />
  </button>
);

function PrivacySettingsPage() {
  const navigate = useNavigate();
  const {
    profile,
    theme,
    language,
    font,
    reminderTime,
    notifications,
    updateNotification,
    handleDeleteAccount,
    setFeedback,
  } = useOutletContext();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!confirmOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setConfirmOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmOpen]);

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      profile,
      preferences: {
        theme,
        language,
        font,
        reminderTime,
        notifications,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sql-quest-account-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setFeedback({
      type: "success",
      message: "Salinan data akun berhasil diunduh dalam format JSON.",
    });
  };

  const confirmDelete = () => {
    handleDeleteAccount();
    setConfirmOpen(false);
    navigate("/login");
  };

  return (
    <div className="settings-single-page">
      <section
        className="settings-card"
        id="settings-privacy"
        aria-labelledby="heading-privacy"
      >
        <header className="settings-section-header">
          <div className="settings-section-title-group">
            <div className="settings-section-icon" aria-hidden="true">
              <Shield size={18} />
            </div>
            <div>
              <h2 id="heading-privacy">Privasi & Pengelolaan Data Akun</h2>
              <p>
                Atur keterlihatan profil pada papan peringkat publik, unduh
                salinan data belajar, atau hapus penyimpanan akun lokal.
              </p>
            </div>
          </div>
        </header>

        <div className="settings-privacy-box">
          <div>
            <div className="settings-toggle-title-wrap">
              <strong>Sembunyikan Profil dari Leaderboard Publik</strong>
              <span
                className={`settings-channel-badge ${notifications.hideLeaderboard ? "on" : "off"
                  }`}
              >
                {notifications.hideLeaderboard ? "Mode Privat" : "Publik"}
              </span>
            </div>
            <span>
              Nama, username, dan perolehan XP tidak akan ditampilkan pada
              daftar peringkat umum.
            </span>
          </div>

          <Toggle
            label="Sembunyikan profil dari leaderboard publik"
            checked={notifications.hideLeaderboard}
            onChange={() => updateNotification("hideLeaderboard")}
          />
        </div>

        <div className="settings-export-box">
          <div>
            <strong>Salinan Data Akun & Preferensi (JSON)</strong>
            <span>
              Unduh arsip konfigurasi profil, preferensi editor SQL, dan jadwal
              latihan yang tersimpan di perangkat ini.
            </span>
          </div>

          <button
            type="button"
            className="settings-export-button"
            onClick={handleExportData}
          >
            <Download size={15} aria-hidden="true" />
            <span>Unduh Data (.json)</span>
          </button>
        </div>

        <div className="settings-danger-box">
          <div className="settings-danger-header">
            <AlertTriangle size={18} aria-hidden="true" />
            <h3>Reset & Hapus Data Akun</h3>
          </div>
          <p>
            Tindakan ini akan menghapus seluruh preferensi tersimpan,
            kustomisasi profil, dan mengakhiri sesi belajar pada peramban ini.
          </p>

          {!confirmOpen ? (
            <button
              type="button"
              className="settings-danger-trigger"
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 size={15} aria-hidden="true" />
              <span>Hapus Data Akun...</span>
            </button>
          ) : (
            <div
              className="settings-danger-confirm"
              role="alertdialog"
              aria-labelledby="danger-dialog-title"
              aria-describedby="danger-dialog-desc"
            >
              <strong id="danger-dialog-title">
                Konfirmasi Penghapusan Data Akun
              </strong>
              <p id="danger-dialog-desc">
                Apakah kamu yakin ingin menghapus seluruh data profil lokal dan
                kembali ke halaman masuk? Tekan tombol Escape untuk membatalkan.
              </p>
              <div className="settings-danger-actions">
                <button
                  type="button"
                  className="settings-danger-cancel"
                  onClick={() => setConfirmOpen(false)}
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  className="settings-danger-submit"
                  onClick={confirmDelete}
                >
                  Ya, Hapus & Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PrivacySettingsPage;
