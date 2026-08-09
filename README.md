# Painéis GDF na sua Porta

Dois painéis para a sala da Governadora, mesmo visual do Painel de Obras. O link do Vercel abre no painel principal (Ações Sociais); o de Cobertura fica a um clique, pelo botão no cabeçalho.

Autoria: Adacto Artur Dornas de Oliveira — SEGOV.

## Os dois painéis

- **`index.html` — Painel de Ações Sociais (principal).** Volume absoluto de atendimentos por órgão, do maior para o menor. Grandes números no topo, atendimentos por região, e o detalhe de cada órgão por RA ao clicar. Bloco à parte de "métricas de unidade própria" (bem-estar animal, zeladoria), que não entram no total de atendimentos a pessoas.
- **`cobertura.html` — Painel de Cobertura / Prestação de Contas (secundário, em `/cobertura`).** Mostra, por RA, o que cada órgão entregou — com o relatório abrível, a data e a fonte.

Cada painel tem um botão no cabeçalho para o outro.

## De onde vêm os dados

Da planilha **Monitoramento GDF na Sua Porta**, nas abas que o **Apps Script mantém vivas** varrendo o Google Drive:

- **Ações Sociais:** matriz órgão × RA = total de atendimentos. Os números saem **de dentro dos relatórios de cada órgão** (links da aba Entregues), somando as sub-áreas — o método validado com a SES (SAIS+SUSAM+SVS). A aba `ACOES_SOCIAIS` **já existe na planilha e é ela que o gerador lê**; o `ACOES_SOCIAIS_modelo.xlsx` local ficou como fallback, usado só se a aba sumir.
- **Cobertura:** abas `Resumo`, `Painel`, `Entregues`, `CONFIG`. A aba `INDICADORES` **não é usada**.

> Os números de Ações Sociais são um **levantamento-rascunho**, sem auditoria dos órgãos. Ressalvas em `ACOES_SOCIAIS_levantamento_NOTAS.md`.

### RA nova entra sem mexer em código

O gerador descobre as RAs pelo cabeçalho da matriz: **toda coluna no padrão `P0dd NOME` vira
uma RA no painel**. Para uma edição nova aparecer, basta criar a coluna na aba `ACOES_SOCIAIS`
e preencher os números.

> ⚠️ **`EDICOES_OCULTAS` (Apps Script) não afeta estes números.** Ela desliga a edição na
> varredura do Drive, o que esvazia `Entregues`/`Painel`/`Pendentes` — logo atinge o painel de
> **Cobertura** e o *link* do relatório de cada órgão, não o total de atendimentos. Uma RA pode
> aparecer no painel de Ações Sociais mesmo com a varredura desligada para ela.

Caso concreto em aberto: **P011 Cidade Estrutural** (edição de 27 a 31/07/2026) — 17 órgãos já
entregaram no Drive, mas a RA está oculta na varredura e ainda não tem coluna na matriz. A lista
das entregas, com links, está em `P011_ENTREGAS_CIDADE_ESTRUTURAL.md`.

## Arquivos

- `index.html` / `cobertura.html` — os painéis (snapshot embutido, funcionam offline).
- `template_social.html` / `template.html` — moldes dos geradores (não publicar sozinhos).
- `gerar_painel_social.py` — regrava o `index.html` (Ações Sociais).
- `gerar_painel_acoes.py` — regrava o `cobertura.html` (Cobertura).
- `ACOES_SOCIAIS_modelo.xlsx` — matriz de atendimentos (fonte do painel de Ações Sociais).
- `vercel.json` — configuração de publicação (`cleanUrls`, então `/cobertura` funciona).

## Como atualizar (snapshot + republicar)

```bash
pip install openpyxl            # só na 1ª vez
python3 gerar_painel_social.py  # regrava index.html (Ações Sociais)
python3 gerar_painel_acoes.py   # regrava cobertura.html (Cobertura)
```

Depois `git push` — o Vercel republica sozinho a cada push.
