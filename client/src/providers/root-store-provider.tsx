import { FC, ReactNode, createContext } from 'react';
import { RootStore } from '../stores';

const RootStoreContext = createContext<RootStore | null>(null);

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
