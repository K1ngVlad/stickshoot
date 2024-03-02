import mongoose from 'mongoose';
import { LobbyStatus } from '../schemas';
import { PlayerDto } from 'src/player/dto';
import { MessageDto } from 'src/messages/dto';

class LobbyDto {
  readonly status: LobbyStatus;
  readonly players: PlayerDto[];
  readonly leader: mongoose.Types.ObjectId;
  readonly url: string;
  readonly id: string;
  readonly messages: MessageDto[];
}

export { LobbyDto };
