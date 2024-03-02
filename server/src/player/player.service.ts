import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerDocument } from './schemas';
import { CreatePlayerDto, PlayerDto } from './dto';
import { MessagesService } from 'src/messages/messages.service';
import { MessageDocument } from 'src/messages/schemas';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<Player>,
    private messagesService: MessagesService,
  ) {}

  async createPlayer(
    createPlayerDto: CreatePlayerDto,
  ): Promise<PlayerDocument> {
    return await this.playerModel.create({ ...createPlayerDto, messages: [] });
  }

  async deletePlayerByConnectId(connectId: string): Promise<PlayerDocument> {
    return await this.playerModel.findOneAndDelete({ connectId });
  }

  async getPlayerDto(player: PlayerDocument): Promise<PlayerDto> {
    const { name, avatar, connectId, _id, messages } = player;

    const messagesData = await this.messagesService.getMessagesByIds(messages);
    const messagesDto = this.messagesService.getMessagesDto(messagesData);

    return { name, avatar, connectId, id: _id, messages: messagesDto };
  }

  getPlayersDto(players: PlayerDocument[]): Promise<PlayerDto[]> {
    return Promise.all(players.map((player) => this.getPlayerDto(player)));
  }

  async getPlayerById(id: mongoose.Types.ObjectId): Promise<PlayerDocument> {
    return await this.playerModel.findById(id);
  }

  async getPlayers(): Promise<PlayerDocument[]> {
    return await this.playerModel.find();
  }

  async getPlayersByIds(
    ids: mongoose.Types.ObjectId[],
  ): Promise<PlayerDocument[]> {
    return await Promise.all(
      ids.map(async (id) => await this.getPlayerById(id)),
    );
  }

  async getPlayerByConnectId(connectId: string): Promise<PlayerDocument> {
    return await this.playerModel.findOne({ connectId });
  }

  async addMessageToPlayer(
    player: PlayerDocument,
    message: MessageDocument,
  ): Promise<PlayerDocument> {
    const { _id } = message;
    player.messages = [...player.messages, _id];
    return await player.save();
  }
}
