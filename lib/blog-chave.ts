import type { Guide } from './blog';

const ENV_FILE = 'API_KEY=sk-EXEMPLO-...';
const ENV_EXAMPLE_PT = 'API_KEY=cole-a-chave-aqui';
const ENV_EXAMPLE_EN = 'API_KEY=paste-your-key-here';
const GITIGNORE = '.env';
const CODE_BAD = "const apiKey = 'sk-EXEMPLO-...';";
const CODE_GOOD_JS = 'const apiKey = process.env.API_KEY;';
const CODE_GOOD_PY = 'import os\n\napi_key = os.environ["API_KEY"]';
const UNTRACK = 'git rm --cached .env';
const AMEND_LAST = 'git commit --amend --all\ngit push';
const GIT_LOG = 'git log';
const REBASE_PT = 'git rebase -i ID-DO-COMMIT~1';
const REBASE_EN = 'git rebase -i COMMIT-ID~1';
const REBASE_FINISH = 'git add .\ngit commit --amend\ngit rebase --continue\ngit push';
const INSTALL = 'brew install git-filter-repo';
const CLONE_PT = 'git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO\ncd SEU-REPOSITORIO';
const CLONE_EN = 'git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY\ncd YOUR-REPOSITORY';
const FILTER = 'git-filter-repo --sensitive-data-removal --invert-paths --path .env';
const CHECK = 'git log --all --oneline -S"sk-EXEMPLO-"';
const FORCE = 'git push --force --mirror origin';

const URL_PUSH = 'https://docs.github.com/en/code-security/concepts/secret-security/push-protection';
const URL_USERS = 'https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/push-protection-for-users';
const URL_CLI = 'https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line';
const URL_REMEDIATE = 'https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret';
const URL_REMOVE = 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository';
const URL_ENABLE = 'https://docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-push-protection-for-your-repository';
const URL_SCANNING = 'https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning';
const URL_IGNORE = 'https://docs.github.com/en/get-started/git-basics/ignoring-files';

