import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lobby, LobbySchema } from './schemas';
import { LobbyService } from './lobby.service';
import { PlayerModule } from 'src/player/player.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lobby.name, schema: LobbySchema }]),
    PlayerModule,
    MessagesModule,
  ],
  providers: [LobbyService],
  exports: [LobbyService],
})
export class LobbyModule {}
