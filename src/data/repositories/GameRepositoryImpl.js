import { IGameRepository } from "../../core/domain/repositories/interfaces";
import { GameMission } from "../../core/domain/entities/GameMission";
import {
  rawGameMissions,
  GameApiDataSource,
} from "../datasources/GameDataSource";

export class GameRepositoryImpl extends IGameRepository {
  constructor(
    apiDataSource = new GameApiDataSource(),
    seedMissions = rawGameMissions
  ) {
    super();
    this.apiDataSource = apiDataSource;
    this.missions = seedMissions.map((mission) => new GameMission(mission));
  }

  getMissions() {
    return this.missions;
  }

  async fetchGameData() {
    const rawData = await this.apiDataSource.fetchGameData();
    const missions = (rawData.missions || rawGameMissions).map(
      (mission) => new GameMission(mission)
    );
    this.missions = missions;
    return { missions };
  }
}

