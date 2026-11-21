import type { Guide } from './blog';

export const AUTORIA_IA: Guide = {
  slug: 'autoria-ia',
  category: 'seguranca',
  published: '2026-11-21',
  pt: {
    title: "Autor do que a IA criou: o que o Copyright Office dos EUA escreveu e o que guardar",
    short: "Autor do que a IA criou",
    lead: "Você pediu um texto ou uma imagem a uma IA. Isso faz de você o autor? O guia mostra o que um órgão dos Estados Unidos escreveu sobre isso, em linguagem simples, e um checklist do que guardar. É a posição desse órgão, não orientação jurídica.",
    description: "O que o relatório de janeiro de 2025 do Escritório de Direitos Autorais dos Estados Unidos diz sobre obras feitas com IA, com os trechos e as páginas, o que o órgão diz que pode ser protegido, um checklist do que guardar (recomendação do guia), a regra de registro nos EUA e o aviso de que é posição de um órgão americano, não orientação jurídica.",
    facts: ["direito autoral", "IA", "EUA"],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: 'p', v: "Este guia não é orientação jurídica. Ele relata a posição de um órgão americano, o Escritório de Direitos Autorais dos Estados Unidos (US Copyright Office), escrita em um relatório. Um relatório do órgão não é lei nem sentença. O Brasil pode divergir, e eu não conferi a lei brasileira (Lei 9.610/1998): o guia não diz o que vale aqui e não promete proteção, registro nem resultado em nenhuma disputa. Para uma obra ou um caso concreto, procure um advogado. Os fatos vêm das páginas citadas nas fontes, abertas em 18/11/2026. O relatório é de janeiro de 2025 (a página do órgão diz que a Parte 2 foi publicada em 29/01/2025) e baseia a conclusão sobre pedidos (prompts) na tecnologia da época: não conferi se saiu algo novo sobre o tema além disso. Os trechos curtos do relatório foram conferidos no PDF em 18/11/2026. O checklist do que guardar é recomendação do guia, não exigência do relatório. Os exemplos são fictícios, marcados como EXEMPLO. O guia não ensina a esconder o uso de IA e não tem vínculo com o órgão citado." },
        ],
      },
      {
        n: '0',
        title: "O que é cada coisa",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Saída (output): o texto, a imagem ou o código que a IA devolve.",
              "Pedido (prompt): o texto que você escreve para a IA gerar a saída.",
              "Autor humano: a pessoa que cria a expressão da obra. O relatório trata de quanto da obra vem de uma pessoa.",
              "Seleção e arranjo criativos: escolher e organizar o material (por exemplo, quais saídas entram e em que ordem).",
              "Modificações criativas: alterações que você faz na saída gerada.",
              "Registro: o pedido feito ao órgão para registrar uma obra nos Estados Unidos.",
              "De minimis: expressão latina para o que é pequeno demais; na orientação de registro, o conteúdo de IA acima disso deve ser declarado.",
            ],
          },
        ],
      },
      {
        n: '1',
        title: "O que o relatório diz",
        blocks: [
          { k: 'p', v: "O relatório é Copyright and Artificial Intelligence, Part 2: Copyrightability, do Register of Copyrights (janeiro de 2025). Os trechos abaixo têm menos de 15 palavras; a tradução é minha." },
          {
            k: 'ul',
            items: [
              "Autor humano. \"Copyright protects the original expression in a work created by a human author\" (resumo executivo, p. iii). O direito autoral protege a expressão original criada por um autor humano.",
              "Só o pedido não basta. \"prompts alone do not provide sufficient human control\" (p. 18). Com a tecnologia da época, só o pedido não dá controle humano suficiente sobre a saída. Contexto do relatório: o pedido funciona como instrução que transmite ideias, e ideias não são protegidas (p. 18); o sistema é o principal responsável pelos elementos expressivos da saída (p. 19).",
              "Refazer o pedido não muda isso. \"Repeatedly revising prompts does not change this analysis\" (p. 20). O mecanismo: \"identical prompts can generate multiple different outputs\" (p. 20), ou seja, o mesmo pedido pode gerar saídas diferentes.",
              "Caso a caso. \"must be analyzed on a case-by-case basis\" (resumo executivo, p. iii). Cada situação é analisada separadamente.",
              "Sem mudança de lei. O relatório diz que a questão se resolve pela lei existente: \"without the need for legislative change\" (p. iii).",
            ],
          },
          { k: 'p', v: "Dedução do guia: como o relatório baseia a conclusão sobre pedidos na tecnologia da época, ela pode mudar se a tecnologia ou a posição do órgão mudarem. Reconfira a página do órgão antes de usar." },
        ],
      },
      {
        n: '2',
        title: "O que o relatório diz que pode ser protegido",
        blocks: [
          { k: 'p', v: "Segundo o resumo executivo (p. iii), autores humanos têm direito autoral sobre a expressão humana perceptível nas saídas e sobre dois outros tipos de contribuição. \"Pode ser protegido\" não promete que o seu caso seja protegido: vale o caso a caso." },
          {
            k: 'ol', start: 1,
            items: [
              "O que você escreveu e aparece na saída: sua própria expressão, que dá para perceber no resultado.",
              "Seleção e arranjo criativos: \"the creative selection, coordination, or arrangement of material in the outputs\" (p. iii).",
              "Modificações criativas: \"creative modifications of the outputs\" (p. iii).",
            ],
          },
          { k: 'p', v: "Exemplo (fictício, ilustra a ideia; não vem do relatório): EXEMPLO 1: você pede dez imagens, escolhe três e as organiza em sequência numa apresentação. A escolha e a ordem são seleção e arranjo. EXEMPLO 2: numa imagem gerada, você troca a cor do fundo. É uma modificação. Se isso é criativo o bastante para ser protegido, só a análise do caso diz." },
        ],
      },
      {
        n: '3',
        title: "Checklist do que guardar (recomendação do guia)",
        blocks: [
          { k: 'p', v: "O relatório não manda guardar nada. A ideia é poder mostrar, depois, o que foi contribuição sua, porque o relatório analisa cada caso. Copie, adapte e guarde junto da obra:" },
          { k: 'code', label: "Checklist do que guardar (recomendação do guia, não exigência do relatório)", text: "[ ] Rascunhos e versões do que eu mesmo escrevi (texto, roteiro, código, desenho)\n[ ] O que eu escrevi e aparece na saída final\n[ ] As minhas escolhas de seleção e arranjo (o que escolhi, o que descartei, em que ordem pus)\n[ ] As modificações que fiz na saída gerada (antes e depois)\n[ ] Os pedidos (prompts) enviados, na ordem\n[ ] A ferramenta de IA usada e a data\n[ ] A marcação de onde há conteúdo gerado por IA e onde há conteúdo meu" },
          { k: 'p', v: "Um modelo de nota para preencher e guardar com cada obra:" },
          { k: 'code', label: "Modelo de nota de criação (preencha e guarde junto da obra)", text: "Obra:\nData:\nFerramenta de IA usada (e versão, se souber):\nO que eu mesmo escrevi (cole o texto ou aponte o arquivo):\nO que a IA gerou (cole ou aponte o arquivo):\nO que eu escolhi e como organizei (seleção e arranjo):\nO que eu alterei depois (modificações):\nOnde estão os rascunhos e as versões:" },
        ],
      },
      {
        n: '4',
        title: "A regra de registro nos EUA: declarar o conteúdo de IA",
        blocks: [
          { k: 'p', v: "A orientação de registro do órgão, publicada no Federal Register em 16/03/2023, é dirigida a quem pede registro nos Estados Unidos. Ela diz:" },
          {
            k: 'ul',
            items: [
              "Declarar: \"applicants have a duty to disclose the inclusion of AI-generated content\" (quem pede registro tem o dever de declarar o conteúdo gerado por IA).",
              "Acima do mínimo: \"AI-generated content that is more than de minimis\" deve ser explicitamente excluído do pedido.",
              "Contribuição humana: o autor humano é descrito no campo \"Author Created\".",
              "Registro antigo sem declaração: \"the applicant should correct the public record by submitting a supplementary registration\" (a pessoa deve corrigir o registro público com um registro suplementar).",
            ],
          },
          { k: 'p', v: "O guia não ensina a esconder o uso de IA. A regra vai no sentido contrário: declarar. Para registrar uma obra de verdade, leia a orientação completa no link das fontes e fale com um advogado." },
        ],
      },
      {
        n: '5',
        title: "O que este guia não cobre",
        blocks: [
          {
            k: 'ul',
            items: [
              "A lei brasileira. Não conferi a Lei 9.610/1998 (a página do Planalto estava bloqueada na leitura). Nada aqui diz o que vale no Brasil.",
              "Treinamento de IA com obras protegidas. É outro tema, de outra parte dos relatórios do órgão (a página do órgão cita a Parte 3, em versão pré-publicação desde 09/05/2025).",
              "Decisões posteriores a janeiro de 2025, exceto o contexto a seguir.",
              "Contexto, sem relação com pedidos: segundo o SCOTUSblog, a Suprema Corte dos EUA negou o recurso (certiorari) em Thaler v. Perlmutter (nº 25-449) em 02/03/2026, caso de obra criada por IA sem contribuição humana tradicional. Esse caso não trata de pedidos (prompts) e não prova o que o relatório diz sobre eles.",
            ],
          },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "É a posição de um órgão dos EUA em um relatório, não lei, não sentença e não orientação jurídica. O Brasil pode divergir.",
              "Segundo o relatório, o direito autoral protege a expressão criada por um autor humano.",
              "Com a tecnologia da época, só o pedido (prompt) não dá controle suficiente; refazer o pedido não muda isso.",
              "Pode ser protegido (segundo o relatório): o que você escreveu e aparece na saída, a seleção e o arranjo criativos e as modificações criativas, caso a caso.",
              "Guardar rascunhos, escolhas e alterações é recomendação do guia.",
              "Nos EUA, quem registra deve declarar o conteúdo de IA acima do mínimo.",
            ],
          },
        ],
      },
      {
        title: "Mito x verdade",
        blocks: [
          {
            k: 'ul',
            items: [
              "Mito: \"se eu escrevi o pedido, sou o autor da imagem\". Verdade (segundo o relatório): com a tecnologia da época, só o pedido não dá controle suficiente.",
              "Mito: \"se eu refizer o pedido até ficar bom, passo a ser o autor\". Verdade (segundo o relatório): refazer o pedido não muda a análise, e o mesmo pedido pode gerar saídas diferentes.",
              "Mito: \"o que a IA gera nunca pode ter proteção\". Verdade (segundo o relatório): a expressão humana perceptível na saída, a seleção e o arranjo criativos e as modificações criativas podem ser protegidos, caso a caso.",
              "Mito: \"o relatório dos EUA vale no Brasil\". Verdade: é a posição de um órgão americano; o Brasil pode divergir e não foi conferido.",
            ],
          },
        ],
      },
      {
        title: "Aviso",
        blocks: [
          { k: 'p', v: "Este guia não é orientação jurídica. É o relato da posição de um órgão americano, em um relatório de janeiro de 2025. Não promete proteção, registro nem resultado, e não diz o que vale no Brasil. Para sua obra, consulte um advogado." },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: 'p', muted: true, v: "US Copyright Office, [Copyright and Artificial Intelligence, Part 2: Copyrightability (PDF)](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf). US Copyright Office, [página de IA](https://www.copyright.gov/ai/). Federal Register, [orientação de registro de obras com conteúdo gerado por IA (16/03/2023)](https://www.federalregister.gov/documents/2023/03/16/2023-05321/copyright-registration-guidance-works-containing-material-generated-by-artificial-intelligence). SCOTUSblog, [Thaler v. Perlmutter](https://www.scotusblog.com/cases/case-files/thaler-v-perlmutter)." },
          { k: 'p', muted: true, v: "Conteúdo educativo e independente." },
        ],
      },
    ],
  },
  en: {
    title: "Author of what AI created: what the US Copyright Office wrote and what to keep",
    short: "Author of what AI created",
    lead: "You asked an AI for a text or an image. Does that make you the author? This guide shows what a United States agency wrote about it, in plain language, and a checklist of what to keep. It is that agency's position, not legal advice.",
    description: "What the January 2025 report of the United States Copyright Office says about works made with AI, with the excerpts and pages, what the agency says can be protected, a checklist of what to keep (the guide's recommendation), the US registration rule and the notice that this is the position of an American agency, not legal advice.",
    facts: ["copyright", "AI", "US"],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          { k: 'p', v: "This guide is not legal advice. It reports the position of an American agency, the United States Copyright Office, written in a report. An agency report is not a law or a court ruling. Brazil may differ, and I did not check Brazilian law (Lei 9.610/1998): the guide does not say what applies here and does not promise protection, registration or any result in any dispute. For a specific work or case, talk to a lawyer. The facts come from the pages cited in the sources, opened on November 18, 2026. The report is from January 2025 (the agency page says Part 2 was published on January 29, 2025) and bases its conclusion about prompts on the technology of the time: I did not check whether anything new came out on the subject beyond that. The short excerpts from the report were checked against the PDF on November 18, 2026. The checklist of what to keep is the guide's recommendation, not a requirement of the report. The examples are fictional, marked as EXAMPLE. The guide does not teach you to hide the use of AI and is not affiliated with the agency cited." },
        ],
      },
      {
        n: '0',
        title: "What each thing is",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "Output: the text, image or code that the AI returns.",
              "Prompt: the text you write for the AI to generate the output.",
              "Human author: the person who creates the expression in the work. The report deals with how much of the work comes from a person.",
              "Creative selection and arrangement: choosing and organizing the material (for example, which outputs go in and in what order).",
              "Creative modifications: changes you make to the generated output.",
              "Registration: the application made to the agency to register a work in the United States.",
              "De minimis: a Latin expression for what is too small to matter; in the registration guidance, AI content above that level must be disclosed.",
            ],
          },
        ],
      },
      {
        n: '1',
        title: "What the report says",
        blocks: [
          { k: 'p', v: "The report is Copyright and Artificial Intelligence, Part 2: Copyrightability, from the Register of Copyrights (January 2025). The excerpts below are under 15 words; the translation is mine." },
          {
            k: 'ul',
            items: [
              "Human author. \"Copyright protects the original expression in a work created by a human author\" (executive summary, p. iii). Copyright protects the original expression created by a human author.",
              "The prompt alone is not enough. \"prompts alone do not provide sufficient human control\" (p. 18). With the technology of the time, the prompt alone does not give enough human control over the output. Context from the report: the prompt works as an instruction that conveys ideas, and ideas are not protected (p. 18); the system is mainly responsible for the expressive elements of the output (p. 19).",
              "Revising the prompt does not change this. \"Repeatedly revising prompts does not change this analysis\" (p. 20). The mechanism: \"identical prompts can generate multiple different outputs\" (p. 20), that is, the same prompt can generate different outputs.",
              "Case by case. \"must be analyzed on a case-by-case basis\" (executive summary, p. iii). Each situation is analyzed separately.",
              "No change in the law. The report says the question is resolved under existing law: \"without the need for legislative change\" (p. iii).",
            ],
          },
          { k: 'p', v: "The guide's inference: since the report bases its conclusion about prompts on the technology of the time, it may change if the technology or the agency's position changes. Check the agency page again before relying on it." },
        ],
      },
      {
        n: '2',
        title: "What the report says can be protected",
        blocks: [
          { k: 'p', v: "According to the executive summary (p. iii), human authors hold copyright in the perceptible human expression in the outputs and in two other kinds of contribution. \"Can be protected\" does not promise that your case is protected: it depends on the case." },
          {
            k: 'ol', start: 1,
            items: [
              "What you wrote that appears in the output: your own expression, which can be perceived in the result.",
              "Creative selection and arrangement: \"the creative selection, coordination, or arrangement of material in the outputs\" (p. iii).",
              "Creative modifications: \"creative modifications of the outputs\" (p. iii).",
            ],
          },
          { k: 'p', v: "Example (fictional, illustrates the idea; it does not come from the report): EXAMPLE 1: you ask for ten images, pick three and arrange them in sequence in a presentation. The choice and the order are selection and arrangement. EXAMPLE 2: in a generated image, you change the background color. That is a modification. Whether it is creative enough to be protected, only the analysis of the case can say." },
        ],
      },
      {
        n: '3',
        title: "Checklist of what to keep (the guide's recommendation)",
        blocks: [
          { k: 'p', v: "The report does not tell you to keep anything. The idea is to be able to show, later, what was your contribution, because the report analyzes each case. Copy, adapt and keep it with the work:" },
          { k: 'code', label: "Checklist of what to keep (the guide's recommendation, not a requirement of the report)", text: "[ ] Rascunhos e versões do que eu mesmo escrevi (texto, roteiro, código, desenho)\n[ ] O que eu escrevi e aparece na saída final\n[ ] As minhas escolhas de seleção e arranjo (o que escolhi, o que descartei, em que ordem pus)\n[ ] As modificações que fiz na saída gerada (antes e depois)\n[ ] Os pedidos (prompts) enviados, na ordem\n[ ] A ferramenta de IA usada e a data\n[ ] A marcação de onde há conteúdo gerado por IA e onde há conteúdo meu" },
          { k: 'p', v: "A note template to fill in and keep with each work:" },
          { k: 'code', label: "Creation note template (fill in and keep with the work)", text: "Obra:\nData:\nFerramenta de IA usada (e versão, se souber):\nO que eu mesmo escrevi (cole o texto ou aponte o arquivo):\nO que a IA gerou (cole ou aponte o arquivo):\nO que eu escolhi e como organizei (seleção e arranjo):\nO que eu alterei depois (modificações):\nOnde estão os rascunhos e as versões:" },
        ],
      },
      {
        n: '4',
        title: "The US registration rule: disclose AI content",
        blocks: [
          { k: 'p', v: "The agency's registration guidance, published in the Federal Register on March 16, 2023, is addressed to people applying for registration in the United States. It says:" },
          {
            k: 'ul',
            items: [
              "Disclose: \"applicants have a duty to disclose the inclusion of AI-generated content\".",
              "Above the minimum: \"AI-generated content that is more than de minimis\" must be explicitly excluded from the application.",
              "Human contribution: the human author is described in the \"Author Created\" field.",
              "Old registration without disclosure: \"the applicant should correct the public record by submitting a supplementary registration\".",
            ],
          },
          { k: 'p', v: "The guide does not teach you to hide the use of AI. The rule points the other way: disclose. To register a work for real, read the full guidance at the link in the sources and talk to a lawyer." },
        ],
      },
      {
        n: '5',
        title: "What this guide does not cover",
        blocks: [
          {
            k: 'ul',
            items: [
              "Brazilian law. I did not check Lei 9.610/1998 (the Planalto page was blocked when I tried to read it). Nothing here says what applies in Brazil.",
              "AI training on protected works. That is another subject, from another part of the agency's reports (the agency page mentions Part 3, in pre-publication version since May 9, 2025).",
              "Decisions after January 2025, except the context that follows.",
              "Context, unrelated to prompts: according to SCOTUSblog, the US Supreme Court denied review (certiorari) in Thaler v. Perlmutter (No. 25-449) on March 2, 2026, a case about a work created by AI without traditional human contribution. That case does not deal with prompts and does not prove what the report says about them.",
            ],
          },
        ],
      },
      {
        title: "Keep this in mind",
        blocks: [
          {
            k: 'ol', start: 1,
            items: [
              "It is the position of a US agency in a report, not a law, not a court ruling and not legal advice. Brazil may differ.",
              "According to the report, copyright protects expression created by a human author.",
              "With the technology of the time, the prompt alone does not give enough control; revising the prompt does not change that.",
              "Can be protected (according to the report): what you wrote that appears in the output, creative selection and arrangement, and creative modifications, case by case.",
              "Keeping drafts, choices and changes is the guide's recommendation.",
              "In the US, whoever registers must disclose AI content above the minimum.",
            ],
          },
        ],
      },
      {
        title: "Myth and fact",
        blocks: [
          {
            k: 'ul',
            items: [
              "Myth: \"if I wrote the prompt, I am the author of the image\". Fact (according to the report): with the technology of the time, the prompt alone does not give enough control.",
              "Myth: \"if I redo the prompt until it looks good, I become the author\". Fact (according to the report): revising the prompt does not change the analysis, and the same prompt can generate different outputs.",
              "Myth: \"what AI generates can never be protected\". Fact (according to the report): the perceptible human expression in the output, creative selection and arrangement, and creative modifications can be protected, case by case.",
              "Myth: \"the US report applies in Brazil\". Fact: it is the position of an American agency; Brazil may differ and this was not checked.",
            ],
          },
        ],
      },
      {
        title: "Notice",
        blocks: [
          { k: 'p', v: "This guide is not legal advice. It is an account of the position of an American agency, in a report from January 2025. It does not promise protection, registration or any result, and it does not say what applies in Brazil. For your work, consult a lawyer." },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: 'p', muted: true, v: "US Copyright Office, [Copyright and Artificial Intelligence, Part 2: Copyrightability (PDF)](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf). US Copyright Office, [AI page](https://www.copyright.gov/ai/). Federal Register, [registration guidance for works containing AI-generated material (March 16, 2023)](https://www.federalregister.gov/documents/2023/03/16/2023-05321/copyright-registration-guidance-works-containing-material-generated-by-artificial-intelligence). SCOTUSblog, [Thaler v. Perlmutter](https://www.scotusblog.com/cases/case-files/thaler-v-perlmutter)." },
          { k: 'p', muted: true, v: "Educational and independent content." },
        ],
      },
    ],
  },
};
