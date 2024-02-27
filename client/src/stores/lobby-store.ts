import { makeAutoObservable } from 'mobx';
import { Lobby } from '../types';

class LobbyStore {
  lobby: null | Lobby = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLobby = (lobby: Lobby | null): void => {
    this.lobby = lobby;
  };
}

const lobbyStore = new LobbyStore();

export { lobbyStore, LobbyStore };
