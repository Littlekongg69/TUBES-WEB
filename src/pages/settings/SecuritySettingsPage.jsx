import { Check, Eye, EyeOff, Lock } from "lucide-react";
import { useOutletContext } from "react-router-dom";

function SecuritySettingsPage() {
  const {
    passwords,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordErrors,
    passwordStrength,
    updatePassword,
    handlePasswordSubmit,
  } = useOutletContext();

  const score = passwordStrength.score || 0;
  const strengthTone =
    score >= 3
      ? "strong"
      : score === 2
        ? "medium"
        : score === 1
          ? "weak"
          : "empty";

  const hasMinLength = passwords.new.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwords.new);
  const hasDigit = /[0-9]/.test(passwords.new);
  const isConfirmed =
    passwords.new.length > 0 && passwords.new === passwords.confirm;

  const requirements = [
    { id: "len", label: "Minimal 8 karakter", met: hasMinLength },
    { id: "upper", label: "Mengandung huruf kapital (A-Z)", met: hasUppercase },
    { id: "digit", label: "Mengandung angka (0-9)", met: hasDigit },
    { id: "match", label: "Konfirmasi sandi cocok", met: isConfirmed },
  ];

  return (
    <div className="settings-single-page">
      <section
        className="settings-card"
        id="settings-security"
        aria-labelledby="heading-security"
      >
        <header className="settings-section-header">
          <div className="settings-section-title-group">
            <div className="settings-section-icon" aria-hidden="true">
              <Lock size={18} />
            </div>
            <div>
              <h2 id="heading-security">Keamanan & Kata Sandi</h2>
              <p>
                Gunakan kombinasi minimal 8 karakter dengan huruf besar dan
                angka untuk mengamankan akses akun SQL Quest.
              </p>
            </div>
          </div>
        </header>

        <form
          className="settings-password-fields"
          onSubmit={handlePasswordSubmit}
          noValidate
        >
          <div className="settings-field">
            <label htmlFor="password-old">Kata Sandi Saat Ini</label>
            <div className="settings-password-input">
              <input
                id="password-old"
                type={showOldPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi saat ini"
                value={passwords.old}
                aria-invalid={Boolean(passwordErrors.old)}
                aria-describedby={
                  passwordErrors.old ? "error-password-old" : undefined
                }
                onChange={(e) => updatePassword("old", e.target.value)}
              />
              <button
                type="button"
                aria-label={
                  showOldPassword
                    ? "Sembunyikan kata sandi saat ini"
                    : "Tampilkan kata sandi saat ini"
                }
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <EyeOff size={17} aria-hidden="true" />
                ) : (
                  <Eye size={17} aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordErrors.old && (
              <small
                id="error-password-old"
                className="settings-field-error"
                role="alert"
              >
                {passwordErrors.old}
              </small>
            )}
          </div>

          <div className="settings-field">
            <label htmlFor="password-new">Kata Sandi Baru</label>
            <div className="settings-password-input">
              <input
                id="password-new"
                type={showNewPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter, kombinasi huruf besar & angka"
                value={passwords.new}
                aria-invalid={Boolean(passwordErrors.new)}
                aria-describedby={
                  passwordErrors.new
                    ? "error-password-new"
                    : "password-strength-status"
                }
                onChange={(e) => updatePassword("new", e.target.value)}
              />
              <button
                type="button"
                aria-label={
                  showNewPassword
                    ? "Sembunyikan kata sandi baru"
                    : "Tampilkan kata sandi baru"
                }
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff size={17} aria-hidden="true" />
                ) : (
                  <Eye size={17} aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordErrors.new && (
              <small
                id="error-password-new"
                className="settings-field-error"
                role="alert"
              >
                {passwordErrors.new}
              </small>
            )}
          </div>

          <div
            id="password-strength-status"
            className={`settings-password-strength ${strengthTone}`}
            aria-live="polite"
          >
            <span className={score >= 1 ? "filled" : ""} />
            <span className={score >= 2 ? "filled" : ""} />
            <span className={score >= 3 ? "filled" : ""} />
            <strong>Kekuatan: {passwordStrength.label}</strong>
          </div>

          <div className="settings-field">
            <label htmlFor="password-confirm">
              Konfirmasi Kata Sandi Baru
            </label>
            <div className="settings-password-input">
              <input
                id="password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Ketik ulang kata sandi baru"
                value={passwords.confirm}
                aria-invalid={Boolean(passwordErrors.confirm)}
                aria-describedby={
                  passwordErrors.confirm ? "error-password-confirm" : undefined
                }
                onChange={(e) => updatePassword("confirm", e.target.value)}
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Sembunyikan konfirmasi kata sandi"
                    : "Tampilkan konfirmasi kata sandi"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={17} aria-hidden="true" />
                ) : (
                  <Eye size={17} aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordErrors.confirm && (
              <small
                id="error-password-confirm"
                className="settings-field-error"
                role="alert"
              >
                {passwordErrors.confirm}
              </small>
            )}
          </div>

          <div
            className="settings-password-checklist"
            aria-label="Syarat keamanan kata sandi"
          >
            {requirements.map((req) => (
              <div
                key={req.id}
                className={`settings-req-item ${req.met ? "met" : ""}`}
              >
                <span className="settings-req-dot" aria-hidden="true">
                  {req.met ? <Check size={12} /> : null}
                </span>
                <span>{req.label}</span>
              </div>
            ))}
          </div>

          <div className="settings-password-footer">
            <span>
              Perubahan kata sandi langsung berlaku untuk sesi berikutnya.
            </span>
            <button type="submit" className="settings-primary-button">
              Perbarui Kata Sandi
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SecuritySettingsPage;
