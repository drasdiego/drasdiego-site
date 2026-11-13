import type { Guide } from './blog';

const DADOS = 'Médico\tTipo\tCasos\tSucessos\nA\tSimples\t10\t9\nA\tComplicadas\t100\t30\nB\tSimples\t100\t80\nB\tComplicadas\t10\t2';
const FORMULA_TAXA = '=D2/C2';
const FORMULA_TOTAL = '=SOMASE($A$2:$A$5;G2;$D$2:$D$5)/SOMASE($A$2:$A$5;G2;$C$2:$C$5)';
const FORMULA_TOTAL_EN = '=SUMIF($A$2:$A$5,G2,$D$2:$D$5)/SUMIF($A$2:$A$5,G2,$C$2:$C$5)';

const URL_STANFORD = 'https://plato.stanford.edu/entries/paradox-simpson/';
const URL_BERKELEY = 'https://doi.org/10.1126/science.187.4175.398';

export const PARADOXO_DE_SIMPSON: Guide = {
  slug: 'paradoxo-de-simpson',
  category: 'dados',
  published: '2026-11-13',
  pt: {
    title: 'Paradoxo de Simpson na prática',
    short: 'Paradoxo de Simpson',
    lead: 'Por que um total pode enganar, o exemplo dos dois médicos, uma planilha pronta para ver o paradoxo com as próprias fórmulas e o caso real de Berkeley.',
    description: 'Por que um total pode enganar, o exemplo dos dois médicos, uma planilha pronta para ver o paradoxo com as próprias fórmulas e o caso real de Berkeley.',
    facts: ['dados', 'estatística', 'planilha pronta'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os dois médicos e os números são EXEMPLO. Eles foram montados para mostrar o efeito com clareza. Separar por grupo ajuda a enxergar o que o total esconde, mas o número separado nem sempre é o mais justo. Para decidir qual número usar, é preciso entender o que causa a diferença entre os grupos. Este guia não é conselho médico nem estatístico profissional.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Taxa de sucesso: quantos casos deram certo, divididos pelo total de casos. 9 sucessos em 10 cirurgias dá 90%.',
              'Total: o resultado juntando todos os casos, sem separar por tipo.',
              'Grupo: um pedaço dos dados separado por alguma característica. Aqui, os grupos são as cirurgias simples e as complicadas.',
              'Média ponderada: uma média em que cada grupo pesa conforme a quantidade de casos que tem. O total de cada médico é uma média ponderada dos grupos dele.',
              'Paradoxo de Simpson: quando uma diferença entre dois lados aparece, some ou se inverte ao separar os dados em grupos. "Paradoxo" aqui quer dizer que parece uma contradição, mas as contas estão certas. O nome vem do estatístico E. H. Simpson, que escreveu sobre o efeito em 1951.',
              'Viés: tratamento desigual entre pessoas ou grupos.',
              'Planilha: célula é cada quadradinho; a célula A1 fica na coluna A e na linha 1, no canto de cima à esquerda. Fórmula é uma conta que começa com o sinal de igual (=) e que a planilha calcula sozinha.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O exemplo dos dois médicos',
        blocks: [
          { k: 'p', v: 'Juntando todas as cirurgias, o médico B tem 74,5% de sucesso e o médico A tem 35,5%. Parece óbvio escolher o B.' },
          { k: 'p', v: 'Separando por tipo de cirurgia:' },
          {
            k: 'ul',
            items: [
              'Nas simples, o A tem 90% (9 de 10) e o B tem 80% (80 de 100).',
              'Nas complicadas, o A tem 30% (30 de 100) e o B tem 20% (2 de 10).',
            ],
          },
          { k: 'p', v: 'O A ganha nos dois tipos e perde no total. Isso acontece porque, das 110 cirurgias complicadas, 100 ficaram com o A, e, das 110 simples, 100 ficaram com o B. O total de cada médico é a média dos casos dele, e 100 dos 110 casos do A são os difíceis. Por isso a média dele cai.' },
          { k: 'p', v: 'A conta do total, passo a passo:' },
          {
            k: 'ul',
            items: [
              'Médico A: (9 + 30) sucessos em (10 + 100) cirurgias = 39 de 110 = 35,5%.',
              'Médico B: (80 + 2) sucessos em (100 + 10) cirurgias = 82 de 110 = 74,5%.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'A planilha pronta',
        blocks: [
          {
            k: 'ol',
            items: [
              'Abra uma planilha nova no Excel ou no Google Planilhas.',
              'Clique na célula A1 e cole os dados abaixo. Cada linha vira uma linha da planilha, e cada coluna fica numa célula separada:',
            ],
          },
          { k: 'code', label: 'Dados para colar na célula A1', text: DADOS },
          { k: 'p', v: 'Se tudo ficou numa célula só, selecione a coluna A e use Dados, Texto para colunas (no Excel) ou Dados, Dividir texto em colunas (no Google Planilhas), escolhendo tabulação como separador. Ou digite os dados à mão, um valor em cada célula.' },
          { k: 'ol', start: 3, items: ['Na célula E1, escreva `Taxa`. Na célula E2, cole a fórmula abaixo. Ela divide os sucessos pelos casos daquela linha:'] },
          { k: 'code', label: 'Fórmula da célula E2', text: FORMULA_TAXA },
          {
            k: 'ol',
            start: 4,
            items: [
              'Leve a fórmula para as linhas de baixo: clique na E2, segure o quadradinho no canto de baixo à direita da célula e puxe até a E5. Ou copie a E2 e cole na E3, na E4 e na E5. Depois selecione da E2 à E5 e clique no botão de porcentagem (%) na barra de ferramentas.',
              'Agora o total de cada médico. Na célula G1, escreva `Médico`. Na G2, escreva a letra `A` (o nome do médico). Na G3, escreva a letra `B`. Na H1, escreva `Taxa no total`. Na célula H2, cole a fórmula abaixo. Ela soma os sucessos daquele médico e divide pela soma dos casos dele:',
            ],
          },
          { k: 'code', label: 'Fórmula da célula H2', text: FORMULA_TOTAL },
          {
            k: 'ol',
            start: 6,
            items: [
              'Leve a fórmula da H2 para a H3, do mesmo jeito do passo 4, e formate as duas como porcentagem. Para ver uma casa depois da vírgula (35,5% em vez de 35%), clique uma vez no botão de aumentar casas decimais.',
              'Compare. Na coluna E, o A ganha nas simples (90% contra 80%) e nas complicadas (30% contra 20%). Na coluna H, o A perde no total (35,5% contra 74,5%). Esse é o paradoxo.',
            ],
          },
          { k: 'p', v: `Se aparecer erro na fórmula do passo 5, a sua planilha pode estar em outro idioma. Troque \`SOMASE\` por \`SUMIF\` e os pontos e vírgulas por vírgulas: \`${FORMULA_TOTAL_EN}\`. Se ainda der erro, faça a troca ao contrário.` },
        ],
      },
      {
        n: '3',
        title: 'Teste você mesmo',
        blocks: [
          { k: 'p', v: 'Dê ao médico B a mesma mistura de casos do A e veja o paradoxo sumir. As taxas de cada tipo continuam iguais; muda só a quantidade:' },
          {
            k: 'ul',
            items: [
              'Na linha do B com cirurgias simples, troque a C4 para 10 e a D4 para 8 (continua 80%).',
              'Na linha do B com cirurgias complicadas, troque a C5 para 100 e a D5 para 20 (continua 20%).',
            ],
          },
          { k: 'p', v: 'Agora o total do B cai para 25,5% (28 de 110), e o A, com 35,5%, passa a ganhar. A taxa de cada médico em cada tipo de cirurgia não mudou. Mudou a mistura de casos. Depois, volte os valores originais (C4 100, D4 80, C5 10, D5 2) para guardar o exemplo.' },
        ],
      },
      {
        title: 'Aconteceu de verdade: Berkeley',
        blocks: [
          { k: 'p', v: 'Um estudo de 1975 sobre a pós-graduação da Universidade de Berkeley, nos Estados Unidos, mostrou o mesmo efeito. No total, os homens eram aprovados com mais frequência que as mulheres. Mas, olhando cada departamento separado, os autores não encontraram viés contra as mulheres. A diferença vinha de onde cada um se candidatava: as mulheres se inscreviam mais em departamentos com taxa de aprovação menor, ou seja, onde era mais difícil entrar. Taxa de aprovação é o número de aprovados dividido pelo número de candidatos.' },
          { k: 'p', v: 'O estudo é de Bickel, Hammel e O’Connell, publicado na revista Science.' },
        ],
      },
      {
        title: 'Antes de confiar num total',
        note: true,
        blocks: [
          {
            k: 'ol',
            items: [
              'Separe por grupo: tipo de caso, região, produto, faixa de cliente.',
              'Veja se quem você compara pegou misturas de casos muito diferentes. Se pegou, o total pode enganar.',
              'Veja quem ficou com os casos difíceis.',
              'Pergunte o que causa a diferença entre os grupos antes de escolher qual número usar.',
            ],
          },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Um total pode esconder o que acontece dentro de cada grupo.',
              'O total é uma média que pesa cada grupo pela quantidade de casos.',
              'No exemplo, o médico A pegou mais casos difíceis e a média dele caiu, mesmo tendo taxa maior em cada tipo.',
              'Separar ajuda a enxergar, mas a decisão depende de entender a causa.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Stanford Encyclopedia of Philosophy, [Simpson's Paradox](${URL_STANFORD}). Bickel, Hammel e O’Connell (1975), [Sex Bias in Graduate Admissions: Data from Berkeley](${URL_BERKELEY}), Science 187(4175), p. 398 a 404.` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'Simpson’s paradox in practice',
    short: 'Simpson’s paradox',
    lead: 'Why a total can mislead you, the example of the two doctors, a ready-made spreadsheet to see the paradox with your own formulas, and the real Berkeley case.',
    description: 'Why a total can mislead you, the example of the two doctors, a ready-made spreadsheet to see the paradox with your own formulas, and the real Berkeley case.',
    facts: ['data', 'statistics', 'ready-made spreadsheet'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The two doctors and the numbers are an EXAMPLE. They were put together to show the effect clearly. Splitting by group helps you see what the total hides, but the split number is not always the fairer one. To decide which number to use, you need to understand what causes the difference between the groups. This guide is not medical advice nor professional statistical advice.' },
          { k: 'p', v: 'The data block keeps the Portuguese headers of the original guide (Médico is doctor, Tipo is type, Casos is cases, Sucessos is successes; Simples is simple and Complicadas is complicated). Rename them in your own spreadsheet if you prefer.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Success rate: how many cases went well, divided by the total number of cases. 9 successes in 10 surgeries is 90%.',
              'Total: the result with all cases put together, without splitting by type.',
              'Group: a slice of the data separated by some characteristic. Here the groups are the simple and the complicated surgeries.',
              'Weighted average: an average where each group weighs according to how many cases it has. Each doctor’s total is a weighted average of their groups.',
              'Simpson’s paradox: when a difference between two sides appears, disappears or flips once you split the data into groups. "Paradox" here means it looks like a contradiction, while the arithmetic is right. The name comes from the statistician E. H. Simpson, who wrote about the effect in 1951.',
              'Bias: unequal treatment between people or groups.',
              'Spreadsheet: a cell is each little box; cell A1 is in column A and row 1, at the top left corner. A formula is a calculation that starts with an equals sign (=) and that the spreadsheet works out by itself.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The example of the two doctors',
        blocks: [
          { k: 'p', v: 'Across all surgeries, doctor B has a 74.5% success rate and doctor A has 35.5%. Picking B looks obvious.' },
          { k: 'p', v: 'Splitting by type of surgery:' },
          {
            k: 'ul',
            items: [
              'On the simple ones, A has 90% (9 out of 10) and B has 80% (80 out of 100).',
              'On the complicated ones, A has 30% (30 out of 100) and B has 20% (2 out of 10).',
            ],
          },
          { k: 'p', v: 'A wins on both types and loses on the total. That happens because, of the 110 complicated surgeries, 100 went to A, and of the 110 simple ones, 100 went to B. Each doctor’s total is the average of their own cases, and 100 of A’s 110 cases are the hard ones. That is why their average drops.' },
          { k: 'p', v: 'The total, step by step:' },
          {
            k: 'ul',
            items: [
              'Doctor A: (9 + 30) successes in (10 + 100) surgeries = 39 out of 110 = 35.5%.',
              'Doctor B: (80 + 2) successes in (100 + 10) surgeries = 82 out of 110 = 74.5%.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'The ready-made spreadsheet',
        blocks: [
          {
            k: 'ol',
            items: [
              'Open a new spreadsheet in Excel or Google Sheets.',
              'Click cell A1 and paste the data below. Each line becomes a row, and each column lands in its own cell:',
            ],
          },
          { k: 'code', label: 'Data to paste into cell A1', text: DADOS },
          { k: 'p', v: 'If everything landed in a single cell, select column A and use Data, Text to Columns (in Excel) or Data, Split text to columns (in Google Sheets), choosing tab as the separator. Or type the data by hand, one value per cell.' },
          { k: 'ol', start: 3, items: ['In cell E1, write `Taxa` (rate). In cell E2, paste the formula below. It divides the successes by the cases on that row:'] },
          { k: 'code', label: 'Formula for cell E2', text: FORMULA_TAXA },
          {
            k: 'ol',
            start: 4,
            items: [
              'Carry the formula down: click E2, hold the little square at the bottom right corner of the cell and drag it to E5. Or copy E2 and paste it into E3, E4 and E5. Then select E2 to E5 and click the percentage button (%) on the toolbar.',
              'Now each doctor’s total. In cell G1, write `Médico` (doctor). In G2, write the letter `A` (the doctor’s name). In G3, write the letter `B`. In H1, write `Taxa no total` (rate on the total). In cell H2, paste the formula below. It adds up that doctor’s successes and divides by the sum of their cases:',
            ],
          },
          { k: 'code', label: 'Formula for cell H2', text: FORMULA_TOTAL },
          {
            k: 'ol',
            start: 6,
            items: [
              'Carry the H2 formula into H3, the same way as in step 4, and format both as a percentage. To see one decimal place (35.5% instead of 35%), click the increase decimal places button once.',
              'Compare. In column E, A wins on the simple ones (90% against 80%) and on the complicated ones (30% against 20%). In column H, A loses on the total (35.5% against 74.5%). That is the paradox.',
            ],
          },
          { k: 'p', v: `The formula in step 5 is written for a spreadsheet in Portuguese. In an English spreadsheet the function is SUMIF and the separators are commas: \`${FORMULA_TOTAL_EN}\`. If that one gives an error, use the \`SOMASE\` version in the block above.` },
        ],
      },
      {
        n: '3',
        title: 'Test it yourself',
        blocks: [
          { k: 'p', v: 'Give doctor B the same mix of cases as A and watch the paradox disappear. The rate of each type stays the same; only the quantity changes:' },
          {
            k: 'ul',
            items: [
              'On B’s row with simple surgeries, change C4 to 10 and D4 to 8 (still 80%).',
              'On B’s row with complicated surgeries, change C5 to 100 and D5 to 20 (still 20%).',
            ],
          },
          { k: 'p', v: 'Now B’s total drops to 25.5% (28 out of 110), and A, with 35.5%, comes out ahead. Each doctor’s rate on each type of surgery did not change. The mix of cases did. Afterwards, put the original values back (C4 100, D4 80, C5 10, D5 2) to keep the example.' },
        ],
      },
      {
        title: 'It happened for real: Berkeley',
        blocks: [
          { k: 'p', v: 'A 1975 study about graduate admissions at the University of California, Berkeley, in the United States, showed the same effect. On the total, men were admitted more often than women. But looking at each department separately, the authors found no bias against women. The difference came from where each person applied: women applied more to departments with a lower admission rate, that is, where it was harder to get in. The admission rate is the number of admitted people divided by the number of applicants.' },
          { k: 'p', v: 'The study is by Bickel, Hammel and O’Connell, published in the journal Science.' },
        ],
      },
      {
        title: 'Before you trust a total',
        note: true,
        blocks: [
          {
            k: 'ol',
            items: [
              'Split by group: type of case, region, product, customer tier.',
              'Check whether the sides you compare got very different mixes of cases. If they did, the total can mislead you.',
              'Check who ended up with the hard cases.',
              'Ask what causes the difference between the groups before choosing which number to use.',
            ],
          },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'A total can hide what happens inside each group.',
              'The total is an average that weighs each group by how many cases it has.',
              'In the example, doctor A took more hard cases and their average dropped, even with a higher rate on each type.',
              'Splitting helps you see, but the decision depends on understanding the cause.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Stanford Encyclopedia of Philosophy, [Simpson's Paradox](${URL_STANFORD}). Bickel, Hammel and O’Connell (1975), [Sex Bias in Graduate Admissions: Data from Berkeley](${URL_BERKELEY}), Science 187(4175), pp. 398 to 404.` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
