import { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../di/container";
import {
  LeaderboardUser,
  CurrentUserStanding,
} from "../../core/domain/entities/LeaderboardUser";

const PERIOD_FACTORS = {
  Global: 1,
  Mingguan: 0.18,
  Bulanan: 0.45,
};

export function useLeaderboard() {
  const seed = useMemo(
    () => container.getLeaderboardDataUseCase.execute(),
    []
  );

  const [users, setUsers] = useState(seed.users);
  const [podiumUsers, setPodiumUsers] = useState(seed.podiumUsers);
  const [currentUser, setCurrentUser] = useState(seed.currentUser);
  const [period, setPeriod] = useState("Global");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchLeaderboard = async () => {
      try {
        const data = await container.getLeaderboardDataUseCase.executeAsync();
        if (active) {
          setUsers(data.users);
          setPodiumUsers(data.podiumUsers);
          setCurrentUser(data.currentUser);
          setError("");
        }
      } catch (err) {
        console.error("Gagal mengambil data peringkat:", err);
        if (active) {
          setError("Data papan peringkat gagal dimuat. Silakan coba lagi.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();

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

  const factor = PERIOD_FACTORS[period] || 1;

  const adjustedPodiumUsers = useMemo(
    () =>
      podiumUsers.map(
        (u) =>
          new LeaderboardUser({
            ...u,
            xp: Math.round(u.xp * factor),
          })
      ),
    [podiumUsers, factor]
  );

  const adjustedUsers = useMemo(
    () =>
      users.map(
        (u) =>
          new LeaderboardUser({
            ...u,
            xp: Math.round(u.xp * factor),
          })
      ),
    [users, factor]
  );

  const adjustedCurrentUser = useMemo(
    () =>
      new CurrentUserStanding({
        ...currentUser,
        xp: Math.round(currentUser.xp * factor),
        nextPosition: Math.round(currentUser.nextPosition * factor),
      }),
    [currentUser, factor]
  );

  const { filteredUsers, visibleUsers, totalPages, pageSize } = useMemo(
    () =>
      container.filterAndPaginateLeaderboardUseCase.execute(adjustedUsers, {
        search,
        page,
        pageSize: 7,
      }),
    [adjustedUsers, search, page]
  );

  const podiumRankClass = (id) => {
    if (id === 1) return "gold";
    if (id === 2) return "silver";
    return "bronze";
  };

  return {
    period,
    setPeriod,
    search,
    setSearch,
    page,
    setPage,
    users: adjustedUsers,
    podiumUsers: adjustedPodiumUsers,
    currentUser: adjustedCurrentUser,
    filteredUsers,
    visibleUsers,
    pageSize,
    totalPages,
    podiumRankClass,
    loading,
    error,
    retryFetch,
    triggerSimulatedLoading,
  };
}
