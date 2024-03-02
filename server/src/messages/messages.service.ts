import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas';
import { CreateMessageDto, MessageDto } from './dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<Message>,
  ) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<MessageDocument> {
    const message = await this.MessageModel.create(createMessageDto);
    return message;
  }

  async getMessageById(id: mongoose.Types.ObjectId): Promise<MessageDocument> {
    return await this.MessageModel.findById(id);
  }

  async getMessagesByIds(
    ids: mongoose.Types.ObjectId[],
  ): Promise<MessageDocument[]> {
    return await Promise.all(ids.map((id) => this.getMessageById(id)));
  }

  getMessageDto(message: MessageDocument): MessageDto {
    const { name, text, _id } = message;

    return { name, text, id: _id };
  }

  getMessagesDto(messages: MessageDocument[]): MessageDto[] {
    return messages.map((message) => this.getMessageDto(message));
  }

  async deleteMessageById(
    id: mongoose.Types.ObjectId,
  ): Promise<MessageDocument> {
    return await this.MessageModel.findByIdAndDelete(id);
  }

  async deleteMessagesByIds(
    ids: mongoose.Types.ObjectId[],
  ): Promise<MessageDocument[]> {
    return Promise.all(ids.map((id) => this.deleteMessageById(id)));
  }
}