export const CHAVE_VAZADA: Guide = {
  slug: 'chave-vazada',
  category: 'github',
  published: '2026-11-09',
  pt: {
    title: 'Chave vazada no GitHub',
    short: 'Chave vazada',
    lead: 'O que fazer quando uma chave de API vai parar no GitHub: como a proteção de envio funciona, como resolver um envio bloqueado e a ordem certa se a chave já subiu.',
    description: 'O que fazer quando uma chave de API vai parar no GitHub: proteção de push, envio bloqueado e a ordem certa se a chave já subiu (revogar, conferir uso indevido, limpar o histórico). Conferido na documentação oficial.',
    facts: ['GitHub', 'conferido na documentação oficial', 'exemplos com chave falsa'],
    sections: [
      {
        n: '0',
        title: 'O que aconteceu',
        blocks: [
          { k: 'p', v: 'Uma chave de API é uma senha que um serviço (de IA, pagamento, e-mail ou nuvem) entrega para o seu programa usar a sua conta. Quem tem a chave age como você naquele serviço.' },
          { k: 'p', v: 'A chave "vaza" quando vai parar num lugar que outras pessoas conseguem ver. O caso mais comum é escrever a chave no código e enviar o projeto para um repositório público no GitHub sem perceber.' },
          { k: 'p', v: 'A documentação do GitHub diz que qualquer segredo vazado deve ser considerado comprometido imediatamente, e que scanners automáticos conseguem encontrar segredos expostos publicamente em minutos.' },
          { k: 'p', v: 'Por isso este guia tem duas partes: o que o GitHub faz para barrar o envio antes de a chave sair do seu computador e o que fazer, na ordem certa, se ela já saiu.' },
          { k: 'p', v: 'Quatro palavras que aparecem ao longo do guia (explicação geral de Git, fora da documentação do GitHub):' },
          {
            k: 'ul',
            items: [
              'Repositório: a pasta do projeto guardada no GitHub.',
              'Commit: um registro salvo do projeto, uma foto dos arquivos naquele momento.',
              'Push (envio): o comando `git push`, que manda os seus commits para o repositório no GitHub.',
              'Histórico: a lista de todos os commits. Cada commit guarda uma versão dos arquivos.',
            ],
          },
          { k: 'p', muted: true, v: 'Todas as chaves deste guia são falsas e aparecem como `sk-EXEMPLO-...`. O que vem da documentação do GitHub aparece sem marcação. O que é recomendação do guia vem marcado como "Recomendação do guia".' },
        ],
      },
      {
        n: '1',
        title: 'A proteção de push do GitHub',
        blocks: [
          { k: 'p', v: 'A proteção de push (push protection) confere o que você está enviando. Se encontra um segredo, bloqueia o envio e mostra uma mensagem com o motivo.' },
          { k: 'p', v: 'Para usuários, ela vem ativada por padrão em repositório público. A documentação a descreve como específica da sua conta do GitHub e disponível no GitHub.com.' },
          {
            k: 'split',
            yes: {
              title: 'O que ela faz',
              items: [
                'Bloqueia o envio quando encontra um segredo com padrão reconhecido, e mostra uma mensagem com o motivo.',
                'Vem ativada por padrão para usuários, em repositório público.',
                'Vale para a sua conta do GitHub.',
              ],
            },
            no: {
              title: 'O que ela não promete',
              items: [
                'Pegar qualquer chave ou senha: a documentação descreve o bloqueio para credenciais de provedores com suporte.',
                'Funcionar em repositório privado: a documentação consultada não diz nada sobre isso.',
                'Apagar uma chave que já foi enviada: a página descreve o bloqueio no momento do envio.',
              ],
            },
          },
          { k: 'p', v: 'A mesma página descreve outros tipos de detecção (padrões genéricos, personalizados e detecção por IA), mas não diz que a proteção do usuário cobre todos eles. Os padrões genéricos, por exemplo, precisam estar ativados nas configurações de segurança do repositório.' },
          { k: 'h3', v: 'Onde conferir na sua conta' },
          {
            k: 'ol',
            items: [
              'No canto superior direito de qualquer página do GitHub, clique na sua foto de perfil e depois em Settings.',
              'Na seção Security da barra lateral, clique em Code security.',
              'Em User, ao lado de "Push protection for yourself", confira se a proteção está ativada.',
            ],
          },
          { k: 'callout', tone: 'tip', v: 'Recomendação do guia: se o GitHub não bloqueou o envio, não conclua que a chave está segura. A proteção reconhece padrões de provedores com suporte e pode não reconhecer o da sua chave. Mantenha a chave fora do código desde o começo.' },
        ],
      },
      {
        n: '2',
        title: 'Se o envio foi bloqueado',
        blocks: [
          { k: 'p', v: 'Quando você roda `git push` e o GitHub encontra um segredo, o envio não é concluído e o terminal mostra uma mensagem com o motivo. Ela lista todos os commits que contêm o segredo. Na página oficial, cada item aparece em `locations`, com o `commit` e o `path` (arquivo e linha) onde o segredo está.' },
          { k: 'p', v: 'A regra da documentação: para resolver um envio bloqueado, você precisa remover o segredo de todos os commits em que ele aparece. Tirar a chave só do arquivo atual não resolve se ela continua num commit mais antigo da mesma sequência.' },
          { k: 'callout', tone: 'note', v: 'Recomendação do guia: se você também colou a chave em outro lugar (mensagem, print ou outro repositório), trate-a como vazada e vá direto para a seção "Se a chave já subiu: a ordem certa".' },
          { k: 'h3', v: 'Parte A: tire a chave do código' },
          { k: 'p', v: 'Recomendação do guia: guarde a chave num arquivo `.env`, que fica só no seu computador, e leia o valor no código por variável de ambiente. A documentação do GitHub recomenda usar variáveis de ambiente em vez de escrever o segredo no código.' },
          { k: 'code', label: 'arquivo .env, fica só no seu computador', text: ENV_FILE },
          { k: 'code', label: 'JavaScript, errado: a chave escrita no código', text: CODE_BAD },
          { k: 'code', label: 'JavaScript, certo: a chave vem da variável de ambiente', text: CODE_GOOD_JS },
          { k: 'code', label: 'Python, certo: a chave vem da variável de ambiente', text: CODE_GOOD_PY },
          { k: 'p', v: 'Muitas ferramentas leem o `.env` sozinhas. Nas outras, uma biblioteca que carrega arquivos `.env` resolve. Confira a documentação da sua ferramenta.' },
          { k: 'p', v: 'Agora impeça o Git de guardar o `.env`. A página do GitHub sobre arquivos ignorados diz que você pode criar um arquivo `.gitignore` na raiz do repositório. Crie o arquivo com esta linha:' },
          { k: 'code', label: 'arquivo .gitignore', text: GITIGNORE },
          { k: 'p', v: 'Se o `.env` já tinha entrado no Git, só o `.gitignore` não basta. A mesma página diz que, para ignorar um arquivo que já está registrado, você precisa antes tirá-lo do controle do Git:' },
          { k: 'code', label: 'terminal', text: UNTRACK },
          { k: 'h3', v: 'Parte B: tire a chave dos commits' },
          { k: 'p', v: 'Se a chave entrou no último commit da sua branch, atualize esse commit em vez de criar um novo. O comando abaixo atualiza o commit original:' },
          { k: 'code', label: 'terminal, segredo no último commit', text: AMEND_LAST },
          { k: 'callout', tone: 'note', v: 'Explicação geral de Git: o `git commit --amend` abre um editor de texto com a mensagem do commit. Salve e feche o editor para continuar. Se não quiser mudar a mensagem, não altere o texto.' },
          { k: 'callout', tone: 'tip', v: 'Recomendação do guia: o `--all` só inclui arquivos que o Git já acompanha. Se você acabou de criar o `.gitignore`, rode `git add .gitignore` antes do `git commit --amend --all`.' },
          { k: 'p', v: 'Se a chave entrou num commit anterior, descubra qual é o mais antigo que a contém. A mensagem de erro lista os commits e o `git log` mostra o histórico da branch, com as datas:' },
          { k: 'code', label: 'terminal', text: GIT_LOG },
          { k: 'p', v: 'Com o identificador (ID) do commit mais antigo que contém a chave, comece um rebase interativo. Explicação geral de Git: o `~1` faz o rebase começar um commit antes dele.' },
          { k: 'code', label: 'terminal, troque ID-DO-COMMIT pelo ID real', text: REBASE_PT },
          { k: 'p', v: 'No editor que abrir, troque `pick` por `edit` na primeira linha, a do commit que você identificou. Salve e feche o editor. Depois remova a chave do código e rode:' },
          { k: 'code', label: 'terminal', text: REBASE_FINISH },
          { k: 'callout', tone: 'note', v: 'Existe um espaço entre `add` e `.`. O ponto faz parte do comando.' },
          { k: 'callout', tone: 'warn', v: 'Não existe atalho seguro para um envio bloqueado. O caminho é tirar a chave de todos os commits em que ela aparece.' },
        ],
      },
      {
        n: '3',
        title: 'Se a chave já subiu: a ordem certa',
        blocks: [
          { k: 'p', v: 'Se a chave chegou ao repositório, apagar o arquivo não resolve. A documentação do GitHub diz que remover o segredo do código, enviar um commit novo ou apagar e recriar o repositório não impede que o segredo seja explorado.' },
          { k: 'p', v: 'Explicação geral de Git: o histórico guarda cada versão do projeto. Se um commit antigo contém a chave, quem abrir esse commit consegue ver. A documentação diz que o segredo pode continuar no histórico de commits do repositório.' },
          { k: 'p', v: 'A ordem abaixo segue a do tutorial oficial do GitHub sobre como remediar um segredo vazado:' },
          {
            k: 'ol',
            items: [
              'Revogue ou troque a chave no serviço que a emitiu.',
              'Confira se houve uso indevido, no painel do provedor.',
              'Limpe o histórico com `git-filter-repo`, com cuidado.',
            ],
          },
          { k: 'callout', tone: 'note', v: 'O tutorial oficial tem outras etapas, como identificar o segredo, avaliar o risco e fechar o alerta. Este guia cobre três delas: revogar, conferir e limpar.' },
        ],
      },
      {
        n: '4',
        title: 'Passo 1: revogue ou troque a chave no serviço que a emitiu',
        blocks: [
          { k: 'p', v: 'Revogar é invalidar a chave, para que ela pare de funcionar. Trocar (rotacionar) é gerar uma chave nova no lugar dela. Segundo a documentação, revogar o segredo no provedor dele é o passo de remediação mais importante, e remover o segredo do código não é suficiente.' },
          { k: 'p', v: 'A página sobre remoção de dados sensíveis diz que, depois que o segredo é revogado ou trocado, ele não pode mais ser usado para acesso.' },
          { k: 'p', v: 'Faça isso no painel do serviço que emitiu a chave. Os nomes dos menus mudam de serviço para serviço. Procure a área de chaves de API, tokens ou credenciais e siga a instrução de revogação do próprio provedor. Se você não tem acesso ao painel, peça a quem é dono da chave ou administra o repositório.' },
          { k: 'p', v: 'Avise também o dono da chave e quem administra o repositório, como a documentação recomenda.' },
          { k: 'h3', v: 'Se a chave está em uso em produção' },
          { k: 'p', v: 'Revogar de uma vez pode derrubar a aplicação. Quando a queda é uma preocupação, a documentação sugere esta ordem: gerar a nova chave primeiro, com as mesmas permissões, fazer a aplicação usar a nova e só então revogar a antiga.' },
          {
            k: 'ol',
            items: [
              'Gere a chave nova no provedor, com as mesmas permissões da antiga.',
              'Atualize a aplicação e os outros serviços que usavam a antiga e confirme que eles usam a nova.',
              'Revogue a chave antiga.',
            ],
          },
          { k: 'callout', tone: 'warn', v: 'Não deixe a chave antiga ativa além do necessário. A mesma página manda priorizar a revogação imediata do segredo.' },
          { k: 'h3', v: 'E se o próprio GitHub já revogou?' },
          { k: 'p', v: 'A documentação diz que o GitHub revoga automaticamente os tokens de acesso pessoal (PAT) do GitHub que vazam em repositório público. Para segredos de provedores parceiros que vazam em público, o GitHub avisa o provedor, que pode agir.' },
          { k: 'callout', tone: 'tip', v: 'Recomendação do guia: não espere por isso. Revogue você mesmo e confirme no painel que a chave antiga deixou de funcionar.' },
        ],
      },
      {
        n: '5',
        title: 'Passo 2: confira se houve uso indevido',
        blocks: [
          { k: 'p', v: 'Uma chave exposta pode ter sido usada antes de você revogá-la. A documentação manda checar se houve acesso não autorizado enquanto o segredo esteve exposto. No tutorial, essa etapa vem depois de revogar e atualizar a chave.' },
          {
            k: 'ul',
            items: [
              'No painel ou nos registros de auditoria do provedor da chave. A documentação cita o AWS CloudTrail como exemplo de registro que mostra se uma credencial vazada foi usada.',
              'Nos registros do GitHub: o log de segurança da sua conta pessoal ou o log de auditoria da organização, procurando eventos ligados ao segredo. O seu papel define o que você consegue ver.',
            ],
          },
          { k: 'callout', tone: 'tip', v: 'Recomendação do guia: procure uso em horários em que você não usou o serviço, consumo ou cobrança acima do normal e recursos ou chaves que você não criou. Se achar algo assim, fale com o suporte do provedor.' },
        ],
      },
      {
        n: '6',
        title: 'Passo 3: limpe o histórico, com cuidado',
        blocks: [
          { k: 'p', v: 'Mesmo com a chave revogada e trocada, ela pode continuar no histórico de commits. A documentação diz que, idealmente, você deve procurar e remover todas as ocorrências do segredo no repositório.' },
          { k: 'callout', tone: 'note', v: 'Limpar é o ideal, mas revogar pode bastar. A página oficial de remoção diz que, depois que o segredo é revogado ou trocado, isso pode ser suficiente para resolver o problema.' },
          { k: 'callout', tone: 'warn', v: 'Limpar o histórico reescreve o histórico e afeta quem tem cópia do repositório. A documentação o descreve como um processo destrutivo e que atrapalha quem trabalha no projeto, e que envolve forçar o envio (force push) para o repositório. A página de remoção diz que o histórico pode ser limpo se você coordenar com cuidado com todas as pessoas que clonaram o repositório.' },
          { k: 'p', v: 'A ferramenta que a documentação usa é o `git-filter-repo`. É preciso uma versão com a opção `--sensitive-data-removal`, ou seja, a versão 2.47 ou mais. A página mostra a instalação com Homebrew:' },
          { k: 'code', label: 'terminal, exemplo da página com Homebrew', text: INSTALL },
          { k: 'p', v: 'Em outro sistema, procure as instruções de instalação do `git-filter-repo` e confira se a versão instalada é a 2.47 ou mais.' },
          { k: 'p', v: 'Clone o repositório numa pasta nova e entre nela. Troque pelos seus dados:' },
          { k: 'code', label: 'terminal', text: CLONE_PT },
          { k: 'p', v: 'Para apagar de todo o histórico um arquivo que continha a chave, como o `.env`, use o caminho dele no Git:' },
          { k: 'code', label: 'terminal', text: FILTER },
          { k: 'p', v: 'Se o arquivo já foi movido ou renomeado alguma vez, a página manda repetir o `--path` para cada caminho antigo ou rodar o comando de novo. Para trocar um texto dentro de arquivos em vez de apagar o arquivo, ela mostra a opção `--replace-text` com um arquivo de lista. A página não detalha o formato desse arquivo, então consulte o manual do `git-filter-repo` antes de usar.' },
          { k: 'p', v: 'Confira o resultado antes de enviar. A página manda verificar que tudo o que você queria remover sumiu, mas não explica como. Recomendação do guia: procure o começo da chave em todo o histórico. O comando não deve mostrar nenhum commit. Explicação geral de Git: o `-S` procura commits em que o texto informado foi adicionado ou removido, e o `--all` olha todas as branches e tags. Troque `sk-EXEMPLO-` pelo começo da sua chave:' },
          { k: 'code', label: 'terminal, recomendação do guia', text: CHECK },
          { k: 'p', v: 'O próximo passo não tem volta. Quando tiver certeza, envie a versão limpa para o GitHub, sobrescrevendo o repositório:' },
          { k: 'code', label: 'terminal', text: FORCE },
          { k: 'p', v: 'Envios para `refs/pull/` vão falhar, e isso é esperado, porque o GitHub marca essas referências como somente leitura. Se outras referências falharem, a página diz que provavelmente há proteção de branch ligada naquela branch.' },
          { k: 'callout', tone: 'warn', v: 'O `--force` descarta mudanças que outras pessoas tenham feito nessas referências enquanto você limpava o repositório.' },
          { k: 'h3', v: 'Depois da limpeza, avise quem tem cópia' },
          {
            k: 'ul',
            items: [
              'Quem clonou antes da reescrita ainda tem os dados antigos. A página manda descartar o clone e clonar de novo.',
              'Quem rodar `git pull` e depois `git push` com uma cópia antiga pode trazer a chave de volta.',
              'Quem criou branches a partir do histórico antigo deve fazer rebase, e não merge. Um merge pode reintroduzir o histórico que você acabou de limpar.',
            ],
          },
        ],
      },
      {
        n: '7',
        title: 'O que a limpeza não alcança',
        blocks: [
          { k: 'p', v: 'Segundo a documentação, se você só reescreve o histórico e faz o envio forçado, os commits com o dado sensível ainda podem estar acessíveis em outros lugares:' },
          {
            k: 'ul',
            items: [
              'Em qualquer clone ou fork do repositório.',
              'Diretamente pelo hash SHA-1 do commit, em visualizações em cache no GitHub.',
              'Em pull requests que referenciam esses commits.',
            ],
          },
          { k: 'p', v: 'Você não consegue remover os dados dos clones de outras pessoas. Se o commit existe em algum fork, ele continua acessível lá, e o GitHub não pode fornecer o contato dos donos desses forks. As visualizações em cache e as referências em pull requests podem ser removidas de forma permanente, e isso passa pelo Suporte do GitHub.' },
          { k: 'p', v: 'O Suporte do GitHub só ajuda com dados sensíveis, e apenas quando considera que o risco não pode ser reduzido trocando as credenciais afetadas. Leitura do guia, fora da documentação: é a revogação do passo 1 que protege você. A limpeza reduz a exposição, mas não apaga todas as cópias.' },
        ],
      },
      {
        n: '8',
        title: 'Como evitar que aconteça de novo',
        blocks: [
          { k: 'p', v: 'A documentação do GitHub diz que o foco com segredos deve ser evitar o vazamento. Estas práticas ajudam.' },
          { k: 'h3', v: 'Chave fora do código e `.env` fora do Git' },
          { k: 'p', v: 'Guarde a chave num arquivo `.env`, ignorado pelo Git com o `.gitignore`, e leia o valor por variável de ambiente, como na parte A da seção "Se o envio foi bloqueado". A documentação recomenda usar variáveis de ambiente em vez de escrever segredos no código.' },
          { k: 'p', v: 'Recomendação do guia: crie também um `.env.example`, com os nomes das variáveis e valores de mentira, para quem usar o projeto saber o que preencher. Esse arquivo pode ir para o Git.' },
          { k: 'code', label: 'arquivo .env.example, pode ir para o Git', text: ENV_EXAMPLE_PT },
          { k: 'p', v: 'A documentação também recomenda trocar os segredos com regularidade, para reduzir o impacto de um vazamento.' },
          { k: 'h3', v: 'Ative as proteções do GitHub' },
          {
            k: 'ul',
            items: [
              'Na sua conta: confira se "Push protection for yourself" está ativada, como na seção "A proteção de push do GitHub". A documentação recomenda ativá-la para evitar o envio de segredos com suporte a qualquer repositório público.',
              'No repositório: a documentação recomenda ativar a proteção de push no repositório, se ainda não estiver. Podem fazer isso donos do repositório, donos da organização, gerentes de segurança e quem tem o papel admin.',
              'Secret scanning: em repositório público, ele roda automaticamente e de graça. Em repositório privado de organização, está disponível com o GitHub Secret Protection ativado no GitHub Team ou no GitHub Enterprise Cloud.',
            ],
          },
          { k: 'p', v: 'Para ativar a proteção de push no repositório:' },
          {
            k: 'ol',
            items: [
              'Abra a página principal do repositório e clique em Settings.',
              'Na barra lateral, em "Security and quality", clique em "Advanced Security".',
              'Se o Secret Protection ainda não estiver ativado, clique em "Enable" ao lado dele.',
              'Na seção "Secret Protection", clique em "Enable" ao lado de "Push protection".',
            ],
          },
          { k: 'callout', tone: 'note', v: 'A proteção de push do repositório exige o GitHub Secret Protection. Se as opções não aparecerem para você, o recurso pode não estar disponível no seu plano ou você pode não ter o papel necessário. Recomendação do guia: confirme na documentação do GitHub antes de contar com ele.' },
        ],
      },
      {
        title: 'Antes de confiar neste guia',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'O texto das páginas do GitHub Docs foi conferido em 09/11/2026, na versão GitHub.com. A documentação muda, então reconfira antes de agir.',
              'A documentação consultada descreve a proteção de push do usuário para repositórios públicos. Ela não diz nada sobre essa proteção em repositório privado, e este guia não promete nada sobre isso.',
              'Os comandos de limpeza reescrevem o histórico e não têm volta. Faça numa cópia nova do repositório e combine antes com quem trabalha nele.',
              'As chaves deste guia são falsas. Nunca cole uma chave real em guia, chat, print ou issue.',
              'Os trechos marcados como "Recomendação do guia" e as explicações gerais de Git não vêm da documentação do GitHub.',
              'Este guia é conteúdo educativo e independente, sem vínculo com o GitHub.',
            ],
          },
        ],
      },
      {
        title: 'Fonte',
        blocks: [
          { k: 'p', muted: true, v: 'Documentação oficial do GitHub (versão GitHub.com). Conferida em 09/11/2026. O comportamento pode mudar em versões futuras.' },
          { k: 'p', muted: true, v: `Push protection: [docs.github.com/en/code-security/concepts/secret-security/push-protection](${URL_PUSH}).` },
          { k: 'p', muted: true, v: `Managing push protection for users: [docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/push-protection-for-users](${URL_USERS}).` },
          { k: 'p', muted: true, v: `Working with push protection from the command line: [docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line](${URL_CLI}).` },
          { k: 'p', muted: true, v: `Remediating a leaked secret in your repository: [docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret](${URL_REMEDIATE}).` },
          { k: 'p', muted: true, v: `Removing sensitive data from a repository: [docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository](${URL_REMOVE}).` },
          { k: 'p', muted: true, v: `Enabling push protection for your repository: [docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-push-protection-for-your-repository](${URL_ENABLE}).` },
          { k: 'p', muted: true, v: `Secret scanning: [docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning](${URL_SCANNING}).` },
          { k: 'p', muted: true, v: `Ignoring files: [docs.github.com/en/get-started/git-basics/ignoring-files](${URL_IGNORE}).` },
        ],
      },
    ],
  },
  en: {
    title: 'Leaked key on GitHub',
    short: 'Leaked key',
    lead: 'What to do when an API key ends up on GitHub: how push protection works, how to resolve a blocked push and the right order if the key has already been pushed.',
    description: 'What to do when an API key ends up on GitHub: push protection, a blocked push and the right order if the key was already pushed (revoke, check for misuse, clean the history). Checked against the official documentation.',
    facts: ['GitHub', 'checked against the official docs', 'examples with a fake key'],
    sections: [
      {
        n: '0',
        title: 'What happened',
        blocks: [
          { k: 'p', v: 'An API key is a password that a service (AI, payments, email or cloud) gives your program so it can use your account. Whoever has the key acts as you on that service.' },
          { k: 'p', v: 'A key "leaks" when it ends up somewhere other people can see it. The most common case is writing the key in the code and pushing the project to a public GitHub repository without noticing.' },
          { k: 'p', v: 'The GitHub documentation says any leaked secret should be considered compromised immediately, and that automated scanners can find publicly exposed secrets in minutes.' },
          { k: 'p', v: 'That is why this guide has two parts: what GitHub does to block the push before the key leaves your computer, and what to do, in the right order, if it already left.' },
          { k: 'p', v: 'Four words that show up throughout the guide (general Git explanation, not from the GitHub documentation):' },
          {
            k: 'ul',
            items: [
              'Repository: the project folder stored on GitHub.',
              'Commit: a saved record of the project, a snapshot of the files at that moment.',
              'Push: the `git push` command, which sends your commits to the repository on GitHub.',
              'History: the list of all commits. Each commit keeps a version of the files.',
            ],
          },
          { k: 'p', muted: true, v: 'Every key in this guide is fake and shows up as `sk-EXEMPLO-...`. What comes from the GitHub documentation appears without a label. What is a recommendation from this guide is labeled "Recommendation from this guide".' },
        ],
      },
      {
        n: '1',
        title: 'GitHub push protection',
        blocks: [
          { k: 'p', v: 'Push protection checks what you are sending. If it finds a secret, it blocks the push and shows a message explaining the reason.' },
          { k: 'p', v: 'For users, it is enabled by default on public repositories. The documentation describes it as specific to your GitHub account and available on GitHub.com.' },
          {
            k: 'split',
            yes: {
              title: 'What it does',
              items: [
                'Blocks the push when it finds a secret with a recognized pattern, and shows a message with the reason.',
                'Is enabled by default for users, on public repositories.',
                'Applies to your GitHub account.',
              ],
            },
            no: {
              title: 'What it does not promise',
              items: [
                'Catching any key or password: the documentation describes blocking for credentials from supported providers.',
                'Working on private repositories: the documentation consulted says nothing about it.',
                'Removing a key that was already pushed: the page describes the block at push time.',
              ],
            },
          },
          { k: 'p', v: 'The same page describes other kinds of detection (generic patterns, custom patterns and AI detection), but it does not say that push protection for users covers all of them. Generic patterns, for example, have to be enabled in the repository’s security settings.' },
          { k: 'h3', v: 'Where to check it on your account' },
          {
            k: 'ol',
            items: [
              'In the upper-right corner of any GitHub page, click your profile picture and then Settings.',
              'In the Security section of the sidebar, click Code security.',
              'Under User, next to "Push protection for yourself", check that the protection is enabled.',
            ],
          },
          { k: 'callout', tone: 'tip', v: 'Recommendation from this guide: if GitHub did not block the push, do not conclude that the key is safe. The protection recognizes patterns from supported providers and may not recognize your key’s pattern. Keep the key out of the code from the start.' },
        ],
      },
      {
        n: '2',
        title: 'If the push was blocked',
        blocks: [
          { k: 'p', v: 'When you run `git push` and GitHub finds a secret, the push does not go through and the terminal shows a message with the reason. It lists all the commits that contain the secret. On the official page, each item appears under `locations`, with the `commit` and the `path` (file and line) where the secret is.' },
          { k: 'p', v: 'The documentation’s rule: to resolve a blocked push, you must remove the secret from all of the commits it appears in. Removing the key only from the current file does not work if it is still in an older commit of the same sequence.' },
          { k: 'callout', tone: 'note', v: 'Recommendation from this guide: if you also pasted the key somewhere else (a message, a screenshot or another repository), treat it as leaked and go straight to the section "If the key was already pushed: the right order".' },
          { k: 'h3', v: 'Part A: take the key out of the code' },
          { k: 'p', v: 'Recommendation from this guide: keep the key in a `.env` file that stays only on your computer, and read the value in the code through an environment variable. The GitHub documentation recommends using environment variables instead of writing the secret in the code.' },
          { k: 'code', label: '.env file, stays only on your computer', text: ENV_FILE },
          { k: 'code', label: 'JavaScript, wrong: the key written in the code', text: CODE_BAD },
          { k: 'code', label: 'JavaScript, right: the key comes from the environment variable', text: CODE_GOOD_JS },
          { k: 'code', label: 'Python, right: the key comes from the environment variable', text: CODE_GOOD_PY },
          { k: 'p', v: 'Many tools read `.env` on their own. In the others, a library that loads `.env` files solves it. Check the documentation of your tool.' },
          { k: 'p', v: 'Now stop Git from keeping the `.env`. The GitHub page on ignoring files says you can create a `.gitignore` file in your repository’s root directory. Create the file with this line:' },
          { k: 'code', label: '.gitignore file', text: GITIGNORE },
          { k: 'p', v: 'If the `.env` had already entered Git, the `.gitignore` alone is not enough. The same page says that, to ignore a file that is already checked in, you must untrack it first:' },
          { k: 'code', label: 'terminal', text: UNTRACK },
          { k: 'h3', v: 'Part B: take the key out of the commits' },
          { k: 'p', v: 'If the key entered the latest commit on your branch, update that commit instead of creating a new one. The command below updates the original commit:' },
          { k: 'code', label: 'terminal, secret in the latest commit', text: AMEND_LAST },
          { k: 'callout', tone: 'note', v: 'General Git explanation: `git commit --amend` opens a text editor with the commit message. Save and close the editor to continue. If you do not want to change the message, leave the text as it is.' },
          { k: 'callout', tone: 'tip', v: 'Recommendation from this guide: `--all` only includes files Git already tracks. If you just created the `.gitignore`, run `git add .gitignore` before `git commit --amend --all`.' },
          { k: 'p', v: 'If the key entered an earlier commit, find the earliest commit that contains it. The error message lists the commits and `git log` shows the branch history, with timestamps:' },
          { k: 'code', label: 'terminal', text: GIT_LOG },
          { k: 'p', v: 'With the identifier (ID) of the earliest commit that contains the key, start an interactive rebase. General Git explanation: the `~1` makes the rebase start one commit before it.' },
          { k: 'code', label: 'terminal, replace COMMIT-ID with the real ID', text: REBASE_EN },
          { k: 'p', v: 'In the editor that opens, change `pick` to `edit` on the first line, the one for the commit you identified. Save and close the editor. Then remove the key from the code and run:' },
          { k: 'code', label: 'terminal', text: REBASE_FINISH },
          { k: 'callout', tone: 'note', v: 'There is a space between `add` and `.`. The period is part of the command.' },
          { k: 'callout', tone: 'warn', v: 'There is no safe shortcut for a blocked push. The way forward is to take the key out of every commit it appears in.' },
        ],
      },
      {
        n: '3',
        title: 'If the key was already pushed: the right order',
        blocks: [
          { k: 'p', v: 'If the key reached the repository, deleting the file is not enough. The GitHub documentation says that removing the secret from the codebase, pushing a new commit, or deleting and recreating the repository does not prevent the secret from being exploited.' },
          { k: 'p', v: 'General Git explanation: the history keeps every version of the project. If an old commit contains the key, anyone who opens that commit can see it. The documentation says the secret may still exist in the repository’s commit history.' },
          { k: 'p', v: 'The order below follows GitHub’s official tutorial on remediating a leaked secret:' },
          {
            k: 'ol',
            items: [
              'Revoke or replace the key at the service that issued it.',
              'Check for misuse in the provider’s dashboard.',
              'Clean the history with `git-filter-repo`, carefully.',
            ],
          },
          { k: 'callout', tone: 'note', v: 'The official tutorial has other steps, such as identifying the secret, assessing the risk and closing the alert. This guide covers three of them: revoking, checking and cleaning.' },
        ],
      },
      {
        n: '4',
        title: 'Step 1: revoke or replace the key at the service that issued it',
        blocks: [
          { k: 'p', v: 'To revoke is to invalidate the key so it stops working. To rotate is to generate a new key in its place. According to the documentation, revoking the secret with its provider is the most important remediation step, and simply removing the secret from the codebase is not sufficient.' },
          { k: 'p', v: 'The page on removing sensitive data says that once the secret is revoked or rotated, it can no longer be used for access.' },
          { k: 'p', v: 'Do this in the dashboard of the service that issued the key. Menu names change from service to service. Look for the area with API keys, tokens or credentials and follow the provider’s own revocation instructions. If you cannot access the dashboard, ask whoever owns the key or administers the repository.' },
          { k: 'p', v: 'Also tell the owner of the key and whoever administers the repository, as the documentation recommends.' },
          { k: 'h3', v: 'If the key is in use in production' },
          { k: 'p', v: 'Revoking the key right away can take the application down. When downtime is a concern, the documentation suggests this order: generate the new key first, with the same permissions, make the application use the new one and only then revoke the old one.' },
          {
            k: 'ol',
            items: [
              'Generate the new key at the provider, with the same permissions as the old one.',
              'Update the application and the other services that used the old one, and confirm they use the new one.',
              'Revoke the old key.',
            ],
          },
          { k: 'callout', tone: 'warn', v: 'Do not leave the old key active longer than necessary. The same page says to prioritize revoking the secret immediately.' },
          { k: 'h3', v: 'What if GitHub already revoked it?' },
          { k: 'p', v: 'The documentation says GitHub automatically revokes GitHub personal access tokens (PATs) leaked in public repositories. For partner-provider secrets leaked publicly, GitHub reports them to the provider, which can act.' },
          { k: 'callout', tone: 'tip', v: 'Recommendation from this guide: do not wait for that. Revoke it yourself and confirm in the dashboard that the old key stopped working.' },
        ],
      },
      {
        n: '5',
        title: 'Step 2: check for misuse',
        blocks: [
          { k: 'p', v: 'An exposed key may have been used before you revoked it. The documentation says to check for any unauthorized access that may have occurred while the secret was exposed. In the tutorial, this step comes after revoking and updating the key.' },
          {
            k: 'ul',
            items: [
              'In the dashboard or audit logs of the key’s provider. The documentation mentions AWS CloudTrail as an example of a log that shows whether a leaked credential was used.',
              'In GitHub’s logs: the security log of your personal account or the organization’s audit log, looking for events tied to the secret. Your role determines what you can see.',
            ],
          },
          { k: 'callout', tone: 'tip', v: 'Recommendation from this guide: look for use at times when you were not using the service, usage or charges above normal, and resources or keys you did not create. If you find something like that, contact the provider’s support.' },
        ],
      },
      {
        n: '6',
        title: 'Step 3: clean the history, carefully',
        blocks: [
          { k: 'p', v: 'Even with the key revoked and replaced, it may still exist in the commit history. The documentation says that, ideally, you should search for and remove all instances of the secret from your repository.' },
          { k: 'callout', tone: 'note', v: 'Cleaning is the ideal, but revoking may be enough. The official removal page says that once the secret is revoked or rotated, that may be sufficient to solve your problem.' },
          { k: 'callout', tone: 'warn', v: 'Cleaning the history rewrites the history and affects everyone who has a copy of the repository. The documentation describes it as a destructive and disruptive process that involves force pushing to the repository. The removal page says the history can be cleaned if you carefully coordinate with everyone who has cloned the repository.' },
          { k: 'p', v: 'The tool the documentation uses is `git-filter-repo`. You need a version with the `--sensitive-data-removal` flag, meaning at least version 2.47. The page shows installation with Homebrew:' },
          { k: 'code', label: 'terminal, example from the page with Homebrew', text: INSTALL },
          { k: 'p', v: 'On another system, look up the installation instructions for `git-filter-repo` and check that the installed version is 2.47 or higher.' },
          { k: 'p', v: 'Clone the repository into a new folder and enter it. Replace with your own details:' },
          { k: 'code', label: 'terminal', text: CLONE_EN },
          { k: 'p', v: 'To erase from the whole history a file that contained the key, such as `.env`, use its path in Git:' },
          { k: 'code', label: 'terminal', text: FILTER },
          { k: 'p', v: 'If the file was ever moved or renamed, the page says to repeat `--path` for each old path or run the command again. To replace text inside files instead of deleting the file, it shows the `--replace-text` option with a list file. The page does not detail the format of that file, so check the `git-filter-repo` manual before using it.' },
          { k: 'p', v: 'Check the result before pushing. The page says to verify that everything you wanted removed is gone, but it does not explain how. Recommendation from this guide: search the whole history for the beginning of the key. The command should show no commits. General Git explanation: `-S` looks for commits where the given text was added or removed, and `--all` looks at all branches and tags. Replace `sk-EXEMPLO-` with the beginning of your key:' },
          { k: 'code', label: 'terminal, recommendation from this guide', text: CHECK },
          { k: 'p', v: 'The next step cannot be undone. When you are sure, push the clean version to GitHub, overwriting the repository:' },
          { k: 'code', label: 'terminal', text: FORCE },
          { k: 'p', v: 'Pushes to `refs/pull/` will fail, and that is expected, because GitHub marks those references as read-only. If other references fail, the page says you likely have branch protection turned on for that branch.' },
          { k: 'callout', tone: 'warn', v: '`--force` discards any changes others may have made to those references while you were cleaning up the repository.' },
          { k: 'h3', v: 'After cleaning, tell everyone who has a copy' },
          {
            k: 'ul',
            items: [
              'Anyone who cloned before the rewrite still has the old data. The page says to discard the clone and clone again.',
              'Anyone who runs `git pull` and then `git push` with an old copy can bring the key back.',
              'Anyone who created branches from the old history must rebase, not merge. One merge can reintroduce the history you just cleaned.',
            ],
          },
        ],
      },
      {
        n: '7',
        title: 'What cleaning does not reach',
        blocks: [
          { k: 'p', v: 'According to the documentation, if you only rewrite your history and force push it, the commits with sensitive data may still be accessible elsewhere:' },
          {
            k: 'ul',
            items: [
              'In any clones or forks of your repository.',
              'Directly via their SHA-1 hashes in cached views on GitHub.',
              'Through any pull requests that reference them.',
            ],
          },
          { k: 'p', v: 'You cannot remove the data from other people’s clones. If the commit exists in any fork, it continues to be accessible there, and GitHub cannot provide contact information for the owners of those forks. Cached views and references in pull requests can be permanently removed, and that goes through GitHub Support.' },
          { k: 'p', v: 'GitHub Support only assists with sensitive data, and only when it determines that the risk cannot be mitigated by rotating the affected credentials. This guide’s reading, not from the documentation: the revocation in step 1 is what protects you. Cleaning reduces exposure, but it does not erase every copy.' },
        ],
      },
      {
        n: '8',
        title: 'How to keep it from happening again',
        blocks: [
          { k: 'p', v: 'The GitHub documentation says the focus with secrets should be preventing leaks. These practices help.' },
          { k: 'h3', v: 'Key out of the code and `.env` out of Git' },
          { k: 'p', v: 'Keep the key in a `.env` file, ignored by Git with the `.gitignore`, and read the value through an environment variable, as in part A of the section "If the push was blocked". The documentation recommends using environment variables instead of writing secrets in the code.' },
          { k: 'p', v: 'Recommendation from this guide: also create a `.env.example`, with the variable names and fake values, so anyone using the project knows what to fill in. This file can go into Git.' },
          { k: 'code', label: '.env.example file, can go into Git', text: ENV_EXAMPLE_EN },
          { k: 'p', v: 'The documentation also recommends rotating secrets regularly, to limit the impact of any leak.' },
          { k: 'h3', v: 'Turn on GitHub’s protections' },
          {
            k: 'ul',
            items: [
              'On your account: check that "Push protection for yourself" is enabled, as in the section "GitHub push protection". The documentation recommends enabling it to guard against pushing supported secrets to any public repository.',
              'On the repository: the documentation recommends enabling push protection on the repository, if it is not already. Repository owners, organization owners, security managers and users with the admin role can do this.',
              'Secret scanning: on public repositories, it runs automatically for free. On organization-owned private repositories, it is available with GitHub Secret Protection enabled on GitHub Team or GitHub Enterprise Cloud.',
            ],
          },
          { k: 'p', v: 'To enable push protection on the repository:' },
          {
            k: 'ol',
            items: [
              'Open the repository’s main page and click Settings.',
              'In the sidebar, under "Security and quality", click "Advanced Security".',
              'If Secret Protection is not already enabled, click "Enable" to its right.',
              'In the "Secret Protection" section, click "Enable" to the right of "Push protection".',
            ],
          },
          { k: 'callout', tone: 'note', v: 'Repository push protection requires GitHub Secret Protection. If the options do not show up for you, the feature may not be available on your plan or you may not have the required role. Recommendation from this guide: confirm in the GitHub documentation before relying on it.' },
        ],
      },
      {
        title: 'Before you rely on this guide',
        note: true,
        blocks: [
          {
            k: 'ul',
            items: [
              'The text of the GitHub Docs pages was checked on November 9, 2026, in the GitHub.com version. The documentation changes, so check again before acting.',
              'The documentation consulted describes push protection for users on public repositories. It says nothing about that protection on private repositories, and this guide promises nothing about it.',
              'The cleanup commands rewrite the history and cannot be undone. Do it on a fresh copy of the repository and agree on it first with whoever works on it.',
              'The keys in this guide are fake. Never paste a real key into a guide, chat, screenshot or issue.',
              'The passages labeled "Recommendation from this guide" and the general Git explanations do not come from the GitHub documentation.',
              'This guide is educational and independent content, not affiliated with GitHub.',
            ],
          },
        ],
      },
      {
        title: 'Source',
        blocks: [
          { k: 'p', muted: true, v: 'Official GitHub documentation (GitHub.com version). Checked on November 9, 2026. The behavior may change in future versions.' },
          { k: 'p', muted: true, v: `Push protection: [docs.github.com/en/code-security/concepts/secret-security/push-protection](${URL_PUSH}).` },
          { k: 'p', muted: true, v: `Managing push protection for users: [docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/push-protection-for-users](${URL_USERS}).` },
          { k: 'p', muted: true, v: `Working with push protection from the command line: [docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/working-with-push-protection-from-the-command-line](${URL_CLI}).` },
          { k: 'p', muted: true, v: `Remediating a leaked secret in your repository: [docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret](${URL_REMEDIATE}).` },
          { k: 'p', muted: true, v: `Removing sensitive data from a repository: [docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository](${URL_REMOVE}).` },
          { k: 'p', muted: true, v: `Enabling push protection for your repository: [docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-push-protection-for-your-repository](${URL_ENABLE}).` },
          { k: 'p', muted: true, v: `Secret scanning: [docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning](${URL_SCANNING}).` },
          { k: 'p', muted: true, v: `Ignoring files: [docs.github.com/en/get-started/git-basics/ignoring-files](${URL_IGNORE}).` },
        ],
      },
    ],
  },
};
