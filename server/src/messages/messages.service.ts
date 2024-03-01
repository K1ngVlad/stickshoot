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
    return await this.MessageModel.create(createMessageDto);
  }

  //   async getMessageById(id: mongoose.Types.ObjectId) {
  //     return await this.MessageModel
  //   }

  //   getMessageDto(message: MessageDocument): MessageDto {
  //     const { name, text, _id } = message;

  //     return { name, text, id: _id };
  //   }

  //   getMessageDtos()
}
