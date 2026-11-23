import type { Guide, TableCell } from './blog';

const INSTALAR_PANDAS =
  'python3 -m venv venv_diames\nvenv_diames/bin/pip install pandas';
const TESTE_SEIS =
  'import io\nimport warnings\n\nimport pandas as pd\n\nprint("pandas", pd.__version__)\n\nCSV = "pedido,data\\n1,03/04/2026\\n2,05/06/2026\\n3,11/12/2026\\n"\ntexto = pd.read_csv(io.StringIO(CSV))["data"]\n\n\ndef mostra(titulo, fn):\n    with warnings.catch_warnings(record=True) as avisos:\n        warnings.simplefilter("always")\n        try:\n            resultado = fn()\n            saida = ", ".join(resultado.dt.strftime("%Y-%m-%d"))\n        except Exception as erro:\n            saida = f"ERRO {type(erro).__name__}"\n        extra = f" | AVISO {avisos[0].category.__name__}" if avisos else ""\n    print(f"{titulo:<34} -> {saida}{extra}")\n\n\nprint("texto original:", ", ".join(texto))\nmostra("1) sem nada", lambda: pd.to_datetime(texto))\nmostra("2) dayfirst=True", lambda: pd.to_datetime(texto, dayfirst=True))\nmostra(\'3) format="%d/%m/%Y"\', lambda: pd.to_datetime(texto, format="%d/%m/%Y"))\nmostra("4) mistura 25/04 na 2a linha", lambda: pd.to_datetime(pd.Series(["03/04/2026", "25/04/2026"])))\nmostra("5) mistura 25/04 na 1a linha", lambda: pd.to_datetime(pd.Series(["25/04/2026", "03/04/2026"])))\nmostra(\'6) format com 04/25/2026\', lambda: pd.to_datetime(pd.Series(["03/04/2026", "04/25/2026"]), format="%d/%m/%Y"))';
const LER_CSV =
  'import io\n\nimport pandas as pd\n\nCSV = "pedido,data\\n1,03/04/2026\\n2,05/06/2026\\n3,11/12/2026\\n"\n\ndf = pd.read_csv(io.StringIO(CSV), parse_dates=["data"], date_format="%d/%m/%Y")\nprint(df["data"].dtype)\nprint(df["data"].dt.strftime("%Y-%m-%d").tolist())\n\ndf_ruim = pd.read_csv(\n    io.StringIO("pedido,data\\n1,03/04/2026\\n2,25/04/2026\\n"), parse_dates=["data"]\n)\nprint("sem date_format, dia 25 na 2a linha, tipo da coluna:", df_ruim["data"].dtype)';
const CONVERTER_CONFERIR =
  'import io\n\nimport pandas as pd\n\nCSV = "pedido,data\\n1,03/04/2026\\n2,05/06/2026\\n3,11/12/2026\\n"\n\ndf = pd.read_csv(io.StringIO(CSV))\noriginal = df["data"].copy()\n\ndf["data"] = pd.to_datetime(df["data"], format="%d/%m/%Y")\n\nvolta = df["data"].dt.strftime("%d/%m/%Y")\nerrado = pd.to_datetime(original).dt.strftime("%d/%m/%Y")\n\nprint("com format, bateu com o texto original?", volta.equals(original))\nprint("sem format, bateu com o texto original?", errado.equals(original))\nprint(df)\nprint(df.dtypes)';

const URL_TO_DATETIME = 'https://pandas.pydata.org/docs/reference/api/pandas.to_datetime.html';
const URL_SERIES = 'https://pandas.pydata.org/docs/user_guide/timeseries.html';
const URL_READ_CSV = 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html';

const bad = (v: string): TableCell => ({ v, tone: 'bad' });
const ok = (v: string): TableCell => ({ v, tone: 'ok' });

