/**
 * Domain Entity: DashboardSummary
 * Encapsulates dashboard metrics and progress calculations.
 */
export class DashboardSummary {
  constructor({
    user,
    learning,
    dailyChallenge,
    weeklyActivity,
    statistics,
    leaderboard,
    quests,
  }) {
    this.user = user;
    this.learning = learning;
    this.dailyChallenge = dailyChallenge;
    this.weeklyActivity = weeklyActivity;
    this.statistics = statistics;
    this.leaderboard = leaderboard;
    this.quests = quests || [];
  }

  get xpPercentage() {
    if (!this.user || !this.user.maxXp) return 0;
    return (this.user.xp / this.user.maxXp) * 100;
  }

  get learningPercentage() {
    if (!this.learning || !this.learning.totalModules) return 0;
    return (this.learning.completedModules / this.learning.totalModules) * 100;
  }

  get remainingXp() {
    if (!this.user) return 0;
    return this.user.maxXp - this.user.xp;
  }

  get dailyChallengePercentage() {
    if (!this.dailyChallenge || !this.dailyChallenge.total) return 0;
    return (this.dailyChallenge.completed / this.dailyChallenge.total) * 100;
  }
}

