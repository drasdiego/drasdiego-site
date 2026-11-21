import type { Guide } from './blog';

export const SITE_MENOS_CARA_DE_IA: Guide = {
  slug: 'site-menos-cara-de-ia',
  category: 'claude-code',
  published: '2026-11-21',
  pt: {
    title: "Site com menos cara de IA: um pedido com o seu gosto",
    short: "Site com menos cara de IA",
    lead: "Um pedido pronto para copiar, com a direção de gosto que a Anthropic recomenda (fonte, cor e fundo), como usar um print de referência e como conferir o resultado no navegador.",
    description: "Por que sites feitos por IA tendem a parecer iguais segundo a Anthropic, um pedido pronto com direção de fonte, cor e fundo, como usar um print de referência e a skill frontend-design, com autor e licença.",
    facts: [
      "claude code",
      "design",
      "frontend",
    ],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          {
            k: "p",
            v: "Este guia não promete que o site fique sem a cara de IA. Ele mostra o que a Anthropic descreve e recomenda, e dá um pedido para você aplicar o seu gosto. O resultado depende do seu pedido, do projeto e do modelo.",
          },
          {
            k: "p",
            v: "Nada aqui foi executado: o guia é um texto de pedido e um fluxo de conferência. A instalação da skill ficou como \"confira na documentação\", porque as fontes lidas não trazem o comando. Os exemplos de fonte, cor e fundo da seção 3 são \"EXEMPLO nosso\", não exigência da Anthropic.",
          },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          {
            k: "ol",
            items: [
              "Direção de design: as escolhas visuais que você decide antes de pedir: tipografia (a fonte), paleta (as cores), fundo e movimento.",
              "Tipografia: a escolha das fontes. A skill diz que ela carrega a personalidade da página.",
              "Skill: segundo a Anthropic, um documento com instruções, restrições e conhecimento de domínio que o Claude carrega quando precisa.",
              "Print de referência: uma captura de tela de um site que você admira, colada no pedido.",
              "frontend-design: uma skill da Anthropic para interfaces.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "O que a Anthropic descreve",
        blocks: [
          {
            k: "p",
            v: "No artigo de 12/11/2025, a Anthropic explica que, sem direção, o modelo tende a escolhas seguras: \"Safe design choices ... dominate web training data.\" (escolhas de design seguras dominam os dados de treino da web).",
          },
          {
            k: "p",
            v: "Os exemplos do artigo são \"Inter fonts, purple gradients on white backgrounds, and minimal animations.\" (fonte Inter, degradês roxos em fundo branco e animações mínimas). O SKILL.md de hoje lista outros clichês, então trate esses exemplos como os do artigo, não como regra atual.",
          },
          {
            k: "p",
            v: "As recomendações do artigo: \"Pick one distinctive font, use it decisively.\" (escolha uma fonte marcante e use com decisão); \"Dominant colors with sharp accents outperform timid, evenly-distributed palettes.\" (cores dominantes com acentos fortes rendem mais que paletas tímidas); e criar atmosfera e profundidade em vez de cor sólida no fundo.",
          },
        ],
      },
      {
        n: "2",
        title: "O pedido pronto para copiar",
        blocks: [
          {
            k: "p",
            v: "Troque o que está entre colchetes pelo que você decidiu. Se ainda não sabe, escolha por gosto: abra três sites que você acha bonitos e anote o que repete neles.",
          },
          {
            k: "code",
            label: "Pedido com os seus espaços para preencher (modelo)",
            text: "Crie [o que você quer: página inicial de ... / painel de ...].\n\nDireção de design:\n- Fonte: uma fonte marcante para os títulos ([descreva o jeito: serifada de caráter forte, geométrica, manuscrita...]) e uma fonte simples para o texto. Use cada uma com decisão.\n- Cor: uma cor dominante ([sua cor]) com acentos fortes em [cor de acento]. Evite paleta tímida e igualmente distribuída.\n- Fundo: com atmosfera e profundidade ([textura, camadas, sombras suaves]), sem cor sólida chapada.\n- Referência: imite o clima geral do print que colei, sem copiar o design de nenhuma marca.\n\nQuando terminar, abra no navegador, tire um print do resultado, compare com a referência e liste as diferenças.",
          },
          {
            k: "code",
            label: "Pedido preenchido (EXEMPLO)",
            text: "Crie a página inicial de uma padaria de bairro chamada Padaria Sol.\n\nDireção de design:\n- Fonte: uma fonte serifada de caráter forte nos títulos e uma fonte simples no texto. Use cada uma com decisão.\n- Cor: laranja queimado como cor dominante, com acentos fortes em verde-limão. Evite paleta tímida.\n- Fundo: com textura de papel e camadas de sombra suave, sem cor chapada.\n- Referência: imite o clima geral do print que colei, sem copiar o design de nenhuma marca.\n\nQuando terminar, abra no navegador, tire um print do resultado, compare com a referência e liste as diferenças.",
          },
          {
            k: "p",
            v: "O exemplo é inventado por nós (EXEMPLO): a padaria não existe e as escolhas são só ilustração.",
          },
        ],
      },
      {
        n: "3",
        title: "Passo a passo: do pedido ao ajuste",
        blocks: [
          {
            k: "ol",
            items: [
              "Decida as três coisas: uma fonte marcante, uma cor dominante com acentos e um fundo com profundidade.",
              "Copie o pedido da seção 2 e preencha os espaços.",
              "Cole o print de referência no pedido. A documentação do Claude Code diz que você pode colar imagens direto no pedido (por exemplo, com Ctrl+V) e usa como exemplo implementar um design a partir de um print e compará-lo com o original.",
              "Envie o pedido. Quando o Claude terminar, abra o resultado no navegador.",
              "Compare com a referência e peça o ajuste do que não ficou com a sua cara, uma coisa por vez: fonte, depois cor, depois fundo.",
              "Confira no celular antes de aprovar.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "4",
        title: "A skill frontend-design",
        blocks: [
          {
            k: "p",
            v: "A skill `frontend-design` está no repositório `anthropics/skills`, da Anthropic. O LICENSE.txt da pasta dela é a licença Apache 2.0 (\"Apache License, Version 2.0, January 2004\"). O README do plugin de mesmo nome diz que ele gera interfaces que evitam estéticas genéricas de IA e que o Claude usa a skill automaticamente em trabalho de frontend, e lista Prithvi Rajasekaran e Alexander Bricken como autores.",
          },
          {
            k: "p",
            v: "Instalação: confira na documentação. As fontes que li não trazem o comando. A página de boas práticas do Claude Code diz que o comando `/plugin` abre o marketplace de plugins:",
          },
          {
            k: "code",
            label: "Abrir a lista de plugins (dentro do Claude Code, não executado: confira na documentação)",
            text: "/plugin",
          },
          {
            k: "p",
            v: "Procure o plugin pelo nome, confira o autor e a licença antes de instalar, e teste com um pedido pequeno. Se o seu Claude Code já tiver a skill, use o mesmo pedido da seção 2: a skill e o pedido se complementam.",
          },
        ],
      },
      {
        n: "5",
        title: "Checklist de revisão do resultado",
        blocks: [
          {
            k: "ol",
            items: [
              "Fonte: os títulos têm personalidade e o texto é legível?",
              "Cor: há uma dominante clara e acentos que guiam o olhar?",
              "Contraste: a WCAG 2.2 pede razão de contraste de pelo menos 4,5 para 1 em texto normal e 3 para 1 em texto grande (critério 1.4.3). Confira com uma ferramenta de contraste.",
              "Espaçamento: nada colado nas bordas, nem no celular.",
              "Originalidade: se o resultado lembra um site que você viu, volte ao pedido e reforce a sua direção.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: "ol",
            items: [
              "Sem direção, o modelo tende às escolhas seguras (artigo da Anthropic, 12/11/2025).",
              "Dê o seu gosto no pedido: fonte marcante, cor dominante com acentos, fundo com profundidade.",
              "Cole um print de referência e peça a comparação no navegador.",
              "A skill frontend-design é da Anthropic, licença Apache 2.0.",
              "Nenhuma skill garante resultado único: o gosto é decisão sua.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          {
            k: "p",
            v: "[Anthropic, Improving frontend design through Skills (12/11/2025)](https://claude.com/blog/improving-frontend-design-through-skills). [anthropics/skills, SKILL.md da frontend-design](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md). [anthropics/skills, LICENSE.txt da frontend-design (Apache 2.0)](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt). [anthropics/claude-plugins-official, README do plugin frontend-design](https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/frontend-design/README.md). [Claude Code, boas práticas (plugins)](https://code.claude.com/docs/en/best-practices.md). [Claude Code, Common workflows (imagens no pedido, Ctrl+V)](https://code.claude.com/docs/en/common-workflows). [W3C, WCAG 2.2, critério 1.4.3 (contraste mínimo)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).",
            muted: true,
          },
          {
            k: "p",
            v: "Diego Arruda",
            muted: true,
          },
          {
            k: "p",
            v: "Conteúdo educativo e independente.",
            muted: true,
          },
        ],
      },
    ],
  },
  en: {
    title: "A site with less of the AI look: a prompt with your own taste",
    short: "A site with less of the AI look",
    lead: "A ready to copy prompt, with the taste direction Anthropic recommends (font, color and background), how to use a reference screenshot and how to check the result in the browser.",
    description: "Why AI built sites tend to look alike according to Anthropic, a ready made prompt with font, color and background direction, how to use a reference screenshot and the frontend-design skill, with author and license.",
    facts: [
      "claude code",
      "design",
      "frontend",
    ],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          {
            k: "p",
            v: "This guide does not promise that your site will lose the AI look. It shows what Anthropic describes and recommends, and gives you a prompt to apply your own taste. The result depends on your prompt, your project and the model.",
          },
          {
            k: "p",
            v: "Nothing here was run: the guide is prompt text and a checking flow. The skill installation is left as \"check the documentation\", because the sources I read do not include the command. The font, color and background examples in section 3 are \"our EXAMPLE\", not an Anthropic requirement.",
          },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          {
            k: "ol",
            items: [
              "Design direction: the visual choices you make before asking: typography (the font), palette (the colors), background and motion.",
              "Typography: the choice of fonts. The skill says it carries the personality of the page.",
              "Skill: according to Anthropic, a document with instructions, constraints and domain knowledge that Claude loads when it needs it.",
              "Reference screenshot: a screen capture of a site you admire, pasted into the prompt.",
              "frontend-design: an Anthropic skill for interfaces.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "1",
        title: "What Anthropic describes",
        blocks: [
          {
            k: "p",
            v: "In the article of 12 November 2025, Anthropic explains that, without direction, the model tends toward safe choices: \"Safe design choices ... dominate web training data.\" (safe design choices dominate web training data).",
          },
          {
            k: "p",
            v: "The examples in the article are \"Inter fonts, purple gradients on white backgrounds, and minimal animations.\" (the Inter font, purple gradients on a white background and minimal animations). Today's SKILL.md lists other clichés, so treat these examples as the article's, not as a current rule.",
          },
          {
            k: "p",
            v: "The article's recommendations: \"Pick one distinctive font, use it decisively.\" (pick a distinctive font and use it decisively); \"Dominant colors with sharp accents outperform timid, evenly-distributed palettes.\" (dominant colors with sharp accents outperform timid palettes); and create atmosphere and depth instead of a solid color background.",
          },
        ],
      },
      {
        n: "2",
        title: "The ready to copy prompt",
        blocks: [
          {
            k: "p",
            v: "Replace what is in square brackets with what you decided. If you do not know yet, choose by taste: open three sites you find beautiful and note what they have in common.",
          },
          {
            k: "code",
            label: "Prompt with blanks for you to fill in (template)",
            text: "Crie [o que você quer: página inicial de ... / painel de ...].\n\nDireção de design:\n- Fonte: uma fonte marcante para os títulos ([descreva o jeito: serifada de caráter forte, geométrica, manuscrita...]) e uma fonte simples para o texto. Use cada uma com decisão.\n- Cor: uma cor dominante ([sua cor]) com acentos fortes em [cor de acento]. Evite paleta tímida e igualmente distribuída.\n- Fundo: com atmosfera e profundidade ([textura, camadas, sombras suaves]), sem cor sólida chapada.\n- Referência: imite o clima geral do print que colei, sem copiar o design de nenhuma marca.\n\nQuando terminar, abra no navegador, tire um print do resultado, compare com a referência e liste as diferenças.",
          },
          {
            k: "code",
            label: "Filled in prompt (EXAMPLE)",
            text: "Crie a página inicial de uma padaria de bairro chamada Padaria Sol.\n\nDireção de design:\n- Fonte: uma fonte serifada de caráter forte nos títulos e uma fonte simples no texto. Use cada uma com decisão.\n- Cor: laranja queimado como cor dominante, com acentos fortes em verde-limão. Evite paleta tímida.\n- Fundo: com textura de papel e camadas de sombra suave, sem cor chapada.\n- Referência: imite o clima geral do print que colei, sem copiar o design de nenhuma marca.\n\nQuando terminar, abra no navegador, tire um print do resultado, compare com a referência e liste as diferenças.",
          },
          {
            k: "p",
            v: "The example is made up by us (EXAMPLE): the bakery does not exist and the choices are only an illustration.",
          },
        ],
      },
      {
        n: "3",
        title: "Step by step: from prompt to adjustment",
        blocks: [
          {
            k: "ol",
            items: [
              "Decide on three things: a distinctive font, a dominant color with accents and a background with depth.",
              "Copy the prompt from section 2 and fill in the blanks.",
              "Paste the reference screenshot into the prompt. The Claude Code documentation says you can paste images straight into the prompt (for example, with Ctrl+V) and uses as an example implementing a design from a screenshot and comparing it with the original.",
              "Send the prompt. When Claude finishes, open the result in the browser.",
              "Compare with the reference and ask for adjustments to whatever does not feel like yours, one thing at a time: font, then color, then background.",
              "Check on your phone before approving.",
            ],
            start: 1,
          },
        ],
      },
      {
        n: "4",
        title: "The frontend-design skill",
        blocks: [
          {
            k: "p",
            v: "The `frontend-design` skill is in the `anthropics/skills` repository, from Anthropic. The LICENSE.txt in its folder is the Apache 2.0 license (\"Apache License, Version 2.0, January 2004\"). The README of the plugin with the same name says it generates interfaces that avoid generic AI aesthetics and that Claude uses the skill automatically on frontend work, and lists Prithvi Rajasekaran and Alexander Bricken as authors.",
          },
          {
            k: "p",
            v: "Installation: check the documentation. The sources I read do not include the command. The Claude Code best practices page says the `/plugin` command opens the plugin marketplace:",
          },
          {
            k: "code",
            label: "Open the plugin list (inside Claude Code, not run: check the documentation)",
            text: "/plugin",
          },
          {
            k: "p",
            v: "Look for the plugin by name, check the author and the license before installing, and test with a small prompt. If your Claude Code already has the skill, use the same prompt from section 2: the skill and the prompt complement each other.",
          },
        ],
      },
      {
        n: "5",
        title: "Checklist for reviewing the result",
        blocks: [
          {
            k: "ol",
            items: [
              "Font: do the headings have personality and is the text readable?",
              "Color: is there a clear dominant color and accents that guide the eye?",
              "Contrast: WCAG 2.2 asks for a contrast ratio of at least 4.5 to 1 for normal text and 3 to 1 for large text (criterion 1.4.3). Check with a contrast tool.",
              "Spacing: nothing stuck to the edges, not even on a phone.",
              "Originality: if the result reminds you of a site you have seen, go back to the prompt and reinforce your direction.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: "ol",
            items: [
              "Without direction, the model tends toward safe choices (Anthropic article, 12 November 2025).",
              "Put your taste in the prompt: a distinctive font, a dominant color with accents, a background with depth.",
              "Paste a reference screenshot and ask for a comparison in the browser.",
              "The frontend-design skill is from Anthropic, Apache 2.0 license.",
              "No skill guarantees a unique result: taste is your decision.",
            ],
            start: 1,
          },
        ],
      },
      {
        title: "Sources",
        blocks: [
          {
            k: "p",
            v: "[Anthropic, Improving frontend design through Skills (12 November 2025)](https://claude.com/blog/improving-frontend-design-through-skills). [anthropics/skills, frontend-design SKILL.md](https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md). [anthropics/skills, frontend-design LICENSE.txt (Apache 2.0)](https://github.com/anthropics/skills/blob/main/skills/frontend-design/LICENSE.txt). [anthropics/claude-plugins-official, frontend-design plugin README](https://raw.githubusercontent.com/anthropics/claude-plugins-official/main/plugins/frontend-design/README.md). [Claude Code, best practices (plugins)](https://code.claude.com/docs/en/best-practices.md). [Claude Code, Common workflows (images in the prompt, Ctrl+V)](https://code.claude.com/docs/en/common-workflows). [W3C, WCAG 2.2, criterion 1.4.3 (minimum contrast)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).",
            muted: true,
          },
          {
            k: "p",
            v: "Diego Arruda",
            muted: true,
          },
          {
            k: "p",
            v: "Educational and independent content.",
            muted: true,
          },
        ],
      },
    ],
  },
};
