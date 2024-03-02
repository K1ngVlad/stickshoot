import { Module } from '@nestjs/common';
import { ConnectGateway } from './connect.gateway';
import { LobbyModule } from 'src/lobby/lobby.module';
import { PlayerModule } from 'src/player/player.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [LobbyModule, PlayerModule, MessagesModule],
  providers: [ConnectGateway],
})
export class ConnectModule {}
