import { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../di/container";

export function useLearning() {
  const seed = useMemo(
    () => container.getLearningModulesUseCase.execute(),
    []
  );

  const [modules, setModules] = useState(seed.modules);
  const [filters, setFilters] = useState(seed.filters);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchLearning = async () => {
      try {
        const data = await container.getLearningModulesUseCase.executeAsync();
        if (active) {
          setModules(data.modules);
          setFilters(data.filters);
          setError("");
        }
      } catch (err) {
        console.error("Gagal mengambil data modul pembelajaran:", err);
        if (active) {
          setError("Gagal memuat daftar modul pembelajaran. Silakan coba lagi.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchLearning();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const retryFetch = useCallback(() => {
    setLoading(true);
    setError("");
    setReloadKey((prev) => prev + 1);
  }, []);

  const triggerSimulatedLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  const filteredModules = useMemo(
    () =>
      container.filterLearningModulesUseCase.execute(modules, {
        activeFilter,
        search,
      }),
    [modules, activeFilter, search]
  );

  return {
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    filters,
    filteredModules,
    loading,
    error,
    retryFetch,
    triggerSimulatedLoading,
  };
}
