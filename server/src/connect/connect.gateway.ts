import { Socket, Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CreateLobbyRequestDto, JoinLobbyRequestDto } from './dto';
import { Injectable } from '@nestjs/common';
import { LobbyService } from 'src/lobby/lobby.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ConnectGateway implements OnGatewayConnection {
  constructor(private lobbyService: LobbyService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('create-lobby')
  async handleCreateLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() createLobbyRequestDto: CreateLobbyRequestDto,
  ): Promise<void> {
    const lobby = await this.lobbyService.createLobby({
      ...createLobbyRequestDto,
      connectId: client.id,
    });
    const lobbyDto = await this.lobbyService.getLobbyDto(lobby);

    const id = lobbyDto.id.toString();

    client.join(id);
    client.emit('join-lobby', lobbyDto);
  }

  @SubscribeMessage('join-lobby')
  async handleJoinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinLobbyRequestDto: JoinLobbyRequestDto,
  ): Promise<void> {
    const lobby = await this.lobbyService.joinLobby({
      ...joinLobbyRequestDto,
      connectId: client.id,
    });
    const lobbyDto = await this.lobbyService.getLobbyDto(lobby);

    const id = lobbyDto.id.toString();

    client.join(id);
    client.emit('join-lobby', lobbyDto);
    this.server.to(id).emit('set-lobby', lobbyDto);
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }
}
