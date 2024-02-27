import { makeAutoObservable } from 'mobx';
import { Socket } from 'socket.io-client';

class SocketStore {
  loading: boolean = true;
  socket: null | Socket = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (value: boolean): void => {
    this.loading = value;
  };

  setSocket = (socket: Socket | null): void => {
    this.socket = socket;
  };
}

const socketStore = new SocketStore();

export { socketStore, SocketStore };
