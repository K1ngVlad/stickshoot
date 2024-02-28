import { FC } from 'react';
import { observer } from 'mobx-react-lite';

import { PlayerItem } from './PlayerItem';
import { useRootStore } from '../../hooks';

import s from './PlayerList.module.scss';

const PlayersList: FC = observer(() => {
  const { lobby } = useRootStore().lobbyStore;

  if (!lobby) return <>Не удалось загрузить список пользователей</>;

  const { players, leader } = lobby;

  return (
    <section className={s.playersListBox}>
      <h3 className={s.title}>Игроки:</h3>
      <div className={s.playersList}>
        {players.map((player) => (
          <PlayerItem
            key={player.id + player.connectId}
            avatar={player.avatar}
            name={player.name}
            leader={leader === player.id}
          />
        ))}
      </div>
    </section>
  );
});

export { PlayersList };
