const dissconnectEvent = (setLoading: (value: boolean) => void): void => {
  console.log('websocket disconnected');
  setLoading(false);
};

export { dissconnectEvent };
