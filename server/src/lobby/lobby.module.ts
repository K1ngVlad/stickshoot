import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lobby, LobbySchema } from './schemas';
import { LobbyService } from './lobby.service';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lobby.name, schema: LobbySchema }]),
    PlayerModule,
  ],
  providers: [LobbyService],
  exports: [LobbyService],
})
export class LobbyModule {}
