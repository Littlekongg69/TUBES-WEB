/**
 * Domain Use Cases: Learning Modules & Filtering
 */
export class GetLearningModulesUseCase {
  constructor(learningRepository) {
    this.learningRepository = learningRepository;
  }

  execute() {
    return {
      modules: this.learningRepository.getModules(),
      filters: this.learningRepository.getFilters(),
    };
  }

  async executeAsync() {
    return await this.learningRepository.fetchLearningData();
  }
}

export class FilterLearningModulesUseCase {
  execute(modules, { activeFilter = "Semua", search = "" }) {
    return (modules || []).filter(
      (module) =>
        module.matchesSearch(search) && module.matchesFilter(activeFilter)
    );
  }
}
