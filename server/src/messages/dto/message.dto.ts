import mongoose from 'mongoose';

class MessageDto {
  readonly name: string;
  readonly text: string;
  readonly id: mongoose.Types.ObjectId;
}

export { MessageDto };
