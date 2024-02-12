import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyLink, PlayersList } from '../../components';
import { useRootStore } from '../../hooks';
import { mainPath } from '../../routes';
import { shotgunImg } from '../../assets';
import s from './LobbyPage.module.scss';

const LobbyPage: FC = () => {
  const { lobby } = useRootStore().lobbyStore;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!lobby) {
  //     navigate(mainPath);
  //   }
  // }, [lobby, navigate]);

  return (
    <main className={s.lobby}>
      <section className={s.lobbyBlock}>
        <PlayersList />
        <div className={s.rightBlock}>
          <img className={s.img} alt="shootgun image" src={shotgunImg} />
          <CopyLink />
        </div>
      </section>
    </main>
  );
};

export { LobbyPage };
