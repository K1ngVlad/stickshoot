import { FC } from 'react';
import { crownImg } from '../../../assets';

import s from './PlayerItem.module.scss';

interface Props {
  name: string;
  avatar: string;
  leader: boolean;
}

const PlayerItem: FC<Props> = ({ name, avatar, leader }) => {
  return (
    <article className={s.PlayerItem}>
      <img
        draggable={false}
        className={s.playerAvatar}
        alt="avatar"
        src={avatar}
      />
      <span className={s.playerName}>{name}</span>

      {leader && (
        <div className={s.leader}>
          <img alt="leader" src={crownImg} />
        </div>
      )}
    </article>
  );
};

export { PlayerItem };
