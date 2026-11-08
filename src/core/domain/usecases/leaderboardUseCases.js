/**
 * Domain Use Cases: Leaderboard Ranking, Podium & Pagination
 */
export class GetLeaderboardDataUseCase {
  constructor(leaderboardRepository) {
    this.leaderboardRepository = leaderboardRepository;
  }

  execute() {
    const users = this.leaderboardRepository.getUsers();
    const currentUser = this.leaderboardRepository.getCurrentUser();
    const podiumUsers = [users[1], users[0], users[2]].filter(Boolean);

    return {
      users,
      podiumUsers,
      currentUser,
    };
  }

  async executeAsync() {
    const { users, currentUser } =
      await this.leaderboardRepository.fetchLeaderboardData();
    const podiumUsers = [users[1], users[0], users[2]].filter(Boolean);

    return {
      users,
      podiumUsers,
      currentUser,
    };
  }
}

export class FilterAndPaginateLeaderboardUseCase {
  execute(users, { search = "", page = 1, pageSize = 7 }) {
    const trimmedSearch = search.trim();
    const tablePool = trimmedSearch ? users || [] : (users || []).slice(3);
    const filteredUsers = tablePool.filter((user) =>
      typeof user.matchesSearch === "function"
        ? user.matchesSearch(trimmedSearch)
        : `${user.name} ${user.username}`
            .toLowerCase()
            .includes(trimmedSearch.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    const visibleUsers = filteredUsers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return {
      filteredUsers,
      visibleUsers,
      totalPages,
      pageSize,
    };
  }
}
