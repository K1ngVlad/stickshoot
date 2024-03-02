import { makeAutoObservable } from 'mobx';
import { Lobby } from '../types';

class LobbyStore {
  lobby: null | Lobby = null;
  playerId: null | string = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLobby = (lobby: Lobby | null): void => {
    this.lobby = lobby;
  };

  setPlayerId = (playerId: string): void => {
    this.playerId = playerId;
  };
}

const lobbyStore = new LobbyStore();

export { lobbyStore, LobbyStore };
