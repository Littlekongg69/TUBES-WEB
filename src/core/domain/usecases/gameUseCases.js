/**
 * Domain Use Cases: SQL Cooking Quest Game Missions & Query Block Evaluation
 */
export class GetGameMissionsUseCase {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  execute() {
    return {
      missions: this.gameRepository.getMissions(),
    };
  }

  async executeAsync() {
    return await this.gameRepository.fetchGameData();
  }
}

export class EvaluateGameQueryUseCase {
  execute(mission, assembledBlocks = []) {
    if (!mission) {
      return {
        isCorrect: false,
        message: "Misi tidak ditemukan.",
      };
    }

    if (assembledBlocks.length < mission.solutionBlocks.length) {
      return {
        isCorrect: false,
        message: `Lengkapi ${
          mission.solutionBlocks.length - assembledBlocks.length
        } blok SQL yang masih kosong sebelum mengeksekusi kueri.`,
      };
    }

    const isCorrect = mission.isSolvedBy(assembledBlocks);
    return {
      isCorrect,
      message: isCorrect
        ? `Kueri berhasil dieksekusi! +${mission.xpReward} XP diperoleh.`
        : "Susunan blok SQL belum tepat. Periksa kembali urutan nama tabel dan tanda titik koma (;).",
    };
  }
}

