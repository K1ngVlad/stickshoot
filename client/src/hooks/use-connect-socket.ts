import { useEffect } from 'react';
import { SocketApi } from '../api';
import { useRootStore } from '.';
import { SocketStore } from '../stores';

const useConnectSocket = (): SocketStore => {
  const { socketStore, lobbyStore, popupStore } = useRootStore();
  const { setSocket, setLoading } = socketStore;
  const { setLobby, setPlayerId } = lobbyStore;
  const { openPopup } = popupStore;

  useEffect((): void => {
    SocketApi.createConnection(
      setSocket,
      setLoading,
      setLobby,
      setPlayerId,
      openPopup
    );
  }, [setSocket, setLoading, setLobby, setPlayerId, openPopup]);

  return socketStore;
};

export { useConnectSocket };
