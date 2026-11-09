import type { Guide } from './blog';

const SETUP = 'CREATE TABLE pedidos (id int PRIMARY KEY, valor int);\nCREATE TABLE itens (pedido_id int);\nINSERT INTO pedidos VALUES (1, 100), (2, 50);\nINSERT INTO itens VALUES (1), (1), (1), (2);';
const SUM_OK = 'SELECT sum(valor) FROM pedidos;';
const SUM_JOIN = 'SELECT sum(p.valor)\nFROM pedidos p\nJOIN itens i ON i.pedido_id = p.id;';
const SUM_AGG = 'SELECT sum(p.valor)\nFROM pedidos p\nJOIN (\n  SELECT pedido_id, count(*) AS qtd_itens\n  FROM itens\n  GROUP BY pedido_id\n) a ON a.pedido_id = p.id;';
const SUM_EXISTS = 'SELECT sum(valor)\nFROM pedidos p\nWHERE EXISTS (\n  SELECT 1 FROM itens i WHERE i.pedido_id = p.id\n);';
const COUNT_ROWS = 'SELECT count(*) FROM pedidos;\n\nSELECT count(*)\nFROM pedidos p\nJOIN itens i ON i.pedido_id = p.id;';
const ADD_ORDER = 'INSERT INTO pedidos VALUES (3, 20);';
const SUM_LEFT = 'SELECT sum(p.valor)\nFROM pedidos p\nLEFT JOIN (\n  SELECT pedido_id, count(*) AS qtd_itens\n  FROM itens\n  GROUP BY pedido_id\n) a ON a.pedido_id = p.id;';
const DOCS = 'https://www.postgresql.org/docs/16/queries-table-expressions.html';

