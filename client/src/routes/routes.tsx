import { ReactNode } from 'react';
import { joinPath, lobbyPath, mainPath } from './paths';
import { LobbyPage, MainPage, JoinPage } from '../pages';

interface RouteItem {
  path: string;
  element: ReactNode;
}

const routes: RouteItem[] = [
  {
    path: mainPath,
    element: <MainPage />,
  },
  {
    path: joinPath,
    element: <JoinPage />,
  },
  {
    path: `${joinPath}/:lobby`,
    element: <JoinPage />,
  },
  {
    path: lobbyPath,
    element: <LobbyPage />,
  },
];

export { routes };
