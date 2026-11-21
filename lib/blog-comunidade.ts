import type { Guide } from './blog';

const U_FEATURES = 'https://docs.n8n.io/hosting/community-edition-features/';
const U_FAQ = 'https://docs.n8n.io/n8n-community-license/community-license/license-faq.md';
const U_LICENSE = 'https://github.com/n8n-io/n8n/blob/master/LICENSE.md';
const U_README = 'https://raw.githubusercontent.com/n8n-io/n8n/master/README.md';
const U_PRICING = 'https://n8n.io/pricing/';
const U_DOCKER = 'https://docs.n8n.io/hosting/installation/docker/';

const DOCKER_RUN = "docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n";

export const N8N_GRATIS_LICENCA: Guide = {
  slug: 'n8n-gratis-licenca',
  category: 'automacao',
  published: '2026-11-20',
  pt: {
    title: 'n8n grátis, com pegadinha: checagem de licença antes de usar',
    short: 'n8n grátis, com pegadinha',
    lead: 'Uma checagem de licença em perguntas simples, com o trecho do FAQ do n8n ao lado de cada resposta, o que a edição grátis tem e não tem, e o que passa a ser seu ao hospedar.',
    description: 'Onde o n8n é grátis, o que a licença Sustainable Use permite e não permite segundo o FAQ do próprio n8n, o que fica fora da edição Community, o que passa a ser seu ao hospedar e como instalar com Docker. Não é orientação jurídica.',
    facts: ['automação', 'n8n', 'licença'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Este guia não é orientação jurídica. Ele resume o que o FAQ de licença do n8n e o texto da licença dizem, conferidos em 20/11/2026. Caso de fronteira, contrato ou dúvida sobre o seu uso: pergunte ao n8n pelo e-mail `license@n8n.io`, que é o canal indicado no FAQ, ou a um advogado.' },
          { k: 'p', v: 'Nada foi executado. Não testei o comando: não tenho Docker nem conta no n8n aqui, então o comando de instalação está marcado como não executado. O FAQ vale para a versão auto-hospedada; a nuvem do n8n tem termos próprios. A página de recursos, a de preços e o FAQ mudam: reconfira. O guia não traz preço.' },
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
              'n8n: plataforma para automatizar fluxos entre aplicativos, com um editor visual (README do projeto).',
              'Edição Community: a edição grátis que você instala. A documentação diz: "This is what n8n runs without a license key." (é o que o n8n roda sem chave de licença).',
              'Auto-hospedar: rodar o n8n em um computador ou servidor seu.',
              'Nuvem do n8n: o n8n hospedado por eles, em plano pago ou em período de teste.',
              'Docker: programa que roda o n8n isolado dentro do seu computador, sem misturar com o resto do que você tem instalado.',
              'Licença Sustainable Use: a licença do n8n (versão 1.0). O README chama o modelo de "fair-code" (código disponível, com limites de uso).',
              'Licença paga (Business ou Enterprise): uma chave que libera os recursos pagos (página de preços).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Onde o n8n é grátis',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Instalado por você (Community): grátis e sem chave de licença, segundo a documentação.',
              'Na nuvem do n8n: a página de preços de 20/11/2026 mostra o teste ("Start free trial") e não lista um plano gratuito permanente. O teste da nuvem tem limite de 1.000 execuções e não pede cartão. O teste do plano Business dura 14 dias e pede cartão. Ausência na página não prova que nunca exista: reconfira.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'A checagem de licença, em perguntas',
        blocks: [
          { k: 'p', v: 'Respostas do FAQ de licença do n8n (versão auto-hospedada). Se o seu caso não está na tabela, não conclua nada: pergunte.' },
          {
            k: 'table',
            label: 'Pergunta, resposta e trecho do FAQ',
            head: ['Pergunta', 'O que o FAQ diz', 'Trecho'],
            rows: [
              ['Posso usar na minha empresa?', 'Pode', '"Use n8n community version to help run your business"'],
              ['Posso cobrar consultoria?', 'Pode', '"Charge your customers for training and consultancy services"'],
              ['Posso fazer automações para clientes na minha instância?', 'Pode, desde que os clientes não criem nem editem fluxos', '"Build automations for your clients on your instance, as long as your clients do not have the possibility to create or edit them."'],
              ['Posso hospedar o n8n para clientes montarem fluxos?', 'Não', '"Host n8n as a service and allow your clients to build workflows." (em "What you cannot do")'],
              ['Posso tirar a marca e oferecer o n8n como está?', 'Não', '"White-label n8n by removing our branding and offering n8n as is."'],
            ],
          },
          { k: 'p', v: 'O texto da licença (LICENSE.md, versão 1.0) limita o uso a fins internos do negócio, pessoais ou sem fins comerciais, e a distribuição a terceiros a casos gratuitos e sem fins comerciais. Leia o texto inteiro antes de decidir.' },
        ],
      },
      {
        n: '3',
        title: 'O que fica fora da edição Community',
        blocks: [
          { k: 'p', v: 'A página de recursos da Community lista como ausentes, entre outros: controle de versão com Git, login único (SSO, com SAML e LDAP), variáveis personalizadas, ambientes, segredos externos e projetos. Registrar a instância gratuitamente libera pastas, "debug in editor" e dados de execução personalizados. A lista muda: confira a página.' },
        ],
      },
      {
        n: '4',
        title: 'Instalar com Docker (confira na documentação)',
        blocks: [
          { k: 'p', v: 'O comando abaixo vem do README do n8n e exige Docker. Não executado: não tenho Docker aqui. A página de instalação com Docker mostra hoje uma variante: cria antes o volume com `docker volume create n8n_data`, usa a imagem `n8nio/n8n` e acrescenta variáveis de fuso horário. A própria página avisa que o conteúdo está desatualizado e recomenda o Docker Compose. Confira as duas fontes no dia, porque elas mudam.' },
          { k: 'code', label: 'Subir o n8n com Docker (terminal, não executado: confira na documentação)', text: DOCKER_RUN },
          { k: 'p', v: `O comando abre a porta 5678 e guarda os dados no volume \`n8n_data\`. O \`--rm\` remove o contêiner quando você o para, e os dados continuam no volume \`n8n_data\`. Depois, o editor abre em \`http://localhost:5678\`. Página de instalação: [docs.n8n.io/hosting/installation/docker](${U_DOCKER}).` },
        ],
      },
      {
        n: '5',
        title: 'O que passa a ser seu ao hospedar',
        blocks: [
          { k: 'p', v: 'Nossa leitura (dedução): quem auto-hospeda cuida do servidor. Isso inclui o custo da máquina, as atualizações do n8n e a cópia de segurança dos fluxos e dos dados. A documentação lida não lista esses custos, então este guia não dá valores.' },
        ],
      },
      {
        title: 'Quando olhar a nuvem ou uma licença paga',
        blocks: [
          {
            k: 'ul',
            items: [
              'Você não quer cuidar de servidor, atualização e backup.',
              'Você precisa de Git, SSO ou outro recurso que fica fora da edição Community.',
            ],
          },
          { k: 'p', v: `Planos, limites e termos estão na página de preços: [n8n.io/pricing](${U_PRICING}) (conferido em 20/11/2026). O guia não traz valores.` },
        ],
      },
      {
        title: 'Checklist antes de usar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Meu uso é interno, pessoal ou sem fins comerciais, ou está na lista do que o FAQ permite?',
              'Algum cliente vai criar ou editar fluxos na minha instância? Se sim, pare e pergunte.',
              'Preciso de Git, SSO ou outro recurso fora da Community?',
              'Quem vai atualizar e fazer backup do servidor?',
              'Se ainda houver dúvida: `license@n8n.io`.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `n8n, [Edição Community: recursos](${U_FEATURES}). n8n, [FAQ da licença](${U_FAQ}). n8n, [LICENSE.md (Sustainable Use License 1.0)](${U_LICENSE}). n8n, [README](${U_README}). n8n, [Preços](${U_PRICING}). n8n, [Instalação com Docker](${U_DOCKER}).` },
          { k: 'p', muted: true, v: 'Guia por Diego Arruda. Conteúdo educativo e independente.' },
        ],
      },
    ],
  },
  en: {
    title: 'n8n is free, with a catch: a license check before you use it',
    short: 'n8n is free, with a catch',
    lead: 'A license check in simple questions, with the n8n FAQ excerpt next to each answer, what the free edition has and does not have, and what becomes yours when you host it.',
    description: 'Where n8n is free, what the Sustainable Use license allows and does not allow according to the n8n FAQ itself, what is left out of the Community edition, what becomes yours when you host it, and how to install with Docker. Not legal advice.',
    facts: ['automation', 'n8n', 'license'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'This guide is not legal advice. It summarizes what the n8n license FAQ and the license text say, checked on November 20, 2026. For a borderline case, a contract or a doubt about your own use: ask n8n at `license@n8n.io`, which is the channel the FAQ points to, or ask a lawyer.' },
          { k: 'p', v: 'Nothing was run. I did not test the command: I have no Docker and no n8n account here, so the install command is marked as not run. The FAQ applies to the self-hosted version; n8n cloud has its own terms. The features page, the pricing page and the FAQ change: check again. This guide gives no prices.' },
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
              'n8n: a platform for automating workflows between apps, with a visual editor (project README).',
              'Community edition: the free edition you install. The documentation says: "This is what n8n runs without a license key."',
              'Self-hosting: running n8n on a computer or server of your own.',
              'n8n cloud: n8n hosted by them, on a paid plan or in a trial period.',
              'Docker: a program that runs n8n isolated inside your computer, without mixing it with everything else you have installed.',
              'Sustainable Use license: the n8n license (version 1.0). The README calls the model "fair-code" (code available, with limits on use).',
              'Paid license (Business or Enterprise): a key that unlocks the paid features (pricing page).',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'Where n8n is free',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Installed by you (Community): free and with no license key, according to the documentation.',
              'On n8n cloud: the pricing page on November 20, 2026 shows the trial ("Start free trial") and does not list a permanent free plan. The cloud trial has a limit of 1,000 executions and does not ask for a card. The Business plan trial lasts 14 days and asks for a card. Not being on the page does not prove it never exists: check again.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'The license check, in questions',
        blocks: [
          { k: 'p', v: 'Answers from the n8n license FAQ (self-hosted version). If your case is not in the table, do not conclude anything: ask.' },
          {
            k: 'table',
            label: 'Question, answer and FAQ excerpt',
            head: ['Question', 'What the FAQ says', 'Excerpt'],
            rows: [
              ['Can I use it in my company?', 'Yes', '"Use n8n community version to help run your business"'],
              ['Can I charge for consulting?', 'Yes', '"Charge your customers for training and consultancy services"'],
              ['Can I build automations for clients on my instance?', 'Yes, as long as the clients do not create or edit workflows', '"Build automations for your clients on your instance, as long as your clients do not have the possibility to create or edit them."'],
              ['Can I host n8n so clients build workflows?', 'No', '"Host n8n as a service and allow your clients to build workflows." (under "What you cannot do")'],
              ['Can I remove the branding and offer n8n as is?', 'No', '"White-label n8n by removing our branding and offering n8n as is."'],
            ],
          },
          { k: 'p', v: 'The license text (LICENSE.md, version 1.0) limits use to internal business purposes, personal or non-commercial purposes, and distribution to third parties to free, non-commercial cases. Read the whole text before you decide.' },
        ],
      },
      {
        n: '3',
        title: 'What is left out of the Community edition',
        blocks: [
          { k: 'p', v: 'The Community features page lists as absent, among others: version control with Git, single sign-on (SSO, with SAML and LDAP), custom variables, environments, external secrets and projects. Registering the instance for free unlocks folders, "debug in editor" and custom execution data. The list changes: check the page.' },
        ],
      },
      {
        n: '4',
        title: 'Install with Docker (check the documentation)',
        blocks: [
          { k: 'p', v: 'The command below comes from the n8n README and requires Docker. Not run: I do not have Docker here. The Docker installation page today shows a variant: it first creates the volume with `docker volume create n8n_data`, uses the image `n8nio/n8n` and adds time zone variables. The page itself warns that its content is out of date and recommends Docker Compose. Check both sources on the day, because they change.' },
          { k: 'code', label: 'Start n8n with Docker (terminal, not run: check the documentation)', text: DOCKER_RUN },
          { k: 'p', v: `The command opens port 5678 and keeps the data in the \`n8n_data\` volume. The \`--rm\` flag removes the container when you stop it, and the data stays in the \`n8n_data\` volume. After that, the editor opens at \`http://localhost:5678\`. Installation page: [docs.n8n.io/hosting/installation/docker](${U_DOCKER}).` },
        ],
      },
      {
        n: '5',
        title: 'What becomes yours when you host it',
        blocks: [
          { k: 'p', v: 'Our reading (inference): whoever self-hosts takes care of the server. That includes the cost of the machine, the n8n updates and the backup of the workflows and data. The documentation we read does not list these costs, so this guide gives no figures.' },
        ],
      },
      {
        title: 'When to look at the cloud or a paid license',
        blocks: [
          {
            k: 'ul',
            items: [
              'You do not want to take care of a server, updates and backups.',
              'You need Git, SSO or another feature that is left out of the Community edition.',
            ],
          },
          { k: 'p', v: `Plans, limits and terms are on the pricing page: [n8n.io/pricing](${U_PRICING}) (checked on November 20, 2026). This guide gives no prices.` },
        ],
      },
      {
        title: 'Checklist before you use it',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Is my use internal, personal or non-commercial, or is it on the list of what the FAQ allows?',
              'Will any client create or edit workflows on my instance? If so, stop and ask.',
              'Do I need Git, SSO or another feature outside the Community edition?',
              'Who will update and back up the server?',
              'If there is still doubt: `license@n8n.io`.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `n8n, [Community edition: features](${U_FEATURES}). n8n, [License FAQ](${U_FAQ}). n8n, [LICENSE.md (Sustainable Use License 1.0)](${U_LICENSE}). n8n, [README](${U_README}). n8n, [Pricing](${U_PRICING}). n8n, [Docker installation](${U_DOCKER}).` },
          { k: 'p', muted: true, v: 'Guide by Diego Arruda. Educational and independent content.' },
        ],
      },
    ],
  },
};
