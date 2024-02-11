interface CreatePlayer {
  name: string;
  avatar: string;
}

interface Player {
  connectId: string;
  name: string;
  avatar: string;
  id: string;
}

export type { Player, CreatePlayer };
