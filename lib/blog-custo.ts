import type { Guide } from './blog';

const INSTALAR_DUCKDB = 'python3 -m venv venv_custo\nvenv_custo/bin/pip install duckdb';
const TESTE_DUCKDB = 'import json\nimport duckdb\n\nN = 1_000_000\ncon = duckdb.connect()\ncon.execute(\n    "CREATE TABLE vendas AS "\n    "SELECT i AS id, (i * 7919) % 100003 AS valor, \'cliente_\' || (i % 5000) AS cliente "\n    f"FROM range({N}) t(i)"\n)\n\nCONSULTAS = {\n    "A) LIMIT 10 puro": "SELECT * FROM vendas LIMIT 10",\n    "B) 10 maiores vendas": "SELECT * FROM vendas ORDER BY valor DESC LIMIT 10",\n    "C) soma por cliente, sem LIMIT": "SELECT cliente, SUM(valor) AS total FROM vendas GROUP BY cliente ORDER BY total DESC",\n    "D) soma por cliente, com LIMIT 10": "SELECT cliente, SUM(valor) AS total FROM vendas GROUP BY cliente ORDER BY total DESC LIMIT 10",\n}\n\n\ndef linhas_lidas(no):\n    achados = []\n    if "SCAN" in no.get("type", ""):\n        achados.append((no["extra_info"].get("Projections"), no["intermediate_rows"]))\n    for filho in no.get("children", []):\n        achados += linhas_lidas(filho)\n    return achados\n\n\nprint("duckdb", duckdb.__version__, "| linhas na tabela:", N)\nfor nome, sql in CONSULTAS.items():\n    plano = json.loads(con.execute("EXPLAIN (ANALYZE, FORMAT JSON) " + sql).fetchall()[-1][1])\n    leituras = []\n    for raiz in plano["operator"]:\n        leituras += linhas_lidas(raiz)\n    print(nome)\n    for colunas, linhas in leituras:\n        print("   leitura da tabela:", linhas, "linhas | colunas:", colunas)';
const TESTE_SQLITE = 'import sqlite3\n\nN = 1_000_000\ncon = sqlite3.connect(":memory:")\ncon.execute("CREATE TABLE vendas (id INTEGER, valor INTEGER, cliente TEXT)")\ncon.executemany(\n    "INSERT INTO vendas VALUES (?, ?, ?)",\n    ((i, (i * 7919) % 100003, f"cliente_{i % 5000}") for i in range(N)),\n)\n\ncontador = {"n": 0}\n\n\ndef conta(x):\n    contador["n"] += 1\n    return x\n\n\ncon.create_function("conta", 1, conta)\n\nCONSULTAS = {\n    "A) LIMIT 10 puro": "SELECT id FROM vendas WHERE conta(id) >= 0 LIMIT 10",\n    "B) 10 maiores vendas": "SELECT id FROM vendas ORDER BY conta(valor) DESC LIMIT 10",\n    "D) soma por cliente, com LIMIT 10": "SELECT cliente, SUM(conta(valor)) AS total FROM vendas GROUP BY cliente ORDER BY total DESC LIMIT 10",\n}\n\nprint("sqlite", sqlite3.sqlite_version, "| linhas na tabela:", N)\nfor nome, sql in CONSULTAS.items():\n    contador["n"] = 0\n    devolvidas = len(con.execute(sql).fetchall())\n    print(nome, "| linhas devolvidas:", devolvidas, "| linhas lidas:", contador["n"])';
const DRY_RUN = 'bq query \\\n  --use_legacy_sql=false \\\n  --dry_run \\\n  \'SELECT cliente, valor FROM `meu_projeto.meu_dataset.vendas`\'';
const LIMITE_BYTES = 'bq query \\\n  --maximum_bytes_billed=1000000000 \\\n  --use_legacy_sql=false \\\n  \'SELECT cliente, valor FROM `meu_projeto.meu_dataset.vendas`\'';
const COLUNAS = '-- Lê todas as colunas da tabela\nSELECT * FROM `meu_projeto.meu_dataset.vendas`;\n\n-- Lê só as colunas de que você precisa\nSELECT cliente, valor FROM `meu_projeto.meu_dataset.vendas`;';
const PREVIA = 'bq head --max_rows=10 --selected_fields=cliente,valor meu_dataset.vendas';

