/**
 * Domain Entity: GameMission
 * Encapsulates SQL Cooking Quest mission metadata, schema preview, and block validation.
 */
export class GameMission {
  constructor({
    id,
    code,
    category = "logika",
    sceneKey = "kurir-galon",
    featured = false,
    difficulty = "Mudah",
    snippet = "SELECT * FROM tabel",
    snippetPos = "bottom-right",
    tags = [],
    moduleLabel,
    title,
    cardSummary,
    story,
    objective,
    tableName,
    columns = [],
    rows = [],
    initialBlocks = [],
    solutionBlocks = [],
    availableBlocks = [],
    xpReward = 100,
  }) {
    this.id = id;
    this.code = code;
    this.category = category;
    this.sceneKey = sceneKey;
    this.featured = Boolean(featured);
    this.difficulty = difficulty;
    this.snippet = snippet;
    this.snippetPos = snippetPos;
    this.tags = tags;
    this.moduleLabel = moduleLabel;
    this.title = title;
    this.cardSummary = cardSummary || story;
    this.story = story;
    this.objective = objective;
    this.tableName = tableName;
    this.columns = columns;
    this.rows = rows;
    this.initialBlocks = initialBlocks;
    this.solutionBlocks = solutionBlocks;
    this.availableBlocks = availableBlocks;
    this.xpReward = xpReward;
  }

  get missingSlotCount() {
    return Math.max(0, this.solutionBlocks.length - this.initialBlocks.length);
  }

  isSolvedBy(assembledBlocks = []) {
    if (assembledBlocks.length !== this.solutionBlocks.length) {
      return false;
    }
    return this.solutionBlocks.every(
      (expected, index) => expected === assembledBlocks[index]
    );
  }
}

