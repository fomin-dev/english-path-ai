import { listeningExercises, type SeedListeningExercise } from './exercises.js';

export interface ListeningExerciseWithId extends SeedListeningExercise {
  id: string;
}

export const listeningExerciseList: ListeningExerciseWithId[] = listeningExercises.map((ex, index) => ({
  ...ex,
  id: `listening-${ex.level}-${index}`,
}));

export const listeningExerciseById: ReadonlyMap<string, ListeningExerciseWithId> = new Map(
  listeningExerciseList.map((e) => [e.id, e]),
);
