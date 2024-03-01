import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerDocument } from './schemas';
import { CreatePlayerDto, PlayerDto } from './dto';

@Injectable()
export class PlayerService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<PlayerDocument> {
    return await this.playerModel.create(createPlayerDto);
  }

  async deletePlayerByConnectId(connectId: string): Promise<PlayerDocument> {
    return await this.playerModel.findOneAndDelete({ connectId });
  }

  getPlayerDto(player: PlayerDocument): PlayerDto {
    const { name, avatar, connectId, _id } = player;
    return { name, avatar, connectId, id: _id };
  }

  getPlayersDto(players: PlayerDocument[]): PlayerDto[] {
    return players.map((player) => this.getPlayerDto(player));
  }

  async getPlayerById(id: mongoose.Types.ObjectId): Promise<PlayerDocument> {
    return await this.playerModel.findById(id);
  }

  async getPlayers(): Promise<PlayerDocument[]> {
    return await this.playerModel.find();
  }

  async getPlayersById(
    ids: mongoose.Types.ObjectId[],
  ): Promise<PlayerDocument[]> {
    return await Promise.all(
      ids.map(async (id) => await this.getPlayerById(id)),
    );
  }

  async getPlayerByConnectId(connectId: string): Promise<PlayerDocument> {
    return await this.playerModel.findOne({ connectId });
  }
}
