<p align="center">
  <img src="./planning/brand-assets/fintalab-logo-light.svg" alt="FintaLab" width="260">
</p>

<p align="center"><strong>Transforme cada partida em um próximo passo.</strong><br>
  <sub>Desempenho no futebol, com contexto.</sub>
</p>

<p align="center">
  <code>PLAYER</code> &nbsp; <code>AGENCY</code> &nbsp; <code>CLUB</code>
</p>

---

FintaLab é o nome de trabalho de uma proposta de produto para transformar observações de partidas em avaliações de desempenho e conversas de desenvolvimento. O nome, a identidade visual e as decisões de produto ainda são provisórios.

> **Estado atual:** este repositório reúne um chatbot experimental de linha de comando e artefatos de planejamento do produto. O protótipo visual é estático; não existe ainda uma aplicação FintaLab de produção.

## O que existe hoje

### Chatbot experimental

O código em [`chatbot/`](./chatbot/) implementa um chatbot de terminal em TypeScript que:

- envia mensagens para a API da OpenAI e transmite a resposta durante a geração;
- oferece personas para análise esportiva (`analistaEsportivo`), análise de propostas de transferência (`analistaProposta`) e análise tática Scout Vision (`analistaSV`);
- mantém o contexto da conversa e oferece utilitários para limitar ou resumir o histórico;
- salva mensagens localmente em SQLite, no arquivo `pos_ia-m3.db` por padrão;
- aplica verificações simples de entrada e saída.

O cliente usa o modelo `gpt-4o-mini` e espera a chave da API na variável de ambiente `OPENAI_API_KEY`. As verificações textuais do chatbot são heurísticas e não garantem que uma análise ou resposta esteja correta ou segura.

**Execução:** o repositório ainda não inclui `package.json`, arquivo de dependências, configuração de execução ou suíte de testes. Portanto, não há atualmente um comando de instalação ou inicialização documentado e reproduzível. O código do chatbot requer um runtime Node.js compatível com TypeScript e `node:sqlite`, além do pacote cliente da OpenAI.

### Planejamento e wireframe

O diretório [`planning/`](./planning/) reúne a visão do produto, fluxos, arquitetura proposta, modelo conceitual, decisões registradas, design system, identidade visual e roadmap.

O protótipo em [`planning/wireframes/`](./planning/wireframes/) pode ser aberto localmente no navegador usando [`index.html`](./planning/wireframes/index.html). Ele demonstra jornadas de Player, Agency e Club, incluindo formulários, navegação, histórico, relatórios e estados de avaliação.

O wireframe também inclui:

- interface em português do Brasil, inglês e espanhol;
- seleção pesquisável de países e territórios, com bandeiras locais;
- referência compartilhada para 19 posições do futebol;
- exemplos de fluxos e dados fictícios, sem conexão com serviços externos.

Para mais detalhes sobre como navegar pelo protótipo, consulte [`planning/WIREFRAME_README.md`](./planning/WIREFRAME_README.md).

### Direção visual

A identidade provisória mistura geometria de campo, detalhes pixelados e uma interface de análise esportiva clara. A paleta de referência usa verde profundo (`#0B3D2E`), verde (`#168447`), verde-lima (`#42D66B`) e amarelo (`#FFD447`). Os logotipos e a ilustração acima são rascunhos originais de planejamento, não uma marca final aprovada.

## O que ainda não está implementado

O wireframe não realiza autenticação, cadastro real, persistência de perfis, autorização de organizações, envio de relatórios, processamento de avaliações nem integração do produto FintaLab com um mecanismo de IA. Os formulários apenas simulam mudanças de tela; seus exemplos são fictícios. A única preferência persistida pelo wireframe é o idioma da interface, no armazenamento local do navegador.

Arquitetura, banco de dados, controles de segurança e roadmap em `planning/` são propostas e referências de planejamento, não funcionalidades disponíveis. O chatbot experimental é separado do protótipo e não deve ser confundido com a integração futura do produto.

## Documentação

- [Brief do produto](./planning/PRODUCT_BRIEF.md)
- [Arquitetura proposta](./planning/ARCHITECTURE.md)
- [Fluxos de usuário](./planning/USER_FLOWS.md)
- [Modelo conceitual de dados](./planning/DATA_MODEL.md)
- [Design system](./planning/DESIGN_SYSTEM.md)
- [Direção de nome e marca](./planning/NAMING_AND_BRAND.md)
- [Segurança e plano de testes](./planning/SECURITY_AND_TESTING.md)
- [Roadmap proposto](./planning/DEVELOPMENT_ROADMAP.md)
- [ADRs](./planning/adrs/)

## Licenças e dados

As bandeiras SVG do protótipo estão em [`planning/wireframes/flags/`](./planning/wireframes/flags/) e incluem a licença MIT correspondente. Pessoas, organizações, partidas, resultados e avaliações exibidos na prévia são fictícios.
