import React, { useEffect } from 'react';
import { TMemo } from '@shared/components/TMemo';
import { useTRPGSelector } from '@shared/hooks/useTRPGSelector';
import { useHistory } from 'react-router';

export const LoginCheck: React.FC = TMemo(() => {
  const isTryLogin = useTRPGSelector((state) => state.user.isTryLogin);
  const isLogin = useTRPGSelector((state) => state.user.isLogin);
  const history = useHistory();

  useEffect(() => {
    if (isTryLogin === false && isLogin === false) {
      history.push('/login');
    }
  }, [isTryLogin, isLogin]);

  return null;
});
LoginCheck.displayName = 'LoginCheck';
