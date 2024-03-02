import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schemas';
import { PlayerService } from './player.service';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    MessagesModule,
  ],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
