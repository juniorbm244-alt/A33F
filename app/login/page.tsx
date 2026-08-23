export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="auth-logo" href="/">A33F<span>•</span></a>
        <div className="auth-copy">
          <span className="eyebrow">ACESSO</span>
          <h1>Bem-vindo de volta.</h1>
          <p>Entre na sua conta para continuar sua experiência A33F.</p>
        </div>
        <form className="auth-form">
          <label>E-mail<input type="email" placeholder="voce@email.com" /></label>
          <label>Senha<input type="password" placeholder="Sua senha" /></label>
          <button className="primary auth-submit" type="submit">Entrar</button>
        </form>
        <div className="auth-row"><a href="#">Esqueci minha senha</a></div>
        <p className="auth-footer">Ainda não possui uma conta? <a href="/registro">Criar conta</a></p>
      </section>
    </main>
  );
}
