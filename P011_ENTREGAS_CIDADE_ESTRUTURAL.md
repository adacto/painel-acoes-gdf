# P011 Cidade Estrutural — entregas e apuração

> Levantamento e apuração de **09/08/2026**, lendo os relatórios que os órgãos
> entregaram nas pastas `P011 - CIDADE ESTRUTURAL` dentro de "Prestação de Contas".

## Por que este arquivo existe

A edição da Cidade Estrutural aconteceu de **27 a 31/07/2026** e 17 órgãos entregaram
relatório, mas a RA não aparece em nenhuma aba do monitoramento: no Apps Script,
`P011` está em `EDICOES_OCULTAS`, e a varredura faz `continue` no código oculto —
pulando a RA inteira. Sem `Entregues`, ninguém enxerga que os relatórios chegaram.

Os **números** do Painel de Ações Sociais não dependem da varredura: vêm da aba
`ACOES_SOCIAIS`. Enquanto a coluna `P011 CIDADE ESTRUTURAL` não existir lá, o
`ACOES_SOCIAIS_extra.csv` deste repositório faz a ponte — e é ignorado sozinho
assim que a coluna entrar na planilha.

## Apuração — 11 órgãos. 15.224 atendimentos

| Órgão | Atendimentos | De onde saiu |
|---|---:|---|
| 001 - SES | 9.896 | SAIS 9.473 + SUSAM 0 + SVS 423 — planilha *Relatórios de Atendimentos SES/DF*. coluna "11ª EDIÇÃO - ESTRUTURAL" |
| 021 - Na Hora | 2.287 | TOTAL da planilha de atendimento (soma dos guichês: PCDF 890. DPDF 371. SEDES 364. CAESB 171. CODHAB 154. …) |
| 010 - DETRAN | 1.720 | "TOTAL Público Atendido" da planilha de Educação de Trânsito (650+250+270+250+300) |
| 040 - CODHAB | 498 | Carreta da Regularização — 69+106+109+94+120. total declarado no próprio relatório |
| 034 - Atendimento a Comunidade | 301 | "Atendimento em Movimento" — TOTAL de demandas (122 CPF). ⚠️ o relatório traz ainda "48 atendimentos lúdicos"; ver ressalva |
| 004 - SEDES | 277 | "Total de Famílias atendidas" (63+66+71+77). ⚠️ o formulário veio com "Território: planaltina" no cabeçalho — erro de preenchimento |
| 027 - Ouvidoria Geral | 94 | 94 manifestações únicas (Participa-DF. deduplicadas por protocolo) — 43 reclamações. 26 solicitações. 23 elogios |
| 036 - SEL | 56 | Matriculados no Centro Olímpico (lista de 03/08). ⚠️ há também 24 inscritos. com nomes que se repetem entre as listas |
| 030 - Juventude | 50 | 50 cadastros em 4 oficinas (dança. barbeiro. influencer. confeitaria) |
| 044 - Família | 39 | "aproximadamente 39" atendimentos — Família Protegida + Família Resiliente |
| 009 - SEMOB | 6 | 6 atendimentos (3 ouvidoria. 2 cartão BRB. 1 motorista de aplicativo) |
| **TOTAL** | **15.224** | |

### Método

Mesmo critério das edições anteriores: um número por órgão, o total de atendimentos a
pessoas, somando as sub-áreas quando o relatório vem repartido. Para a SES isso é
**SAIS + SUSAM + SVS** — o critério foi conferido contra as 9 edições já lançadas e
**reproduz exatamente** o número histórico em 8 delas (a exceção é Recanto das Emas,
onde a planilha da SES foi atualizada depois do lançamento: hoje dá 14.027 contra os
13.626 lançados).

### Ressalvas antes de apresentar

- **SUSAM (saúde mental) está zerada** na coluna da Estrutural. Nas outras edições ela
  trouxe de 149 a 795 atendimentos, então o número da SES ainda deve crescer.

- **034 - Atendimento a Comunidade**: usei as **301 demandas**. O relatório também traz
  "48 atendimentos" (só os lúdicos) e 122 CPF. Se a casa contar diferente, é trocar a linha.

- **036 - SEL**: usei os **56 matriculados**. Há uma lista separada de 24 inscritos, com
  nomes repetidos entre as duas — somar daria dupla contagem.

- **004 - SEDES**: o formulário veio com "Território: planaltina" no cabeçalho. O arquivo
  está na pasta da Estrutural e as datas batem, mas vale confirmar com a SEDES.

- **021 - Na Hora**: o total de 2.287 é a soma dos guichês do posto, incluindo SEDES (364),
  CODHAB (154) e CAESB (171). É a mesma convenção das edições anteriores, então mantive —
  mas é uma sobreposição conhecida com os números próprios desses órgãos.

## Participação especial (fora do total de atendimentos)

| Órgão | Entrega |
|---|---|
| 018 - SLU | 6 subpastas de serviço (coleta, seletiva, varrição, frisagem, catação, papa-lixo) — zeladoria, entra no bloco de unidade própria |
| 037 - CULTURA | ≈480 livros distribuídos (Mala do Livro) — entrega, não atendimento a pessoa |
| 003 - SSP | relatório entregue — segurança pública, já é participação especial no painel |
| 011 - CAESB | relatório entregue — saneamento, participação especial (e já contabilizada dentro do guichê da Na Hora) |
| 031 - SEMA | relatório entregue — meio ambiente, participação especial |
| 041 - TERRACAP | "Dados - Terracap" — patrimonial, participação especial |
| 048 - SERINTER | relatório entregue — relações internacionais, participação especial |

## O que ainda depende de alguém

1. **Aba `ACOES_SOCIAIS`**: criar a coluna `P011 CIDADE ESTRUTURAL` e colar os números da
   tabela acima. Aí o `ACOES_SOCIAIS_extra.csv` pode ser apagado (o gerador avisa quando
   os dois existem e passa a usar só a planilha).

2. **Aba `ATENDIMENTOS`**: as mesmas linhas, com o link do relatório — é a base auditável.

3. **Apps Script**: tirar `P011` de `EDICOES_OCULTAS` e rodar "Atualizar agora", para o
   painel de **Cobertura** e os links dos relatórios passarem a incluir a RA.

4. Cobrar a **SUSAM** e conferir as ressalvas acima.

