import type { Guide } from './blog';

export const POWER_BI_FILTRO: Guide = {
  slug: 'power-bi-filtro-bidirecional',
  category: 'dados',
  published: '2026-11-21',
  pt: {
    title: "Filtro bidirecional: o teste para achar e trocar no seu Power BI",
    short: "Filtro bidirecional no Power BI",
    lead: "O botão de dois sentidos parece atalho, mas a Microsoft recomenda usar o mínimo. Aqui está o teste passo a passo, com a saída certa para cada caso.",
    description: "O que é o filtro bidirecional do Power BI, o que a Microsoft recomenda, um teste passo a passo para achar relacionamentos em Both e trocar por Single, filtro no visual ou CROSSFILTER, e quando o bidirecional é necessário.",
    facts: ['power bi', 'relacionamentos', 'dados'],
    sections: [
      {
        title: "Leia antes: o limite deste guia",
        note: true,
        blocks: [
          { k: 'p',  v: "Não testado no Power BI Desktop. O programa não roda no Mac onde este guia foi escrito. Todos os passos vêm da documentação da Microsoft, aberta em 18/11/2026 ([guia de relacionamentos bidirecionais](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering), [criar e gerenciar relacionamentos](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships)). Nomes de menu mudam entre versões e idiomas: reconfira na sua tela." },
          { k: 'p',  v: "Sem número de velocidade. A Microsoft diz que o bidirecional \"can negatively impact\" o desempenho, sem dar tempo. Este guia não promete que o seu painel vai ficar mais rápido: ele ensina a testar. As tabelas, colunas e números dos exemplos são EXEMPLO." },
        ],
      },
      {
        n: "0",
        title: "O que é cada coisa",
        blocks: [
          { k: 'ol', items: ["Relacionamento: a ligação entre duas tabelas do seu modelo, desenhada como uma linha na visão de modelo.", "Direção do filtro: o caminho que o filtro percorre pela linha. Em `Single`, vai só de um lado para o outro. Em `Both` (bidirecional), vai e volta.", "Tabela de cadastro e tabela de vendas: na documentação, tabela dimensão (filtra e agrupa) e tabela fato (soma). No lado \"um\" da relação fica o cadastro; no lado \"muitos\", as vendas. Esta tradução é nossa, para quem não é da área.", "Segmentador: a lista de opções clicável no painel (em inglês, slicer).", "Visual: cada gráfico, tabela ou lista do painel.", "Medida: uma conta escrita em DAX, que o Power BI refaz a cada filtro."], start: 1 },
        ],
      },
      {
        n: "1",
        title: "O que a Microsoft diz",
        blocks: [
          { k: 'ol', items: ["Sobre o normal: `Single` é \"the most common, default direction\"; o filtro de um cliente chega nas vendas dele, mas não sobe de volta.", "Sobre o bidirecional: \"For filtering purposes, both tables are treated as if they're a single table.\" Em português: para o filtro, as duas tabelas passam a valer como uma só.", "A recomendação: \"Generally, we recommend that you minimize the use of bi-directional relationships. That's because they can negatively impact on model query performance, and possibly deliver confusing experiences for your report users.\"", "Para lista só com dados: \"Instead of using bi-directional filters, you can apply a visual-level filter to the product slicer itself.\"", "Para uma conta específica: \"we recommend that you activate bi-directional filtering in a measure definition by using the CROSSFILTER DAX function instead.\""], start: 1 },
        ],
      },
      {
        n: "2",
        title: "O teste passo a passo",
        blocks: [
          { k: 'ol', items: ["Faça uma cópia do arquivo `.pbix` e trabalhe só na cópia. Nada deste teste mexe no original.", "Abra a visão de modelo (Model view). Cada linha entre duas tabelas é um relacionamento.", "Abra um relacionamento: dê dois cliques na linha, ou clique com o botão direito e escolha `Properties`. O campo se chama `Cross filter direction` (a documentação lista as opções `Single` e `Both`). Em português pode aparecer como direção do filtro cruzado: confira o nome na sua versão.", "Faça a lista: anote, no modelo abaixo, cada relacionamento que está em `Both`.", "Antes de mudar, anote três coisas no relatório (por exemplo: o total de vendas de uma página, quantas opções aparecem num segmentador com um filtro escolhido, e um número que depende do filtro de outra tabela).", "Mude um relacionamento por vez de `Both` para `Single`. Volte ao relatório e compare as três anotações. Um por vez, para saber qual mudança causou qual diferença.", "Decida pelo resultado: nada mudou, deixe em `Single`. A lista de opções mudou, use o filtro no visual (seção 3). Uma conta específica mudou, use CROSSFILTER na medida (seção 3). Se não dá para tirar (seção 4), deixe em `Both` e anote o motivo.", "Se o Power BI não deixar marcar Both, a documentação explica: ele não permite quando isso criaria ambiguidade nos relatórios (por exemplo, com caminhos em círculo entre as tabelas)."], start: 1 },
          { k: 'code', label: "Modelo de anotação do teste (EXEMPLO: troque pelos seus nomes)", text: "Arquivo de teste: cópia do painel de vendas\nRelacionamento: Cliente para Venda\nDireção antes: Both\nTotal de vendas antes: (anote)\nOpções do segmentador antes: (anote)\nDireção depois: Single\nTotal de vendas depois: (anote)\nOpções do segmentador depois: (anote)\nO que mudou: (nada / a lista / uma conta)\nDecisão: (manter Single / filtro no visual / CROSSFILTER / manter Both e o motivo)" },
        ],
      },
      {
        n: "3",
        title: "Duas saídas melhores que o botão de dois sentidos",
        blocks: [
          { k: 'h3', v: "A lista só com o que tem dado: passo a passo" },
          { k: 'p',  v: "É o caso da fala 7 do vídeo. A Microsoft mostra este caminho, com a medida `Total Quantity` e o relacionamento em direção única. Nomes de tabela, coluna e menu abaixo são EXEMPLO (os da página são Sales e Quantity): troque pelos seus." },
          { k: 'ol', items: ["Deixe o relacionamento em `Single` (o oposto do que você está tentando evitar).", "Crie a medida que soma o que você vende. Em Nova medida (New measure), escreva:"], start: 1 },
          { k: 'code', label: "Medida de apoio (EXEMPLO, igual ao exemplo da página da Microsoft)", text: "Total Quantity = SUM(Sales[Quantity])" },
          { k: 'ol', items: ["Crie ou selecione o segmentador da lista (por exemplo, a lista de produtos).", "Selecione o segmentador e abra o painel `Filters` (Filtros) dele.", "Arraste a medida `Total Quantity` para o painel de filtros do segmentador.", "Escolha a condição `is not blank` (não está em branco) e aplique o filtro.", "Confira: escolha um cliente ou um país em outro segmentador. A lista de produtos deve mostrar só os que têm venda para essa escolha, sem o botão de dois sentidos."], start: 3 },
          { k: 'p', muted: true, v: "É o filtro no visual que a Microsoft descreve: \"apply a visual-level filter to the product slicer itself\", com a condição \"Total Quantity is not blank\". Não testei no Power BI Desktop; os nomes dos botões em português podem ser outros." },
          { k: 'h3', v: "Uma conta específica" },
          { k: 'p',  v: "Quando só uma medida precisa do caminho de volta, use `CROSSFILTER` dentro dela. Esta medida segue o exemplo da página da Microsoft, com nomes em português que são EXEMPLO:" },
          { k: 'code', label: "Medida com CROSSFILTER (EXEMPLO, adaptada do exemplo da documentação)", text: "Países Diferentes Vendidos =\nCALCULATE(\n    DISTINCTCOUNT(Cliente[País]),\n    CROSSFILTER(\n        Cliente[CodigoCliente],\n        Venda[CodigoCliente],\n        BOTH\n    )\n)" },
          { k: 'p', muted: true, v: "Dedução, confira: dependendo da configuração regional do seu Power BI, o separador entre os argumentos pode ser ponto e vírgula em vez de vírgula. O nome das funções DAX fica em inglês." },
        ],
      },
      {
        n: "4",
        title: "Quando o bidirecional é necessário",
        blocks: [
          { k: 'ul', items: ["Um para um: \"All one-to-one relationships must be bi-directional\" e não dá para configurar de outro jeito. A página diz que geralmente não recomenda esse desenho e remete a outra página da Microsoft.", "Muitos para muitos: a documentação descreve um caso com tabela ponte, em que o filtro nos dois sentidos faz a propagação passar pela ponte.", "Nesses casos, o teste da seção 2 vai mostrar que voltar para `Single` quebra o resultado. Deixe como está e anote o motivo."] },
        ],
      },
      {
        n: "5",
        title: "Medir de verdade (opcional)",
        blocks: [
          { k: 'ol', items: ["Abra o Performance Analyzer. A página diz: na faixa `Optimize`, escolha `Performance Analyzer` (uma legenda da própria página cita a faixa `View`: veja qual tem o botão na sua versão).", "Clique em `Start recording`, mexa no relatório (clicar num visual ou mover um segmentador registra a duração) e clique em `Stop`.", "Compare, antes e depois da troca, a duração de DAX query (do envio da consulta até a resposta) e de Visual display (tempo de desenhar na tela). Faça o mesmo gesto nas duas vezes.", "Os valores incluem tempo de espera na fila, então repita e olhe a tendência, não um número solto. Este guia não traz tempo medido: o resultado é o do seu modelo."], start: 1 },
        ],
      },
      {
        title: "Resumo para guardar",
        blocks: [
          { k: 'ol', items: ["Normalmente o filtro desce do cadastro para as vendas (Single).", "O bidirecional (Both) faz as duas tabelas valerem como uma só para o filtro.", "A Microsoft recomenda minimizar, porque pode pesar nas consultas e confundir quem usa o relatório.", "Para a lista só com dados, use filtro no visual; para uma conta, use CROSSFILTER na medida.", "Teste numa cópia, um relacionamento por vez, e anote o que mudou.", "Um para um e alguns casos de muitos para muitos precisam do Both."], start: 1 },
        ],
      },
      {
        title: "Fontes",
        blocks: [
          { k: 'p', muted: true, v: "Microsoft Learn, [Bi-directional relationship guidance](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering) (atualizada em 27/12/2024). Microsoft Learn, [Create and manage relationships in Power BI Desktop](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships) (atualizada em 01/10/2025). Microsoft Learn, [Understand star schema](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema) (atualizada em 30/12/2024). Microsoft Learn, [Use Performance Analyzer](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer) (atualizada em 01/12/2025)." },
          { k: 'p', muted: true, v: "Conteúdo educativo e independente." },
        ],
      },
    ],
  },
  en: {
    title: "Bidirectional filter: the test to find and swap it in your Power BI",
    short: "Bidirectional filter in Power BI",
    lead: "The two way button looks like a shortcut, but Microsoft recommends using as little as possible. Here is the step by step test, with the right exit for each case.",
    description: "What the Power BI bidirectional filter is, what Microsoft recommends, a step by step test to find relationships set to Both and swap them for Single, a visual filter or CROSSFILTER, and when bidirectional is necessary.",
    facts: ['power bi', 'relationships', 'data'],
    sections: [
      {
        title: "Read first: the limits of this guide",
        note: true,
        blocks: [
          { k: 'p',  v: "Not tested in Power BI Desktop. The program does not run on the Mac where this guide was written. All the steps come from the Microsoft documentation, opened on November 18, 2026 ([bidirectional relationships guidance](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering), [create and manage relationships](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships)). Menu names change between versions and languages: recheck on your own screen." },
          { k: 'p',  v: "No speed figure. Microsoft says bidirectional \"can negatively impact\" performance, without giving a time. This guide does not promise that your report will get faster: it teaches you to test. The tables, columns and numbers in the examples are EXAMPLE." },
        ],
      },
      {
        n: "0",
        title: "What each thing is",
        blocks: [
          { k: 'ol', items: ["Relationship: the link between two tables in your model, drawn as a line in the model view.", "Filter direction: the path the filter follows along the line. With `Single`, it goes only from one side to the other. With `Both` (bidirectional), it goes and comes back.", "Lookup table and sales table: in the documentation, dimension table (filters and groups) and fact table (adds up). On the \"one\" side of the relationship sits the lookup table; on the \"many\" side, the sales. This translation is ours, for readers outside the field.", "Slicer: the clickable list of options in the report (called a segmentador in Portuguese).", "Visual: each chart, table or list in the report.", "Measure: a calculation written in DAX, which Power BI recalculates with every filter."], start: 1 },
        ],
      },
      {
        n: "1",
        title: "What Microsoft says",
        blocks: [
          { k: 'ol', items: ["On the usual setting: `Single` is \"the most common, default direction\"; the filter on a customer reaches that customer's sales, but does not go back up.", "On bidirectional: \"For filtering purposes, both tables are treated as if they're a single table.\" In plain words: for filtering, the two tables count as one.", "The recommendation: \"Generally, we recommend that you minimize the use of bi-directional relationships. That's because they can negatively impact on model query performance, and possibly deliver confusing experiences for your report users.\"", "For a list with data only: \"Instead of using bi-directional filters, you can apply a visual-level filter to the product slicer itself.\"", "For a specific calculation: \"we recommend that you activate bi-directional filtering in a measure definition by using the CROSSFILTER DAX function instead.\""], start: 1 },
        ],
      },
      {
        n: "2",
        title: "The step by step test",
        blocks: [
          { k: 'ol', items: ["Make a copy of the `.pbix` file and work only on the copy. Nothing in this test touches the original.", "Open the model view (Model view). Each line between two tables is a relationship.", "Open a relationship: double click the line, or right click and choose `Properties`. The field is called `Cross filter direction` (the documentation lists the options `Single` and `Both`). In Portuguese it may appear as direção do filtro cruzado: check the name in your version.", "Make the list: write down, in the template below, every relationship that is set to `Both`.", "Before changing anything, write down three things in the report (for example: the sales total on a page, how many options show up in a slicer with one filter chosen, and a number that depends on the filter of another table).", "Change one relationship at a time from `Both` to `Single`. Go back to the report and compare the three notes. One at a time, so you know which change caused which difference.", "Decide by the result: nothing changed, leave it at `Single`. The list of options changed, use the visual filter (section 3). A specific calculation changed, use CROSSFILTER in the measure (section 3). If it cannot be removed (section 4), leave it at `Both` and write down the reason.", "If Power BI will not let you set Both, the documentation explains: it does not allow it when that would create ambiguity in the reports (for example, with circular paths between the tables)."], start: 1 },
          { k: 'code', label: "Test note template (EXAMPLE: replace with your own names)", text: "Arquivo de teste: cópia do painel de vendas\nRelacionamento: Cliente para Venda\nDireção antes: Both\nTotal de vendas antes: (anote)\nOpções do segmentador antes: (anote)\nDireção depois: Single\nTotal de vendas depois: (anote)\nOpções do segmentador depois: (anote)\nO que mudou: (nada / a lista / uma conta)\nDecisão: (manter Single / filtro no visual / CROSSFILTER / manter Both e o motivo)" },
        ],
      },
      {
        n: "3",
        title: "Two better exits than the two way button",
        blocks: [
          { k: 'h3', v: "The list with only what has data: step by step" },
          { k: 'p',  v: "This is the case in line 7 of the video. Microsoft shows this path, with the `Total Quantity` measure and the relationship in single direction. Table, column and menu names below are EXAMPLE (the ones on the page are Sales and Quantity): replace them with yours." },
          { k: 'ol', items: ["Leave the relationship at `Single` (the opposite of what you are trying to avoid).", "Create the measure that adds up what you sell. In New measure (Nova medida), write:"], start: 1 },
          { k: 'code', label: "Helper measure (EXAMPLE, same as the Microsoft page example)", text: "Total Quantity = SUM(Sales[Quantity])" },
          { k: 'ol', items: ["Create or select the slicer for the list (for example, the product list).", "Select the slicer and open its `Filters` pane (Filtros).", "Drag the `Total Quantity` measure into the slicer's filter pane.", "Choose the condition `is not blank` (não está em branco) and apply the filter.", "Check: pick a customer or a country in another slicer. The product list should show only the products with sales for that choice, without the two way button."], start: 3 },
          { k: 'p', muted: true, v: "This is the visual filter that Microsoft describes: \"apply a visual-level filter to the product slicer itself\", with the condition \"Total Quantity is not blank\". I did not test it in Power BI Desktop; the button names in Portuguese may be different." },
          { k: 'h3', v: "A specific calculation" },
          { k: 'p',  v: "When only one measure needs the way back, use `CROSSFILTER` inside it. This measure follows the example on the Microsoft page, with Portuguese names that are EXAMPLE:" },
          { k: 'code', label: "Measure with CROSSFILTER (EXAMPLE, adapted from the documentation example)", text: "Países Diferentes Vendidos =\nCALCULATE(\n    DISTINCTCOUNT(Cliente[País]),\n    CROSSFILTER(\n        Cliente[CodigoCliente],\n        Venda[CodigoCliente],\n        BOTH\n    )\n)" },
          { k: 'p', muted: true, v: "Deduction, please check: depending on the regional settings of your Power BI, the separator between arguments may be a semicolon instead of a comma. The names of the DAX functions stay in English." },
        ],
      },
      {
        n: "4",
        title: "When bidirectional is necessary",
        blocks: [
          { k: 'ul', items: ["One to one: \"All one-to-one relationships must be bi-directional\" and it cannot be configured any other way. The page says it generally does not recommend this design and points to another Microsoft page.", "Many to many: the documentation describes a case with a bridging table, in which filtering in both directions makes the propagation pass through the bridge.", "In these cases, the test in section 2 will show that going back to `Single` breaks the result. Leave it as it is and write down the reason."] },
        ],
      },
      {
        n: "5",
        title: "Measure it for real (optional)",
        blocks: [
          { k: 'ol', items: ["Open the Performance Analyzer. The page says: in the `Optimize` ribbon, choose `Performance Analyzer` (a caption on the page itself mentions the `View` ribbon: see which one has the button in your version).", "Click `Start recording`, use the report (clicking a visual or moving a slicer records the duration) and click `Stop`.", "Compare, before and after the change, the duration of DAX query (from sending the query to the answer) and of Visual display (time to draw on the screen). Make the same gesture both times.", "The values include time waiting in the queue, so repeat and look at the trend, not a single number. This guide brings no measured time: the result is the one from your model."], start: 1 },
        ],
      },
      {
        title: "Summary to keep",
        blocks: [
          { k: 'ol', items: ["Normally the filter goes down from the lookup table to the sales (Single).", "Bidirectional (Both) makes the two tables count as one for the filter.", "Microsoft recommends minimizing it, because it can weigh on queries and confuse the people who use the report.", "For the list with data only, use a visual filter; for one calculation, use CROSSFILTER in the measure.", "Test on a copy, one relationship at a time, and write down what changed.", "One to one and some many to many cases need Both."], start: 1 },
        ],
      },
      {
        title: "Sources",
        blocks: [
          { k: 'p', muted: true, v: "Microsoft Learn, [Bi-directional relationship guidance](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-bidirectional-filtering) (updated on 12/27/2024). Microsoft Learn, [Create and manage relationships in Power BI Desktop](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-create-and-manage-relationships) (updated on 10/01/2025). Microsoft Learn, [Understand star schema](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema) (updated on 12/30/2024). Microsoft Learn, [Use Performance Analyzer](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-performance-analyzer) (updated on 12/01/2025)." },
          { k: 'p', muted: true, v: "Educational and independent content." },
        ],
      },
    ],
  },
};
