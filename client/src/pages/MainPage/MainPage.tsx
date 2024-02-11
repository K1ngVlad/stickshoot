import { FC } from 'react';
import { Link } from 'react-router-dom';
import { joinPath } from '../../routes';
import { targetImg, shotgunImg } from '../../assets';
import s from './MainPage.module.scss';

const MainPage: FC = () => {
  return (
    <main className={s.main}>
      <section className={s.top}>
        <div className={s.title}>
          <h1 className={s.titleText}>STICKSHOOT</h1>
          <img className={s.titleLogo} src={targetImg} alt="target icon" />
        </div>

        <h2 className={s.subTittle}>Раз в год и палка стреляет!</h2>
        <p className={s.description}>
          Увлекательная онлайн игра, завоевавшая более 0 поклонников по всему
          миру!
        </p>
        <Link to={joinPath} className={s.link}>
          Создать комнату
        </Link>
      </section>
      <section className={s.imgBox}>
        <img className={s.img} src={shotgunImg} alt="shotgun icon" />
      </section>
    </main>
  );
};

export { MainPage };
