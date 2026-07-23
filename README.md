# Painel de Prestação de Contas — GDF na sua Porta

Painel para a sala da Governadora: mostra, por Região Administrativa, **o que cada órgão fez** — com o relatório abrível, a data e a fonte. Mesmo visual do Painel de Obras.

Autoria: Adacto Artur Dornas de Oliveira — SEGOV.

## De onde vêm os dados

Da mesma planilha de **Monitoramento GDF na Sua Porta**, nas abas que o **Apps Script mantém vivas** varrendo a pasta "Prestação de Contas" no Google Drive:

- **Resumo** → KPIs (edições realizadas, órgãos, entregas válidas, pendências) e o total por edição.
- **Painel** → matriz órgão × edição (entregue/pendente).
- **Entregues** → cada relatório entregue por RA, com **data e link** para abrir o arquivo.
- **CONFIG** → nome oficial de cada RA.

> A aba `INDICADORES` (números de atendimento) **não é usada** — é manual e estava desatualizada. Só entram edições que o Apps Script considera válidas (as ocultas — P008/P010/P011 — ficam de fora automaticamente).

## Arquivos

- `index.html` — o painel (snapshot embutido).
- `template.html` — molde usado pelo gerador (não publicar sozinho).
- `gerar_painel_acoes.py` — baixa a planilha e **regrava o `index.html`**.
- `vercel.json` — configuração de publicação.

## Como atualizar (snapshot + republicar)

```bash
pip install openpyxl           # só na 1ª vez
python3 gerar_painel_acoes.py  # baixa a planilha e regrava index.html
```

Depois publique o `index.html` (passo abaixo). Como o Apps Script já atualiza as abas todo dia às 7h, o ideal é **automatizar a republicação** (rodar o gerador logo após a rotina diária), para o painel nunca ficar atrás da planilha.

## Deploy — projeto novo no Vercel

**Opção A — GitHub + Vercel (recomendado, auto-publica a cada push):**
1. Crie um repositório novo (ex.: `painel-acoes-gdf`) e suba estes arquivos.
2. No Vercel: *Add New → Project → Import* o repositório. Framework: *Other*. Deploy.
3. A cada `git push` do `index.html` regerado, o Vercel republica sozinho.

**Opção B — sem GitHub:** `npm i -g vercel` e, nesta pasta, `vercel --prod`.

## Observações

- "Entregue" = a pasta da edição tem relatório em PDF, Word ou planilha. Sem auditoria de conteúdo.
- O painel funciona offline (dados embutidos) — a tela na sala não depende da internet.
