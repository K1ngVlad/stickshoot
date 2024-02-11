import mongoose from 'mongoose';

class PlayerDto {
  readonly connectId: string;
  readonly name: string;
  readonly avatar: string;
  readonly id: mongoose.Types.ObjectId;
}

export { PlayerDto };
