import { useEffect } from 'react';
import { SocketApi } from '../api';
import { useRootStore } from '.';
import { SocketStore } from '../stores';

const useConnectSocket = (): SocketStore => {
  const { socketStore, lobbyStore } = useRootStore();

  const { setSocket, setLoading } = socketStore;
  const { setLobby } = lobbyStore;

  useEffect((): void => {
    SocketApi.createConnection(setSocket, setLoading, setLobby);
  }, [setSocket, setLoading, setLobby]);

  return socketStore;
};

export { useConnectSocket };
