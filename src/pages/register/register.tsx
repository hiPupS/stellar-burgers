import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');
    registerUserApi({ name: userName, email, password })
      .then((res) => {
        if (res.success && res.refreshToken && res.accessToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken);
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorText(err?.message || 'Ошибка регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
