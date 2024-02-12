const errorEvent = (setLoading: (value: boolean) => void): void => {
  console.error('An error occurred while connecting');
  setLoading(false);
};

export { errorEvent };
