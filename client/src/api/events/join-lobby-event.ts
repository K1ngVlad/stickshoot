import { Lobby } from '../../types';

const joinLobbyEvent = (
  lobby: Lobby,
  setLoading: (value: boolean) => void,
  setLobby: (lobby: Lobby) => void
): void => {
  setLobby(lobby);
  setLoading(false);
};

export { joinLobbyEvent };
