import { Bell, Clock } from "lucide-react";
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

const PRESET_TIMES = ["19:00", "20:00", "21:00"];

function NotificationsSettingsPage() {
  const {
    reminderTime,
    setReminderTime,
    notifications,
    updateNotification,
    setSaved,
  } = useOutletContext();

  const channels = [
    {
      key: "levelUp",
      title: "Pencapaian & Kenaikan Level",
      desc: "Tampilkan pemberitahuan saat XP bertambah dan lencana kompetensi baru terbuka.",
      ariaLabel: "Notifikasi pencapaian dan kenaikan level",
    },
    {
      key: "dailyChallenge",
      title: "Tantangan Kueri Harian",
      desc: "Beritahu saat soal latihan SQL harian baru tersedia setiap pukul 00:00 WIB.",
      ariaLabel: "Notifikasi tantangan kueri harian",
    },
    {
      key: "community",
      title: "Diskusi & Tinjauan Kueri",
      desc: "Pemberitahuan ketika solusi kueri yang kamu bagikan mendapat tanggapan pembelajar lain.",
      ariaLabel: "Notifikasi diskusi dan tinjauan kueri",
    },
    {
      key: "newsletter",
      title: "Ringkasan Materi Mingguan",
      desc: "Kirimkan catatan teknik pengindeksan dan optimasi kueri SQL setiap akhir pekan.",
      ariaLabel: "Langganan ringkasan materi mingguan",
    },
  ];

  const activeCount = channels.filter((ch) => notifications[ch.key]).length;

  return (
    <div className="settings-single-page">
      <section
        className="settings-card"
        id="settings-notifications"
        aria-labelledby="heading-notifications"
      >
        <header className="settings-section-header">
          <div className="settings-section-title-row">
            <div className="settings-section-title-group">
              <div className="settings-section-icon" aria-hidden="true">
                <Bell size={18} />
              </div>
              <div>
                <h2 id="heading-notifications">Jadwal Pengingat & Notifikasi</h2>
                <p>
                  Tentukan jam pengingat latihan harian dan pilih jenis
                  pemberitahuan aktivitas yang ingin diterima.
                </p>
              </div>
            </div>

            <span className="settings-count-pill">
              {activeCount} / {channels.length} Aktif
            </span>
          </div>
        </header>

        <div className="settings-reminder-box">
          <div className="settings-reminder-heading">
            <label htmlFor="daily-reminder-time">
              <Clock size={16} aria-hidden="true" />
              <span>Waktu Pengingat Latihan Harian</span>
            </label>

            <div className="settings-reminder-controls">
              <div
                className="settings-time-presets"
                role="group"
                aria-label="Pilihan cepat waktu pengingat"
              >
                {PRESET_TIMES.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`settings-time-preset ${reminderTime === preset ? "active" : ""
                      }`}
                    onClick={() => {
                      setReminderTime(preset);
                      setSaved(false);
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

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
          </div>

          <p>
            Pengingat dikirimkan 30 menit sebelum batas waktu harian berakhir
            apabila kamu belum menyelesaikan 1 kueri latihan.
          </p>
        </div>

        <div className="settings-toggle-list">
          {channels.map((item) => {
            const isEnabled = Boolean(notifications[item.key]);
            return (
              <div className="settings-toggle-row" key={item.key}>
                <div>
                  <div className="settings-toggle-title-wrap">
                    <strong>{item.title}</strong>
                    <span
                      className={`settings-channel-badge ${isEnabled ? "on" : "off"
                        }`}
                    >
                      {isEnabled ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <span>{item.desc}</span>
                </div>
                <Toggle
                  label={item.ariaLabel}
                  checked={isEnabled}
                  onChange={() => updateNotification(item.key)}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default NotificationsSettingsPage;
