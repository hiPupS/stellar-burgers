import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { loginUserApi } from '@api';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    loginUserApi({ email, password })
      .then((res) => {
        if (res.success && res.refreshToken && res.accessToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorText(err?.message || 'Ошибка входа');
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
