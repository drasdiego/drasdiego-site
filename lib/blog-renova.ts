import type { Guide } from './blog';

const U_RENOVA = 'https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification';
const U_FAQ = 'https://learn.microsoft.com/en-us/credentials/certifications/renew-your-microsoft-certification-faq';
const U_POLITICA = 'https://learn.microsoft.com/en-us/credentials/support/certification-expiration-policy';
const U_LISTA = 'https://aka.ms/CertRenewalList';

export const RENOVA_CERTIFICACAO: Guide = {
  slug: 'renovar-certificacao-microsoft',
  category: 'carreira',
  keyword: 'RENOVA',
  published: '2026-11-20',
  pt: {
    title: 'Renovar certificação Microsoft é grátis: o caminho, os prazos e o que fazer se vencer',
    short: 'Renovar certificação Microsoft',
    lead: 'A renovação das certificações associate, expert e specialty da Microsoft é gratuita. O caminho, os prazos e o que fazer se o prazo passar.',
    description: 'Como renovar uma certificação Microsoft associate, expert ou specialty de graça: a avaliação on-line, a janela de seis meses, a extensão de um ano, as tentativas, o idioma e o que acontece se a certificação vencer.',
    facts: ['carreira', 'microsoft', 'certificação'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Os fatos vêm de três páginas oficiais do Microsoft Learn (renovação, perguntas frequentes e política de expiração), conferidas em 18/11/2026. As páginas têm datas de atualização antigas (entre julho de 2024 e janeiro de 2025) e o catálogo de certificações muda: reconfira antes de agir. Eu não testei o processo, porque ele exige uma conta e uma certificação reais. Este guia não tem comandos para copiar. O que vale para a sua certificação aparece no seu perfil do Microsoft Learn: confira lá e na documentação, nos links das fontes. O guia não tem vínculo com a Microsoft.' },
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
              'Associate, expert e specialty: os níveis de certificação da Microsoft que têm renovação. Segundo a política de expiração, as certificações de função (associate e expert) e as de especialidade valem por um ano a partir da conclusão dos requisitos.',
              'Fundamentals: as certificações de fundamentos. Segundo a Microsoft, elas não expiram, então não têm renovação.',
              'Avaliação de renovação: uma avaliação on-line, curta, sem fiscal e com consulta, feita no Microsoft Learn.',
              'Janela de elegibilidade: o período de seis meses antes do vencimento em que a avaliação fica disponível.',
              'UTC: o horário de referência. A Microsoft informa as datas e os horários de expiração em UTC.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'O caminho, segundo a Microsoft',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Conecte os perfis: a página de renovação manda conectar o seu perfil do Microsoft Learn ao perfil de certificação e procurar o botão de renovar. Ela tem um botão "Check my eligibility in profile" para ver se você já está elegível.',
              'Atualize o conteúdo: a página cita módulos gratuitos, no seu ritmo, na página de renovação da certificação.',
              'Passe na avaliação antes do vencimento: é gratuita, on-line, sem fiscal e com consulta. Quando você ficar elegível, a Microsoft diz que enviará um e-mail lembrando de renovar, se houver e-mail no perfil do Learn e você tiver aceitado as comunicações.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'As regras em um olhar',
        blocks: [
          { k: 'p', v: 'Todas as linhas abaixo vêm das três páginas das fontes.' },
          {
            k: 'ul',
            items: [
              'Custo: a renovação é gratuita para quem tem certificação associate, specialty ou expert válida.',
              'Duração: a avaliação leva cerca de 45 minutos, segundo o FAQ.',
              'Quando: qualquer momento dentro da janela de seis meses antes do vencimento.',
              'Se você passar: a validade é estendida em um ano a partir da data de vencimento, e não do dia da prova. Fazer cedo não faz você perder tempo.',
              'Tentativas: não há limite. Se não passar, dá para tentar de novo logo em seguida; depois da segunda tentativa, é preciso esperar pelo menos 24 horas entre as seguintes. Passe antes de vencer.',
              'Idioma: segundo o FAQ, as avaliações de renovação ficam nos mesmos idiomas dos exames correspondentes. Não conte com português sem conferir o exame da sua certificação.',
              'Disponibilidade: o FAQ diz que a opção de renovação existe para certificações associate, specialty e expert disponíveis há mais de seis meses, e aponta uma lista no blog de renovação. Confira na documentação (link nas fontes).',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'O que fazer hoje',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Abra o seu perfil no Microsoft Learn e veja a data de vencimento de cada certificação.',
              'Use o botão "Check my eligibility in profile" para ver se você já está dentro da janela.',
              'Anote a data em que a janela abre (seis meses antes do vencimento) e uma data limite para fazer a avaliação, com folga para tentar de novo: a primeira repetição pode ser imediata e, depois da segunda tentativa, é preciso esperar pelo menos 24 horas.',
              'Faça os módulos gratuitos de preparação da página de renovação da sua certificação.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'Se a certificação vencer',
        blocks: [
          { k: 'p', v: 'A política de expiração diz que, depois que a certificação expira, você não consegue mais renová-la e precisa conquistá-la de novo, passando nos exames exigidos. Por isso o prazo importa mais do que a nota.' },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Renovar associate, expert e specialty é gratuito, on-line, sem fiscal e com consulta.',
              'A avaliação abre seis meses antes do vencimento e leva cerca de 45 minutos.',
              'Passou: mais um ano, contado a partir da data de vencimento.',
              'Sem limite de tentativas, com espera de 24 horas depois da segunda.',
              'Venceu: é preciso passar no exame de novo. Fundamentals não vencem.',
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
              'Mito: "renovar custa outra prova paga". Verdade: a Microsoft diz que a renovação é gratuita para certificações associate, specialty e expert válidas.',
              'Mito: "se eu renovar cedo, perco tempo de validade". Verdade: a validade é estendida em um ano a partir da data de vencimento.',
              'Mito: "posso renovar depois que vencer". Verdade: depois de expirada, é preciso passar de novo nos exames exigidos.',
              'Mito: "Fundamentals também precisa renovar". Verdade: a Microsoft diz que elas não expiram.',
            ],
          },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', muted: true, v: `Microsoft Learn, [renovar a sua certificação](${U_RENOVA}). Microsoft Learn, [perguntas frequentes sobre a renovação](${U_FAQ}). Microsoft Learn, [política de expiração de certificações](${U_POLITICA}). [Lista de certificações com renovação](${U_LISTA}) (blog, citado pelo FAQ; não aberto pelo autor).` },
          { k: 'p', muted: true, v: 'Conteúdo educativo e independente, sem vínculo com a Microsoft.' },
        ],
      },
    ],
  },
  en: {
    title: 'Renewing a Microsoft certification is free: the path, the deadlines, and what to do if it expires',
    short: 'Renew Microsoft certification',
    lead: 'Renewing Microsoft associate, expert and specialty certifications is free. The path, the deadlines and what to do if the deadline passes.',
    description: 'How to renew a Microsoft associate, expert or specialty certification for free: the online assessment, the six month window, the one year extension, the attempts, the language and what happens if the certification expires.',
    facts: ['career', 'microsoft', 'certification'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'The facts come from three official Microsoft Learn pages (renewal, frequently asked questions and expiration policy), checked on November 18, 2026. The pages have old update dates (between July 2024 and January 2025) and the certification catalog changes: check again before acting. I did not test the process, because it requires a real account and a real certification. This guide has no commands to copy. What applies to your certification appears in your Microsoft Learn profile: check it there and in the documentation, through the source links. This guide is not affiliated with Microsoft.' },
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
              'Associate, expert and specialty: the Microsoft certification levels that can be renewed. According to the expiration policy, role based certifications (associate and expert) and specialty certifications are valid for one year from the date the requirements are completed.',
              'Fundamentals: the fundamentals certifications. According to Microsoft, they do not expire, so they have no renewal.',
              'Renewal assessment: an online assessment, short, unproctored and open book, taken on Microsoft Learn.',
              'Eligibility window: the six month period before expiration during which the assessment is available.',
              'UTC: the reference time. Microsoft gives expiration dates and times in UTC.',
            ],
          },
        ],
      },
      {
        n: '1',
        title: 'The path, according to Microsoft',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Connect the profiles: the renewal page tells you to connect your Microsoft Learn profile to your certification profile and look for the renew button. It has a "Check my eligibility in profile" button to see whether you are already eligible.',
              'Refresh the content: the page mentions free, self paced modules on the certification renewal page.',
              'Pass the assessment before it expires: it is free, online, unproctored and open book. When you become eligible, Microsoft says it will send an email reminding you to renew, if there is an email on your Learn profile and you accepted communications.',
            ],
          },
        ],
      },
      {
        n: '2',
        title: 'The rules at a glance',
        blocks: [
          { k: 'p', v: 'All the lines below come from the three source pages.' },
          {
            k: 'ul',
            items: [
              'Cost: renewal is free for anyone holding a valid associate, specialty or expert certification.',
              'Duration: the assessment takes about 45 minutes, according to the FAQ.',
              'When: any time within the six month window before expiration.',
              'If you pass: validity is extended by one year from the expiration date, not from the day of the test. Taking it early does not make you lose time.',
              'Attempts: there is no limit. If you do not pass, you can try again right away; after the second attempt, you must wait at least 24 hours between the following ones. Pass before it expires.',
              'Language: according to the FAQ, renewal assessments are offered in the same languages as the corresponding exams. Do not count on Portuguese without checking the exam for your certification.',
              'Availability: the FAQ says the renewal option exists for associate, specialty and expert certifications that have been available for more than six months, and points to a list on the renewal blog. Check the documentation (link in the sources).',
            ],
          },
        ],
      },
      {
        n: '3',
        title: 'What to do today',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Open your Microsoft Learn profile and check the expiration date of each certification.',
              'Use the "Check my eligibility in profile" button to see whether you are already inside the window.',
              'Note the date the window opens (six months before expiration) and a deadline to take the assessment, with room to try again: the first retry can be immediate and, after the second attempt, you must wait at least 24 hours.',
              'Take the free preparation modules on the renewal page for your certification.',
            ],
          },
        ],
      },
      {
        n: '4',
        title: 'If the certification expires',
        blocks: [
          { k: 'p', v: 'The expiration policy says that, once the certification expires, you can no longer renew it and must earn it again by passing the required exams. That is why the deadline matters more than the score.' },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          {
            k: 'ol',
            start: 1,
            items: [
              'Renewing associate, expert and specialty certifications is free, online, unproctored and open book.',
              'The assessment opens six months before expiration and takes about 45 minutes.',
              'Passed: one more year, counted from the expiration date.',
              'No limit on attempts, with a 24 hour wait after the second one.',
              'Expired: you must pass the exam again. Fundamentals do not expire.',
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
              'Myth: "renewing costs another paid exam". Fact: Microsoft says renewal is free for valid associate, specialty and expert certifications.',
              'Myth: "if I renew early, I lose validity time". Fact: validity is extended by one year from the expiration date.',
              'Myth: "I can renew after it expires". Fact: once expired, you must pass the required exams again.',
              'Myth: "Fundamentals also needs renewal". Fact: Microsoft says they do not expire.',
            ],
          },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', muted: true, v: `Microsoft Learn, [renew your certification](${U_RENOVA}). Microsoft Learn, [renewal frequently asked questions](${U_FAQ}). Microsoft Learn, [certification expiration policy](${U_POLITICA}). [List of certifications with renewal](${U_LISTA}) (blog, cited by the FAQ; not opened by the author).` },
          { k: 'p', muted: true, v: 'Educational and independent content, not affiliated with Microsoft.' },
        ],
      },
    ],
  },
};
