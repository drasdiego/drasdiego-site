import type { Guide } from './blog';

export const LAST_VALUE_JANELA: Guide = {
  slug: 'last-value-janela',
  category: 'dados',
  keyword: 'JANELA',
  published: '2026-11-21',
  pt: {
    title: "last_value devolve a própria linha: como a moldura da janela muda o resultado",
    short: "last_value devolve a própria linha",
    lead: "Você pediu o último valor e veio o valor da própria linha. O motivo é a moldura padrão da janela. Aqui estão a explicação, o teste pronto e a correção.",
    description: "Por que o last_value com ORDER BY devolve o valor da própria linha, o que é a moldura da janela e o padrão com e sem ORDER BY, como corrigir com ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING e um teste pronto no PostgreSQL, SQLite e DuckDB.",
    facts: ["dados", "sql", "funções de janela"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: 'p', v: "Testado em 18/11/2026 no Mac do autor, com PostgreSQL 16.2 (pelo pacote pgserver), DuckDB 2.0.0 e SQLite 3.54.1; as documentações do PostgreSQL (versão atual), do SQLite e do DuckDB 2.0 foram abertas no mesmo dia. O que o guia afirma vale para esses três bancos. Não testei nem cito MySQL nem SQL Server. As linhas marcadas como dedução são conclusões do autor, não frases das páginas. Os dados da tabela de saldo são fictícios. O guia não tem vínculo com nenhum dos projetos citados." },
        ],
      },
      {
        n: '0',
        title: "O que é cada coisa",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Função de janela: uma função que olha para um conjunto de linhas ao redor da linha atual sem juntá-las numa só. É escrita com `OVER (...)`.",
              "last_value: em inglês, \"último valor\". A documentação do PostgreSQL diz que ela devolve o valor avaliado na última linha da moldura da janela.",
              "ORDER BY dentro do OVER: define a ordem das linhas na janela.",
              "Moldura (window frame): o trecho de linhas, a partir da linha atual, que a função enxerga.",
              "Empatadas (peers): linhas que têm o mesmo valor na coluna do ORDER BY.",
              "ROWS e RANGE: dois jeitos de escrever a moldura. ROWS conta linhas; RANGE trabalha com os valores da coluna de ordenação, e por isso inclui as empatadas.",
            ],
          },
        ],
      },
      {
        n: '1',
        title: "O que a documentação diz",
        blocks: [
          {
            k: 'ul',
            items: [
              "PostgreSQL, a moldura padrão: a página das funções de janela diz que first_value, last_value e nth_value consideram só as linhas da moldura, que por padrão vai \"from the start of the partition through the last peer of the current row\" (do começo da partição até a última linha empatada com a atual). E diz: \"This is likely to give unhelpful results for last_value\" (isso tende a dar resultados pouco úteis para o last_value).",
              "Com e sem ORDER BY (tutorial do PostgreSQL): com ORDER BY, a moldura são as linhas do começo da partição até a linha atual, mais as seguintes que empatam com ela; sem ORDER BY, a moldura é a partição inteira.",
              "SQLite: a moldura padrão é \"RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW EXCLUDE NO OTHERS\".",
              "DuckDB 2.0: a página traz \"RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\" como o padrão quando há ORDER BY (trecho lido em resumo: confira na página).",
              "Dedução: se o last_value devolve a última linha da moldura e a moldura padrão termina na linha atual, o resultado é a própria linha, quando não há linhas empatadas.",
            ],
          },
        ],
      },
      {
        n: '2',
        title: "As consultas em SQL",
        blocks: [
          { k: 'p', v: "Tabela de saldo por dia, com um dia por linha. O A é o que parece errado." },
          { k: 'code', label: "Tabela e consultas A a D (SQL)", text: "create table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (3, 120), (4, 200);\n\n-- A) last_value com a moldura padrao\nselect dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia;\n\n-- B) moldura ampla, com ROWS\nselect dia, valor,\n  last_value(valor) over (order by dia rows between unbounded preceding and unbounded following) as ultimo\nfrom saldo order by dia;\n\n-- C) moldura ampla, com RANGE\nselect dia, valor,\n  last_value(valor) over (order by dia range between unbounded preceding and unbounded following) as ultimo\nfrom saldo order by dia;\n\n-- D) first_value com a moldura padrao\nselect dia, valor, first_value(valor) over (order by dia) as primeiro from saldo order by dia;" },
        ],
      },
      {
        n: '3',
        title: "O teste pronto nos três bancos",
        blocks: [
          { k: 'p', v: "Você precisa do Python 3.12 e de um terminal. O teste roda o SQL no SQLite (que já vem com o Python), no DuckDB e num PostgreSQL embutido pelo pacote pgserver, tudo no seu computador." },
          {
            k: 'ol', start: 1,
            items: [
              "Crie um ambiente isolado e instale os dois pacotes:",
            ],
          },
          { k: 'code', label: "Instalar (terminal)", text: "python3.12 -m venv venv_guia\nvenv_guia/bin/pip install duckdb==2.0.0 pgserver==0.1.4" },
          { k: 'p', v: "As versões estão fixadas (DuckDB 2.0.0 e pgserver 0.1.4) porque os resultados do guia são de 18/11/2026; versões novas podem mudar o resultado." },
          {
            k: 'ol', start: 2,
            items: [
              "Salve o script abaixo como `teste_janela.py`:",
            ],
          },
          { k: 'code', label: "Teste das consultas A a D (Python)", text: "import sqlite3, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (3, 120), (4, 200);\n\"\"\"\nconsultas = {\n \"A) last_value padrao\": \"select dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia\",\n \"B) moldura completa\": \"select dia, valor, last_value(valor) over (order by dia rows between unbounded preceding and unbounded following) as ultimo from saldo order by dia\",\n \"C) moldura completa por RANGE\": \"select dia, valor, last_value(valor) over (order by dia range between unbounded preceding and unbounded following) as ultimo from saldo order by dia\",\n \"D) first_value padrao\": \"select dia, valor, first_value(valor) over (order by dia) as primeiro from saldo order by dia\",\n}\n\ndef rodar(nome, execf, versao):\n    print(\"==\", nome, versao)\n    for k, q in consultas.items():\n        try:\n            print(k, \"->\", execf(q))\n        except Exception as e:\n            print(k, \"-> ERRO:\", str(e).strip().splitlines()[0])\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite\", lambda q: con.execute(q).fetchall(), sqlite3.sqlite_version)\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB\", lambda q: d.execute(q).fetchall(), duckdb.__version__)\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\nprint(srv.psql(\"select version()\").strip().splitlines()[2])\nrodar(\"PostgreSQL\", lambda q: srv.psql(q).strip().replace(\"\\n\", \" | \"), \"\")\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)" },
          {
            k: 'ol', start: 3,
            items: [
              "Rode:",
            ],
          },
          { k: 'code', label: "Rodar (terminal)", text: "venv_guia/bin/python teste_janela.py" },
          {
            k: 'ol', start: 4,
            items: [
              "Para ver o caso das linhas empatadas e o caso sem ORDER BY, salve este segundo script como `teste_empates.py` e rode com `venv_guia/bin/python teste_empates.py`. A tabela agora tem dois lançamentos no dia 2:",
            ],
          },
          { k: 'code', label: "Teste de empates e sem ORDER BY (Python)", text: "import sqlite3, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (2, 120), (3, 200);\n\"\"\"\nconsultas = {\n \"E) com empate no dia 2\": \"select dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia, valor\",\n \"F) sem ORDER BY\": \"select dia, valor, last_value(valor) over () as ultimo from saldo order by dia, valor\",\n}\n\ndef rodar(nome, execf):\n    print(\"==\", nome)\n    for k, q in consultas.items():\n        print(k, \"->\", execf(q))\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite \" + sqlite3.sqlite_version, lambda q: con.execute(q).fetchall())\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB \" + duckdb.__version__, lambda q: d.execute(q).fetchall())\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\nrodar(\"PostgreSQL\", lambda q: srv.psql(q).strip().replace(\"\\n\", \" | \"))\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)" },
          { k: 'p', muted: true, v: "Créditos: o pgserver (servidor PostgreSQL embutido num pacote Python) é de Oscar Moll, licença Apache-2.0, repositório github.com/orm011/pgserver; o DuckDB é da DuckDB Foundation, licença MIT; o SQLite foi dedicado ao domínio público pelos autores. Usei o Python 3.12 porque, no teste, o pip não achou o pgserver para o Python 3.15.2." },
        ],
      },
      {
        n: '4',
        title: "O que deu no teste",
        blocks: [
          {
            k: 'table',
            label: "Resultado das consultas A a D no SQLite, DuckDB e PostgreSQL",
            head: ["Consulta", "SQLite 3.54.1", "DuckDB 2.0.0", "PostgreSQL 16.2"],
            rows: [
              ["A) last_value(valor) over (order by dia)", "100, 150, 120, 200", "100, 150, 120, 200", "100, 150, 120, 200"],
              ["B) com rows between unbounded preceding and unbounded following", "200 em todas as linhas", "200 em todas as linhas", "200 em todas as linhas"],
              ["C) o mesmo com range between ...", "200 em todas", "200 em todas", "200 em todas"],
              ["D) first_value(valor) over (order by dia)", "100 em todas", "100 em todas", "100 em todas"],
            ],
          },
          { k: 'p', v: "Casos do segundo script (tabela com os lançamentos (1, 100), (2, 150), (2, 120), (3, 200), em ordem de dia e valor):" },
          {
            k: 'table',
            label: "Resultado dos casos E e F nos três bancos",
            head: ["Consulta", "Resultado nos três bancos"],
            rows: [
              ["E) last_value(valor) over (order by dia), com empate no dia 2", "dia 1: 100; dia 2, valor 120: 120; dia 2, valor 150: 120; dia 3: 200"],
              ["F) last_value(valor) over (), sem ORDER BY", "200 em todas as linhas"],
            ],
          },
          { k: 'p', v: "Leitura: no A, cada linha recebe o próprio valor. No B e no C, a moldura cobre a partição inteira e todas as linhas recebem o saldo do último dia. No E, as duas linhas empatadas do dia 2 recebem o mesmo valor, o da última linha do empate (a moldura inclui as empatadas). Dedução: qual das duas linhas do empate vem por último não é definido pelo `ORDER BY dia`; para um resultado estável, ordene também por uma coluna que desempate. No F, sem ORDER BY a moldura é a partição inteira, como diz o tutorial do PostgreSQL." },
        ],
      },
      {
        n: '5',
        title: "Como corrigir",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Amplie a moldura até o fim da partição, como no teste B: `last_value(valor) over (order by dia rows between unbounded preceding and unbounded following)`.",
              "Confira se há dias repetidos. Com empates na coluna do ORDER BY, o resultado do last_value com a moldura padrão é o valor da última linha do empate, não o da própria linha.",
              "Lembre do nth_value: a documentação do PostgreSQL diz que o resultado padrão é pouco útil para o last_value e, às vezes, para o nth_value. Não testei o nth_value neste guia.",
            ],
          },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Com ORDER BY e sem moldura escrita, a moldura vai do começo até a linha atual (e as empatadas).",
              "Por isso o last_value devolve o valor da própria linha, quando não há empate.",
              "Para o último valor da partição, escreva a moldura: `rows between unbounded preceding and unbounded following`.",
              "Sem ORDER BY, a moldura padrão é a partição inteira.",
            ],
          },
        ],
      },
      {
        title: "Mito x verdade",
        blocks: [
          {
            k: 'ul',
            items: [
              "Mito: \"last_value sempre devolve o último valor da tabela\". Verdade: devolve o valor da última linha da moldura, e a moldura padrão com ORDER BY termina na linha atual.",
              "Mito: \"é bug do banco\". Verdade: PostgreSQL, SQLite e DuckDB deram o mesmo resultado no teste, e a documentação do PostgreSQL avisa que o padrão tende a dar resultado pouco útil para o last_value.",
            ],
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: 'p', muted: true, v: "PostgreSQL, [funções de janela](https://www.postgresql.org/docs/current/functions-window.html). PostgreSQL, [tutorial de funções de janela](https://www.postgresql.org/docs/current/tutorial-window.html). SQLite, [funções de janela](https://www.sqlite.org/windowfunctions.html). DuckDB 2.0, [funções de janela](https://duckdb.org/docs/2.0/sql/functions/window_functions.html). pgserver (Oscar Moll, Apache-2.0), [repositório](https://github.com/orm011/pgserver). DuckDB (DuckDB Foundation, MIT), [site](https://duckdb.org/). SQLite, [direitos autorais e domínio público](https://www.sqlite.org/copyright.html)." },
          { k: 'p', muted: true, v: "Conteúdo educativo e independente." },
        ],
      },
    ],
  },
  en: {
    title: "last_value returns the row itself: how the window frame changes the result",
    short: "last_value returns the row itself",
    lead: "You asked for the last value and got the value of the row itself. The reason is the default window frame. Here are the explanation, the ready made test and the fix.",
    description: "Why last_value with ORDER BY returns the value of the row itself, what the window frame is and the default with and without ORDER BY, how to fix it with ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING and a ready made test on PostgreSQL, SQLite and DuckDB.",
    facts: ["data", "sql", "window functions"],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          { k: 'p', v: "Tested on November 18, 2026 on the author's Mac, with PostgreSQL 16.2 (through the pgserver package), DuckDB 2.0.0 and SQLite 3.54.1; the PostgreSQL (current version), SQLite and DuckDB 2.0 documentation were opened the same day. What the guide states holds for these three databases. I did not test or cite MySQL or SQL Server. The lines marked as inference are the author's conclusions, not sentences from the pages. The data in the balance table is fictional. The guide has no affiliation with any of the projects cited." },
        ],
      },
      {
        n: '0',
        title: "What each thing is",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Window function: a function that looks at a set of rows around the current row without merging them into one. It is written with `OVER (...)`.",
              "last_value: the documentation for PostgreSQL says it returns the value evaluated at the last row of the window frame.",
              "ORDER BY inside OVER: defines the order of the rows in the window.",
              "Window frame: the stretch of rows, starting from the current row, that the function sees.",
              "Peers: rows that have the same value in the ORDER BY column.",
              "ROWS and RANGE: two ways to write the frame. ROWS counts rows; RANGE works with the values of the ordering column, and that is why it includes the peers.",
            ],
          },
        ],
      },
      {
        n: '1',
        title: "What the documentation says",
        blocks: [
          {
            k: 'ul',
            items: [
              "PostgreSQL, the default frame: the window functions page says that first_value, last_value and nth_value consider only the rows in the frame, which by default runs \"from the start of the partition through the last peer of the current row\". It also says: \"This is likely to give unhelpful results for last_value\".",
              "With and without ORDER BY (PostgreSQL tutorial): with ORDER BY, the frame is the rows from the start of the partition through the current row, plus the following rows that are peers of it; without ORDER BY, the frame is the whole partition.",
              "SQLite: the default frame is \"RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW EXCLUDE NO OTHERS\".",
              "DuckDB 2.0: the page gives \"RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\" as the default when there is an ORDER BY (passage read in summary: check it on the page).",
              "Inference: if last_value returns the last row of the frame and the default frame ends at the current row, the result is the row itself, when there are no peer rows.",
            ],
          },
        ],
      },
      {
        n: '2',
        title: "The SQL queries",
        blocks: [
          { k: 'p', v: "Balance table by day, one day per row. Query A is the one that looks wrong. The names in the code blocks (saldo, dia, valor, ultimo, primeiro) are example names in Portuguese: saldo is balance, dia is day, valor is value, ultimo is last and primeiro is first. The result does not change." },
          { k: 'code', label: "Tabela e consultas A a D (SQL)", text: "create table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (3, 120), (4, 200);\n\n-- A) last_value com a moldura padrao\nselect dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia;\n\n-- B) moldura ampla, com ROWS\nselect dia, valor,\n  last_value(valor) over (order by dia rows between unbounded preceding and unbounded following) as ultimo\nfrom saldo order by dia;\n\n-- C) moldura ampla, com RANGE\nselect dia, valor,\n  last_value(valor) over (order by dia range between unbounded preceding and unbounded following) as ultimo\nfrom saldo order by dia;\n\n-- D) first_value com a moldura padrao\nselect dia, valor, first_value(valor) over (order by dia) as primeiro from saldo order by dia;" },
        ],
      },
      {
        n: '3',
        title: "The ready made test on the three databases",
        blocks: [
          { k: 'p', v: "You need Python 3.12 and a terminal. The test runs the SQL on SQLite (which already comes with Python), on DuckDB and on a PostgreSQL embedded by the pgserver package, all on your computer." },
          {
            k: 'ol', start: 1,
            items: [
              "Create an isolated environment and install the two packages:",
            ],
          },
          { k: 'code', label: "Instalar (terminal)", text: "python3.12 -m venv venv_guia\nvenv_guia/bin/pip install duckdb==2.0.0 pgserver==0.1.4" },
          { k: 'p', v: "The versions are pinned (DuckDB 2.0.0 and pgserver 0.1.4) because the results in the guide are from 11/18/2026; newer versions may change the result." },
          {
            k: 'ol', start: 2,
            items: [
              "Save the script below as `teste_janela.py`:",
            ],
          },
          { k: 'code', label: "Teste das consultas A a D (Python)", text: "import sqlite3, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (3, 120), (4, 200);\n\"\"\"\nconsultas = {\n \"A) last_value padrao\": \"select dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia\",\n \"B) moldura completa\": \"select dia, valor, last_value(valor) over (order by dia rows between unbounded preceding and unbounded following) as ultimo from saldo order by dia\",\n \"C) moldura completa por RANGE\": \"select dia, valor, last_value(valor) over (order by dia range between unbounded preceding and unbounded following) as ultimo from saldo order by dia\",\n \"D) first_value padrao\": \"select dia, valor, first_value(valor) over (order by dia) as primeiro from saldo order by dia\",\n}\n\ndef rodar(nome, execf, versao):\n    print(\"==\", nome, versao)\n    for k, q in consultas.items():\n        try:\n            print(k, \"->\", execf(q))\n        except Exception as e:\n            print(k, \"-> ERRO:\", str(e).strip().splitlines()[0])\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite\", lambda q: con.execute(q).fetchall(), sqlite3.sqlite_version)\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB\", lambda q: d.execute(q).fetchall(), duckdb.__version__)\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\nprint(srv.psql(\"select version()\").strip().splitlines()[2])\nrodar(\"PostgreSQL\", lambda q: srv.psql(q).strip().replace(\"\\n\", \" | \"), \"\")\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)" },
          {
            k: 'ol', start: 3,
            items: [
              "Run:",
            ],
          },
          { k: 'code', label: "Rodar (terminal)", text: "venv_guia/bin/python teste_janela.py" },
          {
            k: 'ol', start: 4,
            items: [
              "To see the peer rows case and the case without ORDER BY, save this second script as `teste_empates.py` and run it with `venv_guia/bin/python teste_empates.py`. The table now has two entries on day 2:",
            ],
          },
          { k: 'code', label: "Teste de empates e sem ORDER BY (Python)", text: "import sqlite3, tempfile, shutil\nimport duckdb\nimport pgserver\n\nsetup = \"\"\"\ncreate table saldo (dia integer, valor integer);\ninsert into saldo values (1, 100), (2, 150), (2, 120), (3, 200);\n\"\"\"\nconsultas = {\n \"E) com empate no dia 2\": \"select dia, valor, last_value(valor) over (order by dia) as ultimo from saldo order by dia, valor\",\n \"F) sem ORDER BY\": \"select dia, valor, last_value(valor) over () as ultimo from saldo order by dia, valor\",\n}\n\ndef rodar(nome, execf):\n    print(\"==\", nome)\n    for k, q in consultas.items():\n        print(k, \"->\", execf(q))\n\ncon = sqlite3.connect(\":memory:\")\ncon.executescript(setup)\nrodar(\"SQLite \" + sqlite3.sqlite_version, lambda q: con.execute(q).fetchall())\n\nd = duckdb.connect()\nd.execute(setup)\nrodar(\"DuckDB \" + duckdb.__version__, lambda q: d.execute(q).fetchall())\n\ntmp = tempfile.mkdtemp()\nsrv = pgserver.get_server(tmp)\nsrv.psql(setup)\nrodar(\"PostgreSQL\", lambda q: srv.psql(q).strip().replace(\"\\n\", \" | \"))\nsrv.cleanup()\nshutil.rmtree(tmp, ignore_errors=True)" },
          { k: 'p', muted: true, v: "Credits: pgserver (a PostgreSQL server embedded in a Python package) is by Oscar Moll, Apache-2.0 license, repository github.com/orm011/pgserver; DuckDB is by the DuckDB Foundation, MIT license; SQLite was dedicated to the public domain by its authors. I used Python 3.12 because, in the test, pip did not find pgserver for Python 3.15.2." },
        ],
      },
      {
        n: '4',
        title: "What the test gave",
        blocks: [
          {
            k: 'table',
            label: "Results of queries A to D on SQLite, DuckDB and PostgreSQL",
            head: ["Query", "SQLite 3.54.1", "DuckDB 2.0.0", "PostgreSQL 16.2"],
            rows: [
              ["A) last_value(valor) over (order by dia)", "100, 150, 120, 200", "100, 150, 120, 200", "100, 150, 120, 200"],
              ["B) with rows between unbounded preceding and unbounded following", "200 on every row", "200 on every row", "200 on every row"],
              ["C) the same with range between ...", "200 on all", "200 on all", "200 on all"],
              ["D) first_value(valor) over (order by dia)", "100 on all", "100 on all", "100 on all"],
            ],
          },
          { k: 'p', v: "Cases from the second script (table with the entries (1, 100), (2, 150), (2, 120), (3, 200), in order of day and value):" },
          {
            k: 'table',
            label: "Results of cases E and F on the three databases",
            head: ["Query", "Result on the three databases"],
            rows: [
              ["E) last_value(valor) over (order by dia), with a tie on day 2", "day 1: 100; day 2, value 120: 120; day 2, value 150: 120; day 3: 200"],
              ["F) last_value(valor) over (), without ORDER BY", "200 on every row"],
            ],
          },
          { k: 'p', v: "Reading: in A, each row gets its own value. In B and C, the frame covers the whole partition and every row gets the balance of the last day. In E, the two peer rows of day 2 get the same value, the one from the last row of the tie (the frame includes the peers). Inference: which of the two tied rows comes last is not defined by `ORDER BY dia`; for a stable result, also order by a column that breaks the tie. In F, without ORDER BY the frame is the whole partition, as the PostgreSQL tutorial says." },
        ],
      },
      {
        n: '5',
        title: "How to fix it",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Widen the frame to the end of the partition, as in test B: `last_value(valor) over (order by dia rows between unbounded preceding and unbounded following)`.",
              "Check whether there are repeated days. With ties in the ORDER BY column, the result of last_value with the default frame is the value of the last row of the tie, not the value of the row itself.",
              "Remember nth_value: the PostgreSQL documentation says the default result is unhelpful for last_value and sometimes for nth_value. I did not test nth_value in this guide.",
            ],
          },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "With ORDER BY and no frame written, the frame runs from the start through the current row (and its peers).",
              "That is why last_value returns the value of the row itself, when there is no tie.",
              "For the last value of the partition, write the frame: `rows between unbounded preceding and unbounded following`.",
              "Without ORDER BY, the default frame is the whole partition.",
            ],
          },
        ],
      },
      {
        title: "Myth and fact",
        blocks: [
          {
            k: 'ul',
            items: [
              "Myth: \"last_value always returns the last value of the table\". Fact: it returns the value of the last row of the frame, and the default frame with ORDER BY ends at the current row.",
              "Myth: \"it is a database bug\". Fact: PostgreSQL, SQLite and DuckDB gave the same result in the test, and the PostgreSQL documentation warns that the default tends to give an unhelpful result for last_value.",
            ],
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: 'p', muted: true, v: "PostgreSQL, [window functions](https://www.postgresql.org/docs/current/functions-window.html). PostgreSQL, [window functions tutorial](https://www.postgresql.org/docs/current/tutorial-window.html). SQLite, [window functions](https://www.sqlite.org/windowfunctions.html). DuckDB 2.0, [window functions](https://duckdb.org/docs/2.0/sql/functions/window_functions.html). pgserver (Oscar Moll, Apache-2.0), [repository](https://github.com/orm011/pgserver). DuckDB (DuckDB Foundation, MIT), [website](https://duckdb.org/). SQLite, [copyright and public domain](https://www.sqlite.org/copyright.html)." },
          { k: 'p', muted: true, v: "Educational and independent content." },
        ],
      },
    ],
  },
};
