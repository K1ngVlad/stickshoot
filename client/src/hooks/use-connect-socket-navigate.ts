import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketApi } from '../api';

const useConnectSocketNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    SocketApi.setNavigate(navigate);
  }, [navigate]);
};

export { useConnectSocketNavigate };
