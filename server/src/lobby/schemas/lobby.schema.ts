import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LobbyDocument = Lobby & Document;

export type LobbyStatus = 'waiting' | 'beginning' | 'playing' | 'ending';

@Schema()
export class Lobby {
  @Prop()
  status: LobbyStatus;

  @Prop()
  players: mongoose.Types.ObjectId[];

  @Prop()
  leader: mongoose.Types.ObjectId;

  @Prop()
  url: string;

  @Prop()
  messages: mongoose.Types.ObjectId[];
}

export const LobbySchema = SchemaFactory.createForClass(Lobby);
