/**
 * Domain Entity: UserSettings
 * Encapsulates user profile, appearance, notification preferences, and client-side form validation.
 */
export class UserSettings {
  constructor({
    profile,
    theme = "dark",
    language = "Indonesia",
    font = "JetBrains Mono",
    reminderTime = "19:00",
    notifications,
  }) {
    this.profile = { ...profile };
    this.theme = theme;
    this.language = language;
    this.font = font;
    this.reminderTime = reminderTime;
    this.notifications = { ...notifications };
  }

  static validateProfile(profile = {}) {
    const errors = {};
    const name = (profile.name || "").trim();
    const username = (profile.username || "").trim();
    const email = (profile.email || "").trim();
    const bio = profile.bio || "";

    if (!name) {
      errors.name = "Nama lengkap wajib diisi.";
    } else if (name.length < 3) {
      errors.name = "Nama lengkap minimal 3 karakter.";
    }

    if (!username) {
      errors.username = "Username wajib diisi.";
    } else if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      errors.username =
        "Username hanya boleh berisi huruf, angka, dan garis bawah (3 sampai 30 karakter).";
    }

    if (!email) {
      errors.email = "Email akun wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Format email tidak valid.";
    }

    if (bio.length > 160) {
      errors.bio = "Bio singkat maksimal 160 karakter.";
    }

    const isValid = Object.keys(errors).length === 0;
    return {
      isValid,
      errors,
      message: isValid
        ? "Perubahan profil dan preferensi berhasil disimpan."
        : "Mohon perbaiki kolom formulir yang belum valid.",
    };
  }

  static validatePasswords(oldOrPasswords, confirmArg) {
    // Support both (passwordsObject) and (newPassword, confirmPassword) signatures
    const passwords =
      typeof oldOrPasswords === "object" && oldOrPasswords !== null
        ? oldOrPasswords
        : { old: "filled", new: oldOrPasswords, confirm: confirmArg };

    const errors = {};
    const oldPass = passwords.old || "";
    const newPass = passwords.new || "";
    const confirmPass = passwords.confirm || "";

    if (!oldPass.trim()) {
      errors.old = "Kata sandi lama wajib diisi.";
    }

    if (!newPass) {
      errors.new = "Kata sandi baru wajib diisi.";
    } else if (newPass.length < 8) {
      errors.new = "Kata sandi baru minimal 8 karakter.";
    }

    if (!confirmPass) {
      errors.confirm = "Konfirmasi kata sandi wajib diisi.";
    } else if (newPass !== confirmPass) {
      errors.confirm = "Pastikan kata sandi baru dan konfirmasi sama.";
    }

    const isValid = Object.keys(errors).length === 0;
    return {
      isValid,
      errors,
      message: isValid
        ? "Validasi kata sandi berhasil. Kata sandi telah diperbarui."
        : Object.values(errors)[0] ||
          "Pastikan kata sandi baru dan konfirmasi sama.",
    };
  }

  static evaluatePasswordStrength(password = "") {
    if (!password) {
      return { score: 0, label: "Belum diisi" };
    }
    let score = 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;

    const labels = ["Belum diisi", "Lemah", "Sedang", "Kuat"];
    return {
      score,
      label: password.length >= 8 ? labels[score] || "Kuat" : "Belum kuat",
    };
  }
}
