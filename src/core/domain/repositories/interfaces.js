/**
 * Domain Layer: Abstract Repository Interfaces
 */

export class IAuthRepository {
  getDemoAccounts() {
    throw new Error("IAuthRepository.getDemoAccounts() is not implemented");
  }
  saveSession() {
    throw new Error("IAuthRepository.saveSession() is not implemented");
  }
}

export class IDashboardRepository {
  async getDashboardData() {
    throw new Error("IDashboardRepository.getDashboardData() is not implemented");
  }
}

export class ILearningRepository {
  getModules() {
    throw new Error("ILearningRepository.getModules() is not implemented");
  }
  getFilters() {
    throw new Error("ILearningRepository.getFilters() is not implemented");
  }
}

export class IGameRepository {
  getMissions() {
    throw new Error("IGameRepository.getMissions() is not implemented");
  }
  async fetchGameData() {
    throw new Error("IGameRepository.fetchGameData() is not implemented");
  }
}

export class ILeaderboardRepository {
  getUsers() {
    throw new Error("ILeaderboardRepository.getUsers() is not implemented");
  }
  getCurrentUser() {
    throw new Error("ILeaderboardRepository.getCurrentUser() is not implemented");
  }
}

export class ISettingsRepository {
  getInitialSettings() {
    throw new Error("ISettingsRepository.getInitialSettings() is not implemented");
  }
  saveSettings() {
    throw new Error("ISettingsRepository.saveSettings() is not implemented");
  }
}
