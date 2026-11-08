import { Clock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

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

function NotificationsSettingsPage() {
  const {
    reminderTime,
    setReminderTime,
    notifications,
    updateNotification,
    setSaved,
  } = useOutletContext();

  return (
    <div className="settings-single-page">
      <section
        className="settings-card"
        id="settings-notifications"
        aria-labelledby="heading-notifications"
      >
        <header className="settings-section-header">
          <div>
            <h2 id="heading-notifications">Jadwal Pengingat & Notifikasi</h2>
            <p>
              Tentukan jam pengingat latihan harian dan pilih jenis pemberitahuan aktivitas yang ingin diterima.
            </p>
          </div>
        </header>

        <div className="settings-reminder-box">
          <div className="settings-reminder-heading">
            <label htmlFor="daily-reminder-time">
              <Clock size={16} aria-hidden="true" />
              <span>Waktu Pengingat Latihan Harian</span>
            </label>

            <input
              id="daily-reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => {
                setReminderTime(e.target.value);
                setSaved(false);
              }}
            />
          </div>

          <p>
            Pengingat dikirimkan 30 menit sebelum batas waktu harian berakhir apabila kamu belum menyelesaikan 1 kueri latihan.
          </p>
        </div>

        <div className="settings-toggle-list">
          <div className="settings-toggle-row">
            <div>
              <strong>Pencapaian & Kenaikan Level</strong>
              <span>
                Tampilkan pemberitahuan saat XP bertambah dan lencana kompetensi baru terbuka.
              </span>
            </div>
            <Toggle
              label="Notifikasi pencapaian dan kenaikan level"
              checked={notifications.levelUp}
              onChange={() => updateNotification("levelUp")}
            />
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Tantangan Kueri Harian</strong>
              <span>
                Beritahu saat soal latihan SQL harian baru tersedia setiap pukul 00:00 WIB.
              </span>
            </div>
            <Toggle
              label="Notifikasi tantangan kueri harian"
              checked={notifications.dailyChallenge}
              onChange={() => updateNotification("dailyChallenge")}
            />
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Diskusi & Tinjauan Kueri</strong>
              <span>
                Pemberitahuan ketika solusi kueri yang kamu bagikan mendapat tanggapan pembelajar lain.
              </span>
            </div>
            <Toggle
              label="Notifikasi diskusi dan tinjauan kueri"
              checked={notifications.community}
              onChange={() => updateNotification("community")}
            />
          </div>

          <div className="settings-toggle-row">
            <div>
              <strong>Ringkasan Materi Mingguan</strong>
              <span>
                Kirimkan catatan teknik pengindeksan dan optimasi kueri SQL setiap akhir pekan.
              </span>
            </div>
            <Toggle
              label="Langganan ringkasan materi mingguan"
              checked={notifications.newsletter}
              onChange={() => updateNotification("newsletter")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotificationsSettingsPage;
