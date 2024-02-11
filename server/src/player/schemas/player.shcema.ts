import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  connectId: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
