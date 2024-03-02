import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Chat, CopyLink, PlayersList } from '../../components';
import { useRootStore } from '../../hooks';
import { mainPath } from '../../routes';
import { shotgunImg } from '../../assets';
import s from './LobbyPage.module.scss';

const LobbyPage: FC = observer(() => {
  const { lobbyStore, socketStore } = useRootStore();
  const { lobby } = lobbyStore;
  const { socket } = socketStore;
  const navigate = useNavigate();

  useEffect(() => {
    if (!lobby) {
      navigate(mainPath, { replace: true });
    }

    window.onbeforeunload = () => true;
    window.onunload = () => {
      if (socket) {
        socket.emit('delete-player');
      }
    };

    return () => {
      console.log('алло');
      window.onbeforeunload = () => {};
      window.onunload = () => {};
    };
  }, [lobby, navigate, socket]);

  const onExitHandler = () => {
    window.onbeforeunload = () => {};
    window.onunload = () => {};
    if (socket) {
      socket.emit('delete-player');
    }
    navigate(mainPath), { replace: true };
  };

  return (
    <main className={s.lobby}>
      <section className={s.lobbyBlock}>
        <PlayersList />
        <div className={s.rightBlock}>
          <img className={s.img} alt="shootgun image" src={shotgunImg} />
          <CopyLink />
          <Chat />
          <div className={s.buttons}>
            <button onClick={onExitHandler} className={s.button}>
              Выйти
            </button>
            <button className={s.button}>Готов</button>
          </div>
        </div>
      </section>
    </main>
  );
});

export { LobbyPage };
