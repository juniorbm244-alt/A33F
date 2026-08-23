# A33F — Integração de Provedores de Jogos

## Estado atual

A integração permanece em `mock`/`sandbox`. Nenhum jogo ou transação financeira real é processado.

## Arquitetura

- `GET /api/games` — catálogo normalizado de jogos.
- `POST /api/games/launch` — cria sessão e devolve `launchUrl`.
- `POST /api/games/callback` — endpoint genérico para callbacks assinados do provedor.
- `lib/games/types.ts` — contrato interno estável da A33F.
- `lib/games/registry.ts` — seleciona o adaptador ativo via `GAME_PROVIDER`.
- `lib/games/mock-provider.ts` — provedor de demonstração.

## Dados necessários de um provedor/agregador

1. URL base de sandbox e produção.
2. API key/client id/client secret ou método equivalente.
3. Documentação do catálogo de jogos.
4. Documentação de criação de sessão/launch URL.
5. Formato de callback/webhook e mecanismo de assinatura.
6. Lista de IPs para allowlist, quando aplicável.
7. Política de idempotência e identificadores de transação.
8. Fluxo de bet, win, refund/rollback e reconciliação.
9. Catálogo com país, moeda, idioma, dispositivo e disponibilidade por jogo.
10. Evidências de certificação e liberação dos jogos aplicáveis ao mercado em que a A33F operar.

## Requisitos antes de ativar `production`

- Operador autorizado para a jurisdição aplicável.
- Contrato ativo com provedor/agregador autorizado para atender a operação.
- Jogos certificados e aprovados conforme exigências regulatórias aplicáveis.
- Persistência transacional em banco de dados.
- Ledger imutável e reconciliação financeira.
- Idempotência persistente para callbacks e transações.
- Autenticação real do jogador; nunca confiar em `playerId` enviado pelo cliente.
- Validação de idade, KYC/AML e regras de impedimento aplicáveis.
- Limites, autoexclusão, jogo responsável e controles de risco.
- Webhooks assinados com proteção contra replay.
- Segredos somente no backend/secret manager da hospedagem.
- Observabilidade, auditoria e alertas.

## Variáveis

```env
GAME_PROVIDER=mock
GAME_PROVIDER_MODE=sandbox
GAME_PROVIDER_BASE_URL=
GAME_PROVIDER_API_KEY=
GAME_PROVIDER_WEBHOOK_SECRET=
```

## Regra de segurança

Enquanto `GAME_PROVIDER=mock` ou `GAME_PROVIDER_MODE` for diferente de `production`, a A33F não habilita `mode=real` no endpoint de launch.

Ao adicionar um provedor real, crie um novo adaptador implementando `GameProviderAdapter`; não coloque lógica específica do fornecedor nas páginas da interface.
