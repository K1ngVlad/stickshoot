import { FC } from 'react';

import s from './Popup.module.scss';
import { useRootStore } from '../../hooks';

interface Props {
  text: string;
}

const Popup: FC<Props> = ({ text }) => {
  const { closePopup } = useRootStore().popupStore;

  return (
    <div onClick={closePopup} className={s.popupContainer}>
      <div onClick={(e) => e.stopPropagation()} className={s.popup}>
        <p className={s.text}>{text}</p>
        <button onClick={closePopup} className={s.button}>
          Ок
        </button>
      </div>
    </div>
  );
};

export { Popup };
