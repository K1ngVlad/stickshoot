import { FC } from 'react';

import s from './Mesage.module.scss';

interface Props {
  name: string;
  text: string;
}

const Message: FC<Props> = ({ name, text }) => {
  return (
    <p className={`${s.text} ${name === 'Система' && s.gold}`}>
      <span className={s.author}>{name}:</span>
      {text}
    </p>
  );
};

export { Message };
