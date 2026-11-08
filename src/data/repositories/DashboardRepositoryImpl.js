import { IDashboardRepository } from "../../core/domain/repositories/interfaces";
import { DashboardSummary } from "../../core/domain/entities/Dashboard";
import { DashboardApiDataSource } from "../datasources/DashboardApiDataSource";

export class DashboardRepositoryImpl extends IDashboardRepository {
  constructor(apiDataSource = new DashboardApiDataSource()) {
    super();
    this.apiDataSource = apiDataSource;
  }

  async getDashboardData() {
    const rawData = await this.apiDataSource.fetchDashboard();
    return new DashboardSummary(rawData);
  }
}

