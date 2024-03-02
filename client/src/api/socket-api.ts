import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket, io } from 'socket.io-client';
import { NavigateFunction } from 'react-router-dom';
import { Lobby } from '../types';
import { lobbyPath, mainPath } from '../routes';

const API_URL = 'http://localhost:3000';

export class SocketApi {
  static socket: null | Socket = null;
  static navigate: null | NavigateFunction = null;

  static createConnection(
    setSocket: (
      socket: Socket<DefaultEventsMap, DefaultEventsMap> | null
    ) => void,
    setLoading: (value: boolean) => void,
    setLobby: (lobby: Lobby | null) => void,
    setPlayerId: (playerId: string) => void,
    openPopup: (text: string) => void
  ): void {
    setLoading(true);
    this.socket = io(API_URL);
    setSocket(this.socket);

    this.socket.on('connect', (): void => {
      console.log('Websocket connected');
      setLoading(false);
    });

    this.socket.on('disconnect', (): void => {
      console.log('Websocket dissConnected');
      setLobby(null);
      setLoading(false);
    });

    this.socket.on('error', (error): void => {
      console.error(error);
      openPopup('Произошла непредвиденная ошибка');
      setLoading(false);
    });

    this.socket.on('join-lobby', (lobby: Lobby): void => {
      const playerId = lobby.players[lobby.players.length - 1].id;
      if (this.navigate) {
        setLobby(lobby);
        this.navigate(lobbyPath, { replace: true });
        setPlayerId(playerId);
        localStorage.setItem('userId', playerId);
        setLoading(false);
      }
    });

    this.socket.on('set-lobby', (lobby: Lobby): void => {
      setLobby(lobby);
    });

    this.socket.on('already-connected', (): void => {
      openPopup('Вы ужа присоединились к лобби');
      setLoading(false);
    });

    this.socket.on('lobby-does-not-exist', (): void => {
      if (this.navigate) {
        openPopup('Данного лобби не существует');
        this.navigate(mainPath, { replace: true });
        setLoading(false);
      }
    });
  }

  static setNavigate(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  static emit(event: string, data: unknown): void {
    if (!this.socket) {
      throw new Error('Соединение не обнаружено');
    }
    this.socket.emit(event, data);
  }
}
