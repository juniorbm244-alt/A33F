export default function RegisterPage() {
  return (
    <main className="casino-auth-page">
      <section className="casino-auth-visual">
        <div className="auth-visual-copy">
          <div className="auth-brand"><span>A</span>33F</div>
          <h2>Crie sua conta e explore a A33F.</h2>
          <p>Cadastro simples, experiência mobile-first e recursos financeiros mantidos em sandbox nesta fase.</p>
        </div>
      </section>

      <section className="casino-auth-panel">
        <div className="casino-auth-card">
          <a className="casino-auth-back" href="/">← Voltar para a home</a>
          <a className="casino-auth-logo" href="/"><span>A</span>33F<b>♛</b></a>
          <div className="casino-auth-copy">
            <small>NOVA CONTA</small>
            <h1>Criar conta</h1>
            <p>Preencha seus dados para começar.</p>
          </div>
          <form className="casino-auth-form">
            <label>Nome completo<input type="text" placeholder="Digite seu nome" /></label>
            <label>E-mail<input type="email" placeholder="seu@email.com" /></label>
            <label>Senha<input type="password" placeholder="Mínimo 6 caracteres" /></label>
            <label>Confirmar senha<input type="password" placeholder="Confirme sua senha" /></label>
            <label className="casino-check"><input type="checkbox" /><span>Confirmo que tenho 18 anos ou mais e aceito os termos de uso.</span></label>
            <button className="casino-auth-submit" type="submit">Criar conta</button>
          </form>
          <p className="casino-auth-footer">Já possui uma conta? <a href="/login">Entrar</a></p>
          <p className="casino-auth-legal">Versão de desenvolvimento. Bônus, pagamentos e operações financeiras exibidos na interface são demonstrativos até a implantação do ambiente de produção.</p>
        </div>
      </section>
    </main>
  );
}
