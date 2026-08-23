const promos = [
  { icon: '🎁', eyebrow: 'BOAS-VINDAS', title: 'Bônus no primeiro depósito', text: 'Campanha demonstrativa para apresentação visual. Regras e percentuais serão definidos antes da produção.', className: 'promo-purple' },
  { icon: '🎯', eyebrow: 'MISSÕES', title: 'Centro de atividades', text: 'Acompanhe campanhas, desafios e novidades da plataforma A33F.', className: 'promo-gold' },
  { icon: '👥', eyebrow: 'INDICAÇÃO', title: 'Convide amigos', text: 'Programa de indicação em modo demonstrativo, preparado para futura configuração.', className: 'promo-blue' },
  { icon: '⚡', eyebrow: 'NOVIDADES', title: 'Eventos especiais', text: 'Área preparada para campanhas temporárias, torneios e destaques.', className: 'promo-purple' },
];

export default function PromotionsPage() {
  return (
    <main className="casino-page">
      <header className="casino-header">
        <a className="casino-logo" href="/"><span className="logo-a">A</span><span>33F</span><b>♛</b></a>
        <div className="casino-actions"><a className="casino-login" href="/login">Entrar</a><a className="casino-signup" href="/registro">Criar conta</a></div>
      </header>
      <section className="casino-shell">
        <section className="casino-hero" style={{minHeight: '280px'}}>
          <div className="casino-hero-copy">
            <span className="casino-kicker">A33F PROMOÇÕES</span>
            <div className="hero-brand"><span>A</span>33F</div>
            <h1>Ofertas, atividades e novidades em um só lugar.</h1>
            <p>Esta versão exibe campanhas demonstrativas enquanto a plataforma permanece em desenvolvimento.</p>
          </div>
          <div className="casino-hero-art" aria-hidden="true"><div className="hero-chip chip-one">🎁</div><div className="hero-chip chip-two">★</div></div>
        </section>

        <section className="casino-promo-grid">
          {promos.map((promo) => <article className={`promo-tile ${promo.className}`} key={promo.title}><span>{promo.icon}</span><div><small>{promo.eyebrow}</small><h3>{promo.title}</h3><p>{promo.text}</p></div><a href="/registro">Participar</a></article>)}
        </section>
        <p className="responsible-note">18+ • Jogue com responsabilidade. Promoções desta versão são ilustrativas e não representam oferta financeira ativa.</p>
      </section>
      <nav className="casino-bottom-nav"><a href="/"><span>⌂</span><small>Início</small></a><a className="active" href="/promocoes"><span>🎁</span><small>Promoções</small></a><a className="deposit-main" href="/carteira"><span>＋</span><small>Depósito</small></a><a href="/carteira"><span>▣</span><small>Saque</small></a><a href="/painel"><span>◉</span><small>Perfil</small></a></nav>
    </main>
  );
}