export const JOIN_SOMA: Guide = {
  slug: 'join-multiplica-a-soma',
  category: 'sql',
  published: '2026-11-08',
  pt: {
    title: 'JOIN que multiplica a soma',
    short: 'JOIN e soma',
    lead: 'Por que o total sobe depois de juntar pedidos com itens, como ver isso acontecendo e três jeitos de corrigir.',
    description: 'Por que a soma infla depois de um JOIN numa relação 1 para muitos e três jeitos de corrigir: agregar antes, EXISTS e LEFT JOIN com os itens agregados. Exemplo testado no PostgreSQL 16.',
    facts: ['SQL', 'testado no PostgreSQL 16', 'exemplo para copiar'],
    sections: [
      {
        n: '0',
        title: 'O problema',
        blocks: [
          { k: 'p', v: 'Você tem uma tabela de pedidos, com o valor de cada pedido, e uma tabela de itens, com uma linha para cada item comprado. Um pedido pode ter vários itens: é uma relação de 1 para muitos.' },
          { k: 'p', v: 'Quando você junta as duas com JOIN e soma o valor do pedido, cada pedido aparece uma vez para cada item. A soma infla sem que ninguém tenha vendido nada a mais.' },
          { k: 'p', muted: true, v: 'Todos os números deste guia são de um exemplo fictício.' },
        ],
      },
      {
        n: '1',
        title: 'Monte o exemplo',
        blocks: [
          { k: 'p', v: 'Dois pedidos: o pedido 1 vale 100 e tem 3 itens; o pedido 2 vale 50 e tem 1 item.' },
          { k: 'code', label: 'SQL', text: SETUP },
        ],
      },
      {
        n: '2',
        title: 'Veja a soma inflar',
        blocks: [
          { k: 'p', v: 'A soma certa dos pedidos:' },
          { k: 'code', label: 'SQL, resultado 150', text: SUM_OK },
          { k: 'p', v: 'A mesma soma depois do JOIN com os itens:' },
          { k: 'code', label: 'SQL, resultado 350', text: SUM_JOIN },
          { k: 'p', v: 'O pedido de 100 aparece três vezes, uma por item: 100 + 100 + 100 + 50 = 350.' },
        ],
      },
      {
        n: '3',
        title: 'Por que acontece',
        blocks: [
          { k: 'p', v: 'A documentação do PostgreSQL, na seção 7.2.1.1 Joined Tables, explica que o JOIN gera uma linha para cada linha da outra tabela que satisfaz a condição. Se um pedido combina com três itens, ele vira três linhas.' },
          { k: 'p', v: 'O JOIN está fazendo o que deve. O erro é somar uma coluna do lado "1" depois de multiplicar as linhas pelo lado "muitos".' },
        ],
      },
      {
        n: '4',
        title: 'Correção 1: agregue os itens antes do JOIN',
        blocks: [
          { k: 'p', v: 'Resuma a tabela de itens para ter uma linha por pedido e só depois faça o JOIN.' },
          { k: 'code', label: 'SQL, resultado 150', text: SUM_AGG },
          { k: 'p', muted: true, v: 'Use este caminho quando precisar de informação dos itens no resultado, como a quantidade por pedido.' },
        ],
      },
      {
        n: '5',
        title: 'Correção 2: só quer saber se tem item? Use EXISTS',
        blocks: [
          { k: 'p', v: 'Se a pergunta é apenas "este pedido tem algum item?", não precisa juntar as tabelas. O EXISTS testa a condição sem repetir o pedido.' },
          { k: 'code', label: 'SQL, resultado 150', text: SUM_EXISTS },
        ],
      },
      {
        n: '6',
        title: 'Confira as linhas antes e depois',
        blocks: [
          { k: 'p', v: 'Antes de confiar numa soma depois de um JOIN, compare a quantidade de linhas:' },
          { k: 'code', label: 'SQL, resultados 2 e 4', text: COUNT_ROWS },
          { k: 'p', v: 'Se você esperava uma linha por pedido e o número subiu, alguma linha foi multiplicada.' },
        ],
      },
      {
        n: '7',
        title: 'Pedido sem item? LEFT JOIN com os itens agregados',
        blocks: [
          { k: 'p', v: 'Agora entra um pedido 3, de valor 20, sem nenhum item. A soma certa passa a ser 170.' },
          { k: 'code', label: 'SQL', text: ADD_ORDER },
          { k: 'p', v: 'O JOIN comum e o EXISTS deixam o pedido 3 de fora e dão 150. O LEFT JOIN mantém todos os pedidos, mas precisa continuar com os itens agregados:' },
          { k: 'code', label: 'SQL, resultado 170', text: SUM_LEFT },
          { k: 'callout', tone: 'warn', v: 'Trocar só o JOIN por LEFT JOIN, sem agregar os itens, dá 370. O LEFT JOIN resolve o pedido sem item, mas não resolve a multiplicação.' },
        ],
      },
      {
        title: 'Antes de levar para o seu banco',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Todos os resultados deste guia foram testados no PostgreSQL 16.15 em 07/11/2026.',
              'A sintaxe de JOIN faz parte do padrão SQL, mas a própria documentação do PostgreSQL avisa, na seção 7.2.2 The WHERE Clause, que ela pode não ser tão portável para outros bancos. Teste no seu antes de usar em produção.',
              'Os nomes das tabelas e os valores são fictícios. Troque pelos do seu modelo.',
            ],
          },
        ],
      },
      {
        title: 'Fonte',
        blocks: [
          { k: 'p', muted: true, v: `Documentação oficial do PostgreSQL 16, página Table Expressions, seções 7.2.1.1 Joined Tables e 7.2.2 The WHERE Clause: [postgresql.org/docs/16/queries-table-expressions.html](${DOCS}). Conferida em 07/11/2026.` },
        ],
      },
    ],
  },
  en: {
    title: 'The JOIN that multiplies the sum',
    short: 'JOIN and sum',
    lead: 'Why the total goes up after joining orders with items, how to see it happen and three ways to fix it.',
    description: 'Why a sum inflates after a JOIN in a one-to-many relationship and three ways to fix it: aggregate first, EXISTS and LEFT JOIN with the aggregated items. Example tested on PostgreSQL 16.',
    facts: ['SQL', 'tested on PostgreSQL 16', 'example to copy'],
    sections: [
      {
        n: '0',
        title: 'The problem',
        blocks: [
          { k: 'p', v: 'You have an orders table, with the amount of each order, and an items table, with one row for each item purchased. An order can have several items: it is a one-to-many relationship.' },
          { k: 'p', v: 'When you join the two with JOIN and sum the order amount, each order shows up once for each item. The sum inflates even though nobody sold anything extra.' },
          { k: 'p', muted: true, v: 'All the numbers in this guide come from a fictional example.' },
        ],
      },
      {
        n: '1',
        title: 'Build the example',
        blocks: [
          { k: 'p', v: 'Two orders: order 1 is worth 100 and has 3 items; order 2 is worth 50 and has 1 item.' },
          { k: 'p', v: 'The code keeps the table and column names in Portuguese, so it is the same in both versions of this guide: `pedidos` means orders, `itens` means items, `valor` means amount, `pedido_id` means order_id and `qtd_itens` means item count.' },
          { k: 'code', label: 'SQL', text: SETUP },
        ],
      },
      {
        n: '2',
        title: 'Watch the sum inflate',
        blocks: [
          { k: 'p', v: 'The correct sum of the orders:' },
          { k: 'code', label: 'SQL, result 150', text: SUM_OK },
          { k: 'p', v: 'The same sum after the JOIN with the items:' },
          { k: 'code', label: 'SQL, result 350', text: SUM_JOIN },
          { k: 'p', v: 'The order worth 100 shows up three times, once per item: 100 + 100 + 100 + 50 = 350.' },
        ],
      },
      {
        n: '3',
        title: 'Why it happens',
        blocks: [
          { k: 'p', v: 'The PostgreSQL documentation, in section 7.2.1.1 Joined Tables, explains that a JOIN produces one row for each row of the other table that satisfies the condition. If an order matches three items, it becomes three rows.' },
          { k: 'p', v: 'The JOIN is doing what it should. The mistake is summing a column from the "one" side after the "many" side has multiplied the rows.' },
        ],
      },
      {
        n: '4',
        title: 'Fix 1: aggregate the items before the JOIN',
        blocks: [
          { k: 'p', v: 'Summarize the items table so it has one row per order, and only then do the JOIN.' },
          { k: 'code', label: 'SQL, result 150', text: SUM_AGG },
          { k: 'p', muted: true, v: 'Use this approach when you need item information in the result, such as the number of items per order.' },
        ],
      },
      {
        n: '5',
        title: 'Fix 2: only need to know whether there is an item? Use EXISTS',
        blocks: [
          { k: 'p', v: 'If the question is just "does this order have any item?", you do not need to join the tables. EXISTS tests the condition without repeating the order.' },
          { k: 'code', label: 'SQL, result 150', text: SUM_EXISTS },
        ],
      },
      {
        n: '6',
        title: 'Check the rows before and after',
        blocks: [
          { k: 'p', v: 'Before you trust a sum after a JOIN, compare the number of rows:' },
          { k: 'code', label: 'SQL, results 2 and 4', text: COUNT_ROWS },
          { k: 'p', v: 'If you expected one row per order and the number went up, some row was multiplied.' },
        ],
      },
      {
        n: '7',
        title: 'Order with no items? LEFT JOIN with the aggregated items',
        blocks: [
          { k: 'p', v: 'Now add order 3, worth 20, with no items at all. The correct sum becomes 170.' },
          { k: 'code', label: 'SQL', text: ADD_ORDER },
          { k: 'p', v: 'A plain JOIN and EXISTS leave order 3 out and return 150. LEFT JOIN keeps every order, but it still needs the aggregated items:' },
          { k: 'code', label: 'SQL, result 170', text: SUM_LEFT },
          { k: 'callout', tone: 'warn', v: 'Switching only JOIN to LEFT JOIN, without aggregating the items, returns 370. LEFT JOIN takes care of the order with no items, but it does not fix the multiplication.' },
        ],
      },
      {
        title: 'Before you take it to your database',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Every result in this guide was tested on PostgreSQL 16.15 on November 7, 2026.',
              'The JOIN syntax is part of the SQL standard, but the PostgreSQL documentation itself warns, in section 7.2.2 The WHERE Clause, that it may not be as portable to other databases. Test it on yours before using it in production.',
              'The table names and values are fictional. Replace them with the ones in your model.',
            ],
          },
        ],
      },
      {
        title: 'Source',
        blocks: [
          { k: 'p', muted: true, v: `Official PostgreSQL 16 documentation, Table Expressions page, sections 7.2.1.1 Joined Tables and 7.2.2 The WHERE Clause: [postgresql.org/docs/16/queries-table-expressions.html](${DOCS}). Checked on November 7, 2026.` },
        ],
      },
    ],
  },
};
