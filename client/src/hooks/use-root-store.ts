import { useContext } from 'react';
import { RootStoreContext } from '../providers';

export const useRootStore = () => useContext(RootStoreContext);
