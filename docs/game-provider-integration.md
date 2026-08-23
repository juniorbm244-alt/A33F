# A33F — Integração de Provedores de Jogos

## Modos

A A33F possui dois modos de jogo:

- `demo`: ativo com o provedor `mock`, sem dinheiro real.
- `real`: implementado como fluxo protegido, mas bloqueado até que todos os gates técnicos, regulatórios e de provedor estejam concluídos.

## Rotas

- `GET /api/games` — catálogo normalizado.
- `POST /api/games/launch` — abre sessão demo ou real.
- `GET /api/games/real-readiness` — mostra os gates de produção pendentes sem revelar segredos.
- `POST /api/games/callback` — recebe eventos assinados do provedor.

## Segurança do modo real

O `mode=real` nunca confia em `playerId`, KYC, idade, geolocalização ou autoexclusão enviados pelo navegador.

Para jogo real, o endpoint exige uma sessão de jogador assinada pelo backend usando HMAC-SHA256. A sessão contém somente claims de elegibilidade, sem CPF, imagem facial ou outros dados biométricos brutos.

Claims mínimas verificadas:

- identidade/KYC confirmado;
- maioridade confirmada;
- biometria confirmada;
- ausência de autoexclusão específica e centralizada;
- ausência de impedimento;
- geolocalização válida no Brasil e verificada nos últimos 30 minutos;
- limite de perda configurado;
- limite de tempo configurado;
- aceite de jogo responsável.

## Gates de produção

`GET /api/games/real-readiness` exige simultaneamente:

- integração de código real revisada (`REAL_MONEY_CODE_READY`);
- `REAL_MONEY_MODE_ENABLED=true`;
- operador autorizado;
- domínio de marca `.bet.br`;
- provedor real selecionado e em produção;
- credenciais e webhook do provedor;
- sessão assinada do jogador;
- banco transacional persistente;
- ledger imutável/persistente;
- carteira real;
- KYC/idade/biometria;
- geolocalização de produção;
- autoexclusão centralizada e específica;
- verificação de pessoas impedidas;
- AML;
- limites prudenciais obrigatórios;
- bloqueio de jogos não certificados.

As variáveis de ambiente, sozinhas, não liberam dinheiro real. `REAL_MONEY_CODE_READY` fica `false` em código até que o adaptador real do provedor e o ledger idempotente sejam implementados e revisados.

## Callback financeiro

O callback valida assinatura HMAC e payload. Em `sandbox`, nenhum dinheiro real é movimentado. Em `production`, callbacks são bloqueados enquanto o readiness não estiver completo.

Antes de habilitar `REAL_MONEY_CODE_READY`, o callback deverá gravar `bet`, `win` e `rollback` de forma idempotente no ledger persistente e somente responder sucesso depois da confirmação transacional.

## Integração com provedor

Cada fornecedor deve implementar `GameProviderAdapter`. A interface da A33F permanece estável e a lógica específica do fornecedor fica isolada no backend.

O provedor/agregador deve entregar:

1. endpoints de sandbox e produção;
2. credenciais de servidor;
3. catálogo de jogos;
4. launch/session API;
5. callbacks de bet/win/refund/rollback;
6. assinatura de callbacks e política de replay;
7. idempotência e reconciliação;
8. disponibilidade por país/moeda/dispositivo;
9. evidência de certificação e liberação dos jogos para a operação.

## Variáveis principais

```env
GAME_PROVIDER=mock
GAME_PROVIDER_MODE=sandbox
REAL_MONEY_MODE_ENABLED=false
BETTING_OPERATOR_AUTHORIZED=false
BETTING_OPERATOR_BRAND_DOMAIN=
A33F_PLAYER_SESSION_SECRET=
LEDGER_MODE=sandbox
WALLET_MODE=sandbox
KYC_MODE=sandbox
GEOLOCATION_MODE=sandbox
SELF_EXCLUSION_MODE=sandbox
PROHIBITED_PERSONS_CHECK_MODE=sandbox
AML_MODE=sandbox
RESPONSIBLE_GAMING_LIMITS_REQUIRED=false
GAME_CERTIFICATION_ENFORCED=false
```

Nunca commitar segredos reais no repositório. Use o secret manager da hospedagem.
