import { ISettingsRepository } from "../../core/domain/repositories/interfaces";
import { UserSettings } from "../../core/domain/entities/UserSettings";
import {
  rawInitialSettings,
  SettingsApiDataSource,
} from "../datasources/SettingsDataSource";

const STORAGE_KEY = "sqlquest_user_settings_v1";

export class SettingsRepositoryImpl extends ISettingsRepository {
  constructor(
    apiDataSource = new SettingsApiDataSource(),
    seedSettings = rawInitialSettings
  ) {
    super();
    this.apiDataSource = apiDataSource;
    this.seedSettings = seedSettings;
    this.currentSettings = this.loadFromStorage() || new UserSettings(seedSettings);
  }

  loadFromStorage() {
    try {
      const savedRaw = window.localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        return new UserSettings(JSON.parse(savedRaw));
      }
    } catch {
      // Fallback to seed settings if localStorage is unavailable
    }
    return null;
  }

  getInitialSettings() {
    return new UserSettings(this.seedSettings);
  }

  async fetchSettings() {
    const stored = this.loadFromStorage();
    if (stored) {
      this.currentSettings = stored;
      return stored;
    }
    const remoteSettings = await this.apiDataSource.fetchSettingsData();
    this.seedSettings = remoteSettings || rawInitialSettings;
    this.currentSettings = new UserSettings(this.seedSettings);
    return this.currentSettings;
  }

  saveSettings(settings) {
    this.currentSettings = new UserSettings(settings);
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(this.currentSettings)
      );
    } catch {
      // Ignore storage quota errors
    }
    return this.currentSettings;
  }
}
