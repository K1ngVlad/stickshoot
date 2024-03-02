import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby, LobbyDocument } from './schemas';
import { CreateLobbyDto, JoinLobbyDto, LobbyDto } from './dto';
import { PlayerService } from 'src/player/player.service';
import { MessagesService } from 'src/messages/messages.service';
import { PlayerDocument } from 'src/player/schemas';
import { MessageDocument } from 'src/messages/schemas';

@Injectable()
export class LobbyService {
  constructor(
    @InjectModel(Lobby.name) private LobbyModel: Model<Lobby>,
    private playerService: PlayerService,
    private messageService: MessagesService,
  ) {}

  async findLobbyByUrl(url: string): Promise<LobbyDocument> {
    return await this.LobbyModel.findOne({ url });
  }

  async findLobbyByPlayer(id: mongoose.Types.ObjectId): Promise<LobbyDocument> {
    const lobby = await this.LobbyModel.findOne({
      players: id,
    });

    return lobby;
  }

  async findLobbyById(id: mongoose.Types.ObjectId): Promise<LobbyDocument> {
    return await this.LobbyModel.findById(id);
  }

  async deleteLobbyById(id: mongoose.Types.ObjectId): Promise<LobbyDocument> {
    const lobby = await this.LobbyModel.findOneAndDelete(id);

    const { messages } = lobby;

    await this.messageService.deleteMessagesByIds(messages);

    return lobby;
  }

  async deletePlayerFromLobby(
    player: PlayerDocument,
  ): Promise<LobbyDocument | null> {
    const id = player._id;
    const { name } = player;

    const lobby = await this.findLobbyByPlayer(id);

    if (!lobby) return null;

    lobby.players = lobby.players.filter(
      (player) => player.toString() !== id.toString(),
    );

    await lobby.save();

    if (!lobby.players.length) {
      await this.deleteLobbyById(lobby._id);
      return null;
    }

    const messageExit = await this.messageService.createMessage({
      name: 'Система',
      text: `Игрок ${name} вышел из лобби`,
    });

    if (lobby.leader.toString() === id.toString()) {
      lobby.leader = lobby.players[0];
      const player = await this.playerService.getPlayerById(lobby.leader);
      const { name } = player;

      const messageLeader = await this.messageService.createMessage({
        name: 'Система',
        text: `Игрок ${name} стал лидером`,
      });
      lobby.messages = [...lobby.messages, messageExit._id, messageLeader._id];

      await lobby.save();

      return lobby;
    }

    lobby.messages = [...lobby.messages, messageExit._id];

    return lobby;
  }

  async createLobby(createLobbyDto: CreateLobbyDto): Promise<LobbyDocument> {
    const { connectId, name, avatar, userId } = createLobbyDto;

    if (userId) {
      const players = await this.playerService.getPlayers();

      const alreadyHas = players.find(
        (player) => player._id.toString() === userId,
      );

      if (alreadyHas) {
        throw new WsException('The player is already in the lobby');
      }
    }

    const { _id } = await this.playerService.createPlayer({
      connectId,
      name,
      avatar,
    });

    const url = uuid.v4();

    const messageCreate = await this.messageService.createMessage({
      name: 'Система',
      text: 'Лобби создано',
    });

    const messageJoin = await this.messageService.createMessage({
      name: 'Система',
      text: `Игрок ${name} присоеденился к лобби`,
    });

    return await this.LobbyModel.create({
      url,
      status: 'waiting',
      leader: _id,
      players: [_id],
      messages: [messageCreate._id, messageJoin._id],
    });
  }

  async joinLobby(joinLobbyDto: JoinLobbyDto): Promise<LobbyDocument> {
    const { name, avatar, connectId, url, userId } = joinLobbyDto;

    if (userId) {
      const players = await this.playerService.getPlayers();

      const hasAlready = players.find(
        (player) => player._id.toString() === userId,
      );

      if (hasAlready) {
        throw new WsException('The player is already in the lobby');
      }
    }

    const lobby = await this.findLobbyByUrl(url);

    if (!lobby) {
      throw new WsException('This lobby does not exist');
    }

    const { _id } = await this.playerService.createPlayer({
      name,
      avatar,
      connectId,
    });

    const message = await this.messageService.createMessage({
      name: 'Система',
      text: `Игрок ${name} присоеденился к лобби`,
    });

    lobby.players = [...lobby.players, _id];
    lobby.messages = [...lobby.messages, message._id];
    return await lobby.save();
  }

  async getLobbyDto(lobby: LobbyDocument): Promise<LobbyDto> {
    const { _id, url, leader, players, status, messages } = lobby;

    const playersData = await this.playerService.getPlayersByIds(players);
    const playersDto = await this.playerService.getPlayersDto(playersData);

    const fullUrl = `${process.env.CLIENT_URL}join/${url}`;

    const messagesData = await this.messageService.getMessagesByIds(messages);
    const messagesDto = this.messageService.getMessagesDto(messagesData);

    return {
      id: _id,
      url: fullUrl,
      leader,
      players: playersDto,
      status,
      messages: messagesDto,
    };
  }

  async addMessageToLobby(
    lobby: LobbyDocument,
    message: MessageDocument,
  ): Promise<LobbyDocument> {
    const { _id } = message;
    lobby.messages = [...lobby.messages, _id];
    return await lobby.save();
  }
}
