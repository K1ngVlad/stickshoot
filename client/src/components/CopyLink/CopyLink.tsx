import { FC } from 'react';

import s from './CopyLink.module.scss';
import { useRootStore } from '../../hooks';

const url = 'dasdasdsadasdasdasas';

const CopyLink: FC = () => {
  const { lobby } = useRootStore().lobbyStore;

  //   if (!lobby) return <></>;

  //   const { url } = lobby;

  return (
    <div className={s.copyLink}>
      <div>{url}</div>
      <button>Копировать</button>
    </div>
  );
};

export { CopyLink };
