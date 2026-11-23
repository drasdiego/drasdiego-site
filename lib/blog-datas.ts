import type { Guide } from './blog';

const CRIAR_TABELA = 'CREATE TABLE vendas (id INT, quando TIMESTAMP, valor INT);';
const INSERIR_VENDAS =
  "INSERT INTO vendas (id, quando, valor) VALUES\n(1, '2026-01-01 09:00', 100),\n(2, '2026-01-15 12:00', 100),\n(3, '2026-01-31 00:00', 100),\n(4, '2026-01-31 14:30', 100),\n(5, '2026-01-31 23:59', 100),\n(6, '2026-02-01 00:00', 100);";
const FILTRO_BETWEEN_31 = "SELECT COUNT(*) AS vendas FROM vendas\nWHERE quando BETWEEN '2026-01-01' AND '2026-01-31';";
const FILTRO_BETWEEN_01 = "SELECT COUNT(*) AS vendas FROM vendas\nWHERE quando BETWEEN '2026-01-01' AND '2026-02-01';";
const FILTRO_CERTO = "SELECT COUNT(*) AS vendas FROM vendas\nWHERE quando >= '2026-01-01' AND quando < '2026-02-01';";
const FILTRO_DIA_31 = "SELECT COUNT(*) AS vendas FROM vendas\nWHERE quando >= '2026-01-31' AND quando < '2026-02-01';";

const URL_BETWEEN = 'https://learn.microsoft.com/en-us/sql/t-sql/language-elements/between-transact-sql';
const URL_POSTGRES = 'https://www.postgresql.org/docs/current/functions-comparison.html';
const URL_ROWVERSION = 'https://learn.microsoft.com/en-us/sql/t-sql/data-types/rowversion-transact-sql';
const URL_TVC = 'https://learn.microsoft.com/en-us/sql/t-sql/queries/table-value-constructor-transact-sql';
const URL_MYSQL = 'https://dev.mysql.com/doc/refman/8.0/en/datetime.html';
const URL_SQLITE = 'https://www.sqlite.org/datatype3.html';

