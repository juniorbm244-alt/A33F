const categories = [
  { icon: '🔥', label: 'Popular' },
  { icon: '🎰', label: 'Slots' },
  { icon: '🎥', label: 'Ao vivo' },
  { icon: '⚽', label: 'Esportes' },
  { icon: '🎁', label: 'Promoções' },
];

const games = [
  { title: 'Sweet Rush', tag: 'POPULAR', className: 'game-pink', symbol: '🍭' },
  { title: 'Gates of Glory', tag: 'HOT', className: 'game-gold', symbol: '⚡' },
  { title: 'Neon Roulette', tag: 'AO VIVO', className: 'game-purple', symbol: '🎯' },
  { title: 'Lucky Dragon', tag: 'NOVO', className: 'game-red', symbol: '🐉' },
  { title: 'Blackjack Elite', tag: 'AO VIVO', className: 'game-blue', symbol: '🂡' },
  { title: 'Diamond Spin', tag: 'DESTAQUE', className: 'game-cyan', symbol: '💎' },
];

export default function Home() {
  return (
    <main className="casino-page">
      <header className="casino-header">
        <a className="casino-logo" href="/"><span className="logo-a">A</span><span>33F</span><b>♛</b></a>
        <div className="casino-actions"><a className="casino-login" href="/login">Entrar</a><a className="casino-signup" href="/registro">Criar conta</a></div>
      </header>

      <section className="casino-shell">
        <section className="casino-hero">
          <div className="casino-hero-copy">
            <span className="casino-kicker">BEM-VINDO AO</span>
            <div className="hero-brand"><span>A</span>33F</div>
            <h1>Diversão, emoção e uma experiência feita para jogar.</h1>
            <p>Explore jogos, cassino ao vivo, promoções e novidades em uma plataforma mobile-first.</p>
            <a className="casino-cta" href="/registro">JOGUE AGORA</a>
          </div>
          <div className="casino-hero-art" aria-hidden="true">
            <div className="roulette-ring"><span>33</span></div>
            <div className="hero-chip chip-one">A33F</div>
            <div className="hero-chip chip-two">★</div>
            <div className="hero-card card-a">A♠</div>
            <div className="hero-card card-k">K♦</div>
          </div>
        </section>

        <section className="bonus-banner">
          <div><small>BÔNUS DE BOAS-VINDAS</small><strong>150%</strong><span>NO PRIMEIRO DEPÓSITO</span><p>Oferta demonstrativa • condições a definir</p></div>
          <div className="bonus-gift">🎁</div>
          <a href="/registro">VER PROMOÇÃO</a>
        </section>

        <nav className="casino-categories" aria-label="Categorias">
          {categories.map((category, index) => <a key={category.label} className={index === 0 ? 'category active' : 'category'} href={category.label === 'Promoções' ? '/promocoes' : '#jogos'}><span>{category.icon}</span><small>{category.label}</small></a>)}
        </nav>

        <section className="casino-section" id="jogos">
          <div className="casino-section-head"><div><span>EM DESTAQUE</span><h2>Jogos populares</h2></div><button>Ver todos</button></div>
          <div className="game-grid">
            {games.map((game) => (
              <article className="game-card" key={game.title}>
                <div className={`game-cover ${game.className}`}><em>{game.tag}</em><div className="game-symbol">{game.symbol}</div><div className="game-glow"/></div>
                <div className="game-info"><strong>{game.title}</strong><small>A33F Originals</small></div>
              </article>
            ))}
          </div>
        </section>

        <section className="casino-promo-grid">
          <article className="promo-tile promo-purple"><span>🎁</span><div><small>PRIMEIRO DEPÓSITO</small><h3>Bônus especial de boas-vindas</h3><p>Veja regras e condições da campanha.</p></div><a href="/promocoes">Ver oferta</a></article>
          <article className="promo-tile promo-gold"><span>🏆</span><div><small>CENTRO DE ATIVIDADES</small><h3>Missões e novidades</h3><p>Acompanhe campanhas e eventos da A33F.</p></div><a href="/promocoes">Explorar</a></article>
          <article className="promo-tile promo-blue"><span>👥</span><div><small>CONVIDE AMIGOS</small><h3>Compartilhe a A33F</h3><p>Programa de indicação em modo demonstrativo.</p></div><a href="/registro">Participar</a></article>
        </section>

        <section className="casino-app-banner">
          <div><small>A33F NO SEU CELULAR</small><h2>Leve o cassino com você.</h2><p>Interface rápida, responsiva e otimizada para smartphones.</p><div className="app-buttons"><button>Android</button><button>iOS</button></div></div>
          <div className="mini-phone"><div className="mini-phone-screen"><span className="logo-a">A</span><strong>33F</strong><small>CASINO</small></div></div>
        </section>

        <p className="responsible-note">18+ • Jogue com responsabilidade. Valores, bônus e jogos exibidos nesta versão são demonstrativos.</p>
      </section>

      <nav className="casino-bottom-nav">
        <a className="active" href="/"><span>⌂</span><small>Início</small></a>
        <a href="/promocoes"><span>🎁</span><small>Promoções</small></a>
        <a className="deposit-main" href="/carteira"><span>＋</span><small>Depósito</small></a>
        <a href="/carteira"><span>▣</span><small>Saque</small></a>
        <a href="/painel"><span>◉</span><small>Perfil</small></a>
      </nav>
    </main>
  );
}
