import { Module } from '@nestjs/common';
import { ConnectGateway } from './connect.gateway';
import { LobbyModule } from 'src/lobby/lobby.module';

@Module({
  imports: [LobbyModule],
  providers: [ConnectGateway],
})
export class ConnectModule {}
