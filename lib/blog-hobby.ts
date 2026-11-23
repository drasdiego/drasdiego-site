import type { Guide } from './blog';

const CHECKLIST =
  'CHECKLIST: O MEU PROJETO CABE NO PLANO HOBBY DA VERCEL?\n\nProjeto: ______________________________\nData da conferência: ____/____/______\n\n1. Abri vercel.com/legal/terms e li a seção 4 (Hobby Plan) na versão de hoje.   [ ] sim\n2. Estou fazendo este site para um cliente?                                     [ ] sim  [ ] não\n3. O site vende algo (produto, serviço, loja)?                                  [ ] sim  [ ] não\n4. O site recebe pagamento (venda, assinatura)?                                 [ ] sim  [ ] não\n5. O site pertence a uma empresa, minha ou de outra pessoa?                     [ ] sim  [ ] não\n6. Plano do time hoje (Dashboard, Settings, Billing, Plan): ______________\n7. Conferi a opção de treino de IA (Team Settings, Data Preferences).           [ ] sim\n\nComo ler as respostas:\n- Respostas 2 a 5 todas "não": o projeto parece pessoal. Refaça o checklist quando algo mudar.\n- Alguma resposta 2 a 5 "sim": na nossa leitura, é o caso mais claro de uso comercial. Pense no plano Pro e peça a confirmação da Vercel.\n- Ficou em dúvida: pergunte à Vercel com a mensagem do próximo bloco.\n\nEste checklist é uma leitura dos termos, não orientação jurídica.';
const MENSAGEM =
  'Subject: Hobby plan and commercial use\n\nHello,\n\nI use the Hobby plan and I want to confirm if my project fits section 4 of the Terms of Service ("personal or non-commercial use").\n\nProject: [describe the project in one line]\nWho uses it: [for example, a website I built for a client / my own portfolio / a store]\nDoes it sell something or receive payments: [yes or no]\n\nWhich plan should I use for this project?\n\nThank you.\n[your name]';

const URL_TERMOS = 'https://vercel.com/legal/terms';
const URL_HOBBY = 'https://vercel.com/docs/plans/hobby';
const URL_PRO = 'https://vercel.com/docs/plans/pro-plan';
const URL_TRIAL = 'https://vercel.com/docs/plans/pro-plan/trials';
const URL_PRECOS = 'https://vercel.com/pricing';
const URL_CHANGELOG = 'https://vercel.com/changelog/updates-to-terms-of-service-march-2026';
const URL_AJUDA = 'https://vercel.com/help';

