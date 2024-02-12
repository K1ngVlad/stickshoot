import { FC, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SocketApi } from '../../api';
import { lobbyPath } from '../../routes';
import { PlayerForm } from '../../components';
import { CreatePlayer } from '../../types';
import s from './JoinPage.module.scss';
import { useRootStore } from '../../hooks';

interface PlaceholderRef {
  current: string;
}

const JoinPage: FC = () => {
  const rootStore = useRootStore();
  const { lobby } = useParams();
  const navigate = useNavigate();

  if (!rootStore) return <></>;

  const onSubmitHandler = (
    event: FormEvent<HTMLFormElement>,
    data: CreatePlayer,
    placeholderRef: PlaceholderRef
  ) => {
    event.preventDefault();

    const { setLoading } = rootStore.socketStore;

    setLoading(true);

    if (lobby) {
      SocketApi.emit('join-lobby', {
        ...data,
        name: data.name ? data.name : placeholderRef.current,
        url: lobby,
      });
    } else {
      SocketApi.emit('create-lobby', {
        ...data,
        name: data.name ? data.name : placeholderRef.current,
      });
    }

    navigate(lobbyPath);
  };

  return (
    <main className={s.create}>
      <h2 className={s.title}>Создать игру</h2>
      <PlayerForm onSubmitHandler={onSubmitHandler} />
    </main>
  );
};

export { JoinPage };
