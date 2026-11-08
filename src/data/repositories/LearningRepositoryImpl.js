import { ILearningRepository } from "../../core/domain/repositories/interfaces";
import { LearningModule } from "../../core/domain/entities/LearningModule";
import {
  rawLearningModules,
  rawLearningFilters,
  LearningApiDataSource,
} from "../datasources/LearningDataSource";

export class LearningRepositoryImpl extends ILearningRepository {
  constructor(
    apiDataSource = new LearningApiDataSource(),
    seedModules = rawLearningModules,
    seedFilters = rawLearningFilters
  ) {
    super();
    this.apiDataSource = apiDataSource;
    this.modules = seedModules.map((m) => new LearningModule(m));
    this.filters = seedFilters;
  }

  getModules() {
    return this.modules;
  }

  getFilters() {
    return this.filters;
  }

  async fetchLearningData() {
    const rawData = await this.apiDataSource.fetchLearningData();
    const modules = (rawData.modules || rawLearningModules).map(
      (m) => new LearningModule(m)
    );
    const filters = rawData.filters || rawLearningFilters;
    this.modules = modules;
    this.filters = filters;
    return { modules, filters };
  }
}
