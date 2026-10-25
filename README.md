# Diego Arruda | Portfólio

Código do meu portfólio profissional, publicado em [www.drasdiego.com.br](https://www.drasdiego.com.br). O site apresenta minha trajetória, experiência, formação e projetos em Dados, Inteligência Artificial e Engenharia de Software.

## O que o site tem

- Versões em português e inglês, com tema claro como padrão e opção de alternar para o escuro.
- Assistente de carreira com IA (Google Gemini), por texto e por voz. Quando a IA está indisponível, ele responde a partir de uma base de conhecimento local, sem quebrar a conversa.
- Qualificações e certificados lidos de uma planilha pública do Google Sheets, com uma lista local como reserva.
- Metadados para busca e compartilhamento: `sitemap`, `robots` e imagem Open Graph.

## Tecnologias

- Next.js 15 (App Router), React 18 e TypeScript
- Tailwind CSS
- Google Gemini API, usada somente no servidor
- Google Sheets, lido pelo navegador
- Hospedagem na Vercel

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `app/` | Páginas e rotas. `app/api/chat` e `app/api/tts` conectam o assistente ao Gemini. |
| `components/` | Seções do site e o painel do assistente. |
| `hooks/` | Hooks de interface (seção ativa, rolagem, qualificações). |
| `lib/` | Conteúdo, base de conhecimento do assistente e proteções das rotas de IA. |
| `services/` | Leitura da planilha de qualificações. |

## Como rodar

Requer Node 20 ou superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

O site abre em `http://localhost:3000`. Sem chave do Gemini, o assistente funciona com a base local.

Verificações:

```bash
npm run lint
npm run build
```

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `GEMINI_API_KEY` | Chave da API do Gemini. Opcional. Fica só no servidor e nunca é enviada ao navegador. |
| `GEMINI_CHAT_MODELS` | Modelos do chat em ordem de preferência, separados por vírgula (até 3). Opcional. |

## Segurança das rotas de IA

As rotas públicas de chat e voz podem gerar custo e consumir cota, por isso têm proteções:

- Aceitam apenas requisições vindas do domínio do site.
- Limite por IP: 20 perguntas e 20 pedidos de voz a cada 10 minutos.
- Limites de tamanho da pergunta, do histórico, da resposta e do corpo da requisição.
- Prazo máximo por tentativa, com troca automática de modelo e, no fim, resposta da base local.
- Logs sem o texto das perguntas e sem a chave.

O limite por IP vale por instância do servidor e não substitui uma regra de rate limit no firewall da hospedagem.

## Autor

Diego Arruda
[LinkedIn](https://linkedin.com/in/drasdiego) | [www.drasdiego.com.br](https://www.drasdiego.com.br)
