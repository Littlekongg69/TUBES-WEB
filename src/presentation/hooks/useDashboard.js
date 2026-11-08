import { useCallback, useEffect, useState } from "react";
import { container } from "../../di/container";

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchDashboard = async () => {
      try {
        const data = await container.getDashboardDataUseCase.execute();
        if (active) {
          setDashboardData(data);
          setError("");
        }
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
        if (active) {
          setError("Data dashboard gagal dimuat. Silakan coba kembali.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retryFetch = useCallback(() => {
    setLoading(true);
    setError("");
    setReloadKey((prev) => prev + 1);
  }, []);

  return {
    dashboardData,
    loading,
    error,
    retryFetch,
  };
}