const URL_CUSTOS = 'https://docs.cloud.google.com/bigquery/docs/best-practices-costs';
const URL_PRECOS = 'https://cloud.google.com/bigquery/pricing';
const URL_CLUSTER = 'https://docs.cloud.google.com/bigquery/docs/clustered-tables';
const URL_SINTAXE = 'https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax';
const URL_EXECUTAR = 'https://docs.cloud.google.com/bigquery/docs/running-queries';
const URL_BQ_CLI = 'https://docs.cloud.google.com/bigquery/docs/reference/bq-cli-reference';

export const LIMIT_BIGQUERY_CUSTO: Guide = {
  slug: 'limit-bigquery-custo',
  category: 'dados',
  keyword: 'CUSTO',
  published: '2026-11-18',
  pt: {
    title: 'LIMIT 10 no BigQuery não baixa a conta: como estimar o custo antes de rodar',
    short: 'LIMIT 10 no BigQuery',
    lead: 'Por que colocar LIMIT 10 numa consulta do BigQuery não diminui o que ele cobra em tabela sem cluster, um teste pronto para ver o que um banco local lê, e o passo a passo para estimar o custo antes de rodar.',
    description: 'Por que o LIMIT não diminui o que o BigQuery cobra em tabela sem cluster, um teste pronto para ver o que um banco local lê, como estimar o custo antes de rodar com o validador e o dry run, e como pagar menos.',
    facts: ['dados', 'bigquery', 'estimativa de custo'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os números do teste (2.048 linhas, 1.000.000 de linhas) vêm de um banco que roda no seu computador, o DuckDB 2.0.0 e o SQLite 3.54.1. Eles mostram o que um banco local lê. Não provam o que o BigQuery cobra. O que vale para o BigQuery vem da documentação do Google Cloud, conferida em 18/11/2026, e vale para o modelo sob demanda (on-demand), em que se paga pelos bytes lidos. Os comandos `bq` deste guia não foram executados: o autor não rodou o BigQuery. Confira cada um na documentação, nos links das fontes. Nomes de projeto, dataset e tabela são exemplo. O guia não é consultoria de custo e não tem vínculo com o Google.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'BigQuery: o banco de dados analítico do Google Cloud.',
              'LIMIT: em inglês, "limite". Em SQL, limita quantas linhas a consulta devolve na resposta.',
              'Modelo sob demanda (on-demand): a cobrança por bytes processados em cada consulta. Em capacidade reservada (slots), a documentação diz que a cobrança não é pelo volume lido por consulta.',
              'Tabela clusterizada (com cluster): tabela com os dados ordenados, no armazenamento, pelos valores de colunas que você escolheu. Sem cluster, os dados não têm essa ordenação.',
              'Dry run: uma execução de teste que não roda a consulta e só estima quantos bytes ela processaria.',
              'Prévia (preview): o jeito de espiar as linhas de uma tabela no console, sem escrever uma consulta.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que o BigQuery cobra e o que o LIMIT faz',
        blocks: [
          { k: 'p', v: 'A documentação define o LIMIT assim: "Limits the number of rows to return in a query." (limita o número de linhas devolvidas). Ele fala do que volta na resposta.' },
          { k: 'p', v: 'A página de preços diz o que é cobrado: "you\'re charged according to the data processed in the columns you select, even if you set an explicit LIMIT on the results." (você paga pelos dados processados nas colunas que seleciona, mesmo com um LIMIT explícito).' },
          { k: 'p', v: 'E a página de boas práticas de custo recomenda: "For non-clustered tables, don\'t use a LIMIT clause as a method of cost control." (em tabela sem cluster, não use LIMIT para controlar custo). Ela explica que, nesse caso, o LIMIT não afeta a quantidade de dados lida e que você paga pela leitura de todos os bytes indicados pela consulta.' },
          { k: 'p', v: 'A exceção: a mesma página diz que, numa tabela clusterizada, o LIMIT pode reduzir os bytes lidos, porque a leitura para quando blocos suficientes foram lidos para obter o resultado. Por isso a ressalva "sem cluster" vale em todo este guia.' },
        ],
      },
      {
        n: '2',
        title: 'O teste pronto: o que um banco local lê',
        blocks: [
          { k: 'p', v: 'Este teste não usa o BigQuery. Ele cria uma tabela de um milhão de linhas no seu computador e mostra quantas linhas cada consulta leu. `SELECT` é o pedido de dados, `ORDER BY` ordena, `GROUP BY` agrupa e `SUM` soma. Você precisa do Python 3 e de um terminal.' },
          { k: 'ol', start: 1, items: ['Crie um ambiente isolado e instale o DuckDB:'] },
          { k: 'code', label: 'Instalar o DuckDB (terminal)', text: INSTALAR_DUCKDB },
          { k: 'ol', start: 2, items: ['Salve o script abaixo como `teste_duckdb.py` e rode com `venv_custo/bin/python teste_duckdb.py`:'] },
          { k: 'code', label: 'Teste no DuckDB (Python)', text: TESTE_DUCKDB },
          { k: 'ol', start: 3, items: ['Opcional, sem instalar nada: o SQLite já vem com o Python. Salve como `teste_sqlite.py` e rode com `python3 teste_sqlite.py`. Ele conta as linhas lidas com uma função que roda uma vez por linha examinada:'] },
          { k: 'code', label: 'Teste no SQLite (Python)', text: TESTE_SQLITE },
        ],
      },
      {
        n: '3',
        title: 'O que deu no teste',
        blocks: [
          { k: 'p', v: 'Tabela de 1.000.000 de linhas, com 5.000 clientes. Rodado em 18/11/2026 no Mac do autor, DuckDB 2.0.0 e SQLite 3.54.1.' },
          {
            k: 'table',
            label: 'Linhas lidas por consulta no DuckDB e no SQLite',
            head: ['Consulta', 'DuckDB: linhas lidas', 'SQLite: linhas lidas'],
            rows: [
              ['A) SELECT * ... LIMIT 10', '2.048', '10'],
              ['B) dez maiores vendas (ORDER BY valor DESC LIMIT 10)', 'de 983.040 a 1.000.000 da coluna valor, conforme a execução, mais 10 linhas buscadas', '1.000.000'],
              ['C) soma por cliente, sem LIMIT', '1.000.000', 'não rodado'],
              ['D) soma por cliente, com LIMIT 10', '1.000.000', '1.000.000'],
            ],
          },
          { k: 'p', v: 'Leitura: o LIMIT puro (A) para cedo no banco local. Quando a consulta precisa somar ou ordenar tudo antes (B, C e D), o LIMIT 10 não reduz a leitura. Isso não contradiz a documentação do BigQuery, que trata de cobrança em tabela sem cluster, e não prova nada sobre ele. Se você rodar só o A no seu computador e vir a leitura parar cedo, o que você viu é o comportamento de um motor local, não a cobrança do BigQuery.' },
        ],
      },
      {
        n: '4',
        title: 'Como estimar o custo antes de rodar no BigQuery',
        blocks: [
          { k: 'p', v: 'Segundo a documentação, no modelo sob demanda a consulta é cobrada pelos bytes lidos, e há três ferramentas para saber antes. Nenhum dos comandos abaixo foi executado para este guia: confira na documentação, nos links das fontes.' },
          {
            k: 'ul',
            items: [
              'Validador de consultas, no console: quando você digita a consulta, ele valida a sintaxe e mostra uma estimativa de bytes lidos, com uma mensagem do tipo "This query will process 623.1 KiB when run.".',
              'Dry run, no terminal: o comando abaixo estima os bytes sem rodar a consulta. Para uma consulta válida, a documentação mostra a resposta "Query successfully validated. Assuming the tables are not modified, running this query will process 10918 bytes of data." (o número é o do exemplo da documentação).',
            ],
          },
          { k: 'code', label: 'Dry run (terminal, não executado: confira na documentação)', text: DRY_RUN },
          { k: 'p', v: 'A estimativa é um limite superior: a documentação diz que o número estimado de bytes pode ser maior do que o cobrado depois que a consulta roda.' },
          { k: 'p', v: 'Limite de bytes cobrados (maximum bytes billed): a documentação diz que, se a estimativa passar do limite, a consulta falha sem custo. O valor abaixo (um bilhão de bytes) é só exemplo; escolha o seu.' },
          { k: 'code', label: 'Limite de bytes cobrados (terminal, não executado: confira na documentação)', text: LIMITE_BYTES },
        ],
      },
      {
        n: '5',
        title: 'Como pagar menos',
        blocks: [
          { k: 'ol', start: 1, items: ['Peça só as colunas de que precisa. A cobrança é pelas colunas selecionadas. O primeiro comando abaixo lê todas as colunas; o segundo, só duas:'] },
          { k: 'code', label: 'Todas as colunas x só as colunas escolhidas (SQL do BigQuery, não executado)', text: COLUNAS },
          {
            k: 'ol',
            start: 2,
            items: [
              'Veja a estimativa antes de rodar, com o validador ou o dry run da seção anterior.',
              'Para só espiar a tabela, use a prévia. A documentação diz que as opções de prévia mostram os dados sem custo e sem afetar cotas. No console, é a aba Preview da página da tabela; no terminal, é o `bq head`:',
            ],
          },
          { k: 'code', label: 'Prévia pelo terminal (não executado: confira na documentação)', text: PREVIA },
          { k: 'ol', start: 4, items: ['Se a tabela for grande e muito consultada, a documentação de tabelas clusterizadas explica como ordenar os dados por colunas escolhidas. É nesse caso que o LIMIT pode reduzir a leitura, como na seção 1.'] },
          { k: 'p', v: 'Sobre preço: na página de preços de 18/11/2026, a consulta sob demanda aparece com o primeiro TiB do mês grátis e US$ 6,25 por TiB a partir daí, na tabela de localizações da página (inclui US e São Paulo). Em outra moeda, vale o preço do SKU. Reconfira antes de calcular qualquer coisa.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'No modelo sob demanda, o BigQuery cobra pelos dados processados nas colunas selecionadas, mesmo com LIMIT.',
              'Em tabela sem cluster, a documentação manda não usar LIMIT para controlar custo.',
              'Em tabela clusterizada, o LIMIT pode reduzir os bytes lidos.',
              'Para pagar menos: peça só as colunas necessárias, estime antes (validador ou dry run), limite os bytes cobrados e use a prévia para espiar.',
              'O teste local mostra o que um banco local lê. Não é prova do BigQuery.',
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
              'Mito: "LIMIT 10 faz a consulta custar menos". Verdade: em tabela sem cluster, a documentação diz que o LIMIT não afeta a quantidade de dados lida.',
              'Mito: "o teste local prova que o LIMIT economiza". Verdade: o banco local parar cedo é comportamento dele, e a cobrança do BigQuery é outra coisa.',
              'Mito: "a estimativa do dry run é o valor exato". Verdade: a documentação diz que é um limite superior e pode ser maior que o cobrado.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Google Cloud, [BigQuery, boas práticas de custo (Estimate and control costs)](${URL_CUSTOS}). Google Cloud, [BigQuery pricing](${URL_PRECOS}). Google Cloud, [BigQuery, tabelas clusterizadas](${URL_CLUSTER}). Google Cloud, [BigQuery, sintaxe de consulta (cláusula LIMIT)](${URL_SINTAXE}). Google Cloud, [BigQuery, executar consultas (dry run com o bq)](${URL_EXECUTAR}). Google Cloud, [bq command-line tool reference (bq head)](${URL_BQ_CLI}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'LIMIT 10 in BigQuery does not lower the bill',
    short: 'LIMIT 10 in BigQuery',
    lead: 'Why putting LIMIT 10 on a BigQuery query does not lower what it charges on a table without clustering, a ready-made test to see what a local database reads, and the step by step to estimate the cost before running.',
    description: 'Why LIMIT does not reduce what BigQuery charges on a table without clustering, a ready-made test to see what a local database reads, how to estimate the cost before running with the validator and the dry run, and how to pay less.',
    facts: ['data', 'bigquery', 'cost estimate'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The numbers in the test (2,048 rows, 1,000,000 rows) come from a database that runs on your own computer, DuckDB 2.0.0 and SQLite 3.54.1. They show what a local database reads. They do not prove what BigQuery charges. What holds for BigQuery comes from the Google Cloud documentation, checked on November 18, 2026, and it holds for the on-demand model, where you pay for the bytes read. The `bq` commands in this guide were not executed: the author did not run BigQuery. Check each one in the documentation, in the source links. Project, dataset and table names are examples. This guide is not cost consulting and has no affiliation with Google.' },
          { k: 'p', v: 'The names in the SQL (`vendas` is sales, `cliente` is customer, `valor` is amount) and the labels the scripts print (such as "linhas lidas", rows read) are examples in Portuguese, and the result does not change if you rename them. The code blocks are the same as in the Portuguese version, so you can copy them as they are.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'BigQuery: the analytical database of Google Cloud.',
              'LIMIT: in SQL, it limits how many rows the query returns in the response.',
              'On-demand model: billing by the bytes processed in each query. With reserved capacity (slots), the documentation says the charge is not based on the volume read per query.',
              'Clustered table: a table whose data is ordered in storage by the values of columns you chose. Without clustering, the data does not have that ordering.',
              'Dry run: a test run that does not execute the query and only estimates how many bytes it would process.',
              'Preview: the way to peek at the rows of a table in the console, without writing a query.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What BigQuery charges for and what LIMIT does',
        blocks: [
          { k: 'p', v: 'The documentation defines LIMIT like this: "Limits the number of rows to return in a query." It is about what comes back in the response.' },
          { k: 'p', v: 'The pricing page says what is charged: "you\'re charged according to the data processed in the columns you select, even if you set an explicit LIMIT on the results."' },
          { k: 'p', v: 'And the cost best practices page recommends: "For non-clustered tables, don\'t use a LIMIT clause as a method of cost control." It explains that, in that case, LIMIT does not affect the amount of data read and that you pay for reading all the bytes indicated by the query.' },
          { k: 'p', v: 'The exception: the same page says that, on a clustered table, LIMIT can reduce the bytes read, because the read stops when enough blocks have been read to get the result. That is why the "without clustering" caveat applies throughout this guide.' },
        ],
      },
      {
        n: '2',
        title: 'The ready-made test: what a local database reads',
        blocks: [
          { k: 'p', v: 'This test does not use BigQuery. It creates a table of one million rows on your computer and shows how many rows each query read. `SELECT` is the request for data, `ORDER BY` sorts, `GROUP BY` groups and `SUM` adds up. You need Python 3 and a terminal.' },
          { k: 'ol', start: 1, items: ['Create an isolated environment and install DuckDB:'] },
          { k: 'code', label: 'Install DuckDB (terminal)', text: INSTALAR_DUCKDB },
          { k: 'ol', start: 2, items: ['Save the script below as `teste_duckdb.py` and run it with `venv_custo/bin/python teste_duckdb.py`:'] },
          { k: 'code', label: 'DuckDB test (Python)', text: TESTE_DUCKDB },
          { k: 'ol', start: 3, items: ['Optional, with nothing to install: SQLite already comes with Python. Save it as `teste_sqlite.py` and run it with `python3 teste_sqlite.py`. It counts the rows read with a function that runs once per row examined:'] },
          { k: 'code', label: 'SQLite test (Python)', text: TESTE_SQLITE },
        ],
      },
      {
        n: '3',
        title: 'What the test gave',
        blocks: [
          { k: 'p', v: 'Table of 1,000,000 rows, with 5,000 customers. Run on November 18, 2026 on the author’s Mac, DuckDB 2.0.0 and SQLite 3.54.1.' },
          {
            k: 'table',
            label: 'Rows read per query on DuckDB and SQLite',
            head: ['Query', 'DuckDB: rows read', 'SQLite: rows read'],
            rows: [
              ['A) SELECT * ... LIMIT 10', '2,048', '10'],
              ['B) ten biggest sales (ORDER BY valor DESC LIMIT 10)', 'from 983,040 to 1,000,000 of the valor column, depending on the run, plus 10 rows fetched', '1,000,000'],
              ['C) sum per customer, without LIMIT', '1,000,000', 'not run'],
              ['D) sum per customer, with LIMIT 10', '1,000,000', '1,000,000'],
            ],
          },
          { k: 'p', v: 'Reading: a plain LIMIT (A) stops early on the local database. When the query has to add up or sort everything first (B, C and D), LIMIT 10 does not reduce the read. That does not contradict the BigQuery documentation, which is about billing on a table without clustering, and it proves nothing about BigQuery. If you run only A on your computer and see the read stop early, what you saw is the behavior of a local engine, not BigQuery billing.' },
        ],
      },
      {
        n: '4',
        title: 'How to estimate the cost before running on BigQuery',
        blocks: [
          { k: 'p', v: 'According to the documentation, on the on-demand model the query is charged by the bytes read, and there are three tools to find out beforehand. None of the commands below was executed for this guide: check them in the documentation, in the source links.' },
          {
            k: 'ul',
            items: [
              'Query validator, in the console: when you type the query, it validates the syntax and shows an estimate of the bytes read, with a message like "This query will process 623.1 KiB when run.".',
              'Dry run, in the terminal: the command below estimates the bytes without running the query. For a valid query, the documentation shows the response "Query successfully validated. Assuming the tables are not modified, running this query will process 10918 bytes of data." (the number is the one in the documentation example).',
            ],
          },
          { k: 'code', label: 'Dry run (terminal, not executed: check the documentation)', text: DRY_RUN },
          { k: 'p', v: 'The estimate is an upper bound: the documentation says the estimated number of bytes can be higher than the amount billed after the query runs.' },
          { k: 'p', v: 'Bytes billed limit (maximum bytes billed): the documentation says that, if the estimate goes over the limit, the query fails at no cost. The value below (one billion bytes) is only an example; choose your own.' },
          { k: 'code', label: 'Bytes billed limit (terminal, not executed: check the documentation)', text: LIMITE_BYTES },
        ],
      },
      {
        n: '5',
        title: 'How to pay less',
        blocks: [
          { k: 'ol', start: 1, items: ['Ask only for the columns you need. The charge is for the selected columns. The first command below reads all the columns; the second reads only two:'] },
          { k: 'code', label: 'All columns vs only the chosen columns (BigQuery SQL, not executed)', text: COLUNAS },
          {
            k: 'ol',
            start: 2,
            items: [
              'See the estimate before running, with the validator or the dry run from the previous section.',
              'To only peek at the table, use the preview. The documentation says the preview options show the data at no charge and without affecting quotas. In the console, it is the Preview tab on the table page; in the terminal, it is `bq head`:',
            ],
          },
          { k: 'code', label: 'Preview from the terminal (not executed: check the documentation)', text: PREVIA },
          { k: 'ol', start: 4, items: ['If the table is large and queried often, the clustered tables documentation explains how to order the data by chosen columns. That is the case where LIMIT can reduce the read, as in section 1.'] },
          { k: 'p', v: 'About price: on the pricing page of November 18, 2026, on-demand querying appears with the first TiB of the month free and US$ 6.25 per TiB after that, in the page’s locations table (it includes US and São Paulo). In another currency, the SKU price applies. Recheck before calculating anything.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'On the on-demand model, BigQuery charges for the data processed in the selected columns, even with LIMIT.',
              'On a table without clustering, the documentation says not to use LIMIT to control cost.',
              'On a clustered table, LIMIT can reduce the bytes read.',
              'To pay less: ask only for the columns you need, estimate beforehand (validator or dry run), limit the bytes billed and use the preview to peek.',
              'The local test shows what a local database reads. It is not proof about BigQuery.',
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
              'Myth: "LIMIT 10 makes the query cost less". Fact: on a table without clustering, the documentation says LIMIT does not affect the amount of data read.',
              'Myth: "the local test proves that LIMIT saves money". Fact: the local database stopping early is its own behavior, and BigQuery billing is a different thing.',
              'Myth: "the dry run estimate is the exact value". Fact: the documentation says it is an upper bound and can be higher than the amount billed.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Google Cloud, [BigQuery, cost best practices (Estimate and control costs)](${URL_CUSTOS}). Google Cloud, [BigQuery pricing](${URL_PRECOS}). Google Cloud, [BigQuery, clustered tables](${URL_CLUSTER}). Google Cloud, [BigQuery, query syntax (LIMIT clause)](${URL_SINTAXE}). Google Cloud, [BigQuery, running queries (dry run with bq)](${URL_EXECUTAR}). Google Cloud, [bq command-line tool reference (bq head)](${URL_BQ_CLI}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
