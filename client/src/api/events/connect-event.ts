const connectEvent = (setLoading: (value: boolean) => void): void => {
  console.log('websocket connected');
  setLoading(false);
};

export { connectEvent };
