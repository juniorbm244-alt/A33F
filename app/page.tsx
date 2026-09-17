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
        <div className="casino-actions">
          <a className="casino-login" href="/login">Entrar</a>
          <a className="casino-signup" href="/registro">Registrar</a>
        </div>
      </header>

      <section className="casino-shell">
        <section className="casino-hero">
          <div className="casino-hero-copy">
            <span className="casino-kicker">A NOVA EXPERIÊNCIA DIGITAL</span>
            <div className="hero-brand"><span>A</span>33F</div>
            <h1>Entre na experiência A33F.</h1>
            <p>Uma interface moderna, rápida e criada para reunir entretenimento, novidades e jogos demonstrativos em um só lugar.</p>
            <a className="casino-cta" href="/registro">CRIAR MINHA CONTA <span>→</span></a>
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
          <div><small>DESTAQUE DA PLATAFORMA</small><strong>150%</strong><span>EXPERIÊNCIA DE BOAS-VINDAS</span><p>Campanhas demonstrativas • condições a definir</p></div>
          <div className="bonus-gift">🎁</div>
          <a href="/promocoes">EXPLORAR</a>
        </section>

        <nav className="casino-categories" aria-label="Categorias">
          {categories.map((category, index) => (
            <a key={category.label} className={index === 0 ? 'category active' : 'category'} href={category.label === 'Promoções' ? '/promocoes' : '/jogos'}>
              <span>{category.icon}</span><small>{category.label}</small>
            </a>
          ))}
        </nav>

        <section className="casino-section" id="jogos">
          <div className="casino-section-head"><div><span>SELEÇÃO A33F</span><h2>Jogos em destaque</h2></div><a href="/jogos">Ver todos →</a></div>
          <div className="game-grid">
            {games.map((game) => (
              <a className="game-card" key={game.title} href="/jogos">
                <div className={`game-cover ${game.className}`}><em>{game.tag}</em><div className="game-symbol">{game.symbol}</div><div className="game-glow"/></div>
                <div className="game-info"><strong>{game.title}</strong><small>A33F Originals</small></div>
              </a>
            ))}
          </div>
        </section>

        <section className="casino-promo-grid">
          <article className="promo-tile promo-purple"><span>🎁</span><div><small>CAMPANHAS</small><h3>Ofertas e novidades</h3><p>Confira as campanhas disponíveis na plataforma.</p></div><a href="/promocoes">Ver ofertas →</a></article>
          <article className="promo-tile promo-gold"><span>🏆</span><div><small>ATIVIDADES</small><h3>Missões especiais</h3><p>Acompanhe novidades, eventos e benefícios.</p></div><a href="/promocoes">Explorar →</a></article>
          <article className="promo-tile promo-blue"><span>👥</span><div><small>COMUNIDADE</small><h3>Convide seus amigos</h3><p>Compartilhe a experiência A33F com sua comunidade.</p></div><a href="/registro">Participar →</a></article>
        </section>

        <section className="casino-app-banner">
          <div><small>EXPERIÊNCIA MOBILE-FIRST</small><h2>Perfeito no celular e no computador.</h2><p>Navegação fluida, visual premium e acesso rápido às principais áreas.</p><div className="app-buttons"><a href="/registro">Começar agora</a><a href="/login">Já tenho conta</a></div></div>
          <div className="mini-phone"><div className="mini-phone-screen"><span className="logo-a">A</span><strong>33F</strong><small>EXPERIENCE</small></div></div>
        </section>

        <p className="responsible-note">18+ • Jogue com responsabilidade. Esta versão apresenta conteúdo, valores e jogos demonstrativos.</p>
      </section>

      <nav className="casino-bottom-nav">
        <a className="active" href="/"><span>⌂</span><small>Início</small></a>
        <a href="/promocoes"><span>🎁</span><small>Promoções</small></a>
        <a className="deposit-main" href="/carteira"><span>＋</span><small>Carteira</small></a>
        <a href="/jogos"><span>▣</span><small>Jogos</small></a>
        <a href="/painel"><span>◉</span><small>Perfil</small></a>
      </nav>
    </main>
  );
}
