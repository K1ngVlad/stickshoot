import { FC, FormEvent } from 'react';
import { Message } from './Message';

import s from './Chat.module.scss';

const messages = [
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
  { name: 'LOL', text: 'dasdsadasdsadadasdasdasdasdasdasdasdsadasdsad' },
];

const Chat: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={s.chat}>
      <div className={s.chatField}>
        {messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </div>
      <form className={s.chatForm} onSubmit={onSubmitHandler}>
        <input className={s.input} />
        <button className={s.button}>Отправить</button>
      </form>
    </section>
  );
};

export { Chat };
