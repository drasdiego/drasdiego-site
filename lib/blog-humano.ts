import type { Guide } from './blog';

const ADICIONAR_CATALOGO = '/plugin marketplace add blader/humanizer';
const INSTALAR_PLUGIN = '/plugin install humanizer@humanizer';
const CHAMAR_COM_TEXTO = '/humanizer [cole aqui o texto que você quer reescrever]';
const REESCREVER_ARQUIVO = 'Humanize the prose in docs/launch-post.md.';
const MODELO_COM_AMOSTRA = '/humanizer Reescreva o texto abaixo mantendo o meu jeito de escrever.\n\nAmostra do meu jeito de escrever:\n[cole aqui dois ou três parágrafos seus]\n\nTexto para reescrever:\n[cole aqui o texto]';

const URL_REPO = 'https://github.com/blader/humanizer';
const URL_SKILLS = 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview';

export const HUMANIZER_TEXTO: Guide = {
  slug: 'humanizer-texto-de-ia',
  category: 'claude-code',
  published: '2026-11-19',
  pt: {
    title: 'Claude escrevendo igual gente: como usar o Humanizer e o que ele não faz',
    short: 'Claude escrevendo igual gente',
    lead: 'O Humanizer reescreve texto de IA para soar como pessoa. O que ele confere, como instalar, como usar com a sua amostra e o limite que o próprio README avisa.',
    description: 'O que o Humanizer, de blader (licença MIT), faz com texto de IA segundo o README, como instalar no Claude Code, como usar com uma amostra da sua escrita e por que ele não engana detector de IA.',
    facts: ['claude code', 'skill', 'texto'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'O autor deste guia não instalou nem rodou o Humanizer. Tudo o que está marcado com [REPO] vem do README do repositório blader/humanizer, lido em 18/11/2026, e os comandos não foram executados: confira no README, no link das fontes.' },
          { k: 'p', v: 'O Humanizer é um projeto de terceiros, publicado por blader (conta do GitHub), com licença MIT. O README não diz quem escreveu o projeto.' },
          { k: 'p', v: 'Ele não engana detector de IA: o próprio README diz que não tenta passar por detectores e que os detectores ainda marcam a maior parte do que ele produz. Não use para trabalho escolar, acadêmico ou concurso.' },
          { k: 'p', v: 'Leia o conteúdo de qualquer skill de terceiros antes de instalar (recomendação nossa, que segue a página de segurança de Agent Skills da Anthropic). O guia não tem vínculo com o autor do projeto nem com a Anthropic.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: segundo a documentação da Anthropic, um jeito de dar ao Claude novas capacidades por meio de instruções e código.',
              'Plugin e marketplace (Claude Code): o plugin é o pacote que você instala; o marketplace é o catálogo de onde ele vem. No caso, o catálogo é o próprio repositório do projeto.',
              'Humanizer: a skill que reescreve texto de IA para soar como pessoa, sem mudar o que o texto diz [REPO].',
              'Detector de IA: ferramenta que tenta adivinhar se um texto foi escrito por IA. O Humanizer não foi feito para enganá-la [REPO].',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que o Humanizer faz [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'Confere o texto contra 26 padrões de escrita de IA. O README diz que ele é baseado no guia "Signs of AI writing" da Wikipedia. O autor não conseguiu abrir a página da Wikipedia, então só repete o que o README diz.',
              'Alguns padrões que o README lista, com o exemplo dele: Chatbot residue ("Great question!" e "I hope this helps!", o "espero ter ajudado" esquecido no texto); Forced triads ("innovation, inspiration, and insights", listas de três itens por reflexo); Overused AI words (palavras como "delve" e "showcasing").',
              'Devolve três coisas: a primeira reescrita, uma crítica curta do que ainda soa artificial e a versão final.',
              'Aceita uma amostra do seu texto, de dois ou três parágrafos, para seguir o seu ritmo, a escolha de palavras e a pontuação.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Instalar no Claude Code [REPO]',
        blocks: [
          { k: 'p', v: 'O README diz que o plugin precisa do Claude Code 2.1.142 ou mais novo. Os dois comandos abaixo são os do README e não foram executados pelo autor: confira no README. Antes de instalar, abra o repositório e leia o conteúdo, incluindo scripts e outros arquivos, não só o README. O Humanizer é uma skill de terceiro e entra na auditoria.' },
          { k: 'ol', start: 1, items: ['Adicione o catálogo:'] },
          { k: 'code', label: 'Adicionar o catálogo (comando do Claude Code, não executado: confira no README)', text: ADICIONAR_CATALOGO },
          { k: 'ol', start: 2, items: ['Instale o plugin:'] },
          { k: 'code', label: 'Instalar o plugin (comando do Claude Code, não executado: confira no README)', text: INSTALAR_PLUGIN },
          { k: 'p', v: 'O README também lista a instalação para o Codex e para outros agentes com `npx skills add`. Isso fica fora deste guia.' },
        ],
      },
      {
        n: '3',
        title: 'Usar [REPO]',
        blocks: [
          { k: 'p', v: 'Depois de instalado, o README diz para chamar com `/humanizer` seguido do texto, ou pedir em linguagem natural. Para reescrever um arquivo, dê o caminho dele. Os dois exemplos abaixo seguem o README e não foram executados.' },
          { k: 'code', label: 'Chamar com o texto (não executado: confira no README)', text: CHAMAR_COM_TEXTO },
          { k: 'code', label: 'Reescrever um arquivo (exemplo do README, não executado)', text: REESCREVER_ARQUIVO },
          { k: 'p', v: 'O README diz que o Humanizer lê o arquivo inteiro antes de editar e muda só a prosa.' },
        ],
      },
      {
        n: '4',
        title: 'Para soar como você: a amostra',
        blocks: [
          { k: 'p', v: 'O README diz para incluir uma amostra de dois ou três parágrafos seus. O modelo abaixo é sugestão nossa, não texto do README, e o autor não testou se a ferramenta segue amostras em português: confira o resultado.' },
          { k: 'code', label: 'Modelo de pedido com amostra (sugestão nossa, não executado)', text: MODELO_COM_AMOSTRA },
          { k: 'p', v: 'Use como amostra um texto que você mesmo escreveu e que pode compartilhar. Não cole conteúdo de trabalho ou dado pessoal.' },
        ],
      },
      {
        n: '5',
        title: 'Revise antes de publicar',
        blocks: [
          {
            k: 'ul',
            items: [
              'Leia a versão final inteira. A ferramenta promete manter o sentido [REPO], mas quem publica é você.',
              'Confira números, nomes e datas: o README promete não mudar o que o texto diz, e a conferência é sua.',
              'Não apresente o resultado como texto que nenhum detector reconhece: o README diz que os detectores ainda marcam a maior parte do que ele escreve [REPO].',
            ],
          },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'O Humanizer reescreve texto de IA para soar como pessoa, com 26 padrões, crítica e versão final [REPO].',
              'Instalação no Claude Code: dois comandos de plugin, versão 2.1.142 ou mais nova [REPO]. O autor não os executou: confira no README.',
              'Para soar como você, inclua uma amostra de dois ou três parágrafos seus [REPO].',
              'Ele não tenta enganar detector de IA, e os detectores ainda marcam a maior parte do que ele escreve [REPO].',
              'Leia o conteúdo antes de instalar e revise o texto antes de publicar.',
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
              'Mito: "o Humanizer faz o texto escapar dos detectores de IA". Verdade: o README diz que ele não tenta passar por detectores e que eles ainda marcam a maior parte do que ele escreve.',
              'Mito: "depois do Humanizer não precisa revisar". Verdade: o texto pode mudar de tom e quem assina é você.',
              'Mito: "skill de terceiros é segura porque está no GitHub". Verdade: a documentação da Anthropic diz para usar só skills que você criou ou que vêm da Anthropic e, para as demais, auditar tudo antes, inclusive scripts e outros arquivos incluídos. O Humanizer é de terceiro, então vale a auditoria.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `README do Humanizer, de blader, licença MIT: [github.com/blader/humanizer](${URL_REPO}). Anthropic, [Agent Skills, visão geral](${URL_SKILLS}), seção de segurança.` },
          { k: 'p', muted: true, v: 'Crédito: Humanizer, publicado por blader, licença MIT. Projeto de terceiros, sem vínculo com o autor do projeto nem com a Anthropic. Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'Claude writing like a person: how to use Humanizer and what it does not do',
    short: 'Claude writing like a person',
    lead: 'Humanizer rewrites AI text so it sounds like a person. What it checks, how to install it, how to use it with your own sample, and the limit the README itself warns about.',
    description: 'What Humanizer, by blader (MIT license), does to AI text according to the README, how to install it in Claude Code, how to use it with a sample of your writing, and why it does not fool AI detectors.',
    facts: ['claude code', 'skill', 'text'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The author of this guide did not install or run Humanizer. Everything marked [REPO] comes from the README of the blader/humanizer repository, read on 11/18/2026, and the commands were not executed: check the README, in the sources link.' },
          { k: 'p', v: 'Humanizer is a third-party project, published by blader (a GitHub account), under the MIT license. The README does not say who wrote the project.' },
          { k: 'p', v: 'It does not fool AI detectors: the README itself says it does not try to get past detectors and that detectors still flag most of what it produces. Do not use it for schoolwork, academic work or public-service entrance exams (concursos).' },
          { k: 'p', v: 'Read the contents of any third-party skill before you install it (our recommendation, which follows Anthropic’s Agent Skills security page). This guide has no tie to the project’s author or to Anthropic.' },
          { k: 'p', v: 'The text inside the code blocks that is written in Portuguese (the request and the template) is an example. The tool also accepts the request in English.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Skill: according to Anthropic’s documentation, a way to give Claude new capabilities through instructions and code.',
              'Plugin and marketplace (Claude Code): the plugin is the package you install; the marketplace is the catalog it comes from. Here, the catalog is the project’s own repository.',
              'Humanizer: the skill that rewrites AI text so it sounds like a person, without changing what the text says [REPO].',
              'AI detector: a tool that tries to guess whether a text was written by AI. Humanizer was not made to fool it [REPO].',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What Humanizer does [REPO]',
        blocks: [
          {
            k: 'ul',
            items: [
              'It checks the text against 26 patterns of AI writing. The README says it is based on the Wikipedia guide "Signs of AI writing". The author could not open the Wikipedia page, so this only repeats what the README says.',
              'Some patterns the README lists, with its own example: Chatbot residue ("Great question!" and "I hope this helps!", the closing pleasantry left in the text); Forced triads ("innovation, inspiration, and insights", lists of three items out of habit); Overused AI words (words like "delve" and "showcasing").',
              'It gives back three things: the first rewrite, a short critique of what still sounds artificial, and the final version.',
              'It accepts a sample of your writing, two or three paragraphs, to follow your rhythm, your word choice and your punctuation.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'Install in Claude Code [REPO]',
        blocks: [
          { k: 'p', v: 'The README says the plugin needs Claude Code 2.1.142 or newer. The two commands below are the README’s and were not executed by the author: check the README. Before installing, open the repository and read the contents, including scripts and other files, not just the README. Humanizer is a third-party skill and goes through the audit.' },
          { k: 'ol', start: 1, items: ['Add the catalog:'] },
          { k: 'code', label: 'Add the catalog (Claude Code command, not executed: check the README)', text: ADICIONAR_CATALOGO },
          { k: 'ol', start: 2, items: ['Install the plugin:'] },
          { k: 'code', label: 'Install the plugin (Claude Code command, not executed: check the README)', text: INSTALAR_PLUGIN },
          { k: 'p', v: 'The README also lists installation for Codex and other agents with `npx skills add`. That is outside this guide.' },
        ],
      },
      {
        n: '3',
        title: 'Use it [REPO]',
        blocks: [
          { k: 'p', v: 'Once installed, the README says to call it with `/humanizer` followed by the text, or to ask in plain language. To rewrite a file, give its path. The two examples below follow the README and were not executed.' },
          { k: 'code', label: 'Call it with the text (not executed: check the README)', text: CHAMAR_COM_TEXTO },
          { k: 'code', label: 'Rewrite a file (README example, not executed)', text: REESCREVER_ARQUIVO },
          { k: 'p', v: 'The README says Humanizer reads the whole file before editing and changes only the prose.' },
        ],
      },
      {
        n: '4',
        title: 'To sound like you: the sample',
        blocks: [
          { k: 'p', v: 'The README says to include a sample of two or three of your own paragraphs. The template below is our suggestion, not README text, and the author did not test whether the tool follows samples in Portuguese: check the result.' },
          { k: 'code', label: 'Request template with a sample (our suggestion, not executed)', text: MODELO_COM_AMOSTRA },
          { k: 'p', v: 'Use as the sample a text you wrote yourself and are free to share. Do not paste work content or personal data.' },
        ],
      },
      {
        n: '5',
        title: 'Review before you publish',
        blocks: [
          {
            k: 'ul',
            items: [
              'Read the whole final version. The tool promises to keep the meaning [REPO], but you are the one who publishes.',
              'Check numbers, names and dates: the README promises not to change what the text says, and the checking is yours.',
              'Do not present the result as text that no detector recognizes: the README says detectors still flag most of what it writes [REPO].',
            ],
          },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'Humanizer rewrites AI text so it sounds like a person, with 26 patterns, a critique and a final version [REPO].',
              'Installation in Claude Code: two plugin commands, version 2.1.142 or newer [REPO]. The author did not run them: check the README.',
              'To sound like you, include a sample of two or three of your own paragraphs [REPO].',
              'It does not try to fool AI detectors, and detectors still flag most of what it writes [REPO].',
              'Read the contents before installing and review the text before publishing.',
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
              'Myth: "Humanizer makes the text escape AI detectors". Fact: the README says it does not try to get past detectors and that they still flag most of what it writes.',
              'Myth: "after Humanizer there is no need to review". Fact: the text can change tone, and you are the one who signs it.',
              'Myth: "a third-party skill is safe because it is on GitHub". Fact: Anthropic’s documentation says to use only skills you created or that come from Anthropic and, for the rest, to audit everything first, including scripts and other bundled files. Humanizer is third-party, so the audit is worth it.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Humanizer README, by blader, MIT license: [github.com/blader/humanizer](${URL_REPO}). Anthropic, [Agent Skills overview](${URL_SKILLS}), security section.` },
          { k: 'p', muted: true, v: 'Credit: Humanizer, published by blader, MIT license. Third-party project, not affiliated with the project’s author or with Anthropic. Educational and independent content.' },
        ],
      },
    ],
  },
};
