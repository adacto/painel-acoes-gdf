# P011 Cidade Estrutural — entregas encontradas no Drive

> Levantamento de **09/08/2026**, feito varrendo as pastas `P011 - CIDADE ESTRUTURAL`
> dos 55 órgãos dentro de "Prestação de Contas". Serve de ponte enquanto a aba
> `Entregues` não cobre esta edição.

## Por que esta lista existe

A edição da Cidade Estrutural aconteceu de **27 a 31/07/2026**, mas a RA não aparece
em nenhuma aba do monitoramento. O motivo não é falta de entrega: no Apps Script da
planilha, `P011` está em `EDICOES_OCULTAS`, e a varredura faz `continue` no código
oculto — pulando a RA inteira. Enquanto isso não mudar, `Entregues`, `Painel` e
`Pendentes` seguem sem a Estrutural, e o painel de Cobertura junto.

Os **números** do Painel de Ações Sociais, porém, **não dependem disso**: eles vêm da
aba `ACOES_SOCIAIS`. Basta criar a coluna `P011 CIDADE ESTRUTURAL` e preencher —
o gerador reconhece qualquer coluna no padrão `P0dd NOME` sozinho. Da aba `Entregues`
o gerador só puxa o *link* do relatório de cada órgão.

## Entregas (17 órgãos)

| Órgão | Enviado | Arquivo | Abrir |
|---|---|---|---|
| 003 - SSP | 30/07 | relatorio GDF NA SUA PORTA - Estrutural.pdf | [abrir](https://drive.google.com/file/d/1MGuqZKWVi3E4MlAz5kssy_cN01NVawe1/view) |
| 004 - SEDES | 31/07 | Planilha sem título | [abrir](https://docs.google.com/spreadsheets/d/1GxpMyOfM4TRl5uXdTqUAU04aecEY7O6J3N6vJ79EeQM/edit) |
| 009 - SEMOB | 03/08 | Relatório - Semana 11 | [abrir](https://drive.google.com/file/d/140QUrNrWOEAGfT9Xr9dfAURjLz4PhfOU/view) |
| 010 - DETRAN | 03/08 | Planilha GDF NA SUA PORTA - 11ª EDIÇÃO - ESTRUTURAL - EDUCAÇÃO DE TRÂNSITO.xlsx | [abrir](https://drive.google.com/file/d/1co0gqyTNDoc18jlMoi9UZbCp-3Z3Q_dy/view) |
| 011 - CAESB | 04/08 | Relatório GDF na Sua Porta - Estrutural.pdf | [abrir](https://drive.google.com/file/d/1RfvOkL1g1tOvU7APyjICUCcmRRTSwrm4/view) |
| 018 - SLU | 04/08 | 6 subpastas de serviço (coleta, seletiva, varrição, frisagem, catação, papa-lixo) | [abrir](https://drive.google.com/file/d/1RpJlsqZOD-P0sQvYm7qcAzy_KWVx0d6d/view) |
| 021 - Na Hora | 31/07 | PLANILHA DE ATENDIMENTO - ESTRUTURAL 27 A 31 DE JULHO.pdf | [abrir](https://drive.google.com/file/d/1KH7Weoz8Qf2oT38dcPEGWM6rhtxuSKaT/view) |
| 027 - Ouvidoria Geral | 05/08 | Infografico_GDF_na_Sua_Porta_Cidade_Estrutural_RA_XXV_27a31_jul_2026.pdf | [abrir](https://drive.google.com/file/d/1w6NH1J5UDkhbmpc9oD1IC5u9RdK77qdf/view) |
| 030 - Juventude (SEJUVE) | 05/08 | Relatorio_SEJUVE_Estrutural_Julho2026.pdf | [abrir](https://drive.google.com/file/d/1ODbIMgMV7pHJBPOYzvbU7t5pxAxkEt7m/view) |
| 031 - SEMA | 07/08 | RELATÓRIO - GDF NA SUA PORTA - ESTRUTURAL.pdf | [abrir](https://drive.google.com/file/d/1iKuaXAnOeo2wkh-Du4vmXEPmCLZvh-39/view) |
| 034 - Atendimento a Comunidade | 07/08 | Atendimento_em_Movimento_Estrutural_11Edicao_v11.pdf | [abrir](https://drive.google.com/file/d/1UGaKYGMV5264kk8B1LKgJ4_0lxa0m0Yn/view) |
| 036 - SEL | 03/08 | Relatórios COP Estrutural 27.07 a 31.07 (inscritos + matriculados) | [abrir](https://drive.google.com/file/d/1LdiGBDgVghcRMlbmMk1IqG9nNSd_5qnj/view) |
| 037 - CULTURA | 05/08 | Cidade Estrutural.pdf | [abrir](https://drive.google.com/file/d/18ZbXzy-_jAAubZ_p-8t0PBh0KTEDVZja/view) |
| 040 - CODHAB | 05/08 | Relatorio de atendimento - GDF na sua porta - ESTRUTURAL.pdf | [abrir](https://drive.google.com/file/d/1AFD3yKnQvW1Rd_4IhGForIMXkbfXv19g/view) |
| 041 - TERRACAP | 30/07 | Dados - Terracap | [abrir](https://docs.google.com/spreadsheets/d/1-C0WJ-Lumm4v7_dnp5A2GtVsswB7QePvZE54y1MFeqo/edit) |
| 044 - Família | 03/08 | RELATÓRIO Cidade Estrutural.pdf | [abrir](https://drive.google.com/file/d/1EBJ-nNk8fc0yXOmU7H2oqBzUKLyFpGbm/view) |
| 048 - SERINTER | 31/07 | gdf relatório.docx | [abrir](https://drive.google.com/file/d/1QOn46ObAKxImoooIzLefz87DaJ_JCtq4/view) |

## O que ainda falta

1. Ler cada relatório e apurar o total de atendimentos do órgão (o método da casa:
   somar as sub-áreas, como foi validado com a SES = SAIS + SUSAM + SVS).
2. Lançar na aba `ACOES_SOCIAIS`, coluna `P011 CIDADE ESTRUTURAL`, um número por órgão.
3. Lançar as mesmas linhas na aba `ATENDIMENTOS` (com o link do relatório), que é a
   base auditável — hoje as duas batem exatamente (251.321 atendimentos, 27 órgãos).
4. Rodar `gerar_painel_social.py` e `gerar_painel_acoes.py` e dar push.

## Observações do levantamento

- **001 - SES não entregou** para esta edição. Como a SES responde por ~68% de todos os
  atendimentos do programa (171.660 de 251.321), o total da Estrutural fica muito abaixo
  do real até esse relatório chegar. Vale cobrar antes de apresentar a RA.

- **018 - SLU** entregou em 6 subpastas por serviço, não em arquivo único. A varredura
  desce até 4 níveis, então conta como entregue; mas os dados dela são de zeladoria
  (toneladas, km, m²) e entram no bloco de "unidade própria", fora do total de
  atendimentos a pessoas — igual às outras edições.

- **004 - SEDES** entregou uma planilha chamada "Planilha sem título" e **031 - SEMA**
  tem um cronograma de visita de embaixadas junto do relatório. Valem conferência.

