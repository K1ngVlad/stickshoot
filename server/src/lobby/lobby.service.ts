import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lobby, LobbyDocument } from './schemas';
import { CreateLobbyDto, JoinLobbyDto, LobbyDto } from './dto';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class LobbyService {
  constructor(
    @InjectModel(Lobby.name) private LobbyModel: Model<Lobby>,
    private playerService: PlayerService,
  ) {}

  async findLobbyByUrl(url: string): Promise<LobbyDocument> {
    return await this.LobbyModel.findOne({ url });
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
    const { name, avatar, connectId, url } = joinLobbyDto;

    const { _id } = await this.playerService.createPlayer({
      name,
      avatar,
      connectId,
    });

    const lobby = await this.findLobbyByUrl(url);

    lobby.players = [...lobby.players, _id];
    return lobby;
  }

  async getLobbyDto(lobby: LobbyDocument): Promise<LobbyDto> {
    const { _id, url, leader, players, status } = lobby;

    const playersData = await this.playerService.getPlayersById(players);
    const playersDto = this.playerService.getPlayersDto(playersData);

    const fullUrl = `${process.env.CLIENT_URL}join/${url}`;

    return { id: _id, url: fullUrl, leader, players: playersDto, status };
  }
}
