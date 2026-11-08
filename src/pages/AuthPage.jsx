import { Link, useNavigate } from "react-router-dom";
import {
  Database,
  Lock,
  Mail,
  User,
  AtSign,
  Eye,
  EyeOff,
  AlertTriangle,
  Sun,
  Moon,
} from "lucide-react";

import "./AuthPage.css";
import { useAuth } from "../presentation/hooks/useAuth";
import { useTheme } from "../presentation/hooks/useTheme";

function AuthPage({ initialMode = "login", onAuthSuccess }) {
  const navigate = useNavigate();
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const {
    mode,
    switchMode,
    loginForm,
    registerForm,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    fieldErrors,
    serverError,
    loading,
    updateLoginField,
    updateRegisterField,
    fillDemoAccount,
    submitLogin,
    submitRegister,
  } = useAuth(initialMode);

  const handleModeChange = (targetMode) => {
    switchMode(targetMode);
    navigate(targetMode === "register" ? "/register" : "/login", {
      replace: true,
    });
  };

  const handleFormSubmit = async (event) => {
    const user =
      mode === "login"
        ? await submitLogin(event)
        : await submitRegister(event);

    if (user) {
      onAuthSuccess?.(user);
      navigate("/dashboard", { replace: true });
    }
  };

  const curriculumTracks = [
    {
      code: "01 // FUNDAMENTAL",
      title: "Pengenalan SELECT, WHERE & Pengurutan",
      meta: "2 Modul • 24 Latihan",
    },
    {
      code: "02 // AGGREGATION",
      title: "Fungsi Agregat, GROUP BY & HAVING",
      meta: "2 Modul • 18 Latihan",
    },
    {
      code: "03 // RELATIONAL",
      title: "Relasi Multi-Tabel (INNER, LEFT, FULL JOIN)",
      meta: "2 Modul • 20 Latihan",
    },
    {
      code: "04 // ADVANCED",
      title: "Subquery, CTE, Indexing & Optimasi Kueri",
      meta: "2 Modul • Capstone Lab",
    },
  ];

  return (
    <div className="auth-layout">
      <aside className="auth-showcase" aria-label="Ringkasan kurikulum SQL Quest">
        <div className="auth-brand-bar">
          <Link to="/dashboard" className="auth-brand">
            <div className="auth-brand-logo" aria-hidden="true">
              <Database size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h2>SQL Quest</h2>
              <span>INTERACTIVE SQL LAB</span>
            </div>
          </Link>

          <span className="auth-schema-badge">ENGINE: ANSI_SQL</span>
        </div>

        <div className="auth-showcase-body">
          <h1>
            Latihan Kueri SQL Berbasis Studi Kasus Tabel Relasional.
          </h1>

          <p>
            Tulis dan uji kueri SQL secara bertahap mulai dari pengambilan baris dasar hingga penggabungan tabel relasional dan analisis agregasi data.
          </p>

          <div className="auth-query-sample" aria-label="Contoh kueri latihan">
            <div className="auth-query-header">
              <span>query_editor.sql</span>
              <span>STATUS: VALIDATED</span>
            </div>
            <pre>
              <code>{`SELECT u.username,
       COUNT(s.id) AS completed_modules,
       SUM(s.xp_earned) AS total_xp
FROM learners u
JOIN module_submissions s ON s.learner_id = u.id
WHERE s.passed = TRUE
GROUP BY u.username
ORDER BY total_xp DESC;`}</code>
            </pre>
          </div>

          <dl className="auth-track-ledger">
            {curriculumTracks.map((track) => (
              <div key={track.code} className="auth-track-row">
                <dt>
                  <code>{track.code}</code>
                  <strong>{track.title}</strong>
                </dt>
                <dd>{track.meta}</dd>
              </div>
            ))}
          </dl>
        </div>

        <footer className="auth-showcase-footer">
          <span>8 Modul Terstruktur</span>
          <span aria-hidden="true">•</span>
          <span>Evaluasi Sintaks Instan</span>
          <span aria-hidden="true">•</span>
          <span>Progres Tersimpan Lokal</span>
        </footer>
      </aside>

      <main className="auth-main">
        <div className="auth-main-topbar">
          <Link to="/dashboard" className="auth-skip-link">
            Kembali ke Dashboard
          </Link>

          <button
            type="button"
            className="auth-theme-button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"
            }
          >
            {isDark ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
          </button>
        </div>

        <section
          className="auth-card"
          aria-labelledby="auth-heading-title"
        >
          <header className="auth-card-header">
            <h2 id="auth-heading-title">
              {mode === "login"
                ? "Masuk ke Akun Pembelajar"
                : "Registrasi Akun Pembelajar"}
            </h2>
            <p>
              {mode === "login"
                ? "Masukkan email atau username untuk memuat kembali progres modul dan catatan XP."
                : "Lengkapi data profil dasar untuk menyimpan riwayat penyelesaian modul SQL."}
            </p>
          </header>

          <div
            className="auth-tabs"
            role="tablist"
            aria-label="Mode autentikasi"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "login"}
              className={mode === "login" ? "active" : ""}
              onClick={() => handleModeChange("login")}
            >
              Masuk Akun
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "register"}
              className={mode === "register" ? "active" : ""}
              onClick={() => handleModeChange("register")}
            >
              Buat Akun Baru
            </button>
          </div>

          {serverError && (
            <div className="auth-alert error" role="alert" aria-live="polite">
              <AlertTriangle size={16} aria-hidden="true" />
              <span>{serverError}</span>
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleFormSubmit}
            noValidate
          >
            {mode === "register" && (
              <>
                <div className="auth-field">
                  <label htmlFor="auth-name">Nama Lengkap</label>
                  <div className="auth-input-wrap">
                    <User size={16} aria-hidden="true" />
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="Rani Maharani"
                      value={registerForm.name}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={
                        fieldErrors.name ? "error-auth-name" : undefined
                      }
                      onChange={(e) =>
                        updateRegisterField("name", e.target.value)
                      }
                    />
                  </div>
                  {fieldErrors.name && (
                    <small
                      id="error-auth-name"
                      className="auth-field-error"
                      role="alert"
                    >
                      {fieldErrors.name}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="auth-username">Username</label>
                  <div className="auth-input-wrap">
                    <AtSign size={16} aria-hidden="true" />
                    <input
                      id="auth-username"
                      type="text"
                      placeholder="rani_sql"
                      value={registerForm.username}
                      aria-invalid={Boolean(fieldErrors.username)}
                      aria-describedby={
                        fieldErrors.username ? "error-auth-username" : undefined
                      }
                      onChange={(e) =>
                        updateRegisterField("username", e.target.value)
                      }
                    />
                  </div>
                  {fieldErrors.username && (
                    <small
                      id="error-auth-username"
                      className="auth-field-error"
                      role="alert"
                    >
                      {fieldErrors.username}
                    </small>
                  )}
                </div>

                <div className="auth-field">
                  <label htmlFor="auth-email">Alamat Email</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} aria-hidden="true" />
                    <input
                      id="auth-email"
                      type="email"
                      placeholder="rani.maharani@example.com"
                      value={registerForm.email}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? "error-auth-email" : undefined
                      }
                      onChange={(e) =>
                        updateRegisterField("email", e.target.value)
                      }
                    />
                  </div>
                  {fieldErrors.email && (
                    <small
                      id="error-auth-email"
                      className="auth-field-error"
                      role="alert"
                    >
                      {fieldErrors.email}
                    </small>
                  )}
                </div>
              </>
            )}

            {mode === "login" && (
              <div className="auth-field">
                <label htmlFor="auth-identifier">Email atau Username</label>
                <div className="auth-input-wrap">
                  <Mail size={16} aria-hidden="true" />
                  <input
                    id="auth-identifier"
                    type="text"
                    placeholder="rani.maharani@example.com atau rani_sql"
                    value={loginForm.identifier}
                    aria-invalid={Boolean(fieldErrors.identifier)}
                    aria-describedby={
                      fieldErrors.identifier ? "error-auth-identifier" : undefined
                    }
                    onChange={(e) =>
                      updateLoginField("identifier", e.target.value)
                    }
                  />
                </div>
                {fieldErrors.identifier && (
                  <small
                    id="error-auth-identifier"
                    className="auth-field-error"
                    role="alert"
                  >
                    {fieldErrors.identifier}
                  </small>
                )}
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-password">Kata Sandi</label>
              <div className="auth-input-wrap">
                <Lock size={16} aria-hidden="true" />
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    mode === "login"
                      ? "Masukkan kata sandi akun"
                      : "Minimal 8 karakter"
                  }
                  value={
                    mode === "login"
                      ? loginForm.password
                      : registerForm.password
                  }
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={
                    fieldErrors.password ? "error-auth-password" : undefined
                  }
                  onChange={(e) =>
                    mode === "login"
                      ? updateLoginField("password", e.target.value)
                      : updateRegisterField("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="auth-eye-button"
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} aria-hidden="true" />
                  ) : (
                    <Eye size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <small
                  id="error-auth-password"
                  className="auth-field-error"
                  role="alert"
                >
                  {fieldErrors.password}
                </small>
              )}
            </div>

            {mode === "register" && (
              <div className="auth-field">
                <label htmlFor="auth-confirm-password">
                  Konfirmasi Kata Sandi
                </label>
                <div className="auth-input-wrap">
                  <Lock size={16} aria-hidden="true" />
                  <input
                    id="auth-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ketik ulang kata sandi"
                    value={registerForm.confirmPassword}
                    aria-invalid={Boolean(fieldErrors.confirmPassword)}
                    aria-describedby={
                      fieldErrors.confirmPassword
                        ? "error-auth-confirm-password"
                        : undefined
                    }
                    onChange={(e) =>
                      updateRegisterField("confirmPassword", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="auth-eye-button"
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan konfirmasi kata sandi"
                        : "Tampilkan konfirmasi kata sandi"
                    }
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} aria-hidden="true" />
                    ) : (
                      <Eye size={16} aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.confirmPassword && (
                  <small
                    id="error-auth-confirm-password"
                    className="auth-field-error"
                    role="alert"
                  >
                    {fieldErrors.confirmPassword}
                  </small>
                )}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="auth-inline-spinner"
                    aria-hidden="true"
                  />
                  <span>Memverifikasi Kredensial...</span>
                </>
              ) : (
                <span>
                  {mode === "login"
                    ? "Masuk ke Ruang Belajar"
                    : "Simpan & Buat Akun"}
                </span>
              )}
            </button>
          </form>

          <div className="auth-demo-box">
            <span>Isi Cepat Kredensial Pratinjau:</span>
            <div className="auth-demo-buttons">
              <button
                type="button"
                onClick={() => {
                  handleModeChange("login");
                  fillDemoAccount("rani.maharani@example.com");
                }}
              >
                <strong>Rani Maharani</strong>
                <code>Level 4 • 1.420 XP</code>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleModeChange("login");
                  fillDemoAccount("kevin.sanjaya@example.com");
                }}
              >
                <strong>Kevin Sanjaya</strong>
                <code>Level 12 • 4.850 XP</code>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AuthPage;
