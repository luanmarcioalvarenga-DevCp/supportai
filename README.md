# SupportAI — Assistente de Atendimento com IA Generativa

Projeto de portfólio de **Luan Márcio Alvarenga de Arruda**. Interface de chat em React/TypeScript com backend Node.js/Express e integração real à **API Google Gemini**.

## Funcionalidades
- Chat responsivo e histórico de conversas armazenado no navegador (`localStorage`)
- Contexto das mensagens anteriores enviado ao modelo
- Sugestões de perguntas, criação e exclusão de conversas
- API key mantida no backend, fora do código do navegador
- Tratamento de erros de conexão e de limites da API

## Tecnologias
React, TypeScript, Vite, Node.js, Express e `@google/genai`.

## Executar localmente
1. Instale Node.js 20.19+ ou 22.12+.
2. Execute `npm install` na raiz.
3. Copie `.env.example` para `.env` e preencha `GEMINI_API_KEY` com sua chave do [Google AI Studio](https://aistudio.google.com/api-keys). Não compartilhe a chave.
4. No primeiro terminal, execute `npm run server` (porta 3001).
5. No segundo terminal, execute `npm run dev` (normalmente porta 5173).
6. Abra o endereço exibido pelo Vite.

O modelo padrão está definido em `.env.example` e pode ser ajustado conforme a disponibilidade da sua conta e a lista de modelos do Google AI Studio. O uso gratuito está sujeito a cotas e mudanças.

## Publicação
O GitHub Pages serve apenas os arquivos estáticos do frontend e **não executa o servidor Express**. Para disponibilizar o chat com IA publicamente, é necessário hospedar o backend separadamente e configurar o frontend para acessar esse backend. O proxy do Vite funciona apenas no ambiente de desenvolvimento.

**Segurança:** não publique `.env` ou chaves. Antes de expor a API publicamente, adicione autenticação, rate limiting, limites de uso e restrições de origem; sem essas medidas, terceiros podem consumir sua cota gratuita. Para um portfólio, é seguro manter o repositório público e o backend local até implementar essas proteções.

## Privacidade
As conversas são armazenadas no `localStorage` do navegador. As mensagens enviadas são processadas pelo backend e encaminhadas à API Gemini. Não insira dados pessoais ou sensíveis em testes públicos.