import { Module } from '@nestjs/common';
import { ConnectGateway } from './connect.gateway';
import { LobbyModule } from 'src/lobby/lobby.module';
import { PlayerModule } from 'src/player/player.module';

@Module({
  imports: [LobbyModule, PlayerModule],
  providers: [ConnectGateway],
})
export class ConnectModule {}
