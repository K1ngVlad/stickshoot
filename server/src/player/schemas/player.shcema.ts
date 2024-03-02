import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  connectId: string;

  @Prop()
  messages: mongoose.Types.ObjectId[];
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
