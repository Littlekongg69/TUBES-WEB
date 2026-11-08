/**
 * Domain Use Cases: Dashboard
 */
export class GetDashboardDataUseCase {
  constructor(dashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async execute() {
    return await this.dashboardRepository.getDashboardData();
  }
}
