import { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../di/container";
import { UserSettings } from "../../core/domain/entities/UserSettings";
import { useTheme } from "./useTheme";

export function useSettings() {
  const initialSettings = useMemo(
    () => container.getInitialSettingsUseCase.execute(),
    []
  );

  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [language, setLanguage] = useState(initialSettings.language);
  const [font, setFont] = useState(initialSettings.font);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifications, setNotifications] = useState(
    initialSettings.notifications
  );
  const [profile, setProfile] = useState(initialSettings.profile);

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [reminderTime, setReminderTime] = useState(
    initialSettings.reminderTime
  );
  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    let active = true;

    const fetchSettings = async () => {
      try {
        const loaded = await container.getInitialSettingsUseCase.executeAsync();
        if (active) {
          setProfile(loaded.profile);
          setLanguage(loaded.language);
          setFont(loaded.font);
          setReminderTime(loaded.reminderTime);
          setNotifications(loaded.notifications);
          setError("");
        }
      } catch (err) {
        console.error("Gagal mengambil pengaturan pengguna:", err);
        if (active) {
          setError("Data pengaturan gagal dimuat. Silakan coba kembali.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSettings();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retryFetch = useCallback(() => {
    setLoading(true);
    setError("");
    setReloadKey((prev) => prev + 1);
  }, []);

  const updateProfile = (field, value) => {
    setProfile((prev) => {
      const next = { ...prev, [field]: value };
      const validation = container.validateProfileUseCase.execute(next);
      setProfileErrors((prevErr) => ({
        ...prevErr,
        [field]: validation.errors[field] || "",
      }));
      return next;
    });
    setFeedback({ type: "", message: "" });
    setSaved(false);
  };

  const handleAvatarUpload = (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFeedback({
        type: "error",
        message: "Format foto tidak didukung. Gunakan file JPG, PNG, GIF, atau WebP.",
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({
        type: "error",
        message: "Ukuran foto melebihi batas 2MB. Pilih file yang lebih kecil.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      setProfile((prev) => ({ ...prev, avatarUrl: dataUrl }));
      setSaved(false);
      setFeedback({
        type: "success",
        message: "Foto profil siap digunakan. Klik Simpan Profil untuk menerapkan.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarRemove = () => {
    setProfile((prev) => ({ ...prev, avatarUrl: "" }));
    setSaved(false);
    setFeedback({
      type: "success",
      message: "Foto kustom dihapus dan dikembalikan ke inisial akun.",
    });
  };

  const updateNotification = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setFeedback({ type: "", message: "" });
    setSaved(false);
  };

  const updatePassword = (field, value) => {
    setPasswords((prev) => {
      const next = { ...prev, [field]: value };
      setPasswordErrors((prevErr) => ({ ...prevErr, [field]: "" }));
      return next;
    });
    setFeedback({ type: "", message: "" });
    setSaved(false);
  };

  const selectTab = (tab) => {
    setActiveTab(tab);

    document.getElementById(`settings-${tab}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSave = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    const validation = container.validateProfileUseCase.execute(profile);
    setProfileErrors(validation.errors);

    if (!validation.isValid) {
      setFeedback({
        type: "error",
        message: validation.message,
      });
      return;
    }

    container.saveSettingsUseCase.execute({
      profile,
      theme,
      language,
      font,
      reminderTime,
      notifications,
    });
    setSaved(true);
    setFeedback({
      type: "success",
      message: validation.message,
    });
  };

  const handleReset = () => {
    const defaults = container.getInitialSettingsUseCase.execute();
    setProfile(defaults.profile);
    setPasswords({
      old: "",
      new: "",
      confirm: "",
    });
    setReminderTime(defaults.reminderTime);
    setTheme(defaults.theme);
    setLanguage(defaults.language);
    setFont(defaults.font);
    setNotifications(defaults.notifications);
    setProfileErrors({});
    setPasswordErrors({});
    setFeedback({ type: "", message: "" });
    setSaved(true);
  };

  const handlePasswordSubmit = (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    const validation = container.validatePasswordChangeUseCase.execute(
      passwords
    );
    setPasswordErrors(validation.errors);

    if (!validation.isValid) {
      setFeedback({
        type: "error",
        message: validation.message,
      });
      return;
    }

    setPasswords({ old: "", new: "", confirm: "" });
    setPasswordErrors({});
    setSaved(true);
    setFeedback({
      type: "success",
      message: validation.message,
    });
  };

  const handleDeleteAccount = () => {
    try {
      window.localStorage.removeItem("sql_quest_settings");
    } catch {
      // Ignore storage access errors in restricted environments
    }
  };

  const passwordStrength = useMemo(
    () => UserSettings.evaluatePasswordStrength(passwords.new),
    [passwords.new]
  );

  return {
    activeTab,
    theme,
    setTheme,
    language,
    setLanguage,
    font,
    setFont,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    notifications,
    profile,
    passwords,
    reminderTime,
    setReminderTime,
    saved,
    setSaved,
    loading,
    error,
    retryFetch,
    profileErrors,
    passwordErrors,
    feedback,
    setFeedback,
    passwordStrength,
    updateProfile,
    handleAvatarUpload,
    handleAvatarRemove,
    updateNotification,
    updatePassword,
    selectTab,
    handleSave,
    handleReset,
    handlePasswordSubmit,
    handleDeleteAccount,
  };
}
