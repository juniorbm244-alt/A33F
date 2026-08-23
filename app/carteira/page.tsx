'use client';

import { useEffect, useState } from 'react';

type Entry = { id: string; paymentId: string; type: string; amountCents: number; status: string; createdAt: string; };

export default function CarteiraPage() {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [amount, setAmount] = useState('50');
  const [loading, setLoading] = useState(false);

  async function refresh() {
    const response = await fetch('/api/wallet/sandbox?customerId=sandbox-user', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    setBalance(data.balanceCents ?? 0);
    setEntries(data.entries ?? []);
  }

  useEffect(() => { refresh(); }, []);

  async function deposit() {
    const reais = Number(amount.replace(',', '.'));
    if (!Number.isFinite(reais) || reais <= 0) return;
    setLoading(true);
    try {
      await fetch('/api/payments/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountCents: Math.round(reais * 100), customerId: 'sandbox-user', description: 'A33F sandbox deposit', idempotencyKey: crypto.randomUUID() }),
      });
      await refresh();
    } finally { setLoading(false); }
  }

  return (
    <main className="dashboard-page">
      <header className="header"><a className="logo" href="/">A33F<span>•</span></a><nav><a href="/">Início</a><a href="/painel">Painel</a><a href="/carteira">Carteira</a></nav><a className="ghost" href="/painel">Voltar</a></header>
      <section className="dashboard-hero"><div><span className="eyebrow">CARTEIRA • SANDBOX</span><h1>Seu saldo de teste</h1><p>Ambiente de demonstração. Nenhum valor aqui representa dinheiro real.</p></div><div className="profile-badge">A3</div></section>
      <section className="dashboard-content">
        <article className="panel-card"><span className="eyebrow">SALDO DISPONÍVEL</span><div className="wallet-balance">R$ {(balance / 100).toFixed(2).replace('.', ',')}</div><p className="muted">BRL • ambiente sandbox</p><div className="deposit-row"><input aria-label="Valor do depósito" value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal"/><button className="primary large" onClick={deposit} disabled={loading}>{loading ? 'Processando...' : 'Depositar teste'}</button></div></article>
        <article className="panel-card"><div className="section-head"><div><span className="eyebrow">HISTÓRICO</span><h2>Transações</h2></div></div>{entries.length === 0 ? <p className="muted empty">Nenhuma transação de teste ainda.</p> : <div className="activity-list">{entries.map((entry) => <div key={entry.id}><span className="activity-dot"/><div><strong>Depósito • R$ {(entry.amountCents / 100).toFixed(2).replace('.', ',')}</strong><small>{entry.status} • {new Date(entry.createdAt).toLocaleString('pt-BR')}</small></div></div>)}</div>}</article>
      </section>
      <nav className="bottom-nav"><a href="/">⌂<span>Início</span></a><a href="/painel">◉<span>Painel</span></a><a href="/carteira">▣<span>Carteira</span></a><a href="#">◌<span>Conta</span></a></nav>
    </main>
  );
}
