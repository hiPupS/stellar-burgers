import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { getUserApi, updateUserApi } from '@api';

export const Profile: FC = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);

  useEffect(() => {
    getUserApi()
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
          setFormValue({
            name: res.user.name,
            email: res.user.email,
            password: ''
          });
        }
      })
      .catch(() => {
        setUpdateUserError('Не удалось загрузить данные пользователя');
      });
  }, []);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError(null);
    const payload: { name?: string; email?: string; password?: string } = {
      name: formValue.name,
      email: formValue.email
    };
    if (formValue.password) {
      payload.password = formValue.password;
    }
    updateUserApi(payload)
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user);
          setFormValue({
            name: res.user.name,
            email: res.user.email,
            password: ''
          });
        }
      })
      .catch((err) => {
        setUpdateUserError(err?.message || 'Не удалось сохранить изменения');
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
    setUpdateUserError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError || undefined}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
