export default function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="auth-logo" href="/">A33F<span>•</span></a>
        <div className="auth-copy">
          <span className="eyebrow">NOVA CONTA</span>
          <h1>Comece sua experiência.</h1>
          <p>Crie seu acesso A33F em poucos passos.</p>
        </div>
        <form className="auth-form">
          <label>Nome<input type="text" placeholder="Seu nome" /></label>
          <label>E-mail<input type="email" placeholder="voce@email.com" /></label>
          <label>Senha<input type="password" placeholder="Crie uma senha" /></label>
          <button className="primary auth-submit" type="submit">Criar conta</button>
        </form>
        <p className="auth-footer">Já possui uma conta? <a href="/login">Entrar</a></p>
      </section>
    </main>
  );
}
