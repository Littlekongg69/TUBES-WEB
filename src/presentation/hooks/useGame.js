import { useCallback, useEffect, useMemo, useState } from "react";
import { container } from "../../di/container";

export function useGame() {
  const seed = useMemo(() => container.getGameMissionsUseCase.execute(), []);

  const [missions, setMissions] = useState(seed.missions);
  const [activeIndex, setActiveIndex] = useState(0);
  const [userBlocks, setUserBlocks] = useState([]);
  const [lives, setLives] = useState(3);
  const [earnedXp, setEarnedXp] = useState(0);
  const [completedIds, setCompletedIds] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const fetchMissions = async () => {
      try {
        const data = await container.getGameMissionsUseCase.executeAsync();
        if (active) {
          setMissions(data.missions);
          setError("");
        }
      } catch (err) {
        console.error("Gagal memuat data misi game SQL:", err);
        if (active) {
          setError("Data misi permainan SQL gagal dimuat. Silakan coba lagi.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchMissions();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const activeMission = missions[activeIndex] || missions[0];

  const assembledBlocks = useMemo(
    () => [...(activeMission?.initialBlocks || []), ...userBlocks],
    [activeMission, userBlocks]
  );

  const selectMission = useCallback((index) => {
    setActiveIndex(index);
    setUserBlocks([]);
    setFeedback(null);
  }, []);

  const appendBlock = useCallback(
    (blockLabel) => {
      if (!activeMission) return;
      const maxCustom = activeMission.missingSlotCount;
      if (userBlocks.length >= maxCustom) return;
      setUserBlocks((prev) => [...prev, blockLabel]);
      setFeedback(null);
    },
    [activeMission, userBlocks.length]
  );

  const removeCustomBlockAt = useCallback((customIdx) => {
    setUserBlocks((prev) => prev.filter((_, idx) => idx !== customIdx));
    setFeedback(null);
  }, []);

  const clearBlocks = useCallback(() => {
    setUserBlocks([]);
    setFeedback(null);
  }, []);

  const evaluateQuery = useCallback(() => {
    if (!activeMission) return;
    const result = container.evaluateGameQueryUseCase.execute(
      activeMission,
      assembledBlocks
    );
    setFeedback(result);

    if (result.isCorrect) {
      if (!completedIds.includes(activeMission.id)) {
        setCompletedIds((prev) => [...prev, activeMission.id]);
        setEarnedXp((prev) => prev + activeMission.xpReward);
      }
    } else {
      setLives((prev) => (prev > 1 ? prev - 1 : 3));
    }
  }, [activeMission, assembledBlocks, completedIds]);

  const nextMission = useCallback(() => {
    const nextIdx = (activeIndex + 1) % missions.length;
    selectMission(nextIdx);
  }, [activeIndex, missions.length, selectMission]);

  const retryFetch = useCallback(() => {
    setLoading(true);
    setError("");
    setReloadKey((prev) => prev + 1);
  }, []);

  return {
    missions,
    activeIndex,
    activeMission,
    assembledBlocks,
    userBlocks,
    lives,
    earnedXp,
    completedIds,
    feedback,
    soundEnabled,
    setSoundEnabled,
    selectMission,
    appendBlock,
    removeCustomBlockAt,
    clearBlocks,
    evaluateQuery,
    nextMission,
    loading,
    error,
    retryFetch,
  };
}

