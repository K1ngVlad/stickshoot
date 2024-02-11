import { socketStore } from './socket-store';
import { lobbyStore } from './lobby-store';

export class RootStore {
  socketStore = socketStore;
  lobbyStore = lobbyStore;
}
