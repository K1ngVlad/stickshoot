import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Chat, CopyLink, PlayersList } from '../../components';
import { useRootStore } from '../../hooks';
import { mainPath } from '../../routes';
import { shotgunImg } from '../../assets';
import s from './LobbyPage.module.scss';

const LobbyPage: FC = observer(() => {
  const { lobby } = useRootStore().lobbyStore;
  const navigate = useNavigate();

  useEffect(() => {
    console.log();
    if (!lobby) {
      navigate(mainPath);
    }
  }, [lobby, navigate]);

  return (
    <main className={s.lobby}>
      <section className={s.lobbyBlock}>
        <PlayersList />
        <div className={s.rightBlock}>
          <img className={s.img} alt="shootgun image" src={shotgunImg} />
          <CopyLink />
          <Chat />
          <div className={s.buttons}>
            <button className={s.button}>Выйти</button>
            <button className={s.button}>Готов</button>
          </div>
        </div>
      </section>
    </main>
  );
});

export { LobbyPage };