export const DATA_BRASILEIRA_PANDAS: Guide = {
  slug: 'data-brasileira-pandas',
  category: 'dados',
  keyword: 'DIAMES',
  published: '2026-11-18',
  pt: {
    title: 'Data brasileira no pandas: por que 3 de abril vira 4 de março',
    short: 'Data brasileira no pandas',
    lead: 'Um teste pronto para ver no pandas o 3 de abril virar 4 de março sem erro nem aviso, a forma de ler data brasileira que não erra e um jeito de conferir a coluna depois de converter.',
    description: 'Um teste pronto para rodar no pandas que mostra como o to_datetime troca dia e mês sem erro nem aviso, as três formas de ler data brasileira (format, date_format e dayfirst) e como conferir a coluna depois de converter.',
    facts: ['dados', 'python', 'pandas', 'teste pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O teste foi rodado pelo autor em 18/11/2026 no pandas 3.1.1, com Python 3.15.2 e NumPy 2.5.5, num ambiente virtual novo. O comportamento do pandas para datas sem formato mudou entre versões e pode mudar de novo, então rode o teste na sua versão: o resultado precisa ser reconferido na versão que você usa. As datas e a tabela são exemplo. Onde o guia diz "nosso teste" ou "nossa leitura", é o que o teste mostrou ou interpretação do autor, separado do que está escrito na documentação do pandas. Sem vínculo com o pandas.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'pandas: a biblioteca de dados do Python, usada para trabalhar com tabelas.',
              'DataFrame e coluna: a tabela e um campo dela. Aqui a coluna `data` começa como texto.',
              'to_datetime: a função que converte texto em data de verdade.',
              'format: o parâmetro em que você diz como o texto está escrito. `%d` é o dia, `%m` é o mês e `%Y` é o ano com quatro dígitos.',
              'dayfirst: o parâmetro que manda ler o dia primeiro. O padrão é `False`.',
              'read_csv e parse_dates: a leitura de arquivo CSV; `parse_dates` pede para converter colunas em data na hora de ler.',
              'Ambiente virtual (venv): uma pasta isolada onde você instala o pandas sem mexer no resto do computador.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O teste pronto',
        blocks: [
          { k: 'p', v: 'Você precisa do Python 3 e de um terminal. O script lê uma coluna de datas brasileiras (3 de abril, 5 de junho e 11 de dezembro de 2026) e converte de seis jeitos.' },
          { k: 'ol', start: 1, items: ['Crie o ambiente e instale o pandas:'] },
          { k: 'code', label: 'Instalar o pandas (terminal)', text: INSTALAR_PANDAS },
          { k: 'ol', start: 2, items: ['Salve o script como `teste_diames.py` e rode com `venv_diames/bin/python teste_diames.py`:'] },
          { k: 'code', label: 'Teste das seis conversões (Python)', text: TESTE_SEIS },
        ],
      },
      {
        n: '2',
        title: 'O que deu no teste',
        blocks: [
          { k: 'p', v: 'Saída no pandas 3.1.1:' },
          {
            k: 'table',
            label: 'Saída do teste no pandas 3.1.1',
            head: ['Conversão', 'Resultado'],
            rows: [
              ['1) sem nada', bad('2026-03-04, 2026-05-06, 2026-11-12 (mês primeiro), sem erro e sem aviso')],
              ['2) dayfirst=True', ok('2026-04-03, 2026-06-05, 2026-12-11')],
              ['3) format="%d/%m/%Y"', ok('2026-04-03, 2026-06-05, 2026-12-11')],
              ['4) coluna 03/04/2026, 25/04/2026, sem nada', 'ValueError'],
              ['5) coluna 25/04/2026, 03/04/2026, sem nada', '2026-04-25, 2026-04-03, com um UserWarning'],
              ['6) format e uma linha 04/25/2026', 'ValueError'],
            ],
          },
          { k: 'p', v: 'Nossa leitura: a documentação do `to_datetime` diz que o `dayfirst` tem padrão `False` e que, com `True`, "10/11/12" vira 2012-11-10. Ela não escreve "mês primeiro" como regra. Quem mostra o mês primeiro é o nosso teste (linha 1). Também pelo teste, quando todos os dias da coluna são até 12 não há erro nem aviso, e o relatório sai com dia e mês trocados. Se aparece um dia maior que 12, o pandas dá erro ou aviso, conforme a posição (linhas 4 e 5). Essa dependência da posição vem do teste, não da documentação.' },
        ],
      },
      {
        n: '3',
        title: 'As três formas de ler data brasileira',
        blocks: [
          {
            k: 'ol',
            items: [
              '`format="%d/%m/%Y"` (a que recomendamos). Você diz exatamente como o texto está escrito. A documentação do `to_datetime` usa esse mesmo exemplo e a do guia de séries temporais diz que um `format` pode ser passado para garantir uma leitura específica. No teste, uma data fora do padrão deu erro (linha 6), o que é o que você quer.',
              '`date_format="%d/%m/%Y"` no `read_csv`, junto com `parse_dates`. É o equivalente do `format` na hora de ler o arquivo. Exemplo logo abaixo.',
              '`dayfirst=True`. Manda ler o dia primeiro, mas a própria documentação avisa que não é estrito: "dayfirst=True is not strict, but will prefer to parse with day first.". O guia de séries temporais completa que, se a data não puder ser lida com o dia primeiro, ela é lida como se o `dayfirst` fosse `False` e um aviso é emitido. No nosso teste completo (21 casos) isso aconteceu com uma data americana na primeira linha; com a data americana na segunda linha deu ValueError. Não conte com um só comportamento.',
            ],
          },
          { k: 'p', v: 'A forma do `read_csv`, com os mesmos dados em CSV. O segundo trecho mostra uma armadilha: se uma coluna não consegue virar data, o `parse_dates` devolve a coluna como texto, sem erro e sem aviso. A documentação do `read_csv` descreve isso (a coluna volta "unaltered", como objeto):' },
          { k: 'code', label: 'Ler CSV com date_format (Python)', text: LER_CSV },
        ],
      },
      {
        n: '4',
        title: 'Como conferir a coluna depois de converter',
        blocks: [
          { k: 'p', v: 'Recomendação nossa, não é regra da documentação: antes de confiar na coluna, confira uma data que você conhece, e confira a coluna inteira devolvendo as datas ao texto original. O bloco abaixo converte com `format`, volta para texto e compara com o original. No fim, ele repete a conta sem o `format` para você ver o resultado errado.' },
          { k: 'code', label: 'Converter e conferir (Python)', text: CONVERTER_CONFERIR },
          { k: 'p', v: 'Resultado esperado no pandas 3.1.1: `True` para a conversão com `format` e `False` para a conversão sem ele.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Sem `format` e sem `dayfirst`, no nosso teste, o pandas leu `03/04/2026` como 4 de março.',
              'Se todos os dias da coluna forem até 12, no nosso teste não houve erro nem aviso.',
              '`dayfirst=True` prefere o dia primeiro, mas a documentação diz que não é estrito.',
              'Use `format="%d/%m/%Y"` (ou `date_format` no `read_csv`). Data fora do padrão dá erro.',
              'Antes de confiar na coluna, confira uma data conhecida. Rode o teste na sua versão do pandas.',
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
              'Mito: "se o pandas não deu erro, a data está certa". Verdade: no nosso teste, a coluna com dias até 12 saiu com dia e mês trocados, sem erro e sem aviso.',
              'Mito: "dayfirst=True resolve". Verdade: a documentação diz que ele não é estrito.',
              'Mito: "o read_csv com parse_dates sempre converte". Verdade: se a coluna não puder virar data, ela volta como texto, sem aviso.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `pandas, [to_datetime (documentação 3.1.1)](${URL_TO_DATETIME}). pandas, [guia de séries temporais (Converting to timestamps)](${URL_SERIES}). pandas, [read_csv (documentação 3.1.1)](${URL_READ_CSV}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'Brazilian dates in pandas: April 3 becomes March 4',
    short: 'Brazilian dates in pandas',
    lead: 'A ready-made test that shows pandas turning 3 April into 4 March with no error and no warning, the way to read Brazilian dates that does not go wrong, and a way to check the column after converting.',
    description: 'A ready-made test to run in pandas that shows how to_datetime swaps day and month with no error and no warning, the three ways to read Brazilian dates (format, date_format and dayfirst) and how to check the column after converting.',
    facts: ['data', 'python', 'pandas', 'ready-made test'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The author ran the test on November 18, 2026 on pandas 3.1.1, with Python 3.15.2 and NumPy 2.5.5, in a fresh virtual environment. How pandas reads dates with no format has changed between versions and may change again, so run the test on your own version: the result has to be checked again on the version you use. The dates and the table are an EXAMPLE. Where the guide says "our test" or "our reading", it is what the test showed or the author’s interpretation, kept apart from what the pandas documentation says. Not affiliated with pandas.' },
          { k: 'p', v: 'The dates are in the Brazilian format (day/month/year), so 03/04/2026 is April 3. The column names (`pedido` is order, `data` is date) and the labels printed by the script are Portuguese example names, and the result does not change if you rename them.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'pandas: the Python data library, used to work with tables.',
              'DataFrame and column: the table and one field of it. Here the `data` column starts out as text.',
              'to_datetime: the function that turns text into a real date.',
              'format: the parameter where you say how the text is written. `%d` is the day, `%m` is the month and `%Y` is the four-digit year.',
              'dayfirst: the parameter that tells pandas to read the day first. The default is `False`.',
              'read_csv and parse_dates: reading a CSV file; `parse_dates` asks for columns to be converted to dates while reading.',
              'Virtual environment (venv): an isolated folder where you install pandas without touching the rest of the computer.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The ready-made test',
        blocks: [
          { k: 'p', v: 'You need Python 3 and a terminal. The script reads a column of Brazilian dates (April 3, June 5 and December 11, 2026) and converts it six ways. In the output, "sem nada" means with nothing, "mistura" means mixed, "2a linha" means 2nd row, "1a linha" means 1st row and "bateu com o texto original" means matched the original text.' },
          { k: 'ol', start: 1, items: ['Create the environment and install pandas:'] },
          { k: 'code', label: 'Install pandas (terminal)', text: INSTALAR_PANDAS },
          { k: 'ol', start: 2, items: ['Save the script as `teste_diames.py` and run it with `venv_diames/bin/python teste_diames.py`:'] },
          { k: 'code', label: 'Test of the six conversions (Python)', text: TESTE_SEIS },
        ],
      },
      {
        n: '2',
        title: 'What the test gave',
        blocks: [
          { k: 'p', v: 'Output on pandas 3.1.1:' },
          {
            k: 'table',
            label: 'Test output on pandas 3.1.1',
            head: ['Conversion', 'Result'],
            rows: [
              ['1) no argument (sem nada)', bad('2026-03-04, 2026-05-06, 2026-11-12 (month first), no error and no warning')],
              ['2) dayfirst=True', ok('2026-04-03, 2026-06-05, 2026-12-11')],
              ['3) format="%d/%m/%Y"', ok('2026-04-03, 2026-06-05, 2026-12-11')],
              ['4) column 03/04/2026, 25/04/2026, no argument', 'ValueError'],
              ['5) column 25/04/2026, 03/04/2026, no argument', '2026-04-25, 2026-04-03, with a UserWarning'],
              ['6) format and a 04/25/2026 row', 'ValueError'],
            ],
          },
          { k: 'p', v: 'Our reading: the `to_datetime` documentation says that `dayfirst` defaults to `False` and that, with `True`, "10/11/12" becomes 2012-11-10. It does not write "month first" as a rule. What shows month first is our test (row 1). Also from the test, when every day in the column is up to 12 there is no error and no warning, and the report comes out with day and month swapped. If a day above 12 shows up, pandas raises an error or a warning, depending on the position (rows 4 and 5). That dependence on position comes from the test, not from the documentation.' },
        ],
      },
      {
        n: '3',
        title: 'The three ways to read Brazilian dates',
        blocks: [
          {
            k: 'ol',
            items: [
              '`format="%d/%m/%Y"` (the one we recommend). You say exactly how the text is written. The `to_datetime` documentation uses this same example, and the time series guide says a `format` can be passed to guarantee a specific reading. In the test, a date outside the pattern raised an error (row 6), which is what you want.',
              '`date_format="%d/%m/%Y"` in `read_csv`, together with `parse_dates`. It is the equivalent of `format` when reading the file. Example right below.',
              '`dayfirst=True`. It tells pandas to read the day first, but the documentation itself warns that it is not strict: "dayfirst=True is not strict, but will prefer to parse with day first.". The time series guide adds that, if the date cannot be read with the day first, it is read as if `dayfirst` were `False` and a warning is issued. In our full test (21 cases) this happened with an American date on the first row; with the American date on the second row it raised ValueError. Do not count on a single behavior.',
            ],
          },
          { k: 'p', v: 'The `read_csv` way, with the same data as CSV. The second part shows a trap: if a column cannot become a date, `parse_dates` returns the column as text, with no error and no warning. The `read_csv` documentation describes this (the column comes back "unaltered", as an object):' },
          { k: 'code', label: 'Read CSV with date_format (Python)', text: LER_CSV },
        ],
      },
      {
        n: '4',
        title: 'How to check the column after converting',
        blocks: [
          { k: 'p', v: 'Our recommendation, not a rule of the documentation: before you trust the column, check a date you know, and check the whole column by turning the dates back into the original text. The block below converts with `format`, goes back to text and compares with the original. At the end, it repeats the calculation without `format` so you can see the wrong result.' },
          { k: 'code', label: 'Convert and check (Python)', text: CONVERTER_CONFERIR },
          { k: 'p', v: 'Expected result on pandas 3.1.1: `True` for the conversion with `format` and `False` for the conversion without it.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'With no `format` and no `dayfirst`, in our test, pandas read `03/04/2026` as March 4.',
              'If every day in the column is up to 12, in our test there was no error and no warning.',
              '`dayfirst=True` prefers the day first, but the documentation says it is not strict.',
              'Use `format="%d/%m/%Y"` (or `date_format` in `read_csv`). A date outside the pattern raises an error.',
              'Before you trust the column, check a date you know. Run the test on your own pandas version.',
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
              'Myth: "if pandas did not raise an error, the date is right". Fact: in our test, the column with days up to 12 came out with day and month swapped, with no error and no warning.',
              'Myth: "dayfirst=True solves it". Fact: the documentation says it is not strict.',
              'Myth: "read_csv with parse_dates always converts". Fact: if the column cannot become a date, it comes back as text, with no warning.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `pandas, [to_datetime (documentation 3.1.1)](${URL_TO_DATETIME}). pandas, [time series guide (Converting to timestamps)](${URL_SERIES}). pandas, [read_csv (documentation 3.1.1)](${URL_READ_CSV}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
