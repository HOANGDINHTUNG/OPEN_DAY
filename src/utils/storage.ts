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

export function getTopPlayers(limit: number = 3): AnonymousPlay[] {
  const plays = getPlays();
  const namedPlays = plays.filter(
    (p) => p.playerName && p.playerName.trim() !== "",
  );

  namedPlays.sort((a, b) => {
    if (b.highestLevel !== a.highestLevel)
      return b.highestLevel - a.highestLevel;
    return a.timestamp - b.timestamp;
  });

  const uniquePlays: AnonymousPlay[] = [];
  const seenNames = new Set<string>();

  for (const play of namedPlays) {
    const name = play.playerName!.trim().toLowerCase();
    if (!seenNames.has(name)) {
      seenNames.add(name);
      uniquePlays.push(play);
    }
  }

  if (uniquePlays.length < limit) {
    const mocks: AnonymousPlay[] = [
      {
        id: "m1",
        playerName: "Tân Sinh Viên",
        highestLevel: 7,
        timestamp: Date.now() - 100000,
      },
      {
        id: "m2",
        playerName: "Khách Mời PTIT",
        highestLevel: 6,
        timestamp: Date.now() - 50000,
      },
      {
        id: "m3",
        playerName: "Người Bí Ẩn",
        highestLevel: 5,
        timestamp: Date.now() - 20000,
      },
    ];
    for (const m of mocks) {
      if (
        uniquePlays.length < limit &&
        !seenNames.has(m.playerName!.toLowerCase())
      ) {
        uniquePlays.push(m);
      }
    }
  }

  uniquePlays.sort((a, b) => {
    if (b.highestLevel !== a.highestLevel)
      return b.highestLevel - a.highestLevel;
    return a.timestamp - b.timestamp;
  });

  return uniquePlays.slice(0, limit);
}
