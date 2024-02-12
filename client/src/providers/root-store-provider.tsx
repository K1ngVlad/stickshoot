import { FC, ReactNode, createContext } from 'react';
import { RootStore } from '../stores';

const RootStoreContext = createContext<RootStore>({
  lobbyStore: {
    lobby: null,
    setLobby: () => {},
  },
  socketStore: {
    socket: null,
    setSocket: () => {},
    loading: true,
    setLoading: () => {},
  },
});

interface Props {
  children: ReactNode;
}

const RootStoreProvider: FC<Props> = ({ children }) => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      {children}
    </RootStoreContext.Provider>
  );
};

export { RootStoreContext, RootStoreProvider };
