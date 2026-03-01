import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../services/slices';
import { selectAuthError } from '../../services/selectors';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorText = useSelector(selectAuthError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ name: userName, email, password }));
  };

  return (
    <RegisterUI
      errorText={errorText ?? ''}
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
