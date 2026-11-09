import { AuthLocalDataSource } from "../data/datasources/AuthDataSource";
import { DashboardApiDataSource } from "../data/datasources/DashboardApiDataSource";
import { LearningApiDataSource } from "../data/datasources/LearningDataSource";
import { GameApiDataSource } from "../data/datasources/GameDataSource";
import { LeaderboardApiDataSource } from "../data/datasources/LeaderboardDataSource";
import { SettingsApiDataSource } from "../data/datasources/SettingsDataSource";

import { AuthRepositoryImpl } from "../data/repositories/AuthRepositoryImpl";
import { DashboardRepositoryImpl } from "../data/repositories/DashboardRepositoryImpl";
import { LearningRepositoryImpl } from "../data/repositories/LearningRepositoryImpl";
import { GameRepositoryImpl } from "../data/repositories/GameRepositoryImpl";
import { LeaderboardRepositoryImpl } from "../data/repositories/LeaderboardRepositoryImpl";
import { SettingsRepositoryImpl } from "../data/repositories/SettingsRepositoryImpl";

import { GetDashboardDataUseCase } from "../core/domain/usecases/dashboardUseCases";
import {
  GetLearningModulesUseCase,
  FilterLearningModulesUseCase,
} from "../core/domain/usecases/learningUseCases";
import {
  GetGameMissionsUseCase,
  EvaluateGameQueryUseCase,
} from "../core/domain/usecases/gameUseCases";
import {
  GetLeaderboardDataUseCase,
  FilterAndPaginateLeaderboardUseCase,
} from "../core/domain/usecases/leaderboardUseCases";
import {
  GetInitialSettingsUseCase,
  SaveSettingsUseCase,
  ValidateProfileUseCase,
  ValidatePasswordChangeUseCase,
} from "../core/domain/usecases/settingsUseCases";
import {
  LoginUseCase,
  RegisterUseCase,
} from "../core/domain/usecases/authUseCases";

/**
 * Dependency Injection Container (Composition Root)
 * Wires Data Sources -> Repositories -> Domain Use Cases.
 */
class DIContainer {
  constructor() {
    this.authLocalDataSource = new AuthLocalDataSource();
    this.dashboardApiDataSource = new DashboardApiDataSource();
    this.learningApiDataSource = new LearningApiDataSource();
    this.gameApiDataSource = new GameApiDataSource();
    this.leaderboardApiDataSource = new LeaderboardApiDataSource();
    this.settingsApiDataSource = new SettingsApiDataSource();

    this.authRepository = new AuthRepositoryImpl(this.authLocalDataSource);
    this.dashboardRepository = new DashboardRepositoryImpl(
      this.dashboardApiDataSource
    );
    this.learningRepository = new LearningRepositoryImpl(
      this.learningApiDataSource
    );
    this.gameRepository = new GameRepositoryImpl(this.gameApiDataSource);
    this.leaderboardRepository = new LeaderboardRepositoryImpl(
      this.leaderboardApiDataSource
    );
    this.settingsRepository = new SettingsRepositoryImpl(
      this.settingsApiDataSource
    );

    this.loginUseCase = new LoginUseCase();
    this.registerUseCase = new RegisterUseCase();

    this.getDashboardDataUseCase = new GetDashboardDataUseCase(
      this.dashboardRepository
    );
    this.getLearningModulesUseCase = new GetLearningModulesUseCase(
      this.learningRepository
    );
    this.filterLearningModulesUseCase = new FilterLearningModulesUseCase();

    this.getGameMissionsUseCase = new GetGameMissionsUseCase(
      this.gameRepository
    );
    this.evaluateGameQueryUseCase = new EvaluateGameQueryUseCase();

    this.getLeaderboardDataUseCase = new GetLeaderboardDataUseCase(
      this.leaderboardRepository
    );
    this.filterAndPaginateLeaderboardUseCase =
      new FilterAndPaginateLeaderboardUseCase();

    this.getInitialSettingsUseCase = new GetInitialSettingsUseCase(
      this.settingsRepository
    );
    this.saveSettingsUseCase = new SaveSettingsUseCase(this.settingsRepository);
    this.validateProfileUseCase = new ValidateProfileUseCase();
    this.validatePasswordChangeUseCase = new ValidatePasswordChangeUseCase();
  }
}

export const container = new DIContainer();
