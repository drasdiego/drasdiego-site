import type { Guide } from './blog';

export const WHERE_APELIDO: Guide = {
  slug: 'where-apelido',
  category: 'dados',
  keyword: 'APELIDO',
  published: '2026-11-21',
  pt: {
    title: "WHERE não enxerga o apelido: por que a coluna não existe e como filtrar nos três bancos testados",
    short: "WHERE e o apelido",
    lead: "Você dá um apelido a uma conta no SELECT e tenta filtrar por ele no WHERE. No PostgreSQL dá erro; em outros bancos funciona. Aqui está o porquê, um teste pronto e a saída.",
    description: "Por que o apelido dado no SELECT dá erro no WHERE do PostgreSQL, a ordem em que a documentação diz que a consulta é processada, um teste pronto no PostgreSQL, SQLite e DuckDB e três jeitos de filtrar que funcionam nos três bancos testados.",
    facts: ["dados", "sql", "postgresql"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          {
            k: "p",
            v: "Testado em 18/11/2026 no Mac do autor, com PostgreSQL 16.2 (pelo pacote pgserver), DuckDB 2.0.0 e SQLite 3.54.1. A documentação do PostgreSQL consultada é a da versão 18. O que o guia afirma vale para esses três bancos. Não testei nem cito MySQL, SQL Server nem BigQuery. O SQLite e o DuckDB aceitarem o apelido no WHERE é resultado do teste, não uma garantia: o objetivo é escrever uma consulta que funcione nos três bancos testados (e, por dedução, em outros). Os dados da tabela de pedidos são fictícios. O guia não tem vínculo com nenhum dos projetos citados.",
          },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          {
            k: "ol",
            items: [
              "Apelido (alias): um nome que você dá a uma coluna ou conta no SELECT, com `AS`. No exemplo, `preco * qtd AS total` chama a conta de total. A documentação do PostgreSQL chama de nome da coluna de saída (output column name).",
              "SELECT: a parte da consulta que diz quais colunas ou contas aparecem no resultado.",
              "WHERE: a parte que filtra as linhas.",
              "ORDER BY e GROUP BY: ordenam as linhas e agrupam as linhas, respectivamente.",
              "Subconsulta: uma consulta dentro de outra. CTE (WITH): uma subconsulta com nome, escrita antes da consulta principal.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "O que a documentação do PostgreSQL diz",
        blocks: [
          {
            k: "p",
            v: "Na página do comando SELECT: \"An output column's name can be used to refer to the column's value in ORDER BY and GROUP BY clauses, but not in the WHERE or HAVING clauses; there you must write out the expression instead.\" (o nome da coluna de saída vale no ORDER BY e no GROUP BY, mas não no WHERE nem no HAVING; ali você precisa escrever a expressão).",
          },
          {
            k: "p",
            v: "A mesma página descreve a ordem do processamento. No passo 3: \"all rows that do not satisfy the condition are eliminated from the output\" (o WHERE elimina as linhas). No passo 5: \"The actual output rows are computed using the SELECT output expressions\" (as colunas de saída são calculadas pelas expressões do SELECT). Ou seja, o WHERE age antes de o apelido existir. A ordem completa dos outros passos está na página: confira na documentação.",
          },
        ],
      },
      {
        n: "2",
        title: "As cinco consultas em SQL",
        blocks: [
          {
            k: "p",
            v: "Tabela de quatro pedidos (id, preço, quantidade). Os totais são 80, 125, 90 e 30. Você pode colar o bloco inteiro num cliente do PostgreSQL, como o `psql`; o A é o que dá erro.",
          },
          {
            k: "code",
            label: "Tabela e consultas A a E (SQL)",
            text: "create table pedidos (id integer, preco integer, qtd integer);\ninsert into pedidos values (1, 40, 2), (2, 25, 5), (3, 90, 1), (4, 10, 3);\n\n-- A) apelido no WHERE\nselect id, preco * qtd as total from pedidos where total > 100 order by id;\n\n-- B) apelido no ORDER BY\nselect id, preco * qtd as total from pedidos order by total desc, id;\n\n-- C) a conta repetida no WHERE\nselect id, preco * qtd as total from pedidos where preco * qtd > 100 order by id;\n\n-- D) subconsulta\nselect id, total from (select id, preco * qtd as total from pedidos) t where total > 100 order by id;\n\n-- E) CTE (WITH)\nwith t as (select id, preco * qtd as total from pedidos) select id, total from t where total > 100 order by id;",
          },
        ],
      },
      {
        n: "3",
        title: "O teste pronto nos três bancos",
        blocks: [
          {
            k: "p",
            v: "Você precisa do Python 3.12 e de um terminal. O teste roda o SQL no SQLite (que já vem com o Python), no DuckDB e num PostgreSQL embutido pelo pacote pgserver, tudo no seu computador.",
          },
          {
            k: "ol",
            items: ["Crie um ambiente isolado e instale os dois pacotes:"],
            start: 1,
          },
          {
            k: "code",
            label: "Instalar (terminal)",
            text: "python3.12 -m venv venv_guia\nvenv_guia/bin/pip install duckdb==2.0.0 pgserver==0.1.4",
          },
          {
            k: "ol",
            items: ["Salve o script abaixo como `teste_apelido.py`:"],
            start: 2,
          },
          {
            k: "code",
            label: "Teste nos três bancos (Python)",
            text: "import sqlite3, sys, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table pedidos (id integer, preco integer, qtd integer);\ninsert into pedidos values (1, 40, 2), (2, 25, 5), (3, 90, 1), (4, 10, 3);\n\"\"\"\nconsultas = {\n \"A) apelido no WHERE\": \"select id, preco * qtd as total from pedidos where total > 100 order by id\",\n \"B) apelido no ORDER BY\": \"select id, preco * qtd as total from pedidos order by total desc, id\",\n \"C) expressao repetida no WHERE\": \"select id, preco * qtd as total from pedidos where preco * qtd > 100 order by id\",\n \"D) subconsulta\": \"select id, total from (select id, preco * qtd as total from pedidos) t where total > 100 order by id\",\n}\n\ndef rodar(nome, execf, versao):\n    print(\"==\", nome, versao)\n    for k, q in consultas.items():\n        try:\n            print(k, \"->\", execf(q))\n        except Exception as e:\n            print(k, \"-> ERRO:\", str(e).strip().splitlines()[0])\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite\", lambda q: con.execute(q).fetchall(), sqlite3.sqlite_version)\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB\", lambda q: d.execute(q).fetchall(), duckdb.__version__)\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\ndef pg(q):\n    return srv.psql(q).strip().replace(\"\\n\", \" | \")\nprint(srv.psql(\"select version()\").strip().splitlines()[2])\nrodar(\"PostgreSQL\", pg, \"\")\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)",
          },
          {
            k: "ol",
            items: ["Rode:"],
            start: 3,
          },
          {
            k: "code",
            label: "Rodar (terminal)",
            text: "venv_guia/bin/python teste_apelido.py",
          },
          {
            k: "p",
            v: "As versões estão fixadas no comando de instalação (DuckDB 2.0.0 e pgserver 0.1.4) porque a tabela de resultados é de 18/11/2026; versões novas podem mudar o resultado.",
          },
          {
            k: "p",
            v: "A mensagem de erro do PostgreSQL aparece numa linha separada, perto do começo da saída: ela vem do servidor, não do Python. As consultas que funcionam aparecem nos blocos de cada banco.",
          },
          {
            k: "p",
            v: "O script roda as consultas A a D. A consulta E (CTE) está no bloco SQL do passo 2 e deu a mesma linha, id 2 e total 125, nos três bancos, num teste separado.",
          },
          {
            k: "p",
            v: "Créditos: o pgserver (servidor PostgreSQL embutido num pacote Python) é de Oscar Moll, licença Apache-2.0, repositório github.com/orm011/pgserver; o DuckDB é da DuckDB Foundation, licença MIT; o SQLite foi dedicado ao domínio público pelos autores. Usei o Python 3.12 porque, no teste, o pip não achou o pgserver para o Python 3.15.2.",
          },
        ],
      },
      {
        n: "4",
        title: "O que deu no teste",
        blocks: [
          {
            k: "table",
            label: "Resultado das consultas A a E no SQLite, DuckDB e PostgreSQL",
            head: ["Consulta", "SQLite 3.54.1", "DuckDB 2.0.0", "PostgreSQL 16.2"],
            rows: [
              [
                "A) where total > 100 (apelido no WHERE)",
                "1 linha (id 2, total 125)",
                "1 linha (id 2, total 125)",
                {
                  v: "ERRO: column \"total\" does not exist",
                  tone: "bad",
                },
              ],
              [
                "B) order by total desc",
                "125, 90, 80, 30",
                "125, 90, 80, 30",
                "125, 90, 80, 30",
              ],
              ["C) where preco * qtd > 100", "id 2, 125", "id 2, 125", "id 2, 125"],
              [
                "D) subconsulta com where total > 100",
                "id 2, 125",
                "id 2, 125",
                "id 2, 125",
              ],
              ["E) CTE com where total > 100", "id 2, 125", "id 2, 125", "id 2, 125"],
            ],
          },
          {
            k: "p",
            v: "Leitura: o apelido funciona no ORDER BY nos três, e no WHERE só no SQLite e no DuckDB. Uma consulta que roda sem erro num deles pode quebrar ao trocar para o PostgreSQL. A solução vale nos três: repetir a conta, usar subconsulta ou CTE.",
          },
        ],
      },
      {
        n: "5",
        title: "Como escrever para funcionar nos três bancos testados (e, por dedução, em outros)",
        blocks: [
          {
            k: "ol",
            items: [
              "Repita a conta no WHERE (consulta C). É o que a documentação do PostgreSQL manda: escrever a expressão.",
              "Use uma subconsulta (consulta D): o apelido nasce na consulta de dentro e o WHERE da consulta de fora o enxerga.",
              "Use uma CTE (consulta E): o mesmo, com o nome do resultado intermediário escrito antes. Costuma ficar mais legível quando a conta é longa.",
              "No ORDER BY, o apelido pode ficar, como a documentação do PostgreSQL permite e o teste confirmou nos três.",
            ],
            start: 1,
          },
          {
            k: "p",
            v: "Dedução: repetir a expressão, usar subconsulta e usar CTE são formas comuns de SQL; só os três bancos foram testados.",
          },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: "ol",
            items: [
              "No PostgreSQL, o apelido do SELECT não vale no WHERE: a documentação diz que ali se escreve a expressão.",
              "O WHERE elimina linhas antes de as colunas do SELECT serem calculadas.",
              "SQLite e DuckDB aceitaram o apelido no WHERE no teste: isso não é regra geral.",
              "Para funcionar nos três bancos testados: repita a conta, use subconsulta ou CTE.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Mito x verdade",
        blocks: [
          {
            k: "ul",
            items: [
              "Mito: \"se rodou no meu banco, roda em qualquer um\". Verdade: o mesmo WHERE com apelido rodou no SQLite e no DuckDB e deu erro no PostgreSQL.",
              "Mito: \"o apelido não vale em lugar nenhum fora do SELECT\". Verdade: a documentação do PostgreSQL diz que vale no ORDER BY e no GROUP BY.",
            ],
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          {
            k: "p",
            v: "[PostgreSQL, comando SELECT](https://www.postgresql.org/docs/current/sql-select.html). [pgserver (Oscar Moll, Apache-2.0)](https://github.com/orm011/pgserver). [DuckDB (DuckDB Foundation, MIT)](https://duckdb.org/). [SQLite, direitos autorais e domínio público](https://www.sqlite.org/copyright.html).",
            muted: true,
          },
          {
            k: "p",
            v: "Conteúdo educativo e independente.",
            muted: true,
          },
        ],
      },
    ],
  },
  en: {
    title: "WHERE does not see the alias: why the column does not exist and how to filter in the three tested databases",
    short: "WHERE and the alias",
    lead: "You give a calculation an alias in the SELECT and try to filter by it in the WHERE. In PostgreSQL it fails; in other databases it works. Here is why, a ready made test and the output.",
    description: "Why an alias given in the SELECT fails in the WHERE of PostgreSQL, the order in which the documentation says a query is processed, a ready made test on PostgreSQL, SQLite and DuckDB, and three ways to filter that work in the three tested databases.",
    facts: ["data", "sql", "postgresql"],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          {
            k: "p",
            v: "Tested on November 18, 2026 on the author's Mac, with PostgreSQL 16.2 (through the pgserver package), DuckDB 2.0.0 and SQLite 3.54.1. The PostgreSQL documentation consulted is the one for version 18. What the guide states holds for these three databases. I did not test or mention MySQL, SQL Server or BigQuery. SQLite and DuckDB accepting the alias in the WHERE is a test result, not a guarantee: the goal is to write a query that works in the three tested databases (and, by deduction, in others). The data in the orders table is fictional. The guide has no connection to any of the projects mentioned.",
          },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          {
            k: "ol",
            items: [
              "Alias: a name you give to a column or calculation in the SELECT, with `AS`. In the example, `preco * qtd AS total` names the calculation total. The PostgreSQL documentation calls it the output column name.",
              "SELECT: the part of the query that says which columns or calculations appear in the result.",
              "WHERE: the part that filters the rows.",
              "ORDER BY and GROUP BY: sort the rows and group the rows, respectively.",
              "Subquery: a query inside another query. CTE (WITH): a named subquery, written before the main query.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "What the PostgreSQL documentation says",
        blocks: [
          {
            k: "p",
            v: "On the SELECT command page: \"An output column's name can be used to refer to the column's value in ORDER BY and GROUP BY clauses, but not in the WHERE or HAVING clauses; there you must write out the expression instead.\" (the output column name works in ORDER BY and GROUP BY, but not in WHERE or HAVING; there you must write the expression).",
          },
          {
            k: "p",
            v: "The same page describes the processing order. In step 3: \"all rows that do not satisfy the condition are eliminated from the output\" (the WHERE eliminates rows). In step 5: \"The actual output rows are computed using the SELECT output expressions\" (the output columns are calculated by the SELECT expressions). In other words, the WHERE acts before the alias exists. The full order of the other steps is on the page: check the documentation.",
          },
        ],
      },
      {
        n: "2",
        title: "The five queries in SQL",
        blocks: [
          {
            k: "p",
            v: "A table of four orders (id, price, quantity). The totals are 80, 125, 90 and 30. You can paste the whole block into a PostgreSQL client, such as `psql`; A is the one that fails. The names inside the code blocks (pedidos, preco, qtd, total) are Portuguese example names; the result does not change.",
          },
          {
            k: "code",
            label: "Table and queries A to E (SQL)",
            text: "create table pedidos (id integer, preco integer, qtd integer);\ninsert into pedidos values (1, 40, 2), (2, 25, 5), (3, 90, 1), (4, 10, 3);\n\n-- A) apelido no WHERE\nselect id, preco * qtd as total from pedidos where total > 100 order by id;\n\n-- B) apelido no ORDER BY\nselect id, preco * qtd as total from pedidos order by total desc, id;\n\n-- C) a conta repetida no WHERE\nselect id, preco * qtd as total from pedidos where preco * qtd > 100 order by id;\n\n-- D) subconsulta\nselect id, total from (select id, preco * qtd as total from pedidos) t where total > 100 order by id;\n\n-- E) CTE (WITH)\nwith t as (select id, preco * qtd as total from pedidos) select id, total from t where total > 100 order by id;",
          },
        ],
      },
      {
        n: "3",
        title: "The ready made test on the three databases",
        blocks: [
          {
            k: "p",
            v: "You need Python 3.12 and a terminal. The test runs the SQL on SQLite (which already comes with Python), on DuckDB and on a PostgreSQL embedded by the pgserver package, all on your own computer.",
          },
          {
            k: "ol",
            items: [
              "Create an isolated environment and install the two packages:",
            ],
            start: 1,
          },
          {
            k: "code",
            label: "Install (terminal)",
            text: "python3.12 -m venv venv_guia\nvenv_guia/bin/pip install duckdb==2.0.0 pgserver==0.1.4",
          },
          {
            k: "ol",
            items: ["Save the script below as `teste_apelido.py`:"],
            start: 2,
          },
          {
            k: "code",
            label: "Test on the three databases (Python)",
            text: "import sqlite3, sys, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table pedidos (id integer, preco integer, qtd integer);\ninsert into pedidos values (1, 40, 2), (2, 25, 5), (3, 90, 1), (4, 10, 3);\n\"\"\"\nconsultas = {\n \"A) apelido no WHERE\": \"select id, preco * qtd as total from pedidos where total > 100 order by id\",\n \"B) apelido no ORDER BY\": \"select id, preco * qtd as total from pedidos order by total desc, id\",\n \"C) expressao repetida no WHERE\": \"select id, preco * qtd as total from pedidos where preco * qtd > 100 order by id\",\n \"D) subconsulta\": \"select id, total from (select id, preco * qtd as total from pedidos) t where total > 100 order by id\",\n}\n\ndef rodar(nome, execf, versao):\n    print(\"==\", nome, versao)\n    for k, q in consultas.items():\n        try:\n            print(k, \"->\", execf(q))\n        except Exception as e:\n            print(k, \"-> ERRO:\", str(e).strip().splitlines()[0])\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite\", lambda q: con.execute(q).fetchall(), sqlite3.sqlite_version)\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB\", lambda q: d.execute(q).fetchall(), duckdb.__version__)\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\ndef pg(q):\n    return srv.psql(q).strip().replace(\"\\n\", \" | \")\nprint(srv.psql(\"select version()\").strip().splitlines()[2])\nrodar(\"PostgreSQL\", pg, \"\")\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)",
          },
          {
            k: "ol",
            items: ["Run:"],
            start: 3,
          },
          {
            k: "code",
            label: "Run (terminal)",
            text: "venv_guia/bin/python teste_apelido.py",
          },
          {
            k: "p",
            v: "The versions are pinned in the install command (DuckDB 2.0.0 and pgserver 0.1.4) because the results table is from November 18, 2026; newer versions may change the result.",
          },
          {
            k: "p",
            v: "The PostgreSQL error message appears on a separate line, near the start of the output: it comes from the server, not from Python. The queries that work appear in each database's blocks.",
          },
          {
            k: "p",
            v: "The script runs queries A to D. Query E (CTE) is in the SQL block of step 2 and gave the same row, id 2 and total 125, on all three databases, in a separate test.",
          },
          {
            k: "p",
            v: "Credits: pgserver (a PostgreSQL server embedded in a Python package) is by Oscar Moll, Apache-2.0 license, repository github.com/orm011/pgserver; DuckDB is by the DuckDB Foundation, MIT license; SQLite was dedicated to the public domain by its authors. I used Python 3.12 because, in the test, pip did not find pgserver for Python 3.15.2.",
          },
        ],
      },
      {
        n: "4",
        title: "What the test gave",
        blocks: [
          {
            k: "table",
            label: "Results of queries A to E on SQLite, DuckDB and PostgreSQL",
            head: ["Query", "SQLite 3.54.1", "DuckDB 2.0.0", "PostgreSQL 16.2"],
            rows: [
              [
                "A) where total > 100 (alias in the WHERE)",
                "1 row (id 2, total 125)",
                "1 row (id 2, total 125)",
                {
                  v: "ERROR: column \"total\" does not exist",
                  tone: "bad",
                },
              ],
              [
                "B) order by total desc",
                "125, 90, 80, 30",
                "125, 90, 80, 30",
                "125, 90, 80, 30",
              ],
              ["C) where preco * qtd > 100", "id 2, 125", "id 2, 125", "id 2, 125"],
              [
                "D) subquery with where total > 100",
                "id 2, 125",
                "id 2, 125",
                "id 2, 125",
              ],
              ["E) CTE with where total > 100", "id 2, 125", "id 2, 125", "id 2, 125"],
            ],
          },
          {
            k: "p",
            v: "Reading: the alias works in the ORDER BY on all three, and in the WHERE only on SQLite and DuckDB. A query that runs without error on one of them can break when you switch to PostgreSQL. The fix works on all three: repeat the calculation, use a subquery or a CTE.",
          },
        ],
      },
      {
        n: "5",
        title: "How to write it so it works in the three tested databases (and, by deduction, in others)",
        blocks: [
          {
            k: "ol",
            items: [
              "Repeat the calculation in the WHERE (query C). It is what the PostgreSQL documentation says to do: write out the expression.",
              "Use a subquery (query D): the alias is born in the inner query and the WHERE of the outer query sees it.",
              "Use a CTE (query E): the same thing, with the name of the intermediate result written first. It tends to be more readable when the calculation is long.",
              "In the ORDER BY, the alias can stay, as the PostgreSQL documentation allows and the test confirmed on all three.",
            ],
            start: 1,
          },
          {
            k: "p",
            v: "Deduction: repeating the expression, using a subquery and using a CTE are common forms of SQL; only the three databases were tested.",
          },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: "ol",
            items: [
              "In PostgreSQL, the SELECT alias does not work in the WHERE: the documentation says you write the expression there.",
              "The WHERE eliminates rows before the SELECT columns are calculated.",
              "SQLite and DuckDB accepted the alias in the WHERE in the test: that is not a general rule.",
              "To work in the three tested databases: repeat the calculation, use a subquery or a CTE.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Myth and fact",
        blocks: [
          {
            k: "ul",
            items: [
              "Myth: \"if it ran on my database, it runs on any of them\". Fact: the same WHERE with an alias ran on SQLite and DuckDB and failed on PostgreSQL.",
              "Myth: \"the alias is not valid anywhere outside the SELECT\". Fact: the PostgreSQL documentation says it works in the ORDER BY and in the GROUP BY.",
            ],
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          {
            k: "p",
            v: "[PostgreSQL, SELECT command](https://www.postgresql.org/docs/current/sql-select.html). [pgserver (Oscar Moll, Apache-2.0)](https://github.com/orm011/pgserver). [DuckDB (DuckDB Foundation, MIT)](https://duckdb.org/). [SQLite, copyright and public domain](https://www.sqlite.org/copyright.html).",
            muted: true,
          },
          {
            k: "p",
            v: "Educational and independent content.",
            muted: true,
          },
        ],
      },
    ],
  },
};
