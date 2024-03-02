import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Message } from './Message';
import { useRootStore } from '../../hooks';

import s from './Chat.module.scss';

const Chat: FC = () => {
  const [text, setText] = useState<string>('');

  const chatFieldRef = useRef<null | HTMLDivElement>(null);

  const { lobbyStore, socketStore } = useRootStore();
  const { lobby, playerId } = lobbyStore;
  const { socket } = socketStore;

  useEffect(() => {
    const chatField = chatFieldRef.current;
    chatField?.scrollTo(0, chatField.scrollHeight);
  }, [lobby?.messages]);

  if (!lobby) return <></>;

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket) {
      const { players } = lobby;
      const player = players.find((player) => player.id === playerId);
      if (player) {
        const { name } = player;
        console.log(name);
        socket.emit('send-message', { name, text });
      }
    }
    setText('');
  };

  return (
    <section className={s.chat}>
      <div ref={chatFieldRef} className={s.chatField}>
        {lobby.messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </div>
      <form className={s.chatForm} onSubmit={onSubmitHandler}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={s.input}
        />
        <button className={s.button}>Отправить</button>
      </form>
    </section>
  );
};

export { Chat };
