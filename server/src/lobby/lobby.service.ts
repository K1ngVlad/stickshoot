import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby, LobbyDocument } from './schemas';
import { CreateLobbyDto, JoinLobbyDto, LobbyDto } from './dto';
import { PlayerService } from 'src/player/player.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class LobbyService {
  constructor(
    @InjectModel(Lobby.name) private LobbyModel: Model<Lobby>,
    private playerService: PlayerService,
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
    return await this.LobbyModel.findOneAndDelete(id);
  }

  async deletePlayerFromLobby(
    id: mongoose.Types.ObjectId,
  ): Promise<LobbyDocument | null> {
    const lobby = await this.findLobbyByPlayer(id);

    if (!lobby) return null;

    lobby.players = lobby.players.filter(
      (player) => player.toString() !== id.toString(),
    );

    await lobby.save();

    if (!lobby.players.length) {
      return await this.deleteLobbyById(lobby._id);
    }

    if (lobby.leader.toString() === id.toString()) {
      lobby.leader = lobby.players[0];
      await lobby.save();
    }

    return lobby;
  }

  async createLobby(createLobbyDto: CreateLobbyDto): Promise<LobbyDocument> {
    const { _id } = await this.playerService.createPlayer(createLobbyDto);

    const url = uuid.v4();

    return await this.LobbyModel.create({
      url,
      status: 'waiting',
      leader: _id,
      players: [_id],
    });
  }

  async joinLobby(joinLobbyDto: JoinLobbyDto): Promise<LobbyDocument> {
    const { name, avatar, connectId, url, userId } = joinLobbyDto;

    const lobby = await this.findLobbyByUrl(url);

    if (!lobby) {
      throw new WsException('This lobby does not exist');
    }

    const { _id } = await this.playerService.createPlayer({
      name,
      avatar,
      connectId,
    });

    if (lobby.players.map((player) => player.toString()).includes(userId)) {
      throw new WsException('The player is already connected to this lobby');
    }

    lobby.players = [...lobby.players, _id];
    return await lobby.save();
  }

  async getLobbyDto(lobby: LobbyDocument): Promise<LobbyDto> {
    const { _id, url, leader, players, status } = lobby;

    const playersData = await this.playerService.getPlayersById(players);
    const playersDto = this.playerService.getPlayersDto(playersData);

    const fullUrl = `${process.env.CLIENT_URL}join/${url}`;

    return { id: _id, url: fullUrl, leader, players: playersDto, status };
  }
}
