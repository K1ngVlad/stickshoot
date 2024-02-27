import { socketStore } from './socket-store';
import { lobbyStore } from './lobby-store';
import { popupStore } from './popup-store';

export class RootStore {
  socketStore = socketStore;
  lobbyStore = lobbyStore;
  popupStore = popupStore;
}
