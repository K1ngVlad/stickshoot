import { useEffect } from 'react';
import { SocketApi } from '../api';
import { useRootStore } from '.';
import { Lobby } from '../types';
import { SocketStore } from '../stores';

const useConnectSocket = (): SocketStore => {
  const store = useRootStore();

  if (!store) throw new Error('Store not found');

  const { socketStore, lobbyStore } = store;
  const { setSocket, setLoading } = socketStore;
  const { setLobby } = lobbyStore;

  useEffect((): void => {
    setLoading(true);
    const socket = SocketApi.createConnection();
    setSocket(socket);

    socket.on('connect', (): void => {
      setLoading(false);
      console.log('websocket connected');
    });

    socket.on('disconnect', (): void => {
      setLoading(false);
      console.log('websocket disconnected');
    });

    socket.on('error', (): void => {
      setLoading(false);
      console.error('An error occurred while connecting');
    });

    socket.on('join-lobby', (lobby: Lobby): void => {
      setLoading(false);
      setLobby(lobby);
      console.log(lobby);
    });
  }, [setSocket, setLoading, setLobby]);

  return socketStore;
};

export { useConnectSocket };
