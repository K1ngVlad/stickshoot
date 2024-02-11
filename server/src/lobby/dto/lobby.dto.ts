import mongoose from 'mongoose';
import { LobbyStatus } from '../schemas';
import { PlayerDto } from 'src/player/dto';

class LobbyDto {
  readonly status: LobbyStatus;
  readonly players: PlayerDto[];
  readonly leader: mongoose.Types.ObjectId;
  readonly url: string;
  id: string;
}

export { LobbyDto };
