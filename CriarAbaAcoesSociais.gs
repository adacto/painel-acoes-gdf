/**
 * Cria a aba ACOES_SOCIAIS — matriz órgão x RA do Painel de Ações Sociais.
 *
 * A aba é VIVA: cada célula é um SUMIFS sobre a aba ATENDIMENTOS, contando
 * apenas as linhas com VIGENTE = SIM. Quando entra um relatório novo em
 * ATENDIMENTOS, a RA correspondente e o total geral se atualizam sozinhos.
 * Nada é digitado à mão nesta aba.
 *
 * A lista de órgãos da coluna A também é viva: sai de ATENDIMENTOS por
 * UNIQUE, então um órgão novo aparece aqui sem ninguém precisar cadastrá-lo.
 *
 * Autoria: Adacto Artur Dornas de Oliveira — SEGOV
 */

var ACOES_ABA = 'ACOES_SOCIAIS';
var ACOES_LINHAS = 80;   // capacidade de órgãos (hoje são 27)

var ACOES_RAS = [
  'P001 ITAPOÃ',
  'P002 PARANOÁ',
  'P003 RIACHO FUNDO II',
  'P004 SAMAMBAIA',
  'P005 26 DE SETEMBRO',
  'P006 CEILÂNDIA',
  'P007 PLANALTINA',
  'P008 PLANO PILOTO',
  'P009 SÃO SEBASTIÃO',
  'P010 RECANTO DAS EMAS'
];

function criarAbaAcoesSociais() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss.getSheetByName('ATENDIMENTOS')) {
    throw new Error('Aba ATENDIMENTOS não encontrada. Nada foi criado.');
  }
  if (ss.getSheetByName(ACOES_ABA)) {
    throw new Error('A aba ' + ACOES_ABA + ' já existe. Nada foi alterado. ' +
                    'Se quiser refazê-la, renomeie ou apague a atual antes.');
  }

  var sh = ss.insertSheet(ACOES_ABA);
  var nCols = 1 + ACOES_RAS.length + 1;   // Orgao + 10 RAs + TOTAL

  // ---------- cabeçalho ----------
  var hdr = ['Orgao'].concat(ACOES_RAS).concat(['TOTAL']);
  sh.getRange(1, 1, 1, nCols).setValues([hdr])
    .setFontWeight('bold').setWrap(true).setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  sh.setFrozenColumns(1);

  // ---------- coluna A: lista viva de órgãos ----------
  sh.getRange('A2').setFormula(
    '=SORT(UNIQUE(FILTER(ATENDIMENTOS!$A$2:$A,' +
    ' ATENDIMENTOS!$A$2:$A<>"", ATENDIMENTOS!$I$2:$I="SIM")))'
  );

  // ---------- grade de SUMIFS ----------
  var linhas = [];
  for (var r = 2; r <= ACOES_LINHAS + 1; r++) {
    var linha = [];
    for (var c = 2; c <= 1 + ACOES_RAS.length; c++) {
      var col = colunaLetra_(c);
      linha.push(
        '=IF($A' + r + '="","",SUMIFS(ATENDIMENTOS!$E$2:$E,' +
        ' ATENDIMENTOS!$A$2:$A,$A' + r + ',' +
        ' ATENDIMENTOS!$B$2:$B,LEFT(' + col + '$1,4),' +
        ' ATENDIMENTOS!$I$2:$I,"SIM"))'
      );
    }
    var ini = colunaLetra_(2), fim = colunaLetra_(1 + ACOES_RAS.length);
    linha.push('=IF($A' + r + '="","",SUM(' + ini + r + ':' + fim + r + '))');
    linhas.push(linha);
  }
  sh.getRange(2, 2, ACOES_LINHAS, nCols - 1).setFormulas(linhas);

  // ---------- conferência ----------
  var colTotal = colunaLetra_(nCols);
  sh.getRange(1, nCols + 2).setValue('CONFERE — TOTAL GERAL').setFontWeight('bold');
  sh.getRange(2, nCols + 2).setFormula(
    '=SUM(' + colTotal + '2:' + colTotal + (ACOES_LINHAS + 1) + ')'
  );
  sh.getRange(3, nCols + 2).setValue(
    'Aba gerada por fórmula. Não digite nada aqui: os números vêm de ATENDIMENTOS ' +
    '(somente linhas com VIGENTE = SIM). Para corrigir um número, corrija a linha ' +
    'do relatório em ATENDIMENTOS.'
  ).setWrap(true);

  // ---------- formato ----------
  sh.getRange(2, 2, ACOES_LINHAS, nCols - 1).setNumberFormat('#,##0');
  sh.setColumnWidth(1, 220);
  for (var c2 = 2; c2 <= nCols; c2++) sh.setColumnWidth(c2, 105);
  sh.setColumnWidth(nCols + 2, 320);

  SpreadsheetApp.flush();
  var total = sh.getRange(2, nCols + 2).getValue();
  Logger.log('Aba ' + ACOES_ABA + ' criada. Total geral: ' + total);
  SpreadsheetApp.getUi().alert(
    'Aba ' + ACOES_ABA + ' criada.\n\nTotal geral de atendimentos: ' + total +
    '\n\nO esperado hoje é 247.626. Se bater, está correto.'
  );
}

function colunaLetra_(n) {
  var s = '';
  while (n > 0) {
    var m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = (n - m - 1) / 26;
  }
  return s;
}
