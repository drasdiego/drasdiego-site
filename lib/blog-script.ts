import type { Guide } from './blog';

const CODIGO = "const NOME_ABA = 'Exemplo';\nconst TAMANHO_LOTE = 20;\nconst LIMITE_MS = 5 * 60 * 1000;\nconst CHAVE = 'proximaLinha';\nconst FUNCAO = 'processarEmLotes';\n\nfunction criarDadosDeExemplo() {\n  const planilha = SpreadsheetApp.getActiveSpreadsheet();\n  const aba = planilha.getSheetByName(NOME_ABA) || planilha.insertSheet(NOME_ABA);\n  aba.clear();\n  const linhas = [['item', 'valor', 'resultado']];\n  for (let i = 1; i <= 200; i++) {\n    linhas.push(['Item ' + i, i, '']);\n  }\n  aba.getRange(1, 1, linhas.length, 3).setValues(linhas);\n}\n\nfunction apagarGatilhos() {\n  ScriptApp.getProjectTriggers().forEach(function (gatilho) {\n    if (gatilho.getHandlerFunction() === FUNCAO) {\n      ScriptApp.deleteTrigger(gatilho);\n    }\n  });\n}\n\nfunction agendarContinuacao() {\n  ScriptApp.newTrigger(FUNCAO).timeBased().after(60 * 1000).create();\n}\n\nfunction iniciar() {\n  PropertiesService.getScriptProperties().deleteProperty(CHAVE);\n  apagarGatilhos();\n  processarEmLotes();\n}\n\nfunction processarEmLotes() {\n  const inicio = Date.now();\n  const propriedades = PropertiesService.getScriptProperties();\n  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);\n  const ultimaLinha = aba.getLastRow();\n  let linha = Number(propriedades.getProperty(CHAVE)) || 2;\n\n  apagarGatilhos();\n\n  while (linha <= ultimaLinha) {\n    if (Date.now() - inicio > LIMITE_MS) {\n      agendarContinuacao();\n      return;\n    }\n    const quantidade = Math.min(TAMANHO_LOTE, ultimaLinha - linha + 1);\n    const valores = aba.getRange(linha, 2, quantidade, 1).getValues();\n    const resultados = valores.map(function (celula) {\n      return [celula[0] * 2];\n    });\n    aba.getRange(linha, 3, quantidade, 1).setValues(resultados);\n    Utilities.sleep(2000);\n    linha += quantidade;\n    propriedades.setProperty(CHAVE, String(linha));\n  }\n\n  propriedades.deleteProperty(CHAVE);\n}";

const URL_QUOTAS_EN = 'https://developers.google.com/apps-script/guides/services/quotas';
const URL_QUOTAS_PT = 'https://developers.google.com/apps-script/guides/services/quotas?hl=pt-br';
const URL_TRIGGERS = 'https://developers.google.com/apps-script/guides/triggers/installable';
const URL_CLOCK = 'https://developers.google.com/apps-script/reference/script/clock-trigger-builder';
const URL_PROPS_SERVICE = 'https://developers.google.com/apps-script/reference/properties/properties-service';
const URL_PROPS = 'https://developers.google.com/apps-script/reference/properties/properties';

