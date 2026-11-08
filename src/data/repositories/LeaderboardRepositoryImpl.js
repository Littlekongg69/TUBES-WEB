import { ILeaderboardRepository } from "../../core/domain/repositories/interfaces";
import {
  LeaderboardUser,
  CurrentUserStanding,
} from "../../core/domain/entities/LeaderboardUser";
import {
  rawLeaderboardUsers,
  rawCurrentUserStanding,
  LeaderboardApiDataSource,
} from "../datasources/LeaderboardDataSource";

export class LeaderboardRepositoryImpl extends ILeaderboardRepository {
  constructor(
    apiDataSource = new LeaderboardApiDataSource(),
    seedUsers = rawLeaderboardUsers,
    seedCurrentUser = rawCurrentUserStanding
  ) {
    super();
    this.apiDataSource = apiDataSource;
    this.users = seedUsers.map((u) => new LeaderboardUser(u));
    this.currentUser = new CurrentUserStanding(seedCurrentUser);
  }

  getUsers() {
    return this.users;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async fetchLeaderboardData() {
    const rawData = await this.apiDataSource.fetchLeaderboardData();
    const users = (rawData.users || rawLeaderboardUsers).map(
      (u) => new LeaderboardUser(u)
    );
    const currentUser = new CurrentUserStanding(
      rawData.currentUser || rawCurrentUserStanding
    );
    this.users = users;
    this.currentUser = currentUser;
    return { users, currentUser };
  }
}
