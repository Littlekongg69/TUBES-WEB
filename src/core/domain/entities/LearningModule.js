/**
 * Domain Entity: LearningModule
 * Encapsulates SQL learning module metadata and filter/search matching rules.
 */
export class LearningModule {
  constructor({
    id,
    title,
    description,
    duration,
    lessons,
    xp,
    progress,
    status,
    isCapstone = false,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.lessons = lessons;
    this.xp = xp;
    this.progress = progress;
    this.status = status; // 'completed' | 'in-progress' | 'locked'
    this.isCapstone = isCapstone;
  }

  get labelText() {
    return this.isCapstone
      ? "CAPSTONE QUEST"
      : `MODUL ${String(this.id).padStart(2, "0")}`;
  }

  matchesSearch(keyword) {
    if (!keyword) return true;
    return `${this.title} ${this.description || ""}`
      .toLowerCase()
      .includes(keyword.toLowerCase());
  }

  matchesFilter(activeFilter) {
    if (!activeFilter || activeFilter === "Semua") return true;
    if (activeFilter === "Sedang Berjalan") return this.status === "in-progress";
    if (activeFilter === "Selesai") return this.status === "completed";
    return true;
  }
}

