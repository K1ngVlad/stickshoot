import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { routes } from './routes';
import { useConnectSocket } from './hooks';

const App = observer(() => {
  const { loading } = useConnectSocket();

  return loading ? (
    <div>Загрузка</div>
  ) : (
    <>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    </>
  );
});

export default App;
