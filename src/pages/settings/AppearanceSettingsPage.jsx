import { Check, ChevronDown, Palette } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const FONT_STACKS = {
  "JetBrains Mono": '"JetBrains Mono", var(--font-mono)',
  "Fira Code": '"Fira Code", var(--font-mono)',
  "Source Code": '"Source Code Pro", var(--font-mono)',
};

function AppearanceSettingsPage() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    font,
    setFont,
    setSaved,
  } = useOutletContext();

  const activeFontStack = FONT_STACKS[font] || "var(--font-mono)";

  return (
    <div className="settings-single-page">
      <section
        className="settings-card"
        id="settings-appearance"
        aria-labelledby="heading-appearance"
      >
        <header className="settings-section-header">
          <div className="settings-section-title-group">
            <div className="settings-section-icon" aria-hidden="true">
              <Palette size={18} />
            </div>
            <div>
              <h2 id="heading-appearance">Tampilan & Preferensi Editor</h2>
              <p>
                Atur skema warna antarmuka, bahasa pengantar modul, dan jenis
                huruf monospace untuk editor kueri SQL.
              </p>
            </div>
          </div>
        </header>

        <div className="settings-password-fields">
          <div className="settings-field">
            <label id="theme-group-label">Skema Warna Antarmuka</label>

            <div
              className="settings-theme-options"
              role="radiogroup"
              aria-labelledby="theme-group-label"
            >
              {[
                {
                  id: "light",
                  label: "Mode Terang",
                  desc: "Latar kertas terang",
                },
                {
                  id: "dark",
                  label: "Mode Gelap",
                  desc: "Kontras rendah cahaya",
                },
                {
                  id: "system",
                  label: "Ikuti Sistem",
                  desc: "Sesuai pengaturan OS",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={theme === item.id}
                  className={`settings-theme-option ${theme === item.id ? "selected" : ""
                    }`}
                  onClick={() => {
                    setTheme(item.id);
                    setSaved(false);
                  }}
                >
                  <div
                    className={`theme-preview ${item.id}`}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                  <strong>{item.label}</strong>
                  <small>{item.desc}</small>
                  {theme === item.id && <Check size={15} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-field">
            <label htmlFor="interface-language">Bahasa Pengantar Platform</label>
            <div className="settings-select-wrap">
              <select
                id="interface-language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setSaved(false);
                }}
              >
                <option value="Indonesia">Bahasa Indonesia</option>
                <option value="English">English (US)</option>
              </select>
              <ChevronDown size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="settings-field">
            <label id="font-group-label">Tipografi Konsol Kueri SQL</label>
            <div
              className="settings-font-options"
              role="radiogroup"
              aria-labelledby="font-group-label"
            >
              {[
                { id: "JetBrains Mono", sample: "SELECT * FROM users;" },
                { id: "Fira Code", sample: "WHERE active = TRUE;" },
                { id: "Source Code", sample: "ORDER BY xp DESC;" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={font === item.id}
                  className={font === item.id ? "selected" : ""}
                  onClick={() => {
                    setFont(item.id);
                    setSaved(false);
                  }}
                >
                  <strong>{item.id}</strong>
                  <code style={{ fontFamily: FONT_STACKS[item.id] }}>
                    {item.sample}
                  </code>
                </button>
              ))}
            </div>
          </div>

          <div className="settings-sql-preview" aria-label="Pratinjau konsol SQL">
            <div className="settings-sql-preview-head">
              <span>PRATINJAU EDITOR KUERI</span>
              <span>{font} • {language}</span>
            </div>
            <pre style={{ fontFamily: activeFontStack }}>
              <code>
                {`SELECT id, username, level, xp\nFROM sql_learners\nWHERE streak_days >= 7\nORDER BY xp DESC\nLIMIT 5;`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AppearanceSettingsPage;
