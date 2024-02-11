import { Socket, io } from 'socket.io-client';

const API_URL = 'http://localhost:3000';

export class SocketApi {
  static socket: null | Socket = null;

  static createConnection(): Socket {
    this.socket = io(API_URL);
    return this.socket;
  }

  static emit(event: string, data: unknown): void {
    if (!this.socket) {
      throw new Error('Соединение не обнаружено');
    }
    this.socket.emit(event, data);
  }
}
