export default function LoginPage() {
  return (
    <main className="casino-auth-page">
      <section className="casino-auth-visual">
        <div className="auth-visual-copy">
          <div className="auth-brand"><span>A</span>33F</div>
          <h2>Sua diversão começa aqui.</h2>
          <p>Acesse sua conta para explorar jogos, promoções e sua área A33F.</p>
        </div>
      </section>

      <section className="casino-auth-panel">
        <div className="casino-auth-card">
          <a className="casino-auth-back" href="/">← Voltar para a home</a>
          <a className="casino-auth-logo" href="/"><span>A</span>33F<b>♛</b></a>
          <div className="casino-auth-copy">
            <small>ACESSO A33F</small>
            <h1>Bem-vindo de volta.</h1>
            <p>Entre na sua conta para continuar sua experiência.</p>
          </div>
          <form className="casino-auth-form">
            <label>E-mail<input type="email" placeholder="seu@email.com" /></label>
            <label>Senha<input type="password" placeholder="••••••••" /></label>
            <button className="casino-auth-submit" type="submit">Entrar</button>
          </form>
          <div className="casino-auth-row"><span>18+ • Jogue com responsabilidade</span><a href="#">Esqueci minha senha</a></div>
          <p className="casino-auth-footer">Ainda não possui uma conta? <a href="/registro">Criar conta</a></p>
          <p className="casino-auth-legal">Ambiente em desenvolvimento. Recursos financeiros permanecem em sandbox até a conclusão das integrações e requisitos aplicáveis.</p>
        </div>
      </section>
    </main>
  );
}
