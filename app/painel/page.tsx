const stats = [
  { label: 'Atividade', value: '12' },
  { label: 'Favoritos', value: '08' },
  { label: 'Notificações', value: '03' },
];

export default function PainelPage() {
  return (
    <main className="dashboard-page">
      <header className="header">
        <div className="logo">A33F<span>•</span></div>
        <nav><a href="/">Início</a><a href="/painel">Painel</a><a href="/promocoes">Promoções</a></nav>
        <div className="actions"><button className="ghost">Sair</button></div>
      </header>

      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">PAINEL A33F</span>
          <h1>Olá, visitante.</h1>
          <p>Gerencie sua experiência, preferências e atividades em um único lugar.</p>
        </div>
        <div className="profile-badge">A3</div>
      </section>

      <section className="dashboard-grid">
        {stats.map((stat) => (
          <article className="dashboard-card" key={stat.label}>
            <small>{stat.label}</small>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-content">
        <article className="panel-card">
          <div className="section-head"><div><span className="eyebrow">CONTA</span><h2>Seu perfil</h2></div></div>
          <div className="profile-row"><div className="avatar">A3</div><div><strong>Visitante A33F</strong><p>Conta demonstrativa</p></div></div>
          <button className="primary large">Editar perfil</button>
        </article>

        <article className="panel-card">
          <div className="section-head"><div><span className="eyebrow">ATIVIDADE</span><h2>Atividade recente</h2></div></div>
          <div className="activity-list">
            <div><span className="activity-dot"/><div><strong>Acesso realizado</strong><small>Agora</small></div></div>
            <div><span className="activity-dot"/><div><strong>Preferências atualizadas</strong><small>Hoje</small></div></div>
            <div><span className="activity-dot"/><div><strong>Experiência adicionada</strong><small>Ontem</small></div></div>
          </div>
        </article>
      </section>

      <section className="panel-card wallet-demo">
        <div><span className="eyebrow">ÁREA PREPARADA</span><h2>Carteira</h2><p>Interface demonstrativa preparada para futuras integrações autorizadas. Nenhuma movimentação financeira real é realizada nesta versão.</p></div>
        <div className="wallet-value">R$ 0,00</div>
      </section>

      <nav className="bottom-nav"><a href="/">⌂<span>Início</span></a><a href="/painel">◉<span>Painel</span></a><a href="/promocoes">✦<span>Promoções</span></a><a href="#">◌<span>Conta</span></a></nav>
    </main>
  );
}
