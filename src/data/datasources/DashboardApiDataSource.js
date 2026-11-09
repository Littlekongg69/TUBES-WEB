import axios from "axios";

/**
 * Data Source: DashboardApiDataSource
 * Fetches dashboard JSON data via Axios.
 */
export class DashboardApiDataSource {
  async fetchDashboard() {
    const response = await axios.get("/dashboard.json");
    return response.data;
  }
}

