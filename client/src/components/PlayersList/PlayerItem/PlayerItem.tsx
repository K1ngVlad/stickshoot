import { FC } from 'react';

import s from './PlayerItem.module.scss';

interface Props {
  name: string;
  avatar: string;
}

const PlayerItem: FC<Props> = ({ name, avatar }) => {
  return (
    <article className={s.PlayerItem}>
      <img
        draggable={false}
        className={s.playerAvatar}
        alt="avatar"
        src={avatar}
      />
      <span className={s.playerName}>{name}</span>
    </article>
  );
};

export { PlayerItem };
