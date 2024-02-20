import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket, io } from 'socket.io-client';
import { Lobby } from '../types';
import {
  connectEvent,
  dissconnectEvent,
  errorEvent,
  joinLobbyEvent,
} from './events';

const API_URL = 'http://localhost:3000';

export class SocketApi {
  static socket: null | Socket = null;

  static createConnection(
    setSocket: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => void,
    setLoading: (value: boolean) => void,
    setLobby: (lobby: Lobby) => void
  ): void {
    setLoading(true);
    this.socket = io(API_URL);
    setSocket(this.socket);

    this.socket.on('connect', (): void => {
      connectEvent(setLoading);
    });

    this.socket.on('disconnect', (): void => {
      dissconnectEvent(setLoading);
    });

    this.socket.on('error', (): void => {
      errorEvent(setLoading);
    });

    this.socket.on('join-lobby', (lobby: Lobby): void => {
      joinLobbyEvent(lobby, setLoading, setLobby);
    });

    this.socket.on('set-lobby', (lobby: Lobby): void => {
      setLobby(lobby);
    });
  }

  static emit(event: string, data: unknown): void {
    if (!this.socket) {
      throw new Error('Соединение не обнаружено');
    }
    this.socket.emit(event, data);
  }
}

// const onSubmitHandler = (
//   event: FormEvent<HTMLFormElement>,
//   data: CreatePlayer
// ) => {
//   event.preventDefault();

//   const { setLoading } = rootStore.socketStore;

//   setLoading(true);

//   if (lobby) {
//     SocketApi.emit('join-lobby', { ...data, url: lobby });
//   } else {
//     SocketApi.emit('create-lobby', data);
//   }

//   navigate(lobbyPath);
// };
