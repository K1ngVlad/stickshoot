import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { useConnectSocketNavigate } from './hooks';

const PageRoutes: FC = () => {
  useConnectSocketNavigate();

  return (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Routes>
  );
};

export { PageRoutes };
