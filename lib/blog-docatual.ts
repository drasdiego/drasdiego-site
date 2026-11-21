import type { Guide } from './blog';

export const DOCUMENTACAO_ATUAL: Guide = {
  slug: 'documentacao-atual',
  category: 'claude-code',
  published: '2026-11-21',
  pt: {
    title: 'Menos API inventada: ponha a documentação atual no pedido',
    short: 'Menos API inventada',
    lead: 'O pedido pronto para a IA usar a documentação atual da biblioteca, como liberar o domínio, o llms.txt, o Context7 como segunda opção e a conferência final.',
    description: 'Um pedido pronto com o link da documentação da versão que você usa, como liberar o domínio no Claude Code, o que é o llms.txt, o Context7 (Upstash, licença MIT no servidor MCP) e a checagem de rodar o código e os testes.',
    facts: ['claude code', 'documentação', 'api'],
    sections: [
      {
        title: 'Leia antes: o limite deste guia',
        note: true,
        blocks: [
          { k: 'p', v: 'Sobre o Context7: o pedido de documentação passa pelo serviço do Context7. O README diz que os componentes de apoio (API, motor de parsing e de rastreamento) são privados e não fazem parte do repositório, e que a licença MIT vale para o servidor MCP. Não use o Context7 com código, nomes de projeto ou dados confidenciais. O README também avisa que não garante a exatidão, a completude nem a segurança da documentação de bibliotecas.' },
          { k: 'p', v: 'Testado no Mac (18/11/2026): o índice `llms.txt` do Claude Code abre (comando da seção 3), um pedido simples ao Claude Code para ler essa página funcionou, e o pacote `ctx7` existe no npm (versão 0.12.2, licença MIT, mantido por Upstash). Não executado: a instalação do Context7 (`npx ctx7 setup`), porque ela baixa e roda um pacote de terceiros e altera configuração. Está marcada como confira na documentação. O guia não afirma que isso elimina o erro: reduz, e você confere.' },
        ],
      },
      {
        n: '0',
        title: 'O que é cada coisa',
        blocks: [
          { k: 'ol', items: ['API: a lista de funções que uma biblioteca deixa você chamar no seu código.', 'Biblioteca: código pronto que o seu projeto usa. Ela muda de versão e de funções.', 'Documentação atual: a página oficial da versão que você usa.', 'llms.txt: um arquivo em Markdown, proposto por Jeremy Howard (llmstxt.org), que um site publica para dar a agentes de IA um índice do conteúdo. Não é padrão formal.', 'MCP: o jeito de conectar o Claude Code a ferramentas externas. O Context7 é um servidor MCP.'], start: 1 },
        ],
      },
      {
        n: '1',
        title: 'Por que a IA inventa função',
        blocks: [
          { k: 'p', v: 'O README do Context7, um projeto que vende essa solução, descreve o problema: "LLMs rely on outdated or generic information about the libraries you use." (a IA se apoia em informação desatualizada ou genérica sobre as bibliotecas que você usa) e cita "Hallucinated APIs that don\'t even exist" (APIs alucinadas, que nem existem). Trate como a explicação de um projeto interessado, não como medida da frequência do erro.' },
        ],
      },
      {
        n: '2',
        title: 'O pedido pronto para copiar',
        blocks: [
          { k: 'p', v: 'A documentação de boas práticas do Claude Code diz: "Give URLs for documentation and API references." (dê URLs de documentação e referências de API). Cole o link da página da versão que você usa.' },
          { k: 'code', label: 'Pedido com o link da documentação (modelo)', text: "Vou usar a biblioteca [nome] na versão [número da versão].\nAntes de escrever código, leia esta página da documentação oficial: [LINK DA DOCUMENTAÇÃO DA SUA VERSÃO]\nUse só funções que apareçam nessa página. Para cada função que usar, cite o nome da seção da documentação onde ela aparece. Se não achar a função na página, diga isso em vez de inventar.\nDepois, rode o código e os testes e me mostre o resultado." },
          { k: 'code', label: 'Pedido preenchido (EXEMPLO)', text: "Vou usar a biblioteca pandas na versão 2.2.\nAntes de escrever código, leia esta página da documentação oficial: https://pandas.pydata.org/pandas-docs/version/2.2/\nUse só funções que apareçam nessa página. Para cada função que usar, cite o nome da seção da documentação onde ela aparece. Se não achar a função na página, diga isso em vez de inventar.\nDepois, rode o código e os testes e me mostre o resultado." },
          { k: 'p', v: 'O exemplo é só ilustração (EXEMPLO): troque pelo nome, pela versão e pelo link reais da sua biblioteca. Mande a IA ler uma seção específica quando a página for grande: a ferramenta de busca do Claude Code (WebFetch) lê até 100.000 caracteres por chamada e roda um prompt de extração, então a documentação a chama de "lossy by design" (com perdas por desenho).' },
        ],
      },
      {
        n: '3',
        title: 'Passo a passo: liberar o domínio e achar o llms.txt',
        blocks: [
          { k: 'ol', items: ['O Claude Code busca a página com a ferramenta WebFetch, que pede permissão por padrão. Para liberar um domínio que você usa sempre, use `/permissions` e adicione uma regra no formato do exemplo. Confira na documentação a sintaxe atual:'], start: 1 },
          { k: 'code', label: 'Regra de permissão para um domínio (confira na documentação)', text: "WebFetch(domain:code.claude.com)" },
          { k: 'ol', items: ['Procure o `llms.txt` do site da documentação (em geral, `endereço-do-site/llms.txt`). Nem todo site tem. O do Claude Code existe; este comando abre o começo dele (testado):'], start: 2 },
          { k: 'code', label: 'Ver o índice llms.txt da documentação do Claude Code (terminal, testado)', text: "curl -s https://code.claude.com/docs/llms.txt | head -5" },
          { k: 'p', v: 'O resultado começa com `# Claude Code Docs`. Se a biblioteca que você usa tiver um arquivo parecido, cole o link dele no pedido.' },
        ],
      },
      {
        n: '4',
        title: 'Segunda opção: o Context7',
        blocks: [
          { k: 'p', v: 'Context7: projeto da Upstash, licença MIT (no servidor MCP; o serviço de busca é privado). O README diz que ele puxa "up-to-date, version-specific documentation and code examples straight from the source" (documentação atual, da versão, direto da fonte) para o contexto do agente. Seus pedidos passam pelo serviço do Context7: não envie nada confidencial.' },
          { k: 'ol', items: ['Confira a instalação na documentação do projeto. O README cita o comando abaixo, que exige Node.js 22.13 ou mais novo. O comando autentica você por OAuth no serviço do Context7 e gera uma chave de API, ou seja, cria um vínculo com uma conta nesse serviço. Não executado:'], start: 1 },
          { k: 'code', label: 'Instalar o Context7 (terminal, não executado: confira na documentação)', text: "npx ctx7 setup --claude" },
          { k: 'ol', items: ['Depois de instalado, peça assim (a frase "use context7" é a forma documentada de acionar):'], start: 2 },
          { k: 'code', label: 'Pedido com o Context7 (EXEMPLO)', text: "Mostre como filtrar linhas em pandas 2.2. use context7" },
          { k: 'p', v: 'README: [github.com/upstash/context7](https://github.com/upstash/context7). O README recomenda uma chave de API gratuita para limites maiores de uso.' },
        ],
      },
      {
        n: '5',
        title: 'Conferir sempre',
        blocks: [
          { k: 'ol', items: ['Rode o código e os testes. Documentação atual reduz o erro, mas não elimina (nossa leitura): o próprio Context7 diz que não garante a exatidão.', 'Abra a página oficial da função que a IA usou e confira o nome, os parâmetros e a versão.', 'Se a IA citou uma seção que você não acha, peça a ela o link exato.'], start: 1 },
        ],
      },
      {
        title: 'Resumo para guardar',
        blocks: [
          { k: 'ol', items: ['A IA pode usar informação velha e inventar função (explicação do Context7).', 'Cole no pedido o link da documentação da sua versão.', 'O Claude Code busca a página, com a sua permissão.', 'O llms.txt é um índice feito para IA, quando o site tem.', 'O Context7 é uma segunda opção: licença MIT no servidor MCP, serviço privado.', 'Sempre rode o código e os testes.'], start: 1 },
        ],
      },
      {
        title: 'Fontes',
        blocks: [
          { k: 'p', v: 'Upstash, README do Context7 (MIT): [https://github.com/upstash/context7](https://github.com/upstash/context7)', muted: true },
          { k: 'p', v: 'Claude Code, boas práticas: [https://code.claude.com/docs/en/best-practices.md](https://code.claude.com/docs/en/best-practices.md)', muted: true },
          { k: 'p', v: 'Claude Code, referência de ferramentas (WebFetch): [https://code.claude.com/docs/en/tools-reference.md](https://code.claude.com/docs/en/tools-reference.md)', muted: true },
          { k: 'p', v: 'Claude Code, índice da documentação (llms.txt): [https://code.claude.com/docs/llms.txt](https://code.claude.com/docs/llms.txt)', muted: true },
          { k: 'p', v: 'llmstxt.org: [https://llmstxt.org/](https://llmstxt.org/)', muted: true },
        ],
      },
    ],
  },
  en: {
    title: 'Fewer invented APIs: put current docs in your prompt',
    short: 'Fewer invented APIs',
    lead: 'The ready-made request for the AI to use the current documentation of the library, how to allow the domain, llms.txt, Context7 as a second option and the final check.',
    description: 'A ready-made request with the link to the documentation of the version you use, how to allow the domain in Claude Code, what llms.txt is, Context7 (Upstash, MIT license on the MCP server) and the check of running the code and the tests.',
    facts: ['claude code', 'documentation', 'api'],
    sections: [
      {
        title: 'Read first: the limits of this guide',
        note: true,
        blocks: [
          { k: 'p', v: 'About Context7: the documentation request goes through the Context7 service. The README says the supporting components (API, parsing engine and crawling engine) are private and are not part of the repository, and that the MIT license applies to the MCP server. Do not use Context7 with code, project names or confidential data. The README also warns that it does not guarantee the accuracy, completeness or security of library documentation.' },
          { k: 'p', v: 'Tested on a Mac (11/18/2026): the Claude Code `llms.txt` index opens (command in section 3), a simple request to Claude Code to read that page worked, and the `ctx7` package exists on npm (version 0.12.2, MIT license, maintained by Upstash). Not executed: the Context7 installation (`npx ctx7 setup`), because it downloads and runs a third-party package and changes configuration. It is marked as check the documentation. This guide does not claim that this eliminates the error: it reduces it, and you check.' },
        ],
      },
      {
        n: '0',
        title: 'What each thing is',
        blocks: [
          { k: 'ol', items: ['API: the list of functions that a library lets you call in your code.', 'Library: ready-made code that your project uses. It changes versions and functions.', 'Current documentation: the official page of the version you use.', 'llms.txt: a Markdown file, proposed by Jeremy Howard (llmstxt.org), that a site publishes to give AI agents an index of its content. It is not a formal standard.', 'MCP: the way to connect Claude Code to external tools. Context7 is an MCP server.'], start: 1 },
        ],
      },
      {
        n: '1',
        title: 'Why the AI invents functions',
        blocks: [
          { k: 'p', v: 'The Context7 README, a project that sells this solution, describes the problem: "LLMs rely on outdated or generic information about the libraries you use." (the AI relies on outdated or generic information about the libraries you use) and mentions "Hallucinated APIs that don\'t even exist" (hallucinated APIs that do not even exist). Treat it as the explanation of an interested project, not as a measure of how often the error happens.' },
        ],
      },
      {
        n: '2',
        title: 'The ready-made request to copy',
        blocks: [
          { k: 'p', v: 'The Claude Code best practices documentation says: "Give URLs for documentation and API references." Paste the link to the page of the version you use.' },
          { k: 'code', label: 'Request with the documentation link (template)', text: "Vou usar a biblioteca [nome] na versão [número da versão].\nAntes de escrever código, leia esta página da documentação oficial: [LINK DA DOCUMENTAÇÃO DA SUA VERSÃO]\nUse só funções que apareçam nessa página. Para cada função que usar, cite o nome da seção da documentação onde ela aparece. Se não achar a função na página, diga isso em vez de inventar.\nDepois, rode o código e os testes e me mostre o resultado." },
          { k: 'code', label: 'Filled-in request (EXAMPLE)', text: "Vou usar a biblioteca pandas na versão 2.2.\nAntes de escrever código, leia esta página da documentação oficial: https://pandas.pydata.org/pandas-docs/version/2.2/\nUse só funções que apareçam nessa página. Para cada função que usar, cite o nome da seção da documentação onde ela aparece. Se não achar a função na página, diga isso em vez de inventar.\nDepois, rode o código e os testes e me mostre o resultado." },
          { k: 'p', v: 'The example is only an illustration (EXAMPLE): replace it with the real name, version and link of your library. The request is in Portuguese in the example, but the result does not change in other languages. Tell the AI to read a specific section when the page is large: the Claude Code fetch tool (WebFetch) reads up to 100,000 characters per call and runs an extraction prompt, so the documentation calls it "lossy by design".' },
        ],
      },
      {
        n: '3',
        title: 'Step by step: allow the domain and find llms.txt',
        blocks: [
          { k: 'ol', items: ['Claude Code fetches the page with the WebFetch tool, which asks for permission by default. To allow a domain you always use, run `/permissions` and add a rule in the format of the example. Check the documentation for the current syntax:'], start: 1 },
          { k: 'code', label: 'Permission rule for a domain (check the documentation)', text: "WebFetch(domain:code.claude.com)" },
          { k: 'ol', items: ['Look for the `llms.txt` of the documentation site (usually, `site-address/llms.txt`). Not every site has one. The Claude Code one exists; this command shows the start of it (tested):'], start: 2 },
          { k: 'code', label: 'See the llms.txt index of the Claude Code documentation (terminal, tested)', text: "curl -s https://code.claude.com/docs/llms.txt | head -5" },
          { k: 'p', v: 'The result starts with `# Claude Code Docs`. If the library you use has a similar file, paste its link into the request.' },
        ],
      },
      {
        n: '4',
        title: 'Second option: Context7',
        blocks: [
          { k: 'p', v: 'Context7: a project by Upstash, MIT license (on the MCP server; the search service is private). The README says it pulls "up-to-date, version-specific documentation and code examples straight from the source" into the agent context. Your requests go through the Context7 service: do not send anything confidential.' },
          { k: 'ol', items: ['Check the installation in the project documentation. The README mentions the command below, which requires Node.js 22.13 or newer. The command authenticates you through OAuth on the Context7 service and generates an API key, that is, it creates a link to an account on that service. Not executed:'], start: 1 },
          { k: 'code', label: 'Install Context7 (terminal, not executed: check the documentation)', text: "npx ctx7 setup --claude" },
          { k: 'ol', items: ['After it is installed, ask like this (the phrase "use context7" is the documented way to trigger it):'], start: 2 },
          { k: 'code', label: 'Request with Context7 (EXAMPLE)', text: "Mostre como filtrar linhas em pandas 2.2. use context7" },
          { k: 'p', v: 'README: [github.com/upstash/context7](https://github.com/upstash/context7). The README recommends a free API key for higher usage limits.' },
        ],
      },
      {
        n: '5',
        title: 'Always check',
        blocks: [
          { k: 'ol', items: ['Run the code and the tests. Current documentation reduces the error but does not eliminate it (our reading): Context7 itself says it does not guarantee accuracy.', 'Open the official page of the function the AI used and check the name, the parameters and the version.', 'If the AI cited a section you cannot find, ask it for the exact link.'], start: 1 },
        ],
      },
      {
        title: 'Keep this in mind',
        blocks: [
          { k: 'ol', items: ['The AI can use old information and invent a function (Context7 explanation).', 'Paste the link to the documentation of your version into the request.', 'Claude Code fetches the page, with your permission.', 'llms.txt is an index made for AI, when the site has one.', 'Context7 is a second option: MIT license on the MCP server, private service.', 'Always run the code and the tests.'], start: 1 },
        ],
      },
      {
        title: 'Sources',
        blocks: [
          { k: 'p', v: 'Upstash, Context7 README (MIT): [https://github.com/upstash/context7](https://github.com/upstash/context7)', muted: true },
          { k: 'p', v: 'Claude Code, best practices: [https://code.claude.com/docs/en/best-practices.md](https://code.claude.com/docs/en/best-practices.md)', muted: true },
          { k: 'p', v: 'Claude Code, tools reference (WebFetch): [https://code.claude.com/docs/en/tools-reference.md](https://code.claude.com/docs/en/tools-reference.md)', muted: true },
          { k: 'p', v: 'Claude Code, documentation index (llms.txt): [https://code.claude.com/docs/llms.txt](https://code.claude.com/docs/llms.txt)', muted: true },
          { k: 'p', v: 'llmstxt.org: [https://llmstxt.org/](https://llmstxt.org/)', muted: true },
        ],
      },
    ],
  },
};
