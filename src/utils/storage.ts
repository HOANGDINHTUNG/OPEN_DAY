export interface AnonymousPlay {
  id: string;
  playerName?: string;
  highestLevel: number;
  timestamp: number;
}

const PLAYS_KEY = "minigame_hub_plays";

export function getPlays(): AnonymousPlay[] {
  try {
    const data = localStorage.getItem(PLAYS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function recordPlay(highestLevel: number, playerName?: string) {
  const plays = getPlays();
  plays.push({
    id: Math.random().toString(36).substring(2, 9),
    playerName,
    highestLevel,
    timestamp: Date.now(),
  });
  localStorage.setItem(PLAYS_KEY, JSON.stringify(plays));
}

export interface LeaderboardStats {
  level: number;
  count: number;
}

// Generate leaderboard grouped by level
export function getLeaderboardStats(): LeaderboardStats[] {
  const plays = getPlays();

  // Aggregate real plays
  const counts: Record<number, number> = {};
  plays.forEach((p) => {
    counts[p.highestLevel] = (counts[p.highestLevel] || 0) + 1;
  });

  // Inject some mock data to make the booth look busy if real plays are empty/low
  if (plays.length < 10) {
    counts[7] = (counts[7] || 0) + 2;
    counts[6] = (counts[6] || 0) + 5;
    counts[5] = (counts[5] || 0) + 12;
    counts[4] = (counts[4] || 0) + 25;
    counts[3] = (counts[3] || 0) + 40;
    counts[2] = (counts[2] || 0) + 60;
    counts[1] = (counts[1] || 0) + 85;
  }

  // Convert to array and sort by level descending
  const stats: LeaderboardStats[] = Object.keys(counts).map((k) => ({
    level: parseInt(k),
    count: counts[parseInt(k)],
  }));

  stats.sort((a, b) => b.level - a.level);

  return stats;
}