export const BETWEEN_DIA_31: Guide = {
  slug: 'between-dia-31',
  category: 'dados',
  keyword: 'DATAS',
  published: '2026-11-16',
  pt: {
    title: 'BETWEEN e o dia 31 que some',
    short: 'BETWEEN e o dia 31',
    lead: 'Por que o filtro com BETWEEN perde as vendas do dia 31 quando a coluna guarda data e hora, um teste pronto para rodar no seu banco e a forma de filtrar que não perde nada.',
    description: 'Por que o filtro com BETWEEN perde as vendas do dia 31 quando a coluna guarda data e hora, um teste pronto para rodar no seu banco e a forma de filtrar que não perde nada.',
    facts: ['dados', 'sql', 'teste pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'As vendas, os horários e os números deste guia são exemplo. O teste foi rodado pelo autor no DuckDB 2.0.0 e no SQLite 3.54.1, e conferido de novo no SQLite 3.53.1, com o mesmo resultado. Para ver a sua versão do SQLite: `SELECT sqlite_version();`. No PostgreSQL, no SQL Server e no MySQL os comandos não foram executados aqui: o comportamento descrito para eles vem da documentação ou é dedução marcada como "nossa leitura". Rode o teste no seu banco antes de mudar um relatório de verdade.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Banco de dados: o programa que guarda as tabelas e responde às consultas. Exemplos: PostgreSQL, SQL Server, MySQL, SQLite, DuckDB.',
              'SQL: a linguagem usada para pedir dados ao banco.',
              'Coluna: um campo da tabela. Aqui a coluna `quando` guarda o momento da venda, com data e hora.',
              'BETWEEN: em inglês, "entre". `a BETWEEN x AND y` quer dizer `a >= x AND a <= y`: inclui as duas pontas.',
              'Data sem hora: no SQL Server, a documentação diz que, quando a hora não é informada, vale meia-noite (`00:00`). No DuckDB o teste mostrou o mesmo. No PostgreSQL e no MySQL, nossa leitura é a mesma. No SQLite é diferente (veja o fim do guia).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O teste pronto',
        blocks: [
          { k: 'p', v: 'Use qualquer banco que você tiver. `TIMESTAMP` é o tipo de coluna que guarda data e hora. No PostgreSQL e no DuckDB, rode como está. No SQL Server, troque `TIMESTAMP` por `DATETIME2`: lá `TIMESTAMP` não guarda data e hora, é um contador interno (rowversion), e a Microsoft manda usar `DATETIME2`. No MySQL, troque por `DATETIME`. No SQLite, troque por `TEXT`.' },
          { k: 'p', v: 'O que cada comando faz: `CREATE TABLE` cria a tabela, `INSERT` coloca as linhas, `WHERE` é o filtro e `COUNT(*)` conta quantas linhas passaram pelo filtro.' },
          { k: 'ol', start: 1, items: ['Crie a tabela:'] },
          { k: 'code', label: 'Criar a tabela', text: CRIAR_TABELA },
          { k: 'ol', start: 2, items: ['Coloque seis vendas, cinco de janeiro e uma de fevereiro:'] },
          { k: 'code', label: 'Inserir as vendas', text: INSERIR_VENDAS },
          { k: 'ol', start: 3, items: ['Filtro com BETWEEN até o dia 31:'] },
          { k: 'code', label: 'Filtro 1: BETWEEN até 31/01', text: FILTRO_BETWEEN_31 },
          { k: 'ol', start: 4, items: ['Filtro com BETWEEN até o dia 1º de fevereiro:'] },
          { k: 'code', label: 'Filtro 2: BETWEEN até 01/02', text: FILTRO_BETWEEN_01 },
          { k: 'ol', start: 5, items: ['Filtro certo, a partir do dia 1º e antes do mês seguinte:'] },
          { k: 'code', label: 'Filtro 3: o jeito certo', text: FILTRO_CERTO },
        ],
      },
      {
        n: '2',
        title: 'O que deu no teste',
        blocks: [
          { k: 'p', v: 'Janeiro tem 5 vendas.' },
          {
            k: 'ul',
            items: [
              'BETWEEN até 31/01: 3 no DuckDB, 2 no SQLite. Ficaram de fora as vendas das 14:30 e das 23:59 do dia 31. No SQLite saiu também a da meia-noite.',
              'BETWEEN até 01/02: 6 no DuckDB, porque entrou a venda de fevereiro. No SQLite deu 5, mas por coincidência (veja abaixo).',
              '`>=` e `<`: 5 nos dois. É o resultado certo.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'Por que o dia 31 some',
        blocks: [
          { k: 'p', v: 'O BETWEEN inclui as duas pontas, então o fim do filtro é `\'2026-01-31\'`. Com a coluna guardando data e hora, esse fim vira `2026-01-31 00:00`, o primeiro instante do dia 31. Tudo o que aconteceu depois disso no dia 31 fica de fora. A documentação do SQL Server diz isso com todas as letras. No PostgreSQL e no DuckDB, nossa leitura é a mesma, e o teste no DuckDB confirmou.' },
        ],
      },
      {
        n: '4',
        title: 'Por que trocar para o dia 1º de fevereiro também erra',
        blocks: [
          { k: 'p', v: 'O BETWEEN inclui o último valor. Se o fim vira `\'2026-02-01\'`, ele vale `2026-02-01 00:00`, e uma venda exatamente nesse instante entra em janeiro. Nossa leitura: é raro, mas pode acontecer em sistemas que registram fechamento de dia, carga automática ou horário convertido de outro fuso (fuso horário é a diferença de horas entre regiões, por exemplo entre Brasília e o horário universal).' },
        ],
      },
      {
        n: '5',
        title: 'A forma que não perde nada',
        blocks: [
          { k: 'p', v: 'Use `>=` no começo e `<` no primeiro instante do período seguinte. Assim você pega tudo do período, até o último segundo, e nada do seguinte. A mesma regra serve para qualquer janela:' },
          { k: 'code', label: 'Filtro do dia 31 inteiro', text: FILTRO_DIA_31 },
          { k: 'p', v: 'Esse filtro pega o dia 31 inteiro: 3 vendas no teste. Para uma semana, use o primeiro dia da semana e o primeiro dia da semana seguinte. Esta é uma recomendação nossa, testada no DuckDB e no SQLite. A página da Microsoft sobre o BETWEEN não traz essa forma; ela só diz que, para excluir as pontas, se usa `>` e `<`.' },
        ],
      },
      {
        title: 'O caso do SQLite',
        blocks: [
          { k: 'p', v: 'O SQLite não tem um tipo próprio de data e hora: neste teste a coluna é texto, e a comparação é feita letra por letra. `\'2026-01-31 00:00\'` é um texto maior que `\'2026-01-31\'`, porque é mais comprido, então até a venda da meia-noite do dia 31 fica de fora. Pelo mesmo motivo, `\'2026-02-01 00:00\'` também fica fora do BETWEEN até 01/02, e o total dá 5 por coincidência. A forma com `>=` e `<` funciona igual no SQLite.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Se a coluna guarda hora, data sem hora vira meia-noite (documentado no SQL Server e confirmado no teste do DuckDB).',
              'BETWEEN inclui as duas pontas: até `\'2026-01-31\'` para no começo do dia 31.',
              'Ir até o dia seguinte com BETWEEN pode puxar uma venda do período seguinte.',
              'Use `>= início AND < início do período seguinte`.',
              'Rode o teste no seu banco antes de confiar num relatório.',
            ],
          },
        ],
      },
      {
        title: 'Mito x verdade',
        blocks: [
          {
            k: 'ul',
            items: [
              'Mito: "BETWEEN até dia 31 pega o dia 31 inteiro". Verdade: com uma coluna de data e hora, pega só a meia-noite do dia 31 (no SQLite, com texto, nem isso).',
              'Mito: "é só ir até o dia 1º do mês seguinte". Verdade: o BETWEEN inclui o último valor, e uma venda exatamente à meia-noite entra no período errado.',
              'Mito: "isso é problema só de um banco". Verdade: o efeito apareceu no DuckDB e no SQLite e está descrito pela Microsoft para o SQL Server; o motivo muda conforme o tipo da coluna.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Microsoft, [BETWEEN (Transact-SQL)](${URL_BETWEEN}). PostgreSQL, [Comparison Functions and Operators](${URL_POSTGRES}). Microsoft, [rowversion (Transact-SQL)](${URL_ROWVERSION}). Microsoft, [Table Value Constructor (Transact-SQL)](${URL_TVC}). MySQL, [Date and Time Data Types](${URL_MYSQL}). SQLite, [Datatypes In SQLite](${URL_SQLITE}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'BETWEEN and the missing 31st',
    short: 'BETWEEN and the 31st',
    lead: 'Why a BETWEEN filter loses the sales of the 31st when the column stores date and time, a ready-made test to run on your own database, and the filter shape that loses nothing.',
    description: 'Why a BETWEEN filter loses the sales of the 31st when the column stores date and time, a ready-made test to run on your own database, and the filter shape that loses nothing.',
    facts: ['data', 'sql', 'ready-made test'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The sales, the times and the numbers in this guide are an EXAMPLE. The author ran the test on DuckDB 2.0.0 and SQLite 3.54.1, and checked it again on SQLite 3.53.1, with the same result. To see your SQLite version: `SELECT sqlite_version();`. On PostgreSQL, SQL Server and MySQL the commands were not executed here: what is described for them comes from the documentation or is a deduction marked as "our reading". Run the test on your own database before you change a real report.' },
          { k: 'p', v: 'The table and the columns keep the Portuguese names of the original guide: `vendas` is sales, `quando` is when, and `valor` is amount. They are example names, and the result does not change if you rename them.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Database: the program that stores the tables and answers the queries. Examples: PostgreSQL, SQL Server, MySQL, SQLite, DuckDB.',
              'SQL: the language used to ask the database for data.',
              'Column: a field of the table. Here the `quando` column stores the moment of the sale, with date and time.',
              'BETWEEN: `a BETWEEN x AND y` means `a >= x AND a <= y`, so it includes both ends.',
              'Date with no time: on SQL Server, the documentation says that when the time is not given, it is midnight (`00:00`). On DuckDB the test showed the same. On PostgreSQL and MySQL, our reading is the same. On SQLite it is different (see the end of the guide).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The ready-made test',
        blocks: [
          { k: 'p', v: 'Use whichever database you have. `TIMESTAMP` is the column type that stores date and time. On PostgreSQL and DuckDB, run it as it is. On SQL Server, swap `TIMESTAMP` for `DATETIME2`: there `TIMESTAMP` does not store date and time, it is an internal counter (rowversion), and Microsoft tells you to use `DATETIME2`. On MySQL, swap it for `DATETIME`. On SQLite, swap it for `TEXT`.' },
          { k: 'p', v: 'What each command does: `CREATE TABLE` creates the table, `INSERT` puts the rows in, `WHERE` is the filter, and `COUNT(*)` counts how many rows got through the filter.' },
          { k: 'ol', start: 1, items: ['Create the table:'] },
          { k: 'code', label: 'Create the table', text: CRIAR_TABELA },
          { k: 'ol', start: 2, items: ['Put in six sales, five in January and one in February:'] },
          { k: 'code', label: 'Insert the sales', text: INSERIR_VENDAS },
          { k: 'ol', start: 3, items: ['Filter with BETWEEN up to the 31st:'] },
          { k: 'code', label: 'Filter 1: BETWEEN up to 01/31', text: FILTRO_BETWEEN_31 },
          { k: 'ol', start: 4, items: ['Filter with BETWEEN up to February 1st:'] },
          { k: 'code', label: 'Filter 2: BETWEEN up to 02/01', text: FILTRO_BETWEEN_01 },
          { k: 'ol', start: 5, items: ['The right filter, from the 1st and before the next month:'] },
          { k: 'code', label: 'Filter 3: the right way', text: FILTRO_CERTO },
        ],
      },
      {
        n: '2',
        title: 'What the test gave',
        blocks: [
          { k: 'p', v: 'January has 5 sales.' },
          {
            k: 'ul',
            items: [
              'BETWEEN up to 01/31: 3 on DuckDB, 2 on SQLite. The sales at 14:30 and at 23:59 on the 31st were left out. On SQLite the midnight one was left out too.',
              'BETWEEN up to 02/01: 6 on DuckDB, because the February sale came in. On SQLite it gave 5, but by coincidence (see below).',
              '`>=` and `<`: 5 on both. That is the right result.',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'Why the 31st goes missing',
        blocks: [
          { k: 'p', v: 'BETWEEN includes both ends, so the end of the filter is `\'2026-01-31\'`. With the column storing date and time, that end becomes `2026-01-31 00:00`, the first instant of the 31st. Everything that happened later on the 31st is left out. The SQL Server documentation says so in plain words. On PostgreSQL and DuckDB, our reading is the same, and the DuckDB test confirmed it.' },
        ],
      },
      {
        n: '4',
        title: 'Why moving the end to February 1st is also wrong',
        blocks: [
          { k: 'p', v: 'BETWEEN includes the last value. If the end becomes `\'2026-02-01\'`, it is worth `2026-02-01 00:00`, and a sale at exactly that instant falls into January. Our reading: it is rare, but it can happen in systems that record a day close, an automated load, or a time converted from another zone (a time zone is the difference in hours between regions, for example between Brasília and universal time).' },
        ],
      },
      {
        n: '5',
        title: 'The shape that loses nothing',
        blocks: [
          { k: 'p', v: 'Use `>=` at the start and `<` at the first instant of the next period. That way you get everything in the period, down to the last second, and nothing from the next one. The same rule works for any window:' },
          { k: 'code', label: 'Filter for the whole 31st', text: FILTRO_DIA_31 },
          { k: 'p', v: 'That filter takes the whole 31st: 3 sales in the test. For a week, use the first day of the week and the first day of the next week. This is a recommendation of ours, tested on DuckDB and SQLite. Microsoft’s page about BETWEEN does not show this shape; it only says that, to exclude the ends, you use `>` and `<`.' },
        ],
      },
      {
        title: 'The SQLite case',
        blocks: [
          { k: 'p', v: 'SQLite has no date and time type of its own: in this test the column is text, and the comparison is made letter by letter. `\'2026-01-31 00:00\'` is text greater than `\'2026-01-31\'`, because it is longer, so even the midnight sale on the 31st is left out. For the same reason, `\'2026-02-01 00:00\'` also falls outside the BETWEEN up to 02/01, and the total comes to 5 by coincidence. The shape with `>=` and `<` works the same on SQLite.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'If the column stores a time, a date with no time becomes midnight (documented on SQL Server and confirmed in the DuckDB test).',
              'BETWEEN includes both ends: up to `\'2026-01-31\'` stops at the start of the 31st.',
              'Going to the next day with BETWEEN can pull in a sale from the next period.',
              'Use `>= start AND < start of the next period`.',
              'Run the test on your own database before you trust a report.',
            ],
          },
        ],
      },
      {
        title: 'Myth and fact',
        blocks: [
          {
            k: 'ul',
            items: [
              'Myth: "BETWEEN up to the 31st takes the whole 31st". Fact: with a date and time column, it takes only midnight on the 31st (on SQLite, with text, not even that).',
              'Myth: "just go up to the 1st of the next month". Fact: BETWEEN includes the last value, and a sale at exactly midnight falls into the wrong period.',
              'Myth: "this is a problem of one database only". Fact: the effect showed up on DuckDB and on SQLite and is described by Microsoft for SQL Server; the reason changes with the column type.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Microsoft, [BETWEEN (Transact-SQL)](${URL_BETWEEN}). PostgreSQL, [Comparison Functions and Operators](${URL_POSTGRES}). Microsoft, [rowversion (Transact-SQL)](${URL_ROWVERSION}). Microsoft, [Table Value Constructor (Transact-SQL)](${URL_TVC}). MySQL, [Date and Time Data Types](${URL_MYSQL}). SQLite, [Datatypes In SQLite](${URL_SQLITE}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
