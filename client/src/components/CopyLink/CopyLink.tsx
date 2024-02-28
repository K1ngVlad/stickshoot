import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../hooks';

import s from './CopyLink.module.scss';

const CopyLink: FC = observer(() => {
  const { lobby } = useRootStore().lobbyStore;

  if (!lobby) return <></>;

  const { url } = lobby;

  const onClickHeandler = async () => {
    try {
      navigator.clipboard.writeText(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.copyLink}>
      <div className={s.url}>{url}</div>
      <button className={s.button} onClick={onClickHeandler}>
        Копировать
      </button>
    </div>
  );
});

export { CopyLink };
