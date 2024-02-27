import { useEffect } from 'react';
import { SocketApi } from '../api';
import { useRootStore } from '.';
import { SocketStore } from '../stores';

const useConnectSocket = (): SocketStore => {
  const { socketStore, lobbyStore, popupStore } = useRootStore();
  const { setSocket, setLoading } = socketStore;
  const { setLobby } = lobbyStore;
  const { openPopup } = popupStore;

  useEffect((): void => {
    SocketApi.createConnection(setSocket, setLoading, setLobby, openPopup);
  }, [setSocket, setLoading, setLobby, openPopup]);

  return socketStore;
};

export { useConnectSocket };
