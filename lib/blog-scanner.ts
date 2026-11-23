import type { Guide } from './blog';

const U_ANT = 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview';
const U_REPO = 'https://github.com/NVIDIA/skillspector';
const U_DOCS = 'https://docs.nvidia.com/skills/scanning-agent-skills';

export const SKILL_SEGURA_SCANNER: Guide = {
  slug: 'skill-segura-scanner',
  category: 'claude-code',
  keyword: 'SCANNER',
  published: '2026-11-20',
  pt: {
    title: 'Essa skill é segura? Como escanear antes de instalar e o que o scanner não garante',
    short: 'Essa skill é segura?',
    lead: 'Uma skill pode mandar no seu Claude. Como ler os arquivos antes de instalar, como escanear com o SkillSpector e por que nota baixa não é garantia.',
    description: 'O que a documentação da Anthropic diz sobre skills de terceiros, como ler os arquivos de uma skill, como escanear com o SkillSpector da NVIDIA (licença Apache 2.0), como ler a nota e por que scanner ajuda a decidir, mas não garante.',
    facts: ['claude code', 'skills', 'segurança'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Eu não instalei nem rodei o SkillSpector para este guia (a sessão em que escrevi não permite instalar ferramenta de terceiros). Tudo o que está marcado com [REPO] vem do README do projeto, lido em 18/11/2026, e esses comandos não foram executados: confira no README, no link das fontes. A nota e o formato da saída também não foram vistos por mim. Só os dois comandos do passo 1, para ler os arquivos da skill sem nenhuma ferramenta de terceiros, foram rodados no Mac, numa skill de exemplo criada para este guia. Scanner ajuda a decidir, não garante. O próprio README diz: "SkillSpector is defense-in-depth, not a sandbox." Uma nota baixa não prova que a skill é segura. O guia não tem vínculo com a NVIDIA nem com a Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              'Skill: segundo a documentação da Anthropic, um jeito de dar ao Claude novas capacidades por meio de instruções e código.',
              'Scanner de skills: um programa que examina os arquivos de uma skill antes de você instalar, procurando padrões de risco.',
              'Análise estática: examinar os arquivos sem executá-los. O README diz que o SkillSpector nunca executa a skill escaneada [REPO].',
              'LLM: modelo de linguagem, o tipo de IA por trás de assistentes como o Claude. O SkillSpector pode usar um para uma análise extra [REPO].',
              'Dependência: pacote de terceiros de que a skill precisa. OSV.dev é um banco público de falhas conhecidas em pacotes, que o scanner consulta [REPO].',
              'Sandbox: uma caixa isolada que impede o programa de mexer no resto do computador. O README diz que o SkillSpector não é isso [REPO].',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O aviso da documentação da Anthropic',
        blocks: [
          {
            k: 'ul',
            items: [
              'A página de Agent Skills diz que uma skill maliciosa pode direcionar o Claude a chamar ferramentas ou rodar código de um jeito que não combina com o propósito declarado dela.',
              'Ela manda auditar com cuidado: revisar todos os arquivos que vêm na skill, como o `SKILL.md`, scripts, imagens e outros recursos, e procurar padrões estranhos, como chamadas de rede inesperadas.',
              'A página recomenda usar skills só de fontes confiáveis, as que você mesmo criou ou as da Anthropic.',
              'O scanner é um passo a mais, não o substituto de ler a skill.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Passo 1: leia os arquivos da skill',
        blocks: [
          { k: 'p', v: 'Antes de qualquer scanner, olhe o que a skill traz. Os dois comandos abaixo, em um terminal, mostram todos os arquivos e procuram por endereços e comandos de rede. São uma ajuda inicial (ideia nossa), não substituem ler os arquivos. Troque `./minha-skill` pela pasta da skill.' },
          { k: 'ol', start: 1, items: ['Liste todos os arquivos:'] },
          { k: 'code', label: 'Listar os arquivos da skill (terminal, testado no Mac)', text: "find ./minha-skill -type f | sort" },
          { k: 'ol', start: 2, items: ['Procure comandos e endereços de rede:'] },
          { k: 'code', label: 'Procurar rede nos arquivos (terminal, testado no Mac)', text: "grep -rnE \"curl|wget|https?://\" ./minha-skill" },
          { k: 'p', v: 'No teste, numa skill de exemplo com um `SKILL.md` e um script, o primeiro comando listou os dois arquivos e o segundo apontou a linha do script com um `curl`. O grep procura só alguns padrões de rede (curl, wget, endereço http) e não cobre todas as formas de uma skill acessar a rede, por exemplo bibliotecas de requisição de uma linguagem. Por isso o passo 1 não substitui ler os arquivos. Se aparecer algo que você não entende, não instale.' },
        ],
      },
      {
        n: '3',
        title: 'Passo 2: escaneie com o SkillSpector [REPO]',
        blocks: [
          { k: 'p', v: 'O SkillSpector é da NVIDIA, com licença Apache 2.0 [REPO]. Exige Python 3.12 ou mais novo e o `uv` [REPO]. Os dois comandos abaixo são os do README e não foram executados por mim: confira no README.' },
          { k: 'ol', start: 1, items: ['Instale:'] },
          { k: 'code', label: 'Instalar o SkillSpector (terminal, não executado: confira no README)', text: "uv tool install git+https://github.com/NVIDIA/skillspector.git" },
          { k: 'ol', start: 2, items: ['Escaneie a pasta da skill, sem análise por LLM:'] },
          { k: 'code', label: 'Escanear com --no-llm (terminal, não executado: confira no README)', text: "skillspector scan ./minha-skill/ --no-llm" },
          { k: 'p', v: 'O README descreve `--no-llm` como análise só estática, mais rápida [REPO]. Cada achado vem com severidade, regra, arquivo, confiança e explicação [REPO].' },
        ],
      },
      {
        n: '4',
        title: 'Como ler a nota [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'A nota vai de 0 a 100, e quanto maior, pior. As faixas do README: 0 a 20 baixo, 21 a 50 médio, 51 a 80 alto e 81 a 100 crítico.',
              'O README soma pontos por achado (crítico 50, alto 25, médio 10, baixo 5) e multiplica por 1,3 quando há scripts executáveis.',
              '"Baixo" não quer dizer "seguro". A nota resume o que a análise estática achou, e o README lista o que ela não alcança. A ferramenta pode mostrar um rótulo próprio para a faixa baixa (no README, "LOW, SAFE"). Leia como "poucos achados na análise estática", não como garantia.',
              'O README também descreve um arquivo de baseline, para marcar achados que você já leu e aceitou. Os achados aceitos saem da nota, então só use para o que você realmente revisou (confira no README):',
            ],
          },
          { k: 'code', label: 'Criar um arquivo de baseline (terminal, não executado: confira no README)', text: "skillspector baseline ./minha-skill/ -o .skillspector-baseline.yaml" },
        ],
      },
      {
        n: '5',
        title: 'O que sai da sua máquina [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'Sem --no-llm: o README diz que a análise por LLM envia o conteúdo dos arquivos elegíveis ao provedor configurado.',
              'Com --no-llm: o conteúdo da skill fica na sua máquina.',
              'Mesmo com --no-llm: o scanner envia ao OSV.dev os nomes e versões das dependências declaradas, não o conteúdo dos arquivos, e precisa de acesso à internet para isso. Sem rede, o README diz que ele usa uma lista pequena embutida.',
            ],
          },
        ],
      },
      {
        n: '6',
        title: 'O que o scanner não alcança [REPO]',
        blocks: [
          { k: 'p', v: 'Estas são as limitações que o README lista. Elas são o motivo para ler a skill, não um roteiro para fugir do scanner:' },
          {
            k: 'ul',
            items: [
              'só análise estática: não vê o que a skill faz quando roda;',
              'não lê texto dentro de imagens;',
              'não analisa código compilado ou criptografado;',
              'pode deixar passar conteúdo em outros idiomas que não o inglês.',
            ],
          },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              'Uma skill maliciosa pode fazer o Claude rodar código fora do que ela promete (documentação da Anthropic).',
              'Leia todos os arquivos da skill antes de instalar. Os comandos `find` e `grep` do passo 1 ajudam, mas não bastam.',
              'O SkillSpector escaneia sem executar a skill e dá uma nota de 0 a 100, quanto maior, pior [REPO]. Eu não o executei: confira no README.',
              'Com `--no-llm`, o conteúdo fica local; os nomes e versões das dependências ainda vão ao OSV.dev [REPO].',
              'É defesa em camadas, não isolamento. Nota baixa não prova que a skill é segura [REPO].',
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
              'Mito: "nota baixa quer dizer skill segura". Verdade: o README diz que o SkillSpector é defesa em camadas, não um sandbox, e lista o que a análise não alcança.',
              'Mito: "o scanner roda a skill para testar". Verdade: o README diz que ele nunca executa a skill escaneada.',
              'Mito: "com --no-llm, nada sai do computador". Verdade: o conteúdo fica local, mas os nomes e versões das dependências vão ao OSV.dev.',
              'Mito: "se está no GitHub, é seguro". Verdade: a documentação da Anthropic manda usar skills de fontes confiáveis e revisar os arquivos antes.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Anthropic, [Agent Skills, visão geral (seção de segurança)](${U_ANT}). NVIDIA, [SkillSpector, README (licença Apache 2.0)](${U_REPO}). NVIDIA, [Scanning agent skills (documentação)](${U_DOCS}).` },
          { k: 'p', muted: true, v: 'Crédito: SkillSpector, da NVIDIA, licença Apache 2.0. Diego Arruda' },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente. Projeto de terceiros: SkillSpector, da NVIDIA, Apache 2.0.' },
        ],
      }
    ],
  },
  en: {
    title: 'Is this skill safe? How to scan it before installing and what a scanner does not guarantee',
    short: 'Is this skill safe?',
    lead: 'A skill can take orders over your Claude. How to read the files before installing, how to scan with SkillSpector and why a low score is not a guarantee.',
    description: 'What the Anthropic documentation says about third party skills, how to read the files of a skill, how to scan with NVIDIA\'s SkillSpector (Apache 2.0 license), how to read the score and why a scanner helps you decide but does not guarantee.',
    facts: ['claude code', 'skills', 'security'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'I did not install or run SkillSpector for this guide (the session I wrote it in does not allow installing third party tools). Everything marked [REPO] comes from the project README, read on 11/18/2026, and those commands were not executed: check the README, in the sources link. I have not seen the score or the output format either. Only the two commands in step 1, for reading a skill\'s files without any third party tool, were run on a Mac, on an example skill created for this guide. A scanner helps you decide, it does not guarantee. The README itself says: "SkillSpector is defense-in-depth, not a sandbox." A low score does not prove the skill is safe. This guide is not affiliated with NVIDIA or Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              'Skill: according to the Anthropic documentation, a way to give Claude new capabilities through instructions and code.',
              'Skill scanner: a program that examines the files of a skill before you install it, looking for risk patterns.',
              'Static analysis: examining the files without running them. The README says SkillSpector never executes the scanned skill [REPO].',
              'LLM: a language model, the kind of AI behind assistants like Claude. SkillSpector can use one for an extra analysis [REPO].',
              'Dependency: a third party package the skill needs. OSV.dev is a public database of known flaws in packages, which the scanner queries [REPO].',
              'Sandbox: an isolated box that keeps a program from touching the rest of the computer. The README says SkillSpector is not that [REPO].',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The warning in the Anthropic documentation',
        blocks: [
          {
            k: 'ul',
            items: [
              'The Agent Skills page says a malicious skill can direct Claude to call tools or run code in a way that does not match the skill\'s stated purpose.',
              'It says to audit carefully: review all the files that come with the skill, such as `SKILL.md`, scripts, images and other resources, and look for unusual patterns, such as unexpected network calls.',
              'The page recommends using skills only from trusted sources, the ones you created yourself or the ones from Anthropic.',
              'The scanner is an extra step, not a substitute for reading the skill.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Step 1: read the skill files',
        blocks: [
          { k: 'p', v: 'Before any scanner, look at what the skill contains. The two commands below, in a terminal, show all the files and search for network addresses and commands. They are a first aid (our idea), they do not replace reading the files. Replace `./minha-skill` with the skill folder.' },
          { k: 'ol', start: 1, items: ['List all the files:'] },
          { k: 'code', label: 'List the skill files (terminal, tested on a Mac)', text: "find ./minha-skill -type f | sort" },
          { k: 'ol', start: 2, items: ['Search for network commands and addresses:'] },
          { k: 'code', label: 'Search the files for network use (terminal, tested on a Mac)', text: "grep -rnE \"curl|wget|https?://\" ./minha-skill" },
          { k: 'p', v: 'In the test, on an example skill with a `SKILL.md` and a script, the first command listed both files and the second pointed to the script line with a `curl`. The grep searches only a few network patterns (curl, wget, http address) and does not cover every way a skill can reach the network, for example the request libraries of a programming language. That is why step 1 does not replace reading the files. If something shows up that you do not understand, do not install it.' },
        ],
      },
      {
        n: '3',
        title: 'Step 2: scan with SkillSpector [REPO]',
        blocks: [
          { k: 'p', v: 'SkillSpector is from NVIDIA, under the Apache 2.0 license [REPO]. It requires Python 3.12 or newer and `uv` [REPO]. The two commands below are the ones from the README and were not executed by me: check the README.' },
          { k: 'ol', start: 1, items: ['Install it:'] },
          { k: 'code', label: 'Install SkillSpector (terminal, not executed: check the README)', text: "uv tool install git+https://github.com/NVIDIA/skillspector.git" },
          { k: 'ol', start: 2, items: ['Scan the skill folder, without LLM analysis:'] },
          { k: 'code', label: 'Scan with --no-llm (terminal, not executed: check the README)', text: "skillspector scan ./minha-skill/ --no-llm" },
          { k: 'p', v: 'The README describes `--no-llm` as static analysis only, which is faster [REPO]. Each finding comes with severity, rule, file, confidence and an explanation [REPO].' },
        ],
      },
      {
        n: '4',
        title: 'How to read the score [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'The score goes from 0 to 100, and the higher, the worse. The README ranges: 0 to 20 low, 21 to 50 medium, 51 to 80 high and 81 to 100 critical.',
              'The README adds points per finding (critical 50, high 25, medium 10, low 5) and multiplies by 1.3 when there are executable scripts.',
              '"Low" does not mean "safe". The score summarizes what the static analysis found, and the README lists what it does not reach. The tool may show its own label for the low range (in the README, "LOW, SAFE"). Read it as "few findings in the static analysis", not as a guarantee.',
              'The README also describes a baseline file, to mark findings you have already read and accepted. Accepted findings drop out of the score, so only use it for what you actually reviewed (check the README):',
            ],
          },
          { k: 'code', label: 'Create a baseline file (terminal, not executed: check the README)', text: "skillspector baseline ./minha-skill/ -o .skillspector-baseline.yaml" },
        ],
      },
      {
        n: '5',
        title: 'What leaves your machine [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'Without --no-llm: the README says the LLM analysis sends the content of eligible files to the configured provider.',
              'With --no-llm: the skill content stays on your machine.',
              'Even with --no-llm: the scanner sends the names and versions of the declared dependencies to OSV.dev, not the content of the files, and it needs internet access for that. Without a network, the README says it uses a small built in list.',
            ],
          },
        ],
      },
      {
        n: '6',
        title: 'What the scanner does not reach [REPO]',
        blocks: [
          { k: 'p', v: 'These are the limitations the README lists. They are the reason to read the skill, not a roadmap for evading the scanner:' },
          {
            k: 'ul',
            items: [
              'static analysis only: it does not see what the skill does when it runs;',
              'it does not read text inside images;',
              'it does not analyze compiled or encrypted code;',
              'it may miss content in languages other than English.',
            ],
          },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              'A malicious skill can make Claude run code outside of what it promises (Anthropic documentation).',
              'Read all the skill files before installing. The `find` and `grep` commands in step 1 help, but they are not enough.',
              'SkillSpector scans without running the skill and gives a score from 0 to 100, the higher, the worse [REPO]. I did not run it: check the README.',
              'With `--no-llm`, the content stays local; the names and versions of the dependencies still go to OSV.dev [REPO].',
              'It is defense in depth, not isolation. A low score does not prove the skill is safe [REPO].',
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
              'Myth: "a low score means a safe skill". Fact: the README says SkillSpector is defense in depth, not a sandbox, and lists what the analysis does not reach.',
              'Myth: "the scanner runs the skill to test it". Fact: the README says it never executes the scanned skill.',
              'Myth: "with --no-llm, nothing leaves the computer". Fact: the content stays local, but the names and versions of the dependencies go to OSV.dev.',
              'Myth: "if it is on GitHub, it is safe". Fact: the Anthropic documentation says to use skills from trusted sources and to review the files first.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Anthropic, [Agent Skills, overview (security section)](${U_ANT}). NVIDIA, [SkillSpector, README (Apache 2.0 license)](${U_REPO}). NVIDIA, [Scanning agent skills (documentation)](${U_DOCS}).` },
          { k: 'p', muted: true, v: 'Credit: SkillSpector, by NVIDIA, Apache 2.0 license. Diego Arruda' },
          { k: 'p', muted: true, v: 'Educational and independent content. Third party project: SkillSpector, by NVIDIA, Apache 2.0.' },
        ],
      }
    ],
  },
};
