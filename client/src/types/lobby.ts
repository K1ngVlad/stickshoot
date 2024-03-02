import { Message } from '.';
import { Player } from './player';

interface Lobby {
  status: string;
  players: Player[];
  leader: string;
  url: string;
  id: string;
  messages: Message[];
}

export type { Lobby };
