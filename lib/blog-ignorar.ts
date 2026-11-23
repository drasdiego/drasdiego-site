import type { Guide } from './blog';

const TESTE_COMPLETO =
  '#!/usr/bin/env bash\nset -u\nexport GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null\nexport GIT_AUTHOR_NAME=Teste GIT_AUTHOR_EMAIL=teste@example.invalid\nexport GIT_COMMITTER_NAME=Teste GIT_COMMITTER_EMAIL=teste@example.invalid\n\nBASE=$(mktemp -d)\necho "pasta de teste: $BASE"\necho "git $(git --version | cut -d\' \' -f3)"\n\ngit init -q -b main "$BASE/projeto"\ncd "$BASE/projeto"\n\necho "== 1. o .env sobe num commit, antes do .gitignore"\necho \'API_KEY=CHAVE-FALSA-DE-TESTE-123\' > .env\necho \'print("oi")\' > app.py\ngit add .env app.py\ngit commit -q -m "primeiro commit com .env"\n\necho "== 2. o .gitignore chega depois, com a linha .env"\necho \'.env\' > .gitignore\ngit add .gitignore\ngit commit -q -m "adiciona .gitignore"\necho "-- git ls-files:"\ngit ls-files\necho "-- git check-ignore -v .env (sem saida = a regra nao vale para ele):"\ngit check-ignore -v .env\necho "codigo de saida: $?"\necho "-- git check-ignore -v --no-index .env (mostra a regra):"\ngit check-ignore -v --no-index .env\n\necho "== 3. voce edita o .env"\necho \'API_KEY=OUTRA-CHAVE-FALSA-456\' > .env\necho "-- git status --short:"\ngit status --short\n\necho "== 4. controle: um arquivo NOVO com regra no .gitignore fica ignorado"\necho \'.env.local\' >> .gitignore\necho \'X=1\' > .env.local\necho "-- git status --short (o .env.local nao aparece; o .gitignore aparece porque foi editado):"\ngit status --short\n\necho "== 5. git rm --cached tira o .env do Git, mas ele continua na pasta"\ngit rm -q --cached .env\ngit add .gitignore\ngit commit -q -m "para de rastrear o .env"\necho "-- git ls-files:"\ngit ls-files\necho "-- ls -A (o .env continua aqui):"\nls -A\necho \'API_KEY=MUDEI-DE-NOVO\' > .env\necho "-- git status --short depois de editar o .env (vazio = o Git nao ve mais):"\ngit status --short\n\necho "== 6. o historico continua com o arquivo"\ngit log --oneline --all -- .env\necho "-- conteudo do .env no primeiro commit:"\ngit show HEAD~2:.env';
const PARAR_DE_RASTREAR =
  'git ls-files .env\ngit check-ignore -v --no-index .env\ngit rm --cached --dry-run .env\ngit rm --cached .env\ngit commit -m "Para de rastrear o .env"';
const TESTE_EQUIPE =
  '#!/usr/bin/env bash\nset -u\nexport GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null\nexport GIT_AUTHOR_NAME=Teste GIT_AUTHOR_EMAIL=teste@example.invalid\nexport GIT_COMMITTER_NAME=Teste GIT_COMMITTER_EMAIL=teste@example.invalid\n\nBASE=$(mktemp -d)\necho "pasta de teste: $BASE"\ngit init -q --bare -b main "$BASE/remoto.git"\n\ngit init -q -b main "$BASE/eu"\ncd "$BASE/eu"\ngit remote add origin "$BASE/remoto.git"\necho \'API_KEY=CHAVE-FALSA-DE-TESTE-123\' > .env\ngit add .env\ngit commit -q -m "commit com o .env"\necho \'.env\' > .gitignore\ngit add .gitignore\ngit commit -q -m "adiciona o .gitignore"\ngit push -q origin main\n\ngit clone -q "$BASE/remoto.git" "$BASE/colega-sem-edicao"\ngit clone -q "$BASE/remoto.git" "$BASE/colega-com-edicao"\necho \'API_KEY=EDITADO-PELA-COLEGA\' > "$BASE/colega-com-edicao/.env"\n\ngit rm -q --cached .env\ngit commit -q -m "para de rastrear o .env"\ngit push -q origin main\n\necho "== colega que NAO editou o .env faz git pull"\ncd "$BASE/colega-sem-edicao"\ngit pull -q\nls -A\n\necho "== colega que EDITOU o .env faz git pull"\ncd "$BASE/colega-com-edicao"\ngit pull -q\nls -A';

