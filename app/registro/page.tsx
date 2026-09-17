'use client';

import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const confirmPassword = String(form.get('confirmPassword') || '');
    if (!accepted) return setMessage('Confirme que você tem 18 anos ou mais para continuar.');
    if (password !== confirmPassword) return setMessage('As senhas não conferem.');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, accepted }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível criar a conta.');
      window.location.href = '/';
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Erro ao criar conta.');
      setLoading(false);
    }
  }

  return (
    <main className="casino-auth-page">
      <section className="casino-auth-visual"><div className="auth-visual-copy"><div className="auth-brand"><span>A</span>33F</div><h2>Crie sua conta na A33F.</h2><p>Cadastro simples, visual premium e experiência otimizada para celular e computador.</p></div></section>
      <section className="casino-auth-panel"><div className="casino-auth-card">
        <a className="casino-auth-back" href="/">← Voltar para a home</a>
        <a className="casino-auth-logo" href="/"><span>A</span>33F<b>♛</b></a>
        <div className="casino-auth-copy"><small>NOVA CONTA</small><h1>Comece agora.</h1><p>Crie seu acesso em poucos passos.</p></div>
        <form className="casino-auth-form" onSubmit={handleSubmit}>
          <label>Nome completo<input name="name" type="text" placeholder="Digite seu nome" autoComplete="name" required /></label>
          <label>E-mail<input name="email" type="email" placeholder="seu@email.com" autoComplete="email" required /></label>
          <label>Senha<input name="password" type="password" placeholder="Mínimo 6 caracteres" minLength={6} autoComplete="new-password" required /></label>
          <label>Confirmar senha<input name="confirmPassword" type="password" placeholder="Confirme sua senha" minLength={6} autoComplete="new-password" required /></label>
          <label className="casino-check"><input checked={accepted} onChange={(event) => setAccepted(event.target.checked)} type="checkbox" /><span>Confirmo que tenho 18 anos ou mais e aceito os termos de uso.</span></label>
          <button className="casino-auth-submit" type="submit" disabled={loading}>{loading ? 'Criando conta...' : 'Criar conta →'}</button>
        </form>
        {message && <p role="alert" className="casino-auth-message">{message}</p>}
        <p className="casino-auth-footer">Já possui uma conta? <a href="/login">Entrar</a></p>
        <p className="casino-auth-legal">Versão de desenvolvimento. Bônus, pagamentos e operações financeiras são demonstrativos até a implantação do ambiente de produção.</p>
      </div></section>
    </main>
  );
}
