const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

/** Medal emoji for the top 3 ranks, otherwise a plain "#N" label. */
export function rankMedal(rank: number): string {
  return MEDALS[rank] ?? `#${rank}`;
}
