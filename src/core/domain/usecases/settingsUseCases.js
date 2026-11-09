/**
 * Domain Use Cases: User Settings & Security
 */
import { UserSettings } from "../entities/UserSettings";

export class GetInitialSettingsUseCase {
  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  execute() {
    return this.settingsRepository.getInitialSettings();
  }

  async executeAsync() {
    return await this.settingsRepository.fetchSettings();
  }
}

export class SaveSettingsUseCase {
  constructor(settingsRepository) {
    this.settingsRepository = settingsRepository;
  }

  execute(settings) {
    return this.settingsRepository.saveSettings(settings);
  }
}

export class ValidateProfileUseCase {
  execute(profile) {
    return UserSettings.validateProfile(profile);
  }
}

export class ValidatePasswordChangeUseCase {
  execute(oldOrPasswords, confirmPassword) {
    return UserSettings.validatePasswords(oldOrPasswords, confirmPassword);
  }
}
