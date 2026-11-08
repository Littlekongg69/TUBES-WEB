/**
 * Domain Entity: LeaderboardUser & CurrentUserStanding
 * Encapsulates leaderboard ranking rules, podium classification, and search matching.
 */
export class LeaderboardUser {
  constructor({
    id,
    name,
    username,
    level,
    title,
    modules,
    challenges,
    streak,
    xp,
    avatar,
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.level = level;
    this.title = title;
    this.modules = modules;
    this.challenges = challenges;
    this.streak = streak;
    this.xp = xp;
    this.avatar = avatar;
  }

  get podiumRankClass() {
    if (this.id === 1) return "gold";
    if (this.id === 2) return "silver";
    return "bronze";
  }

  matchesSearch(keyword) {
    if (!keyword) return true;
    return `${this.name} ${this.username}`
      .toLowerCase()
      .includes(keyword.toLowerCase());
  }
}

export class CurrentUserStanding {
  constructor({
    name,
    username,
    level,
    title,
    xp,
    position,
    nextPosition,
  }) {
    this.name = name;
    this.username = username;
    this.level = level;
    this.title = title;
    this.xp = xp;
    this.position = position;
    this.nextPosition = nextPosition;
  }

  get xpRemainingToNextTier() {
    return this.nextPosition - this.xp;
  }
}

