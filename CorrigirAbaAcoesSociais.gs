/**
 * Corrige as fórmulas da aba ACOES_SOCIAIS.
 *
 * Motivo: o separador de argumentos das fórmulas depende do idioma da
 * planilha (vírgula em locale americano, ponto e vírgula em português).
 * Este script descobre qual dos dois a planilha aceita — testando de
 * verdade, não adivinhando — e reescreve as fórmulas no formato certo.
 *
 * Não cria nem apaga aba nenhuma. Não toca em ATENDIMENTOS.
 *
 * Autoria: Adacto Artur Dornas de Oliveira — SEGOV
 */

var ACOES_ABA = 'ACOES_SOCIAIS';
var ACOES_LINHAS = 80;
var ACOES_NRAS = 10;   // colunas B..K

function corrigirAbaAcoesSociais() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(ACOES_ABA);
  if (!sh) {
    throw new Error('Aba ' + ACOES_ABA + ' não encontrada. Nada foi alterado.');
  }
  if (!ss.getSheetByName('ATENDIMENTOS')) {
    throw new Error('Aba ATENDIMENTOS não encontrada. Nada foi alterado.');
  }

  var SEP = descobrirSeparador_(sh);
  var nCols = 1 + ACOES_NRAS + 1;          // A + 10 RAs + TOTAL = 12 (L)
  var colIni = 'B', colFim = colunaLetra_(1 + ACOES_NRAS);   // B .. K
  var colTotal = colunaLetra_(nCols);                        // L

  // ---------- limpa as fórmulas antigas (só a grade, não o cabeçalho) ----------
  sh.getRange(2, 1, ACOES_LINHAS, nCols).clearContent();
  sh.getRange(2, nCols + 2).clearContent();

  // ---------- coluna A: lista viva de órgãos ----------
  sh.getRange('A2').setFormula(
    '=SORT(UNIQUE(FILTER(ATENDIMENTOS!$A$2:$A' + SEP +
    'ATENDIMENTOS!$A$2:$A<>""' + SEP + 'ATENDIMENTOS!$I$2:$I="SIM")))'
  );

  // ---------- grade de SUMIFS ----------
  var linhas = [];
  for (var r = 2; r <= ACOES_LINHAS + 1; r++) {
    var linha = [];
    for (var c = 2; c <= 1 + ACOES_NRAS; c++) {
      var col = colunaLetra_(c);
      linha.push(
        '=IF($A' + r + '=""' + SEP + '""' + SEP +
        'SUMIFS(ATENDIMENTOS!$E$2:$E' + SEP +
        'ATENDIMENTOS!$A$2:$A' + SEP + '$A' + r + SEP +
        'ATENDIMENTOS!$B$2:$B' + SEP + 'LEFT(' + col + '$1' + SEP + '4)' + SEP +
        'ATENDIMENTOS!$I$2:$I' + SEP + '"SIM"))'
      );
    }
    linha.push(
      '=IF($A' + r + '=""' + SEP + '""' + SEP +
      'SUM(' + colIni + r + ':' + colFim + r + '))'
    );
    linhas.push(linha);
  }
  sh.getRange(2, 2, ACOES_LINHAS, nCols - 1).setFormulas(linhas);

  // ---------- conferência ----------
  sh.getRange(2, nCols + 2).setFormula(
    '=SUM(' + colTotal + '2:' + colTotal + (ACOES_LINHAS + 1) + ')'
  );

  sh.getRange(2, 2, ACOES_LINHAS, nCols - 1).setNumberFormat('#,##0');

  SpreadsheetApp.flush();

  var total = sh.getRange(2, nCols + 2).getValue();
  var primeiro = sh.getRange('A2').getValue();
  var msg = 'Separador aceito por esta planilha: "' + SEP + '"\n' +
            'Primeiro órgão da lista: ' + primeiro + '\n' +
            'Total geral de atendimentos: ' + total + '\n\n' +
            (total === 247626
              ? 'Bate com o esperado (247.626). Pode gerar o painel.'
              : 'ATENÇÃO: o esperado era 247.626. NÃO gere o painel — confira antes.');
  Logger.log(msg);
  SpreadsheetApp.getUi().alert(msg);
}

/**
 * Descobre o separador de argumentos que esta planilha aceita, escrevendo
 * uma fórmula de teste numa célula distante e lendo o resultado.
 */
function descobrirSeparador_(sh) {
  var alvo = sh.getRange(ACOES_LINHAS + 20, 20);   // bem longe da grade
  alvo.setFormula('=SUM(1,2)');
  SpreadsheetApp.flush();
  var ok = (alvo.getValue() === 3);
  alvo.clearContent();
  return ok ? ',' : ';';
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
