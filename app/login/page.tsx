'use client';

import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) {
      setMessage('Preencha seu e-mail e sua senha.');
      return;
    }
    setMessage('A autenticação será conectada ao backend na próxima etapa.');
  }

  return (
    <main className="casino-auth-page">
      <section className="casino-auth-visual">
        <div className="auth-visual-copy"><div className="auth-brand"><span>A</span>33F</div><h2>Sua experiência começa aqui.</h2><p>Um ambiente moderno, rápido e preparado para sua próxima experiência digital.</p></div>
      </section>
      <section className="casino-auth-panel">
        <div className="casino-auth-card">
          <a className="casino-auth-back" href="/">← Voltar para a home</a>
          <a className="casino-auth-logo" href="/"><span>A</span>33F<b>♛</b></a>
          <div className="casino-auth-copy"><small>ACESSO A33F</small><h1>Bem-vindo de volta.</h1><p>Entre para continuar.</p></div>
          <form className="casino-auth-form" onSubmit={handleSubmit}>
            <label>E-mail<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="seu@email.com" autoComplete="email" /></label>
            <label>Senha<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" autoComplete="current-password" /></label>
            <button className="casino-auth-submit" type="submit">Entrar →</button>
          </form>
          {message && <p role="status" className="casino-auth-message">{message}</p>}
          <div className="casino-auth-row"><span>18+ • Jogue com responsabilidade</span><a href="#">Esqueci minha senha</a></div>
          <p className="casino-auth-footer">Ainda não possui uma conta? <a href="/registro">Criar conta</a></p>
          <p className="casino-auth-legal">Ambiente em desenvolvimento. Recursos financeiros permanecem em sandbox até a conclusão das integrações e requisitos aplicáveis.</p>
        </div>
      </section>
    </main>
  );
}
