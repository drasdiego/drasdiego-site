import type { Guide, TableCell } from './blog';

const CLIENTES = "codigo\tcliente\n1042\tAna Lima\n1015\tBruno Reis\n1088\tCarla Dias\n1023\tDavi Nunes\n1060\tElisa Prado\n1037\tFabio Souza\n1071\tGisele Alves";
const PEDIDOS = "codigo\n1042\n1015\n1088\n1023\n1060\n1037\n1071\n1050\n1099";
const PT_SEM = "=PROCV(A2;Clientes!A$2:B$8;2)";
const PT_FALSO = "=PROCV(A2;Clientes!A$2:B$8;2;FALSO)";
const PT_CONTA = "=SOMARPRODUTO(--É.NÃO.DISP(C2:C10))";
const PT_CONFERE = "=CONT.SE(Clientes!A$2:A$8;A2)";
const PT_PROCX = "=PROCX(A2;Clientes!A$2:A$8;Clientes!B$2:B$8)";
const EN_SEM = '=VLOOKUP(A2,Clientes!A$2:B$8,2)';
const EN_FALSO = '=VLOOKUP(A2,Clientes!A$2:B$8,2,FALSE)';
const EN_CONTA = '=SUMPRODUCT(--ISNA(C2:C10))';
const EN_CONFERE = '=COUNTIF(Clientes!A$2:A$8,A2)';
const EN_PROCX = '=XLOOKUP(A2,Clientes!A$2:A$8,Clientes!B$2:B$8)';

const URL_PROCV_PT = 'https://support.microsoft.com/pt-br/office/função-procv-0bbc8083-26fe-4963-8ab8-93a18ad188a1';
const URL_PROCV_EN = 'https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1';
const URL_PROCX_PT = 'https://support.microsoft.com/pt-br/office/função-procx-b7fd680e-6d10-43e6-84f9-88eae8bf5929';
const URL_PROCX_EN = 'https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929';

const bad = (v: string): TableCell => ({ v, tone: 'bad' });
const ok = (v: string): TableCell => ({ v, tone: 'ok' });

