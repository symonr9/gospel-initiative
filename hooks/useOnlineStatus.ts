import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// Usage:
//   const isOnline = useOnlineStatus();

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ? state.isConnected : false);
    });

    return () => unsubscribe();
  }, []);

  return isOnline;
};

export default useOnlineStatus;