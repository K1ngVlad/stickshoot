import { makeAutoObservable } from 'mobx';

class PopupStore {
  active: boolean = false;
  text: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  openPopup = (text: string): void => {
    this.active = true;
    this.text = text;
  };

  closePopup = (): void => {
    this.active = false;
  };
}

const popupStore = new PopupStore();

export { popupStore, PopupStore };
