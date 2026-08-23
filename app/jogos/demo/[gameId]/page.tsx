type DemoGamePageProps = {
  params: Promise<{ gameId: string }>;
  searchParams: Promise<{ session?: string; returnUrl?: string }>;
};

export default async function DemoGamePage({ params, searchParams }: DemoGamePageProps) {
  const { gameId } = await params;
  const { session, returnUrl } = await searchParams;
  const safeReturnUrl = returnUrl?.startsWith('/') ? returnUrl : '/';

  return (
    <main className="casino-page">
      <header className="casino-header">
        <a className="casino-logo" href="/"><span className="logo-a">A</span><span>33F</span><b>♛</b></a>
        <a className="casino-login" href={safeReturnUrl}>Sair do demo</a>
      </header>
      <section className="casino-shell">
        <section className="casino-hero" style={{ minHeight: '520px', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div className="casino-hero-copy" style={{ maxWidth: '620px' }}>
            <span className="casino-kicker">MODO DEMONSTRAÇÃO</span>
            <div className="hero-brand"><span>A</span>33F</div>
            <h1>{decodeURIComponent(gameId).replaceAll('-', ' ')}</h1>
            <p>Esta tela simula a sessão que será substituída pelo iframe ou launch URL do provedor de jogos contratado.</p>
            <p style={{ fontSize: '11px' }}>Sessão: {session ?? 'não informada'} • Sem apostas e sem saldo real.</p>
            <a className="casino-cta" href={safeReturnUrl}>VOLTAR PARA A A33F</a>
          </div>
        </section>
      </section>
    </main>
  );
}
