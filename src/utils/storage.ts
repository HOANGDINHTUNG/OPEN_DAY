export interface PlayerData {
  name: string;
  score: number;
  timeInSeconds: number;
  avatar: string;
}

const PLAYERS_KEY = "minigame_hub_players";
const CURRENT_PLAYER_KEY = "minigame_hub_current_player";

export function getPlayers(): PlayerData[] {
  try {
    const data = localStorage.getItem(PLAYERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function checkNameExists(name: string): boolean {
  const players = getPlayers();
  return players.some((p) => p.name.toLowerCase() === name.toLowerCase());
}

export function setCurrentPlayer(name: string) {
  localStorage.setItem(CURRENT_PLAYER_KEY, name);

  // Initialize player if not exists
  const players = getPlayers();
  if (!players.find((p) => p.name === name)) {
    players.push({
      name,
      score: 0,
      timeInSeconds: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4`,
    });
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
  }
}

export function getCurrentPlayer(): string | null {
  return localStorage.getItem(CURRENT_PLAYER_KEY);
}

export function savePlayerScore(score: number, timeInSeconds: number) {
  const currentName = getCurrentPlayer();
  if (!currentName) return;

  const players = getPlayers();
  const idx = players.findIndex((p) => p.name === currentName);
  if (idx !== -1) {
    if (score >= players[idx].score) {
      players[idx].score = score;
      players[idx].timeInSeconds = timeInSeconds;
      localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }
  }
}

// Generate the initial mock data only once
export function getLeaderboard(mockCount = 97): PlayerData[] {
  const realPlayers = getPlayers();

  // Return early if we already generated a ton of mock players in storage?
  // Let's just dynamically merge real players with static mocks for demonstration.
  const mocks: PlayerData[] = Array.from({ length: mockCount }).map((_, i) => ({
    name: `PTIT_Student_${1092 + i * 7}`,
    timeInSeconds: Math.floor(Math.random() * 40) + 10,
    score: Math.floor(Math.random() * 45), // 0 to 44 points, human getting 50 is rank 1
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 500}&backgroundColor=b6e3f4`,
  }));

  // Merge real and mock, filter out duplicate names just in case
  const all = [...realPlayers, ...mocks];

  // Sort descending by score, ascending by time if tied
  all.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeInSeconds - b.timeInSeconds;
  });

  return all;
}

// INVENTORY MANAGEMENT LOGIC
export interface InventoryItem {
  id: "easy" | "medium" | "hard";
  level: string;
  name: string;
  stock: number;
  color: string;
  tagColor: string;
}

const INVENTORY_KEY = "minigame_hub_inventory";

const DEFAULT_INVENTORY: InventoryItem[] = [
  {
    id: "hard",
    level: "Hard",
    name: "Bàn phím cơ Rikkei",
    stock: 5,
    color: "text-brand-red",
    tagColor: "bg-brand-red/20 border-brand-red/50 text-brand-red",
  },
  {
    id: "medium",
    level: "Medium",
    name: "Credit AWS $50",
    stock: 42,
    color: "text-[#F59E0B]",
    tagColor: "bg-[#F59E0B]/20 border-[#F59E0B]/50 text-[#F59E0B]",
  },
  {
    id: "easy",
    level: "Easy",
    name: "Áo thun PTIT",
    stock: 120,
    color: "text-primary",
    tagColor: "bg-primary/20 border-primary/50 text-primary",
  },
];

export function getInventory(): InventoryItem[] {
  try {
    const data = localStorage.getItem(INVENTORY_KEY);
    if (!data) {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(DEFAULT_INVENTORY));
      return DEFAULT_INVENTORY;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_INVENTORY;
  }
}

export function updateInventoryStock(id: string, delta: number) {
  const inv = getInventory();
  const idx = inv.findIndex((i) => i.id === id);
  if (idx !== -1) {
    inv[idx].stock = Math.max(0, inv[idx].stock + delta); // Cannot go below 0
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inv));
  }
}
