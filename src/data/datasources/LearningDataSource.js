import axios from "axios";

/**
 * Data Source: LearningDataSource
 * Fetches curriculum module definitions and filter tabs via Axios with static fallback.
 */
export const rawLearningModules = [
  {
    id: 1,
    title: "Dasar SELECT & Filtering WHERE",
    description:
      "Pelajari struktur fundamental pengambilan data relasional, aliasing kolom, dan pemfilteran logika kompleks dengan operator AND/OR/IN.",
    duration: "20 Menit",
    lessons: 5,
    xp: 150,
    progress: 100,
    status: "completed",
  },
  {
    id: 2,
    title: "Pengelompokan GROUP BY & HAVING",
    description:
      "Analisis data agregat menggunakan fungsi COUNT, SUM, AVG serta menyaring hasil grup data secara presisi.",
    duration: "30 Menit",
    lessons: 6,
    xp: 180,
    progress: 100,
    status: "completed",
  },
  {
    id: 3,
    title: "Relasi Multi-Tabel: INNER & LEFT JOIN",
    description:
      "Kuasai cara menggabungkan data antar entitas dengan berbagai tipe relasi database relasional.",
    duration: "35 Menit",
    lessons: 7,
    xp: 220,
    progress: 57,
    status: "in-progress",
  },
  {
    id: 4,
    title: "Subquery & Common Table Expressions (CTE)",
    description:
      "Tingkatkan keterbacaan kueri rumit dengan teknik modularisasi kueri SQL menggunakan CTE.",
    duration: "40 Menit",
    lessons: 6,
    xp: 250,
    progress: 33,
    status: "in-progress",
  },
  {
    id: 5,
    title: "Window Functions: ROW_NUMBER & RANK",
    description:
      "Analisis data sekuensial dan perankingan dinamis tanpa mengubah jumlah baris melalui OVER, PARTITION BY, dan DENSE_RANK.",
    duration: "45 Menit",
    lessons: 8,
    xp: 280,
    progress: 0,
    status: "locked",
  },
  {
    id: 6,
    title: "Agregasi Lanjutan & Pivot Data",
    description:
      "Transformasi baris menjadi kolom dengan fungsi CROSSTAB, ROLLUP, dan CUBE untuk pelaporan intelijen bisnis.",
    duration: "35 Menit",
    lessons: 6,
    xp: 300,
    progress: 0,
    status: "locked",
  },
  {
    id: 7,
    title: "Optimasi Query & Indexing",
    description:
      "Pelajari cara meningkatkan performa database dengan indeks dan analisis query.",
    duration: "40 Menit",
    lessons: 7,
    xp: 350,
    progress: 0,
    status: "locked",
  },
  {
    id: 8,
    title: "Capstone Quest",
    description:
      "Terapkan seluruh kemampuan SQL melalui tantangan proyek database yang komprehensif.",
    duration: "60 Menit",
    lessons: 10,
    xp: 500,
    progress: 0,
    status: "locked",
    isCapstone: true,
  },
];

export const rawLearningFilters = [
  { label: "Semua", count: 8 },
  { label: "Sedang Berjalan", count: 2 },
  { label: "Selesai", count: 2 },
];

export class LearningApiDataSource {
  async fetchLearningData() {
    const response = await axios.get("/learning.json");
    return response.data;
  }
}
