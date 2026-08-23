const categories = ['Popular', 'Novidades', 'Destaques', 'Ao vivo'];
const cards = ['Experiência 01', 'Experiência 02', 'Experiência 03', 'Experiência 04', 'Experiência 05', 'Experiência 06'];

export default function Home() {
  return (
    <main>
      <header className="header"><div className="logo">A33F<span>•</span></div><nav><a>Início</a><a>Explorar</a><a>Promoções</a><a>Ajuda</a></nav><div className="actions"><button className="ghost">Entrar</button><button className="primary">Criar conta</button></div></header>
      <section className="hero"><div className="hero-copy"><div className="eyebrow">NOVA EXPERIÊNCIA DIGITAL</div><h1>Entre em uma nova experiência.</h1><p>Uma interface rápida, elegante e criada para funcionar perfeitamente no seu celular.</p><button className="primary large">Explorar agora</button></div><div className="hero-art"><div className="orb orb-a"/><div className="orb orb-b"/><div className="grid-art"/></div></section>
      <section className="quick-grid"><article><span>01</span><h3>Primeiros passos</h3><p>Conheça a A33F.</p></article><article><span>02</span><h3>Destaques</h3><p>Veja o que está em alta.</p></article></section>
      <section className="section"><div className="section-head"><div><span className="eyebrow">EXPLORE</span><h2>Escolha uma categoria</h2></div></div><div className="chips">{categories.map((c, i) => <button className={i === 0 ? 'chip active' : 'chip'} key={c}>{c}</button>)}</div></section>
      <section className="section"><div className="section-head"><div><span className="eyebrow">EM DESTAQUE</span><h2>Conteúdo selecionado</h2></div><button className="link">Ver tudo →</button></div><div className="cards">{cards.map((c, i) => <article className="card" key={c}><div className={`card-image image-${i + 1}`}><span>A33F</span></div><div className="card-body"><small>DESTAQUE</small><h3>{c}</h3></div></article>)}</div></section>
      <section className="promo"><div><span className="eyebrow">A33F NO SEU CELULAR</span><h2>Uma experiência feita para caber na sua mão.</h2><p>Continue sua experiência onde estiver.</p><div className="store-buttons"><button className="store"> App Store</button><button className="store">▶ Google Play</button></div></div><div className="phone"><div className="phone-screen"><strong>A33F</strong><span>Seu ritmo. Sua experiência.</span></div></div></section>
      <footer><div className="logo">A33F<span>•</span></div><div className="footer-links"><a>Sobre</a><a>Termos</a><a>Privacidade</a><a>Segurança</a><a>Suporte</a></div><small>© 2026 A33F. Todos os direitos reservados.</small></footer>
      <nav className="bottom-nav"><a>⌂<span>Início</span></a><a>✦<span>Explorar</span></a><a>◈<span>Promoções</span></a><a>◉<span>Conta</span></a></nav>
    </main>
  );
}
