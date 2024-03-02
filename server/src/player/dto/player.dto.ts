import mongoose from 'mongoose';
import { MessageDto } from 'src/messages/dto';

class PlayerDto {
  readonly connectId: string;
  readonly name: string;
  readonly avatar: string;
  readonly id: mongoose.Types.ObjectId;
  readonly messages: MessageDto[];
}

export { PlayerDto };