export const APPS_SCRIPT_TETO: Guide = {
  slug: 'apps-script-teto',
  category: 'google-workspace',
  published: '2026-11-11',
  pt: {
    title: 'Apps Script tem teto',
    short: 'Apps Script',
    lead: 'Como fazer o Apps Script continuar depois do teto de seis minutos: um script que processa as linhas de uma planilha em lotes, para antes de estourar o teto de tempo, guarda onde parou, agenda a própria volta e limpa tudo quando termina.',
    description: 'Montar um script que processa as linhas de uma planilha em lotes, para antes de estourar o teto de tempo, guarda onde parou, agenda a própria volta e limpa tudo quando termina.',
    facts: ['Apps Script', 'Google Planilhas', 'código de exemplo'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'As cotas e os limites do Apps Script mudam. A própria página do Google diz: "sujeitas a eliminação, redução ou alteração a qualquer momento, sem aviso prévio". Os números deste guia são os da página oficial em 10/11/2026; confira na página antes de depender deles. O código deste guia foi testado uma vez no Google Apps Script, em 10/11/2026, numa planilha de exemplo com 200 linhas e com o limite reduzido para dez segundos, para provocar a parada. O limite de cinco minutos do código e planilhas grandes não foram testados: o teste de verdade é seu. Rode primeiro numa planilha de teste, com dados de exemplo, nunca na planilha que você usa de verdade.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ul',
            items: [
              'Execução: cada vez que o script roda do começo ao fim (ou até ser interrompido). Segundo a página de limites do Google, o tempo de execução é de seis minutos por execução, tanto na conta pessoal quanto na Workspace.',
              'O que acontece ao passar do limite: a página diz "If you exceed a quota or limitation, your script throws an exception and execution stops." A página não traz a mensagem exata do teto de seis minutos, por isso este guia não cita nenhuma.',
              'Lote: um pedaço da planilha (no exemplo, vinte linhas) processado de uma vez, em vez de uma linha por vez.',
              'Propriedades do script (PropertiesService): onde o script guarda dados simples em pares chave e valor. A página diz "Allows scripts to store simple data in key-value pairs". Aqui guardam a próxima linha a processar.',
              'Gatilho de tempo: faz uma função rodar depois de um intervalo ou em um horário. Dá para criar e apagar por código ("Create and delete triggers programmatically with the Script service."). O método `after(milissegundos)` "Specifies the minimum duration (in milliseconds) after the current time that the trigger runs."',
              'Outros limites da mesma página (conta pessoal e Workspace): destinatários de e-mail por dia, 100 e 1.500 (veja o aviso sobre contas de teste abaixo); tempo total de execução dos gatilhos por dia, 90 minutos e 6 horas; gatilhos por usuário por script, 20 nas duas.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Planilha de exemplo (dados inventados, EXEMPLO)',
        blocks: [
          { k: 'p', v: 'Use uma planilha nova, só para teste. Abra Extensões, Apps Script (o script fica ligado à planilha). Cole o código abaixo e rode a função `criarDadosDeExemplo` uma vez: ela cria a aba Exemplo com duzentas linhas, colunas item, valor e resultado, tudo inventado.' },
        ],
      },
      {
        n: '2',
        title: 'O código para copiar',
        blocks: [
          { k: 'p', v: 'Arquivo completo. Cole no editor do Apps Script no lugar do que estiver lá.' },
          { k: 'code', label: 'Código (cole no editor do Apps Script)', text: CODIGO },
        ],
      },
      {
        n: '3',
        title: 'Como testar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Rode `criarDadosDeExemplo`. Autorize o script quando o Google pedir (é a sua própria planilha de teste).',
              'Para ver o gatilho funcionando sem esperar cinco minutos, troque a linha do limite por `const LIMITE_MS = 10 * 1000;` (dez segundos). O sleep de dois segundos por lote simula trabalho pesado.',
              'Rode a função `iniciar`. Ela zera o marcador, apaga gatilhos antigos desta função e processa até passar do limite. Depois de uns dez segundos, ela para e agenda a volta.',
              'Em Gatilhos (o ícone de relógio na barra lateral), deve aparecer um gatilho de tempo para `processarEmLotes`. Em Configurações do projeto, Propriedades do script, deve aparecer a chave `proximaLinha` com a próxima linha a processar.',
              'Espere cerca de um minuto, ou mais: o gatilho roda sozinho e continua de onde parou. Repita a conferência até a coluna resultado estar preenchida nas duzentas linhas.',
              'No fim, não deve sobrar gatilho para `processarEmLotes` nem a chave `proximaLinha`.',
              'Volte `LIMITE_MS` para `5 * 60 * 1000` (cinco minutos, uma margem de um minuto abaixo do teto de seis) e troque o cálculo do exemplo (valor vezes dois) pelo seu trabalho de verdade, ainda numa cópia.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Como o código funciona',
        blocks: [
          {
            k: 'ol',
            items: [
              '`processarEmLotes` anota a hora de início e lê a próxima linha guardada nas propriedades do script (se não houver, começa na segunda linha, logo abaixo do cabeçalho).',
              'Apaga gatilhos antigos da própria função, para não acumular.',
              'Processa um lote por vez e grava o resultado na planilha. Depois de cada lote, salva a próxima linha. Se o Google interromper de repente: como a escrita na planilha vem antes de salvar a propriedade, o lote em andamento pode ser repetido na próxima execução.',
              'Antes de cada lote, confere se já passou do limite. Se passou, agenda um gatilho de tempo para um minuto depois e termina limpo.',
              'Quando as linhas acabam, apaga a propriedade. Como o gatilho antigo é apagado no começo de cada execução, não sobra nenhum no fim.',
            ],
          },
        ],
      },
      {
        title: 'Regra de bolso',
        blocks: [
          { k: 'p', v: 'Trabalho que pode passar de seis minutos nunca roda em uma execução só: divida em lotes, confira o relógio a cada lote, guarde onde parou e agende a volta. Pare com uma margem (no exemplo, um minuto) e não no último segundo.' },
        ],
      },
      {
        title: 'Antes de levar para o seu projeto',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Teste numa cópia da planilha, não no arquivo original.',
              "O script do exemplo é ligado à planilha. Em script solto, troque `SpreadsheetApp.getActiveSpreadsheet()` por `SpreadsheetApp.openById('ID_DA_PLANILHA')` com o ID da sua planilha de teste.",
              'Gatilhos instalados rodam na conta de quem os criou: "Installable triggers always run under the account of the person who created them."',
              'O tempo total dos gatilhos conta por dia (90 minutos na conta pessoal e 6 horas na Workspace, segundo a página em 10/11/2026). Um trabalho muito grande pode bater nesse limite também.',
              'Se o seu lote envia e-mail, a cota de destinatários por dia vale (100 na conta pessoal e 1.500 na Workspace, segundo a página). A página cita o método `MailApp.getRemainingDailyQuota()` para ver o que sobra. A página diz: "Limites adicionais são aplicados a contas de teste." Para contas de teste convertidas em assinatura, ela diz que os limites aumentam se o domínio tiver pago pelo menos USD 100 de forma cumulativa e depois de passarem pelo menos 60 dias desse mínimo. Veja o seu caso na página. A tabela também tem a linha "Destinatários de e-mail por dia no domínio": 100 na coluna de contas de consumidor e 2.000 na coluna Workspace, segundo a página em português.',
              'Ler e gravar um lote inteiro de uma vez, como o código faz, costuma ser mais rápido que célula por célula. É cuidado geral de planilha, não tirado da página do Google.',
              'Se um lote falhar no meio, o marcador ainda aponta para o início dele: confira se reprocessar as mesmas linhas não causa dano (por exemplo, e-mail enviado duas vezes). Depois de um erro, rodar `processarEmLotes` de novo continua da linha salva (use `iniciar` só para recomeçar do zero). Depois de um erro nenhum gatilho fica agendado, então a retomada é manual.',
              'O código não usa LockService. Não rode a função à mão enquanto uma execução do gatilho estiver em andamento, para duas execuções não processarem as mesmas linhas.',
              'O `after()` define o tempo mínimo até o gatilho rodar, não um horário exato.',
              'O limite de cinco minutos é uma recomendação deste guia (margem de um minuto abaixo do teto), não um número da página.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Páginas do Google for Developers abertas em 10/11/2026: [Quotas for Google Services (inglês)](${URL_QUOTAS_EN}), [Quotas for Google Services (português)](${URL_QUOTAS_PT}), [Installable Triggers](${URL_TRIGGERS}), [ClockTriggerBuilder](${URL_CLOCK}), [PropertiesService](${URL_PROPS_SERVICE}) e [Properties](${URL_PROPS}).` },
          { k: 'p', muted: true, v: 'Código: testado no Google Apps Script em 10/11/2026, numa planilha de exemplo com 200 linhas e com o limite reduzido para dez segundos: a execução parou no limite, guardou a próxima linha nas propriedades do script, o gatilho de tempo continuou sozinho e, no fim, não sobrou gatilho nem propriedade.' },
        ],
      },
    ],
  },
  en: {
    title: 'Apps Script has a ceiling',
    short: 'Apps Script',
    lead: 'How to make Apps Script carry on past the six-minute ceiling: a script that processes the rows of a spreadsheet in batches, stops before it hits the time ceiling, saves where it stopped, schedules its own return and cleans everything up when it finishes.',
    description: 'Build a script that processes the rows of a spreadsheet in batches, stops before it hits the time ceiling, saves where it stopped, schedules its own return and cleans everything up when it finishes.',
    facts: ['Apps Script', 'Google Sheets', 'sample code'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'Apps Script quotas and limits change. Google’s own page says: "All quotas are subject to elimination, reduction, or change at any time, without notice." The numbers in this guide are the ones on the official page on November 10, 2026; check the page before you rely on them. The code in this guide was tested once in Google Apps Script, on November 10, 2026, on a sample spreadsheet with 200 rows and with the limit lowered to ten seconds, to force the stop. The five-minute limit in the code and large spreadsheets were not tested: the real test is yours. Run it first on a test spreadsheet, with sample data, never on the spreadsheet you actually use.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ul',
            items: [
              'Execution: each time the script runs from start to finish (or until it is interrupted). According to Google’s limits page, the script runtime is six minutes per execution, for both consumer and Workspace accounts.',
              'What happens when you go over the limit: the page says "If you exceed a quota or limitation, your script throws an exception and execution stops." The page does not give the exact message for the six-minute ceiling, so this guide does not quote one.',
              'Batch: a chunk of the spreadsheet (twenty rows in the example) processed at once, instead of one row at a time.',
              'Script properties (PropertiesService): where the script stores simple data in key-value pairs. The page says "Allows scripts to store simple data in key-value pairs". Here they hold the next row to process.',
              'Time-driven trigger: makes a function run after an interval or at a set time. You can create and delete them in code ("Create and delete triggers programmatically with the Script service."). The `after(milliseconds)` method "Specifies the minimum duration (in milliseconds) after the current time that the trigger runs."',
              'Other limits on the same page (consumer and Workspace accounts): email recipients per day, 100 and 1,500 (see the note on trial accounts below); total trigger runtime per day, 90 minutes and 6 hours; triggers per user per script, 20 for both.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Sample spreadsheet (made-up data, EXAMPLE)',
        blocks: [
          { k: 'p', v: 'Use a new spreadsheet, just for testing. Open Extensions, Apps Script (the script is bound to the spreadsheet). Paste the code below and run the `criarDadosDeExemplo` function once: it creates the Exemplo sheet with two hundred rows and the columns item, valor and resultado, all made up.' },
          { k: 'p', muted: true, v: 'The code is the same as in the Portuguese guide, so its names are in Portuguese: `criarDadosDeExemplo` creates the sample data, `iniciar` starts from scratch, `processarEmLotes` processes in batches, `apagarGatilhos` deletes triggers, `agendarContinuacao` schedules the return, `LIMITE_MS` is the time limit, `TAMANHO_LOTE` is the batch size and `proximaLinha` is the next row.' },
        ],
      },
      {
        n: '2',
        title: 'The code to copy',
        blocks: [
          { k: 'p', v: 'Complete file. Paste it into the Apps Script editor in place of whatever is there.' },
          { k: 'code', label: 'Code (paste into the Apps Script editor)', text: CODIGO },
        ],
      },
      {
        n: '3',
        title: 'How to test',
        blocks: [
          {
            k: 'ol',
            items: [
              'Run `criarDadosDeExemplo`. Authorize the script when Google asks (it is your own test spreadsheet).',
              'To see the trigger working without waiting five minutes, replace the limit line with `const LIMITE_MS = 10 * 1000;` (ten seconds). The two-second sleep per batch simulates heavy work.',
              'Run the `iniciar` function. It resets the marker, deletes old triggers for this function and processes until it goes past the limit. After about ten seconds, it stops and schedules its return.',
              'Under Triggers (the clock icon in the sidebar), a time-driven trigger for `processarEmLotes` should appear. Under Project Settings, Script Properties, the `proximaLinha` key should appear with the next row to process.',
              'Wait about a minute, or more: the trigger runs on its own and continues from where it stopped. Repeat the check until the resultado column is filled in for all two hundred rows.',
              'At the end, there should be no trigger left for `processarEmLotes` and no `proximaLinha` key.',
              'Set `LIMITE_MS` back to `5 * 60 * 1000` (five minutes, a one-minute margin below the six-minute ceiling) and replace the example calculation (value times two) with your real work, still on a copy.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'How the code works',
        blocks: [
          {
            k: 'ol',
            items: [
              '`processarEmLotes` records the start time and reads the next row saved in the script properties (if there is none, it starts on the second row, right below the header).',
              'It deletes old triggers for the function itself, so they do not pile up.',
              'It processes one batch at a time and writes the result to the spreadsheet. After each batch, it saves the next row. If Google interrupts it abruptly: since the write to the spreadsheet comes before the property is saved, the batch in progress may be repeated in the next execution.',
              'Before each batch, it checks whether the limit has passed. If it has, it schedules a time-driven trigger for one minute later and ends cleanly.',
              'When the rows run out, it deletes the property. Since the old trigger is deleted at the start of each execution, none is left at the end.',
            ],
          },
        ],
      },
      {
        title: 'Rule of thumb',
        blocks: [
          { k: 'p', v: 'Work that may take more than six minutes never runs in a single execution: split it into batches, check the clock at every batch, save where you stopped and schedule the return. Stop with a margin (one minute in the example), not at the last second.' },
        ],
      },
      {
        title: 'Before you take it to your project',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'Test on a copy of the spreadsheet, not on the original file.',
              "The example script is bound to the spreadsheet. In a standalone script, replace `SpreadsheetApp.getActiveSpreadsheet()` with `SpreadsheetApp.openById('ID_DA_PLANILHA')`, using the ID of your test spreadsheet.",
              'Installable triggers run under the account of whoever created them: "Installable triggers always run under the account of the person who created them."',
              'Total trigger runtime counts per day (90 minutes for consumer accounts and 6 hours for Workspace, according to the page on November 10, 2026). A very large job can hit that limit too.',
              'If your batch sends email, the daily recipient quota applies (100 for consumer accounts and 1,500 for Workspace, according to the page). The page mentions the `MailApp.getRemainingDailyQuota()` method to see what is left. The page says: "Additional limits apply for trial accounts." For trial accounts converted to a subscription, it says the limits increase once the domain has cumulatively paid at least USD 100 and at least 60 days have passed since reaching that amount. Check your case on the page. The table also has the row "Email recipients per day within the domain": 100 in the consumer column and 2,000 in the Workspace column.',
              'Reading and writing a whole batch at once, as the code does, is usually faster than going cell by cell. This is general spreadsheet care, not taken from Google’s page.',
              'If a batch fails midway, the marker still points to its start: check that reprocessing the same rows does no harm (for example, an email sent twice). After an error, running `processarEmLotes` again continues from the saved row (use `iniciar` only to start over from scratch). After an error no trigger stays scheduled, so resuming is manual.',
              'The code does not use LockService. Do not run the function by hand while a trigger execution is in progress, so that two executions do not process the same rows.',
              '`after()` sets the minimum time until the trigger runs, not an exact time.',
              'The five-minute limit is a recommendation of this guide (a one-minute margin below the ceiling), not a number from the page.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Google for Developers pages opened on November 10, 2026: [Quotas for Google Services (English)](${URL_QUOTAS_EN}), [Quotas for Google Services (Portuguese)](${URL_QUOTAS_PT}), [Installable Triggers](${URL_TRIGGERS}), [ClockTriggerBuilder](${URL_CLOCK}), [PropertiesService](${URL_PROPS_SERVICE}) and [Properties](${URL_PROPS}).` },
          { k: 'p', muted: true, v: 'Code: tested in Google Apps Script on November 10, 2026, on a sample spreadsheet with 200 rows and with the limit lowered to ten seconds: the execution stopped at the limit, saved the next row in the script properties, the time-driven trigger continued on its own and, at the end, no trigger or property was left.' },
        ],
      },
    ],
  },
};