const LINK_CHAVE_PT = '/guias/github/chave-vazada';
const LINK_CHAVE_EN = '/en/guias/github/chave-vazada';

const URL_GITIGNORE = 'https://git-scm.com/docs/gitignore';
const URL_GIT_RM = 'https://git-scm.com/docs/git-rm';
const URL_CHECK_IGNORE = 'https://git-scm.com/docs/git-check-ignore';
const URL_IGNORING = 'https://docs.github.com/en/get-started/git-basics/ignoring-files';
const URL_REMOVING = 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository';
const URL_REMEDIATING = 'https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret';

export const GITIGNORE_NAO_DESRASTREIA: Guide = {
  slug: 'gitignore-nao-desrastreia',
  category: 'github',
  keyword: 'IGNORAR',
  published: '2026-11-18',
  pt: {
    title: '.gitignore não desrastreia o que já subiu: o teste pronto para rodar',
    short: '.gitignore e o que já subiu',
    lead: 'Por que colocar um arquivo no .gitignore não faz o Git parar de acompanhá-lo quando ele já foi registrado num commit, um teste pronto para rodar numa pasta temporária e o passo certo para parar de rastrear.',
    description: 'Por que colocar um arquivo no .gitignore não faz o Git parar de acompanhar o que já foi registrado, um teste pronto para rodar numa pasta temporária, o git rm --cached passo a passo e o aviso para quem trabalha em equipe.',
    facts: ['git', 'gitignore', 'teste pronto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O teste deste guia foi rodado pelo autor no Git 2.56.1, no macOS, com o bash 3.2 e o zsh, em pastas temporárias, com chaves falsas escritas só para o teste. A documentação do Git e do GitHub foi conferida em 18/11/2026. O comportamento descrito é o desta versão do Git; em outra versão, rode o teste e confira. O guia trata de parar de rastrear um arquivo daqui para a frente. Ele não ensina a apagar o arquivo do histórico e não é consultoria de segurança. Se o arquivo tinha uma chave ou senha de verdade, leia o aviso da seção 7. Sem vínculo com o Git nem com o GitHub.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Git: o programa que guarda as versões do seu projeto.',
              'Commit: o registro de uma alteração. É um "retrato" do projeto naquele momento.',
              'Histórico: a sequência de todos os commits já feitos.',
              'Rastrear (tracked): o Git acompanha o arquivo. Ele entra na lista do Git (o índice) quando você faz `git add` e passa a aparecer no status quando muda.',
              '.gitignore: o arquivo com a lista do que o Git deve ignorar.',
              'Índice (index): a lista de arquivos que o Git está acompanhando e vai registrar no próximo commit.',
              'Remoto: o repositório que fica fora do seu computador, por exemplo no GitHub.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que a documentação diz',
        blocks: [
          { k: 'p', v: 'A documentação do Git diz, sobre o `.gitignore`: "A gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected; see the NOTES below for details." (arquivos que o Git já acompanha não são afetados).' },
          { k: 'p', v: 'E, na seção NOTES: "To stop tracking a file that is currently tracked, use git rm --cached to remove the file from the index." (para parar de rastrear um arquivo, use `git rm --cached`, que o remove do índice). O GitHub Docs diz o mesmo: "you must untrack the file before you add a rule to ignore it."' },
        ],
      },
      {
        n: '2',
        title: 'O teste pronto',
        blocks: [
          { k: 'p', v: 'O script cria um projeto numa pasta temporária (nada do seu computador é alterado fora dela), sobe um `.env` com uma chave falsa, põe o `.env` no `.gitignore` depois e mostra o que o Git faz em cada passo. Ele usa `GIT_CONFIG_GLOBAL=/dev/null`, então a sua configuração do Git não entra no teste. Você só precisa do Git instalado e de um terminal com bash ou zsh.' },
          { k: 'ol', start: 1, items: ['Salve o script como `teste_ignorar.sh`.', 'Rode com `bash teste_ignorar.sh`. A primeira linha da saída mostra o caminho da pasta temporária; você pode apagá-la depois.'] },
          { k: 'code', label: 'Teste completo (terminal, bash)', text: TESTE_COMPLETO },
        ],
      },
      {
        n: '3',
        title: 'O que deu no teste',
        blocks: [
          { k: 'p', v: 'A saída esperada, resumida, no Git 2.56.1:' },
          {
            k: 'table',
            label: 'Saída esperada do teste no Git 2.56.1',
            head: ['Passo', 'O que apareceu'],
            rows: [
              ['git ls-files depois de criar o .gitignore com .env', '.env, .gitignore, app.py: o .env continua rastreado'],
              ['git check-ignore -v .env', 'sem saída, código de saída 1'],
              ['git check-ignore -v --no-index .env', '.gitignore:1:.env'],
              ['git status --short depois de editar o .env', 'M .env (aparece como modificado)'],
              ['controle: .env.local novo, com regra no .gitignore', 'o .env.local não aparece no status'],
              ['depois do git rm --cached .env e do commit', 'git ls-files sem o .env; o arquivo continua na pasta; git status vazio mesmo editando o .env'],
              ['git show HEAD~2:.env', 'a chave falsa do primeiro commit continua lá'],
            ],
          },
          { k: 'p', v: 'Como ler: o `.gitignore` só vale para arquivo que o Git ainda não acompanha. O arquivo novo com a mesma regra (`.env.local`) ficou ignorado, e o `.env`, que já estava no primeiro commit, não.' },
        ],
      },
      {
        n: '4',
        title: 'Como saber o que o Git rastreia',
        blocks: [
          { k: 'p', v: 'Para saber se um arquivo está sendo rastreado, use `git ls-files .env`: se imprimir o nome, ele está na lista do Git. Para saber qual regra do `.gitignore` pegaria o arquivo, use `git check-ignore -v`. A documentação diz que, por padrão, arquivos rastreados não aparecem nessa checagem, e que a opção `--no-index` faz o comando ignorar o índice. Por isso, no teste, o `git check-ignore -v .env` não imprimiu nada, e com `--no-index` mostrou a regra.' },
        ],
      },
      {
        n: '5',
        title: 'O passo certo: git rm --cached',
        blocks: [
          { k: 'p', v: 'Com o `.env` já rastreado e a regra já no `.gitignore`, rode os comandos abaixo na pasta do projeto. O terceiro (`--dry-run`) só mostra o que seria removido, sem remover. Os outros dois tiram o arquivo da lista do Git e registram isso.' },
          { k: 'code', label: 'Parar de rastrear o .env (terminal, na pasta do projeto)', text: PARAR_DE_RASTREAR },
          { k: 'p', v: 'A documentação do `git rm` diz que, com `--cached`, o arquivo é removido só do índice e que os arquivos da pasta de trabalho são deixados em paz. No teste, o `.env` continuou na pasta. Daí em diante, editar o `.env` não aparece mais no status. Este bloco foi rodado num repositório temporário e o resultado foi o descrito.' },
          { k: 'callout', tone: 'warn', v: 'Aviso para quem trabalha em equipe (testado, não está na documentação): quem já tinha clonado o projeto e puxa esse commit (`git pull`) tem o `.env` apagado da pasta local, se não tiver editado o arquivo. Se tiver editado, o pull é interrompido com o erro "Your local changes to the following files would be overwritten by merge". Avise o time antes e peça para guardarem uma cópia do `.env`.' },
          { k: 'p', v: 'O script abaixo reproduz isso com um repositório remoto local:' },
          { k: 'code', label: 'Teste do aviso de equipe (terminal, bash)', text: TESTE_EQUIPE },
        ],
      },
      {
        n: '6',
        title: 'O histórico continua, e se era segredo',
        blocks: [
          { k: 'p', v: 'Parar de rastrear vale daqui para a frente. O que já foi registrado continua no histórico: no teste, `git show HEAD~2:.env` ainda mostrou a chave falsa, e a documentação do GitHub diz que um segredo pode continuar existindo no histórico de commits do repositório. Tirar um arquivo do histórico é reescrever o histórico, e o GitHub Docs avisa que isso exige coordenação com quem clonou e tem efeitos colaterais. Esse caminho fica fora deste guia.' },
          { k: 'p', v: `Se o arquivo tinha um segredo de verdade (senha, chave de API, token), a documentação do GitHub diz que o primeiro passo é revogar e/ou trocar o segredo: "as a first step you need to revoke and/or rotate that secret". O passo a passo está no [guia CHAVE](${LINK_CHAVE_PT}), que já está no ar. Não repetimos aqui.` },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'O `.gitignore` só vale para arquivo que o Git ainda não rastreia.',
              'Se o arquivo já foi registrado, o Git continua mostrando as mudanças dele.',
              'Para parar de rastrear: `git rm --cached arquivo` e commit. O arquivo continua na sua pasta.',
              'Quem já clonou e puxa esse commit pode perder a cópia local ou receber um erro: avise o time.',
              'O que já subiu continua no histórico. Se era segredo, revogue a chave.',
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
              'Mito: "pus no .gitignore, então o Git parou de ver o arquivo". Verdade: se o arquivo já era rastreado, o Git continua acompanhando.',
              'Mito: "git rm --cached apaga o arquivo". Verdade: ele tira o arquivo só do índice, e o arquivo fica na pasta (e some da pasta de quem puxar o commit sem ter editado).',
              'Mito: "depois do git rm --cached, o arquivo sumiu do repositório". Verdade: ele continua no histórico dos commits anteriores.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Git, [gitignore](${URL_GITIGNORE}). Git, [git-rm](${URL_GIT_RM}). Git, [git-check-ignore](${URL_CHECK_IGNORE}). GitHub Docs, [Ignoring files](${URL_IGNORING}). GitHub Docs, [Removing sensitive data from a repository](${URL_REMOVING}). GitHub Docs, [Remediating a leaked secret](${URL_REMEDIATING}).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: '.gitignore does not untrack what is already tracked',
    short: '.gitignore and tracked files',
    lead: 'Why adding a file to .gitignore does not make Git stop following it once it has been recorded in a commit, a ready-made test to run in a temporary folder and the right step to stop tracking it.',
    description: 'Why adding a file to .gitignore does not make Git stop following what was already recorded, a ready-made test to run in a temporary folder, git rm --cached step by step and the warning for anyone working in a team.',
    facts: ['git', 'gitignore', 'ready-made test'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The author ran the test in this guide on Git 2.56.1, on macOS, with bash 3.2 and zsh, in temporary folders, with fake keys written only for the test. The Git and GitHub documentation was checked on 11/18/2026. The behavior described is that of this Git version; on another version, run the test and check. The guide covers how to stop tracking a file from now on. It does not teach how to erase the file from the history and it is not security consulting. If the file held a real key or password, read the warning in section 7. Not affiliated with Git or GitHub.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Git: the program that stores the versions of your project.',
              'Commit: the record of a change. It is a "snapshot" of the project at that moment.',
              'History: the sequence of all the commits already made.',
              'Tracked: Git follows the file. It goes into Git’s list (the index) when you run `git add`, and it shows up in the status when it changes.',
              '.gitignore: the file with the list of what Git should ignore.',
              'Index: the list of files that Git is following and will record in the next commit.',
              'Remote: the repository that lives outside your computer, for example on GitHub.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What the documentation says',
        blocks: [
          { k: 'p', v: 'The Git documentation says, about `.gitignore`: "A gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected; see the NOTES below for details."' },
          { k: 'p', v: 'And, in the NOTES section: "To stop tracking a file that is currently tracked, use git rm --cached to remove the file from the index." GitHub Docs says the same: "you must untrack the file before you add a rule to ignore it."' },
        ],
      },
      {
        n: '2',
        title: 'The ready-made test',
        blocks: [
          { k: 'p', v: 'The script creates a project in a temporary folder (nothing on your computer is changed outside it), commits a `.env` with a fake key, adds the `.env` to the `.gitignore` afterwards and shows what Git does at each step. It uses `GIT_CONFIG_GLOBAL=/dev/null`, so your own Git configuration stays out of the test. You only need Git installed and a terminal with bash or zsh.' },
          { k: 'p', v: 'The messages the script prints and the commit messages it creates are in Portuguese (for example, "pasta de teste" is "test folder"). They are only labels, and the Git commands are the same in any language.' },
          { k: 'ol', start: 1, items: ['Save the script as `teste_ignorar.sh` (the file name only needs to match the command in the next step).', 'Run it with `bash teste_ignorar.sh`. The first line of the output shows the path of the temporary folder; you can delete it afterwards.'] },
          { k: 'code', label: 'Full test (terminal, bash)', text: TESTE_COMPLETO },
        ],
      },
      {
        n: '3',
        title: 'What the test gave',
        blocks: [
          { k: 'p', v: 'The expected output, summarized, on Git 2.56.1:' },
          {
            k: 'table',
            label: 'Expected test output on Git 2.56.1',
            head: ['Step', 'What showed up'],
            rows: [
              ['git ls-files after creating the .gitignore with .env', '.env, .gitignore, app.py: the .env is still tracked'],
              ['git check-ignore -v .env', 'no output, exit code 1'],
              ['git check-ignore -v --no-index .env', '.gitignore:1:.env'],
              ['git status --short after editing the .env', 'M .env (shows up as modified)'],
              ['control: a new .env.local, with a rule in the .gitignore', 'the .env.local does not show up in the status'],
              ['after git rm --cached .env and the commit', 'git ls-files without the .env; the file stays in the folder; git status empty even after editing the .env'],
              ['git show HEAD~2:.env', 'the fake key from the first commit is still there'],
            ],
          },
          { k: 'p', v: 'How to read it: `.gitignore` only applies to a file that Git does not follow yet. The new file with the same rule (`.env.local`) was ignored, and the `.env`, which was already in the first commit, was not.' },
        ],
      },
      {
        n: '4',
        title: 'How to know what Git tracks',
        blocks: [
          { k: 'p', v: 'To find out whether a file is being tracked, use `git ls-files .env`: if it prints the name, the file is in Git’s list. To find out which `.gitignore` rule would catch the file, use `git check-ignore -v`. The documentation says that, by default, tracked files do not show up in that check, and that the `--no-index` option makes the command ignore the index. That is why, in the test, `git check-ignore -v .env` printed nothing, and with `--no-index` it showed the rule.' },
        ],
      },
      {
        n: '5',
        title: 'The right step: git rm --cached',
        blocks: [
          { k: 'p', v: 'With the `.env` already tracked and the rule already in the `.gitignore`, run the commands below in the project folder. The third one (`--dry-run`) only shows what would be removed, without removing it. The other two take the file out of Git’s list and record that. The commit message is in Portuguese ("Para de rastrear o .env" means "Stop tracking the .env"); use any message you like.' },
          { k: 'code', label: 'Stop tracking the .env (terminal, in the project folder)', text: PARAR_DE_RASTREAR },
          { k: 'p', v: 'The `git rm` documentation says that, with `--cached`, the file is removed only from the index and the files in the working folder are left alone. In the test, the `.env` stayed in the folder. From then on, editing the `.env` no longer shows up in the status. This block was run in a temporary repository and the result was the one described.' },
          { k: 'callout', tone: 'warn', v: 'Warning for anyone working in a team (tested, not in the documentation): whoever had already cloned the project and pulls this commit (`git pull`) gets the `.env` deleted from the local folder, if they have not edited the file. If they have edited it, the pull is interrupted with the error "Your local changes to the following files would be overwritten by merge". Tell the team beforehand and ask them to keep a copy of the `.env`.' },
          { k: 'p', v: 'The script below reproduces this with a local remote repository. Its messages are in Portuguese too, only as labels:' },
          { k: 'code', label: 'Team warning test (terminal, bash)', text: TESTE_EQUIPE },
        ],
      },
      {
        n: '6',
        title: 'The history stays, and if it was a secret',
        blocks: [
          { k: 'p', v: 'Stopping tracking applies from now on. What was already recorded stays in the history: in the test, `git show HEAD~2:.env` still showed the fake key, and the GitHub documentation says a secret can keep existing in the repository’s commit history. Taking a file out of the history means rewriting the history, and GitHub Docs warns that this requires coordination with anyone who cloned and has side effects. That path is outside this guide.' },
          { k: 'p', v: `If the file held a real secret (password, API key, token), the GitHub documentation says the first step is to revoke and/or rotate the secret: "as a first step you need to revoke and/or rotate that secret". The step by step is in the [Leaked key on GitHub guide](${LINK_CHAVE_EN}), which is already live. We do not repeat it here.` },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              '`.gitignore` only applies to a file that Git does not track yet.',
              'If the file was already recorded, Git keeps showing its changes.',
              'To stop tracking: `git rm --cached file` and a commit. The file stays in your folder.',
              'Whoever already cloned and pulls this commit may lose the local copy or get an error: tell the team.',
              'What was already pushed stays in the history. If it was a secret, revoke the key.',
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
              'Myth: "I put it in .gitignore, so Git stopped seeing the file". Fact: if the file was already tracked, Git keeps following it.',
              'Myth: "git rm --cached deletes the file". Fact: it takes the file out of the index only, and the file stays in the folder (and disappears from the folder of whoever pulls the commit without having edited it).',
              'Myth: "after git rm --cached, the file is gone from the repository". Fact: it stays in the history of the earlier commits.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Git, [gitignore](${URL_GITIGNORE}). Git, [git-rm](${URL_GIT_RM}). Git, [git-check-ignore](${URL_CHECK_IGNORE}). GitHub Docs, [Ignoring files](${URL_IGNORING}). GitHub Docs, [Removing sensitive data from a repository](${URL_REMOVING}). GitHub Docs, [Remediating a leaked secret](${URL_REMEDIATING}).` },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