export const VERCEL_HOBBY: Guide = {
  slug: 'vercel-hobby-so-pessoal',
  category: 'deploy',
  keyword: 'HOBBY',
  published: '2026-11-18',
  pt: {
    title: 'Vercel grátis é só pessoal? O checklist do seu projeto',
    short: 'Vercel grátis é só pessoal',
    lead: 'Um checklist de sete linhas para conferir se o seu projeto cabe no plano grátis da Vercel, o trecho dos termos de uso que importa, onde ver o plano do seu time e onde desligar o uso do seu conteúdo para treinar inteligência artificial.',
    description: 'Um checklist para conferir se o seu projeto cabe no plano Hobby da Vercel, o trecho dos termos de uso que importa, como ver o plano do time, como mudar para o Pro e onde desligar o uso do seu conteúdo para treino de IA.',
    facts: ['vercel', 'termos de uso', 'checklist'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Este guia é uma leitura dos Termos de Serviço da Vercel, na versão de 19 de outubro de 2026, conferida em 18/11/2026. Não é orientação jurídica, não é parecer e não substitui a resposta da Vercel.' },
          { k: 'p', v: 'Quando o guia diz "nossa leitura", é interpretação do autor, separada do que está escrito nos termos. A leitura de "comercial" é nossa: os termos não definem a palavra.' },
          { k: 'p', v: 'Nenhum comando foi executado e nenhuma conta da Vercel foi aberta para escrever este guia: os caminhos do painel vêm da documentação da Vercel e podem mudar. O preço é o que a página de preços mostrava em 18/11/2026. Os exemplos (cliente, loja) são ilustrativos. Sem vínculo com a Vercel.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          {
            k: 'ol',
            items: [
              'Vercel: serviço para publicar sites na internet.',
              'Plano Hobby: o plano grátis. "Hobby", em inglês, quer dizer passatempo.',
              'Plano Pro: o plano pago.',
              'Termos de Serviço (Terms of Service): o contrato de uso do serviço. É ele que vale, mais do que qualquer resumo, inclusive este guia.',
              'Time (Team): o espaço da conta onde ficam os projetos. As configurações de plano e de dados estão nas configurações do time.',
              'Treino de IA (Model Training): o nome que os termos dão ao uso do seu conteúdo para treinar modelos de inteligência artificial.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O que os termos dizem sobre o Hobby',
        blocks: [
          { k: 'p', v: 'Na seção 4 (Hobby Plan), os termos de 19/10/2026 dizem, em inglês:' },
          { k: 'p', v: '"You shall only use the Services under a Hobby plan for your personal or non-commercial use."' },
          { k: 'p', v: 'Em português, numa tradução nossa: no plano Hobby, você só deve usar o serviço para uso pessoal ou não comercial.' },
          { k: 'p', v: 'Nossa leitura: os termos não definem "comercial". Na leitura de 18/11/2026, a palavra aparece na seção 4 e, com outros sentidos, nas seções 12 e 13, e nenhuma ocorrência traz a definição. Por isso o guia não diz onde está a linha exata. O caso mais claro, na nossa leitura, é o site feito para um cliente ou o site que vende alguma coisa.' },
        ],
      },
      {
        n: '2',
        title: 'O checklist do seu projeto',
        blocks: [
          { k: 'p', v: `Copie, cole onde você anota e responda. A versão certa dos termos é a que está em [vercel.com/legal/terms](${URL_TERMOS}) no dia em que você conferir.` },
          { k: 'code', label: 'Checklist do projeto', text: CHECKLIST },
          { k: 'p', muted: true, v: 'As linhas 2 a 5 (cliente, loja, pagamento, empresa) vêm da nossa leitura. As linhas 1, 6 e 7 são conferências de fato: você abre a página e olha.' },
        ],
      },
      {
        n: '3',
        title: 'Na dúvida, pergunte à Vercel',
        blocks: [
          { k: 'p', v: `Quem decide o que cabe no Hobby é a Vercel, com base nos termos dela. Se o checklist deixou dúvida, a Vercel tem um canal de ajuda em [vercel.com/help](${URL_AJUDA}). Uma mensagem curta, em inglês, para colar e preencher:` },
          { k: 'code', label: 'Mensagem para a Vercel (inglês)', text: MENSAGEM },
          { k: 'p', muted: true, v: 'Guarde a resposta por escrito. Ela é mais útil do que qualquer interpretação, inclusive a deste guia.' },
        ],
      },
      {
        n: '4',
        title: 'Como ver o plano do time e como mudar para o Pro',
        blocks: [
          { k: 'p', v: 'Os passos abaixo seguem a documentação da Vercel (página "Hobby Plan", atualizada em 12/11/2026). Não foram executados numa conta para este guia: confira na tela.' },
          {
            k: 'ol',
            start: 1,
            items: [
              'Abra o painel (dashboard) da Vercel.',
              'Se você tem mais de um time, escolha o time que quer conferir no seletor de times.',
              'Abra Settings na barra lateral e depois Billing.',
              'Na seção Plan aparece o plano do time. Se o time puder ser promovido, a documentação diz que há o botão Upgrade (ou criar um time).',
              'Para mudar, siga Upgrade, adicione membros se quiser, informe o cartão e confirme.',
            ],
          },
          { k: 'p', v: 'Preço: em 18/11/2026, a documentação do Hobby diz que o assento de desenvolvedor custa US$ 20 por usuário por mês e que o assento de visualizador (Viewer) é grátis. A página de preços mostra o Pro a US$ 20 por mês, com US$ 20 de crédito de uso incluído, e diz que dá para pagar o uso além do crédito. Por isso o vídeo diz "a partir de". Reconfira na página de preços, porque os valores podem mudar.' },
          { k: 'p', v: 'O que a documentação diz do Pro: a página do plano Pro diz que ele é pensado para "professional developers, freelancers, and businesses". Nenhuma das páginas lidas diz que uso comercial exige o Pro, e existe também o plano Enterprise. Se você quiser testar antes, a documentação do teste do Pro cita um teste gratuito de 14 dias, com US$ 20 em créditos.' },
        ],
      },
      {
        n: '5',
        title: 'Onde desligar o uso do seu conteúdo para treino de IA',
        blocks: [
          { k: 'p', v: 'Os termos (seção 3, Your Content) dizem que, no plano Hobby ou no Pro em teste, você concorda que a Vercel pode usar o seu conteúdo para treinar modelos de IA e compartilhá-lo com terceiros para o mesmo fim. No Pro pago, o treino não vem ligado por padrão. E dizem: "You may opt-out of Model Training at any time by adjusting your Team account settings" (você pode desligar o treino a qualquer momento nas configurações do time).' },
          { k: 'p', v: 'O aviso da Vercel de 17/03/2026 (changelog) dá o caminho: Team Settings, Data Preferences. Ele também diz que, no Hobby, a opção vem ligada por padrão, e que quem desliga depois do prazo de 31/03/2026 tem os dados não usados nem compartilhados daquele momento em diante.' },
          {
            k: 'ol',
            start: 1,
            items: [
              'Abra o painel e escolha o time.',
              'Abra as configurações do time (Team Settings) e depois Data Preferences.',
              'Desligue a opção de treino de IA e confira se ela ficou desligada.',
            ],
          },
          { k: 'callout', tone: 'warn', v: 'Dois limites, para não prometer demais: desligar vale daqui para a frente e o guia não promete apagamento do que já foi usado. E o mesmo aviso diz que usuários Pro e Hobby não conseguem desligar o uso dos dados para melhorar e desenvolver produtos "in ways that do not involve training an AI model" (de formas que não envolvem treinar um modelo de IA). A opção cobre o treino de IA, só isso.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            items: [
              'Os termos dizem que o Hobby é para uso pessoal ou não comercial (seção 4).',
              'Os termos não definem "comercial". Site de cliente e site que vende são, na nossa leitura, os casos mais claros.',
              'Projeto pessoal, Hobby. Projeto com cliente ou venda, na dúvida, pergunte à Vercel e considere o Pro.',
              'No Hobby, o treino de IA com o seu conteúdo vem ligado e dá para desligar em Team Settings, Data Preferences.',
              'Este guia é leitura dos termos, não orientação jurídica.',
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
              'Mito: "os termos definem o que é comercial". Verdade: não definem. A leitura do caso claro é nossa e está marcada como tal.',
              'Mito: "desligar o treino apaga o que já foi usado". Verdade: a Vercel descreve o desligamento como valendo daquele momento em diante.',
              'Mito: "se desligar o treino de IA, a Vercel não usa mais nenhum dado meu". Verdade: o aviso da Vercel diz que Pro e Hobby não desligam o uso de dados para melhorar produtos fora do treino de IA.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          {
            k: 'ul',
            items: [
              `Vercel, [Terms of Service](${URL_TERMOS}) (última atualização 19/10/2026), seções 3 e 4.`,
              `Vercel, [Hobby Plan](${URL_HOBBY}) (documentação, atualizada em 12/11/2026).`,
              `Vercel, [Pro Plan](${URL_PRO}) (documentação).`,
              `Vercel, [Pro Plan Trial](${URL_TRIAL}) (documentação).`,
              `Vercel, [Pricing](${URL_PRECOS}).`,
              `Vercel, [Updates to Terms of Service](${URL_CHANGELOG}) (changelog, 17/03/2026).`,
              `Vercel, [ajuda](${URL_AJUDA}).`,
            ],
          },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'Vercel’s free plan is for personal use',
    short: 'Vercel’s free plan is personal',
    lead: 'A seven-line checklist to see whether your project fits Vercel’s free plan, the part of the terms of service that matters, where to see your team’s plan, and where to turn off the use of your content to train artificial intelligence.',
    description: 'A checklist to see whether your project fits Vercel’s Hobby plan, the part of the terms of service that matters, how to see your team’s plan, how to switch to Pro, and where to turn off the use of your content for AI training.',
    facts: ['vercel', 'terms of service', 'checklist'],
    sections: [
      {
        title: 'Read first: the limit of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'This guide is a reading of Vercel’s Terms of Service, in the version of October 19, 2026, checked on 11/18/2026. It is not legal advice, it is not a legal opinion, and it does not replace Vercel’s answer.' },
          { k: 'p', v: 'When the guide says "our reading", it is the author’s interpretation, kept separate from what is written in the terms. The reading of "commercial" is ours: the terms do not define the word.' },
          { k: 'p', v: 'No command was executed and no Vercel account was opened to write this guide: the dashboard paths come from Vercel’s documentation and may change. The price is what the pricing page showed on 11/18/2026. The examples (client, store) are illustrative. Not affiliated with Vercel.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          {
            k: 'ol',
            items: [
              'Vercel: a service for publishing websites on the internet.',
              'Hobby plan: the free plan. "Hobby" means a pastime.',
              'Pro plan: the paid plan.',
              'Terms of Service: the contract for using the service. It is the one that counts, more than any summary, this guide included.',
              'Team: the space in the account where the projects live. The plan and data settings are in the team settings.',
              'AI training (Model Training): the name the terms give to the use of your content to train artificial intelligence models.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'What the terms say about Hobby',
        blocks: [
          { k: 'p', v: 'In section 4 (Hobby Plan), the terms of 10/19/2026 say:' },
          { k: 'p', v: '"You shall only use the Services under a Hobby plan for your personal or non-commercial use."' },
          { k: 'p', v: 'Our reading: the terms do not define "commercial". In the reading of 11/18/2026, the word appears in section 4 and, with other meanings, in sections 12 and 13, and no occurrence gives the definition. That is why the guide does not say where the exact line is. The clearest case, in our reading, is a site made for a client or a site that sells something.' },
        ],
      },
      {
        n: '2',
        title: 'The checklist for your project',
        blocks: [
          { k: 'p', v: `The checklist below is written in Portuguese, and you can fill it in in any language. The message to Vercel in the next section is already in English. Copy it, paste it where you take notes, and answer. The right version of the terms is the one at [vercel.com/legal/terms](${URL_TERMOS}) on the day you check.` },
          { k: 'code', label: 'Project checklist (in Portuguese)', text: CHECKLIST },
          { k: 'p', muted: true, v: 'Lines 2 to 5 (client, store, payment, company) come from our reading. Lines 1, 6 and 7 are factual checks: you open the page and look.' },
        ],
      },
      {
        n: '3',
        title: 'If in doubt, ask Vercel',
        blocks: [
          { k: 'p', v: `Vercel is the one who decides what fits on Hobby, based on its own terms. If the checklist left you in doubt, Vercel has a help channel at [vercel.com/help](${URL_AJUDA}). A short message, in English, to paste and fill in:` },
          { k: 'code', label: 'Message to Vercel (in English)', text: MENSAGEM },
          { k: 'p', muted: true, v: 'Keep the answer in writing. It is more useful than any interpretation, this guide’s included.' },
        ],
      },
      {
        n: '4',
        title: 'How to see the team’s plan and how to switch to Pro',
        blocks: [
          { k: 'p', v: 'The steps below follow Vercel’s documentation (the "Hobby Plan" page, updated on 11/12/2026). They were not executed on an account for this guide: check them on the screen.' },
          {
            k: 'ol',
            start: 1,
            items: [
              'Open the Vercel dashboard.',
              'If you have more than one team, pick the team you want to check in the team switcher.',
              'Open Settings in the sidebar and then Billing.',
              'In the Plan section the team’s plan appears. If the team can be upgraded, the documentation says there is an Upgrade button (or you can create a team).',
              'To switch, follow Upgrade, add members if you want, enter the card and confirm.',
            ],
          },
          { k: 'p', v: 'Price: on 11/18/2026, the Hobby documentation says the developer seat costs US$ 20 per user per month and that the Viewer seat is free. The pricing page shows Pro at US$ 20 per month, with US$ 20 of usage credit included, and says you can pay for usage beyond the credit. That is why the video says "starting at". Check again on the pricing page, because the values may change.' },
          { k: 'p', v: 'What the documentation says about Pro: the Pro plan page says it is designed for "professional developers, freelancers, and businesses". None of the pages read says that commercial use requires Pro, and there is also the Enterprise plan. If you want to try it first, the Pro trial documentation mentions a free 14-day trial with US$ 20 in credits.' },
        ],
      },
      {
        n: '5',
        title: 'Where to turn off the use of your content for AI training',
        blocks: [
          { k: 'p', v: 'The terms (section 3, Your Content) say that, on the Hobby plan or on Pro in a trial, you agree that Vercel may use your content to train AI models and share it with third parties for the same purpose. On paid Pro, training is not on by default. And they say: "You may opt-out of Model Training at any time by adjusting your Team account settings".' },
          { k: 'p', v: 'Vercel’s notice of 03/17/2026 (changelog) gives the path: Team Settings, Data Preferences. It also says that, on Hobby, the option is on by default, and that whoever turns it off after the 03/31/2026 deadline has their data not used or shared from that moment on.' },
          {
            k: 'ol',
            start: 1,
            items: [
              'Open the dashboard and pick the team.',
              'Open the team settings (Team Settings) and then Data Preferences.',
              'Turn off the AI training option and check that it stayed off.',
            ],
          },
          { k: 'callout', tone: 'warn', v: 'Two limits, so we do not promise too much: turning it off applies from now on, and this guide does not promise deletion of what was already used. And the same notice says that Pro and Hobby users cannot turn off the use of data to improve and develop products "in ways that do not involve training an AI model". The option covers AI training, nothing else.' },
        ],
      },
      {
        title: 'Summary to keep',
        blocks: [
          {
            k: 'ol',
            items: [
              'The terms say that Hobby is for personal or non-commercial use (section 4).',
              'The terms do not define "commercial". A client’s site and a site that sells are, in our reading, the clearest cases.',
              'Personal project, Hobby. Project with a client or sales, if in doubt, ask Vercel and consider Pro.',
              'On Hobby, AI training on your content is on, and you can turn it off in Team Settings, Data Preferences.',
              'This guide is a reading of the terms, not legal advice.',
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
              'Myth: "the terms define what is commercial". Fact: they do not. The reading of the clear case is ours and is marked as such.',
              'Myth: "turning off training deletes what was already used". Fact: Vercel describes turning it off as applying from that moment on.',
              'Myth: "if I turn off AI training, Vercel no longer uses any of my data". Fact: Vercel’s notice says Pro and Hobby cannot turn off the use of data to improve products outside AI training.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          {
            k: 'ul',
            items: [
              `Vercel, [Terms of Service](${URL_TERMOS}) (last updated 10/19/2026), sections 3 and 4.`,
              `Vercel, [Hobby Plan](${URL_HOBBY}) (documentation, updated on 11/12/2026).`,
              `Vercel, [Pro Plan](${URL_PRO}) (documentation).`,
              `Vercel, [Pro Plan Trial](${URL_TRIAL}) (documentation).`,
              `Vercel, [Pricing](${URL_PRECOS}).`,
              `Vercel, [Updates to Terms of Service](${URL_CHANGELOG}) (changelog, 03/17/2026).`,
              `Vercel, [help](${URL_AJUDA}).`,
            ],
          },
          { k: 'p', muted: true, v: 'Educational and independent content.' },
        ],
      },
    ],
  },
};
