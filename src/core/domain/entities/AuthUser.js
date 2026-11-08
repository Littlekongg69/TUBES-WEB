/**
 * Domain Entity: AuthUser
 * Represents an authenticated SQL Quest user and provides client-side auth form validation.
 */
export class AuthUser {
  constructor({
    id,
    name,
    username,
    email,
    level = 1,
    role = "SQL Novice",
    xp = 0,
    streak = 1,
    token = "",
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.level = level;
    this.role = role;
    this.xp = xp;
    this.streak = streak;
    this.token = token || `sq_token_${id}_${Date.now()}`;
  }

  get initials() {
    return (this.name || "U")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  static validateLogin({ identifier = "", password = "" } = {}) {
    const errors = {};
    const cleanId = identifier.trim();

    if (!cleanId) {
      errors.identifier = "Email atau username wajib diisi.";
    } else if (cleanId.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanId)) {
      errors.identifier = "Format email tidak valid.";
    } else if (cleanId.length < 3) {
      errors.identifier = "Masukkan minimal 3 karakter.";
    }

    if (!password) {
      errors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 6) {
      errors.password = "Kata sandi minimal 6 karakter.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static validateRegister({
    name = "",
    username = "",
    email = "",
    password = "",
    confirmPassword = "",
  } = {}) {
    const errors = {};
    const cleanName = name.trim();
    const cleanUser = username.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      errors.name = "Nama lengkap wajib diisi.";
    } else if (cleanName.length < 3) {
      errors.name = "Nama lengkap minimal 3 karakter.";
    }

    if (!cleanUser) {
      errors.username = "Username wajib diisi.";
    } else if (!/^[a-zA-Z0-9_]{3,24}$/.test(cleanUser)) {
      errors.username =
        "Username hanya boleh berisi huruf, angka, atau garis bawah (3 sampai 24 karakter).";
    }

    if (!cleanEmail) {
      errors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errors.email = "Format email tidak valid.";
    }

    if (!password) {
      errors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 8) {
      errors.password = "Kata sandi minimal 8 karakter.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Konfirmasi kata sandi wajib diisi.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Konfirmasi kata sandi tidak cocok.";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

