import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useConnectSocket, useRootStore } from './hooks';
import { Popup } from './components';
import { PageRoutes } from './PageRoutes';

const App = observer(() => {
  const { loading } = useConnectSocket();
  const { active, text } = useRootStore().popupStore;

  return loading ? (
    <div>Загрузка</div>
  ) : (
    <>
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
      {active && <Popup text={text} />}
    </>
  );
});

export default App;
