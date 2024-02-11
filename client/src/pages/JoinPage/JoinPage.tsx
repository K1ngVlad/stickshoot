import { FC, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { SocketApi } from '../../api';

import { PlayerForm } from '../../components';
import { CreatePlayer } from '../../types';
import s from './JoinPage.module.scss';

const JoinPage: FC = () => {
  const { lobby } = useParams();

  const onSubmitHandler = (
    event: FormEvent<HTMLFormElement>,
    data: CreatePlayer
  ) => {
    event.preventDefault();

    if (lobby) {
      SocketApi.emit('join-lobby', { ...data, url: lobby });
    } else {
      SocketApi.emit('create-lobby', data);
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
