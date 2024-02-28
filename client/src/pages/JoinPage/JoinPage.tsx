import { FC, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { SocketApi } from '../../api';
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

  if (!rootStore) return <></>;

  const onSubmitHandler = (
    event: FormEvent<HTMLFormElement>,
    data: CreatePlayer,
    placeholderRef: PlaceholderRef
  ) => {
    event.preventDefault();

    const { setLoading } = rootStore.socketStore;

    setLoading(true);

    const { name, avatar, userId } = data;

    if (lobby) {
      SocketApi.emit('join-lobby', {
        avatar,
        name: name ? name : placeholderRef.current,
        url: lobby,
        userId,
      });
    } else {
      SocketApi.emit('create-lobby', {
        avatar,
        name: name ? name : placeholderRef.current,
      });
    }
  };

  return (
    <main className={s.create}>
      <h2 className={s.title}>Создать игру</h2>
      <PlayerForm onSubmitHandler={onSubmitHandler} />
    </main>
  );
};

export { JoinPage };
