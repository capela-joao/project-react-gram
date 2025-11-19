import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log('Usuário logado:', res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Faça o login para poder utilizar o Blog!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Entrar
          </button>
        )}
        {loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