export const PROCV: Guide = {
  slug: 'procv',
  category: 'excel',
  published: '2026-11-10',
  pt: {
    title: 'PROCV sem o quarto argumento',
    short: 'PROCV',
    lead: 'Sem o quarto argumento, o PROCV usa correspondência aproximada. Com a primeira coluna fora de ordem, ele pode devolver o nome de outro cliente sem dar erro nenhum. Veja como reproduzir, corrigir com FALSO e conferir.',
    description: 'Por que o PROCV sem o quarto argumento pode devolver o cliente errado sem dar erro, como corrigir com FALSO e como conferir se a planilha avisa quando um código não existe.',
    facts: ['Excel', 'PROCV e PROCX', 'planilha de exemplo'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O exemplo foi testado no Microsoft Excel 16.114.4 para Mac e no LibreOffice 24.2.7.2, em 10/11/2026. A Microsoft só garante que, com a primeira coluna fora de ordem e correspondência aproximada, o valor retornado "poderá ser algo inesperado". O erro silencioso apareceu nos dois programas, mas o nome errado que volta muda de programa para programa e de dados para dados. Por isso o passo a passo pede que você reproduza e confira na sua planilha.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ul',
            items: [
              'PROCV: procura um valor na primeira coluna de uma tabela e devolve o que está em outra coluna da mesma linha. Em inglês, VLOOKUP.',
              'Os quatro argumentos: o valor procurado, a tabela, o número da coluna a devolver e o quarto, opcional, que escolhe o tipo de busca (na Microsoft, `intervalo_pesquisa` em português e `range_lookup` em inglês).',
              'Correspondência aproximada (VERDADEIRO): é o padrão quando o quarto argumento fica vazio. Segundo a Microsoft, "Se você não especificar nada, o valor padrão será sempre VERDADEIRO ou correspondência aproximada." Ela espera a primeira coluna classificada.',
              'Correspondência exata (FALSO, ou zero): procura exatamente o valor na primeira coluna. Se não acha, devolve `#N/D` (no Excel em inglês, `#N/A`).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Monte a planilha de exemplo',
        blocks: [
          { k: 'p', v: 'Dados inventados, só para o teste. Na aba Clientes, de A1 a B8, a primeira coluna fica fora de ordem de propósito:' },
          { k: 'code', label: 'Clientes (cole em A1)', text: CLIENTES },
          { k: 'p', v: 'Na aba Pedidos, coluna A, a partir de A2, os códigos dos pedidos. Os códigos 1050 e 1099 não existem na aba Clientes:' },
          { k: 'code', label: 'Pedidos (cole em A1)', text: PEDIDOS },
        ],
      },
      {
        n: '2',
        title: 'Reproduza o problema',
        blocks: [
          { k: 'p', v: 'Em B2, a fórmula sem o quarto argumento. Arraste até B10.' },
          { k: 'code', label: 'Excel em português (B2)', text: PT_SEM },
          { k: 'p', v: 'Em C2, a versão com FALSO. Arraste até C10.' },
          { k: 'code', label: 'Excel em português (C2)', text: PT_FALSO },
          { k: 'p', muted: true, v: `No Excel em inglês: \`${EN_SEM}\` e \`${EN_FALSO}\`.` },
        ],
      },
      {
        n: '3',
        title: 'Compare as colunas',
        blocks: [
          { k: 'p', v: 'Testamos a mesma planilha em dois programas. O código 1060 é da Elisa Prado.' },
          { k: 'h3', v: 'Microsoft Excel 16.114.4 para Mac' },
          {
            k: 'table',
            label: 'Resultado no Microsoft Excel 16.114.4 para Mac',
            head: ['código', 'sem o quarto argumento', 'com FALSO'],
            rows: [
              ['1042', bad('Fabio Souza (errado, sem aviso)'), ok('Ana Lima')],
              ['1015', 'Bruno Reis', ok('Bruno Reis')],
              ['1088', bad('Gisele Alves (errado, sem aviso)'), ok('Carla Dias')],
              ['1023', 'Davi Nunes', ok('Davi Nunes')],
              ['1060', bad('Fabio Souza (errado, sem aviso)'), ok('Elisa Prado')],
              ['1037', 'Fabio Souza', ok('Fabio Souza')],
              ['1071', 'Gisele Alves', ok('Gisele Alves')],
              ['1050', bad('Fabio Souza (não existe, sem aviso)'), ok('#N/D')],
              ['1099', bad('Gisele Alves (não existe, sem aviso)'), ok('#N/D')],
            ],
          },
          { k: 'h3', v: 'LibreOffice Calc 24.2.7.2' },
          {
            k: 'table',
            label: 'Resultado no LibreOffice Calc 24.2.7.2',
            head: ['código', 'sem o quarto argumento', 'com FALSO'],
            rows: [
              ['1042', 'Ana Lima', ok('Ana Lima')],
              ['1015', 'Bruno Reis', ok('Bruno Reis')],
              ['1088', 'Carla Dias', ok('Carla Dias')],
              ['1023', 'Davi Nunes', ok('Davi Nunes')],
              ['1060', bad('Bruno Reis (errado, sem aviso)'), ok('Elisa Prado')],
              ['1037', bad('#N/A (o código existe)'), ok('Fabio Souza')],
              ['1071', bad('Bruno Reis (errado, sem aviso)'), ok('Gisele Alves')],
              ['1050', bad('Bruno Reis (não existe, sem aviso)'), ok('#N/A')],
              ['1099', bad('Gisele Alves (não existe, sem aviso)'), ok('#N/A')],
            ],
          },
          { k: 'p', muted: true, v: 'No LibreOffice do teste, o erro apareceu como #N/A, o nome em inglês do mesmo erro que o Excel em português mostra como #N/D.' },
          { k: 'p', v: 'Repare no que se repete nos dois programas: acertos aparecem no meio dos erros, e por isso o erro passa batido; códigos que existem podem devolver o nome de outro cliente; e códigos que não existem devolvem um nome de verdade em vez de erro (1050 e 1099). No LibreOffice ainda apareceu o contrário: o código 1037, que existe, deu erro.' },
          { k: 'p', v: 'O que muda de um programa para o outro é qual nome errado volta. Com FALSO, os dois devolvem o resultado certo e marcam os códigos que não existem. Se a sua planilha mostrar outros nomes, o aprendizado é o mesmo: a coluna sem o quarto argumento não é confiável.' },
        ],
      },
      {
        n: '4',
        title: 'A correção',
        blocks: [
          { k: 'p', v: 'Preencha o quarto argumento com `FALSO` (ou com zero), que a Microsoft descreve como correspondência exata. Para buscar código, id ou qualquer chave que precisa bater igual, é o que você quer.' },
        ],
      },
      {
        n: '5',
        title: 'Confira (não pule)',
        blocks: [
          { k: 'p', v: 'Conte os `#N/D` da coluna com FALSO. No exemplo são dois (1050 e 1099), o mesmo número de códigos que não estão na lista de clientes.' },
          { k: 'code', label: 'Contar os #N/D (Excel em português)', text: PT_CONTA },
          { k: 'p', v: 'Faça uma coluna de conferência ao lado. No exemplo, ela deve dar um para cada código que existe e zero para o que não existe.' },
          { k: 'code', label: 'Conferência (D2, arraste até D10)', text: PT_CONFERE },
          { k: 'p', muted: true, v: `No Excel em inglês: \`${EN_CONTA}\` e \`${EN_CONFERE}\`. No teste no Excel 16.114.4 para Mac, a contagem deu 2, e a conferência deu um para o 1060 e zero para o 1050. No LibreOffice 24.2, com as fórmulas em inglês, a contagem também deu 2 e a conferência deu zero só em 1050 e 1099.` },
          {
            k: 'ul',
            items: [
              'Ordenar a primeira coluna não substitui o FALSO numa busca exata: a ordem só importa para a aproximada, e um código que não existe continuaria devolvendo um nome. (Conclusão nossa, não está na página da Microsoft.)',
              'Quando o PROCV devolve um nome e você não tem como saber se é o certo, cruze uma amostra com a tabela original.',
            ],
          },
        ],
      },
      {
        n: '6',
        title: 'Alternativa: PROCX, quando disponível',
        blocks: [
          { k: 'p', v: 'O PROCX (XLOOKUP em inglês) tem correspondência exata por padrão. Na página em português da Microsoft: "Correspondência exata. Se nenhum for encontrado, retornar #N/A. Esse é o padrão."' },
          { k: 'code', label: 'Excel em português', text: PT_PROCX },
          { k: 'p', muted: true, v: 'No teste no Excel 16.114.4 para Mac, o PROCX devolveu Elisa Prado para o 1060 e #N/D para o 1050, mesmo com a primeira coluna fora de ordem. O LibreOffice 24.2 usado no teste não tem essa função. A mesma página diz que "O PROCX não está disponível no Excel 2016 e Excel 2019", mas a lista "Aplica-se a" cita essas versões. As duas informações não batem: confira na versão do Excel que você usa.' },
        ],
      },
      {
        title: 'Regra de bolso',
        blocks: [
          {
            k: 'ul',
            items: [
              'Feche com FALSO: código, id ou nome, e tudo que precisa bater exatamente.',
              'Aproximada: tabelas de faixas em ordem, como faixas de comissão (exemplo nosso), e só quando você quer a faixa mais próxima.',
            ],
          },
          { k: 'p', muted: true, v: 'No Excel em português, a função chama PROCV e o separador é o ponto e vírgula. Em inglês, VLOOKUP com vírgula. Se a fórmula der erro de sintaxe ao colar, confira o idioma e o separador da sua configuração regional.' },
        ],
      },
      {
        title: 'Antes de levar para a sua planilha',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Teste primeiro numa cópia da planilha, não no arquivo original.',
              'Confira se a primeira coluna do intervalo é mesmo a chave. O PROCV só procura na primeira coluna e devolve colunas à direita dela.',
              'Códigos que parecem números mas estão guardados como texto, ou o contrário, não são tratados como iguais. Espaços extras antes ou depois do código também causam #N/D. São cuidados gerais de planilha, não tirados da página da Microsoft.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Páginas da Microsoft Support, abertas em 10/11/2026: [Função PROCV](${URL_PROCV_PT}), [VLOOKUP function](${URL_PROCV_EN}), [Função PROCX](${URL_PROCX_PT}) e [XLOOKUP function](${URL_PROCX_EN}). Teste próprio no Microsoft Excel 16.114.4 para Mac e no LibreOffice 24.2.7.2, com os dados de exemplo deste guia.` },
        ],
      },
    ],
  },
  en: {
    title: 'VLOOKUP without the fourth argument',
    short: 'VLOOKUP',
    lead: 'Without the fourth argument, VLOOKUP uses approximate match. With the first column out of order, it can return another customer’s name without any error at all. See how to reproduce it, fix it with FALSE and check it.',
    description: 'Why VLOOKUP without the fourth argument can return the wrong customer without an error, how to fix it with FALSE and how to check that the spreadsheet warns you when a code does not exist.',
    facts: ['Excel', 'VLOOKUP and XLOOKUP', 'sample spreadsheet'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The example was tested in Microsoft Excel 16.114.4 for Mac and in LibreOffice 24.2.7.2, on November 10, 2026. Microsoft only states that, with the first column unsorted and approximate match, "the return value might be something you don\'t expect". The silent error showed up in both programs, but which wrong name comes back changes from program to program and from data to data. That is why the steps ask you to reproduce and check it in your own spreadsheet.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ul',
            items: [
              'VLOOKUP: looks for a value in the first column of a table and returns what is in another column of the same row. In Portuguese Excel, PROCV.',
              'The four arguments: the value to look up, the table, the number of the column to return and the fourth, optional one, which chooses the type of search (`range_lookup` in English and `intervalo_pesquisa` in Portuguese).',
              'Approximate match (TRUE): the default when the fourth argument is left empty. According to Microsoft, "If you don\'t specify anything, the default value will always be TRUE or approximate match." It expects the first column to be sorted.',
              'Exact match (FALSE, or zero): looks for exactly that value in the first column. If it does not find it, it returns `#N/A` (in Portuguese Excel, `#N/D`).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Build the sample spreadsheet',
        blocks: [
          { k: 'p', v: 'Made-up data, just for the test. The sheet names and headers stay in Portuguese, so the formulas are the same in both versions of this guide: Clientes means customers, Pedidos means orders, codigo means code and cliente means customer.' },
          { k: 'p', v: 'On the Clientes sheet, from A1 to B8, the first column is out of order on purpose:' },
          { k: 'code', label: 'Clientes (paste in A1)', text: CLIENTES },
          { k: 'p', v: 'On the Pedidos sheet, column A, starting at A2, the order codes. Codes 1050 and 1099 do not exist on the Clientes sheet:' },
          { k: 'code', label: 'Pedidos (paste in A1)', text: PEDIDOS },
        ],
      },
      {
        n: '2',
        title: 'Reproduce the problem',
        blocks: [
          { k: 'p', v: 'In B2, the formula without the fourth argument. Drag it down to B10.' },
          { k: 'code', label: 'Excel in English (B2)', text: EN_SEM },
          { k: 'p', v: 'In C2, the version with FALSE. Drag it down to C10.' },
          { k: 'code', label: 'Excel in English (C2)', text: EN_FALSO },
          { k: 'p', muted: true, v: `In Portuguese Excel: \`${PT_SEM}\` and \`${PT_FALSO}\`.` },
        ],
      },
      {
        n: '3',
        title: 'Compare the columns',
        blocks: [
          { k: 'p', v: 'We tested the same spreadsheet in two programs. Code 1060 belongs to Elisa Prado.' },
          { k: 'h3', v: 'Microsoft Excel 16.114.4 for Mac' },
          {
            k: 'table',
            label: 'Result in Microsoft Excel 16.114.4 for Mac',
            head: ['code', 'without the fourth argument', 'with FALSE'],
            rows: [
              ['1042', bad('Fabio Souza (wrong, no warning)'), ok('Ana Lima')],
              ['1015', 'Bruno Reis', ok('Bruno Reis')],
              ['1088', bad('Gisele Alves (wrong, no warning)'), ok('Carla Dias')],
              ['1023', 'Davi Nunes', ok('Davi Nunes')],
              ['1060', bad('Fabio Souza (wrong, no warning)'), ok('Elisa Prado')],
              ['1037', 'Fabio Souza', ok('Fabio Souza')],
              ['1071', 'Gisele Alves', ok('Gisele Alves')],
              ['1050', bad('Fabio Souza (does not exist, no warning)'), ok('#N/A')],
              ['1099', bad('Gisele Alves (does not exist, no warning)'), ok('#N/A')],
            ],
          },
          { k: 'h3', v: 'LibreOffice Calc 24.2.7.2' },
          {
            k: 'table',
            label: 'Result in LibreOffice Calc 24.2.7.2',
            head: ['code', 'without the fourth argument', 'with FALSE'],
            rows: [
              ['1042', 'Ana Lima', ok('Ana Lima')],
              ['1015', 'Bruno Reis', ok('Bruno Reis')],
              ['1088', 'Carla Dias', ok('Carla Dias')],
              ['1023', 'Davi Nunes', ok('Davi Nunes')],
              ['1060', bad('Bruno Reis (wrong, no warning)'), ok('Elisa Prado')],
              ['1037', bad('#N/A (the code exists)'), ok('Fabio Souza')],
              ['1071', bad('Bruno Reis (wrong, no warning)'), ok('Gisele Alves')],
              ['1050', bad('Bruno Reis (does not exist, no warning)'), ok('#N/A')],
              ['1099', bad('Gisele Alves (does not exist, no warning)'), ok('#N/A')],
            ],
          },
          { k: 'p', muted: true, v: 'The Excel test was run in Portuguese, where this error shows up as #N/D. Here it appears as #N/A, its name in English and in the LibreOffice used in the test.' },
          { k: 'p', v: 'Notice what repeats in both programs: correct results appear among the wrong ones, which is why the error goes unnoticed; codes that exist can return another customer’s name; and codes that do not exist return a real name instead of an error (1050 and 1099). LibreOffice also showed the opposite: code 1037, which exists, returned an error.' },
          { k: 'p', v: 'What changes from one program to the other is which wrong name comes back. With FALSE, both return the right result and flag the codes that do not exist. If your spreadsheet shows other names, the lesson is the same: the column without the fourth argument cannot be trusted.' },
        ],
      },
      {
        n: '4',
        title: 'The fix',
        blocks: [
          { k: 'p', v: 'Fill in the fourth argument with `FALSE` (or with zero), which Microsoft describes as exact match. To look up a code, an id or any key that has to match exactly, this is what you want.' },
        ],
      },
      {
        n: '5',
        title: 'Check it (do not skip this)',
        blocks: [
          { k: 'p', v: 'Count the `#N/A` values in the FALSE column. In the example there are two (1050 and 1099), the same number of codes that are not in the customer list.' },
          { k: 'code', label: 'Count the #N/A (Excel in English)', text: EN_CONTA },
          { k: 'p', v: 'Add a check column next to it. In the example, it should show one for each code that exists and zero for the one that does not.' },
          { k: 'code', label: 'Check (D2, drag down to D10)', text: EN_CONFERE },
          { k: 'p', muted: true, v: `In Portuguese Excel: \`${PT_CONTA}\` and \`${PT_CONFERE}\`. In the test in Excel 16.114.4 for Mac, the count was 2, and the check showed one for 1060 and zero for 1050. In LibreOffice 24.2, with the English formulas, the count was also 2 and the check showed zero only for 1050 and 1099.` },
          {
            k: 'ul',
            items: [
              'Sorting the first column does not replace FALSE in an exact search: the order only matters for approximate match, and a code that does not exist would still return a name. (Our conclusion, not on Microsoft’s page.)',
              'When VLOOKUP returns a name and you have no way of knowing whether it is the right one, cross-check a sample against the original table.',
            ],
          },
        ],
      },
      {
        n: '6',
        title: 'Alternative: XLOOKUP, when available',
        blocks: [
          { k: 'p', v: 'XLOOKUP (PROCX in Portuguese) uses exact match by default. On Microsoft’s page: "Exact match. If none found, return #N/A. This is the default."' },
          { k: 'code', label: 'Excel in English', text: EN_PROCX },
          { k: 'p', muted: true, v: `In Portuguese Excel: \`${PT_PROCX}\`. In the test in Excel 16.114.4 for Mac, XLOOKUP returned Elisa Prado for 1060 and #N/A (#N/D in Portuguese) for 1050, even with the first column out of order. The LibreOffice 24.2 used in the test does not have this function. The same page says "XLOOKUP is not available in Excel 2016 and Excel 2019", but the "Applies to" list on the Portuguese version of the page includes those versions. The two pieces of information do not match: check in the version of Excel you use.` },
        ],
      },
      {
        title: 'Rule of thumb',
        blocks: [
          {
            k: 'ul',
            items: [
              'Close it with FALSE: code, id or name, and anything that has to match exactly.',
              'Approximate: ordered range tables, such as commission brackets (our example), and only when you want the closest bracket.',
            ],
          },
          { k: 'p', muted: true, v: 'In English Excel, the function is VLOOKUP and the separator is the comma. In Portuguese, PROCV with a semicolon. If the formula gives a syntax error when you paste it, check the language and the separator in your regional settings.' },
        ],
      },
      {
        title: 'Before you take it to your spreadsheet',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Test it first on a copy of the spreadsheet, not on the original file.',
              'Check that the first column of the range really is the key. VLOOKUP only searches the first column and returns columns to the right of it.',
              'Codes that look like numbers but are stored as text, or the other way around, are not treated as equal. Extra spaces before or after the code also cause #N/A. These are general spreadsheet precautions, not taken from Microsoft’s page.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Microsoft Support pages, opened on November 10, 2026: [VLOOKUP function](${URL_PROCV_EN}), [Função PROCV](${URL_PROCV_PT}), [XLOOKUP function](${URL_PROCX_EN}) and [Função PROCX](${URL_PROCX_PT}). Our own test in Microsoft Excel 16.114.4 for Mac and LibreOffice 24.2.7.2, with this guide’s sample data.` },
        ],
      },
    ],
  },
};
