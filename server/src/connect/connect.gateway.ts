import { Socket, Server } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Injectable, UseFilters } from '@nestjs/common';
import {
  CreateLobbyRequestDto,
  JoinLobbyRequestDto,
  SendMessageRequestDto,
} from './dto';
import { LobbyService } from 'src/lobby/lobby.service';
import { PlayerService } from 'src/player/player.service';
import { ExceptionsFilter } from './exception.filter';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new ExceptionsFilter())
@Injectable()
export class ConnectGateway implements OnGatewayConnection {
  constructor(
    private lobbyService: LobbyService,
    private playerService: PlayerService,
    private messageService: MessagesService,
  ) {}

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

    const lobbyId = lobbyDto.id.toString();

    client.join(lobbyId);
    client.emit('join-lobby', lobbyDto);
    this.server.to(lobbyId).emit('set-lobby', lobbyDto);
  }

  @SubscribeMessage('delete-player')
  async handleDeletePlayer(@ConnectedSocket() client: Socket): Promise<void> {
    const clientId = client.id;

    console.log(clientId);

    const player = await this.playerService.deletePlayerByConnectId(clientId);

    if (player) {
      const lobby = await this.lobbyService.deletePlayerFromLobby(player);

      if (lobby) {
        const lobbyDto = await this.lobbyService.getLobbyDto(lobby);
        const lobbyId = lobbyDto.id.toString();
        this.server.to(lobbyId).emit('set-lobby', lobbyDto);
      }
    }
  }

  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() sendMessageRequestDto: SendMessageRequestDto,
  ) {
    const { id } = client;
    console.log(sendMessageRequestDto);
    const player = await this.playerService.getPlayerByConnectId(id);
    const lobby = await this.lobbyService.findLobbyByPlayer(player._id);

    const message = await this.messageService.createMessage(
      sendMessageRequestDto,
    );

    await this.playerService.addMessageToPlayer(player, message);
    const updateLobby = await this.lobbyService.addMessageToLobby(
      lobby,
      message,
    );
    const lobbyDto = await this.lobbyService.getLobbyDto(updateLobby);
    const lobbyId = lobbyDto.id.toString();

    this.server.to(lobbyId).emit('set-lobby', lobbyDto);
  }

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log(`Client dissconnected: ${client.id}`);
    const clientId = client.id;

    const player = await this.playerService.deletePlayerByConnectId(clientId);

    if (player) {
      const { _id } = player;

      const lobby = await this.lobbyService.deletePlayerFromLobby(_id);

      if (lobby) {
        const lobbyDto = await this.lobbyService.getLobbyDto(lobby);
        const lobbyId = lobbyDto.id.toString();
        this.server.to(lobbyId).emit('set-lobby', lobbyDto);
      }
    }
  }
}
