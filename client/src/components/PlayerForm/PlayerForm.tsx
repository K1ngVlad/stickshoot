import { FC, FormEvent, useRef, useState } from 'react';
import { CreatePlayer } from '../../types';
import { avatars, targetImg, undoImg } from '../../assets';
import { ranNum } from './helpers';
import s from './PlayerForm.module.scss';
import { placeholders } from './constants';

interface Props {
  onSubmitHandler: (
    event: FormEvent<HTMLFormElement>,
    data: CreatePlayer,
    placeholderRef: {
      current: string;
    }
  ) => void;
}

const PlayerForm: FC<Props> = ({ onSubmitHandler }) => {
  const numRef = useRef<number>(ranNum(avatars.length));
  const placeholderRef = useRef<string>(
    `${placeholders[ranNum(placeholders.length)]}${ranNum(999999)}`
  );

  const [data, setData] = useState<CreatePlayer>({
    name: '',
    avatar: avatars[numRef.current],
  });

  const { name, avatar } = data;

  const onClickHandler = () => {
    numRef.current =
      numRef.current + 1 < avatars.length ? numRef.current + 1 : 0;

    setData((data) => ({ ...data, avatar: avatars[numRef.current] }));
  };

  return (
    <form
      className={s.playerForm}
      onSubmit={(e) => onSubmitHandler(e, data, placeholderRef)}
    >
      <div className={s.left}>
        <div className={s.imgBox}>
          <img className={s.img} alt="avatar" src={avatar} />
          <button
            type="button"
            onClick={onClickHandler}
            className={s.refresh}
            aria-label="refresh avatar"
          >
            <img className={s.refreshImg} alt="refresh avatar" src={undoImg} />
          </button>
        </div>
        <p className={s.wanted}>Wanted</p>
      </div>
      <div className={s.right}>
        <label className={s.label}>
          <p className={s.name}>Имя:</p>
          <input
            className={s.nameInput}
            value={name}
            placeholder={placeholderRef.current}
            onChange={(e) =>
              setData((data) => ({ ...data, name: e.target.value }))
            }
          />
        </label>
        <button className={s.start} aria-label="Начать">
          <span className={s.startText}>Начать</span>
          <img className={s.startIcon} alt="Начать" src={targetImg} />
        </button>
      </div>
    </form>
  );
};

export { PlayerForm };
