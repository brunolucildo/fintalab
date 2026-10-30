# Auditoria de design — Football Analytics

**Date:** 2026-10-30  
**Escopo:** SVGs provisórios da marca, fundamentos do sistema visual e todas as telas/estilos em `wireframes/`. O wireframe é um conceito estático, com dados fictícios, não uma interface de produção.

## Findings

### DA-01 — Mobile table labels hid the actual column context

- **Arquivo/componente:** `planning/wireframes/styles.css` mobile table rules; player dashboard and athlete roster tables in `planning/wireframes/index.html`.
- **Categoria:** Responsividade, acessibilidade, conteúdo.
- **Problema observado:** O CSS ocultava os cabeçalhos e criava rótulos por posição de coluna. Na tabela do dashboard, datas e status eram apresentados como “Position” e “Nationality”; o CSS também repetia os rótulos de roster fora da tela ativa na árvore acessível.
- **Impacto:** Associava dados às categorias erradas e removia a navegação semântica por cabeçalho em telas estreitas.
- **Severidade:** Média.
- **Correção proposta:** Preservar a tabela semântica e seus cabeçalhos, usando rolagem horizontal dentro do contêiner em telas estreitas.
- **Critério de validação:** Em 390px, conferir os cabeçalhos e células no snapshot acessível, e confirmar que a tabela excede apenas a largura de seu próprio contêiner rolável.
- **Status:** Corrigido e validado em 390px.

### DA-02 — Área transparente excessiva nos lockups horizontais

- **Arquivo/componente:** `planning/brand-assets/fintalab-horizontal.svg`, `fintalab-logo-dark.svg` e `fintalab-logo-light.svg`.
- **Categoria:** Branding, proporção e alinhamento.
- **Problema observado:** Os três SVGs declaravam `viewBox` de 360×72, mas o desenho terminava aproximadamente em x=211, deixando uma grande área vazia à direita e deslocando o lockup quando usado ou centralizado pela caixa completa.
- **Impacto:** Marca aparentava estar desalinhada e menor do que sua dimensão declarada.
- **Severidade:** Média.
- **Correção proposta:** Ajustar o `viewBox` para 224×72, preservando geometria, cores e lettering.
- **Critério de validação:** Comparar o desenho dentro da caixa SVG e confirmar margens laterais equilibradas, sem corte em uso horizontal.
- **Status:** Corrigido e verificado por captura do SVG. A aplicação em fundos de produto continua pendente porque os lockups não são usados pelo protótipo.

### DA-03 — Navegação móvel recolhida ainda estava disponível ao teclado

- **Arquivo/componente:** `planning/wireframes/index.html` e `planning/wireframes/app.js`, menu lateral.
- **Categoria:** Acessibilidade e navegação.
- **Problema observado:** O menu fechado era movido para fora da tela por `transform`, mas os links permaneciam na ordem de foco e na árvore acessível.
- **Impacto:** Usuários de teclado ou leitor de tela podiam alcançar itens que não estavam visíveis.
- **Severidade:** Média.
- **Correção proposta:** Alternar `inert` conforme o estado do menu e o breakpoint; manter `aria-expanded`, permitir fechamento por `Escape` e restaurar a navegação desktop ao redimensionar.
- **Critério de validação:** Estado fechado com `inert`, aberto com `aria-expanded="true"`, fechamento por `Escape`, e sidebar não inerte em desktop.
- **Status:** Corrigido e validado nesses estados.

### DA-04 — Alvos de interação menores que o padrão documentado

- **Arquivo/componente:** `planning/wireframes/styles.css`, botões, navegação, campos, seletor de perfil, busca e controles segmentados.
- **Categoria:** Acessibilidade e consistência do Design System.
- **Problema observado:** Ações principais e campos tinham 42px; busca, seletor e menu móvel chegavam a 33–38px, apesar do requisito documentado de 44px para botões.
- **Impacto:** Reduzia precisão de toque e criava tamanhos inconsistentes entre controles equivalentes.
- **Severidade:** Média.
- **Correção proposta:** Padronizar controles e ações textuais em 44px e alinhar o documento aos mesmos princípios.
- **Critério de validação:** Medir bounding boxes de CTA, campo de formulário, menu e seletor em desktop/mobile; todos devem ter pelo menos 44px.
- **Status:** Corrigido e validado em 1280px e 390px.

### DA-05 — Contraste insuficiente no hover da ação primária

- **Arquivo/componente:** `planning/wireframes/styles.css`, `.button.primary:hover`.
- **Categoria:** Cores e acessibilidade.
- **Problema observado:** Texto branco sobre `#1C9651` ficava em aproximadamente 3,80:1, abaixo de 4,5:1 para texto normal.
- **Impacto:** A ação perdia legibilidade justamente no estado interativo.
- **Severidade:** Média.
- **Correção proposta:** Usar `color.brand.primary-hover` `#167A42`, mantendo texto branco.
- **Critério de validação:** Recalcular contraste no estado hover; resultado esperado de pelo menos 4,5:1.
- **Status:** Corrigido; contraste medido em 5,39:1.

### DA-06 — Tipografia e superfícies inconsistentes

- **Arquivo/componente:** `planning/wireframes/styles.css`, títulos, labels, card de avaliação e resumo no dashboard.
- **Categoria:** Tipografia, hierarquia e componentes.
- **Problema observado:** Títulos usavam tamanhos `vw`/`clamp()` e tracking negativo; rótulos de dados chegavam a 7px; cards usavam raios de 12–13px e o resumo do jogador era um card dentro de outro.
- **Impacto:** Quebras imprevisíveis em larguras estreitas, menor legibilidade e linguagem visual mais arredondada e fragmentada que a especificação.
- **Severidade:** Média.
- **Correção proposta:** Tamanhos fixos por breakpoint, tracking neutro, rótulos compactos a partir de 10px, raio de card até 8px e resumo do atleta sem moldura interna.
- **Critério de validação:** Confirmar ausência de `clamp()` baseado em viewport/tracking negativo, raios de card acima de 8px e inspecionar landing/dashboard/card em 320px, 390px e desktop.
- **Status:** Corrigido; captura visual validada em 320px e 390px, e CSS sem diagnósticos.

### DA-07 — Largura mínima rígida causava rolagem da página a 320px

- **Arquivo/componente:** `planning/wireframes/styles.css`, `body`.
- **Categoria:** Responsividade.
- **Problema observado:** `min-width: 320px` mantinha a página com 320px quando a barra vertical deixava somente 305px de área útil.
- **Impacto:** Criava rolagem horizontal global e deslocamento lateral em viewport de 320px.
- **Severidade:** Média.
- **Correção proposta:** Remover a largura mínima rígida; manter o scroll horizontal apenas em tabelas que realmente precisam dele.
- **Critério de validação:** Em viewport de 320px, `documentElement.scrollWidth` deve ser igual a `clientWidth`.
- **Status:** Corrigido e validado: ambos mediram 305px.

### DA-08 — Guia de marca descrevia variantes de logo de forma ambígua

- **Arquivo/componente:** `planning/NAMING_AND_BRAND.md` e SVGs `fintalab-logo-dark.svg` / `fintalab-logo-light.svg`.
- **Categoria:** Branding e documentação.
- **Problema observado:** O guia falava em lockup “claro/escuro” sem identificar se o nome se referia ao fundo ou à cor do lettering; os SVGs são nomeados pelo fundo para o qual foram desenhados.
- **Impacto:** A aplicação da variante errada pode reduzir contraste ou deixar o lettering ilegível.
- **Severidade:** Baixa.
- **Correção proposta:** Nomear os arquivos e explicitar a cor do lettering e o fundo de destino no próprio guia.
- **Critério de validação:** Conferir os títulos e fills dos SVGs contra a instrução e visualizar a variante para fundo claro sobre uma superfície clara.
- **Status:** Corrigido e validado para a variante clara; a aplicação da variante escura em uma superfície de produto continua pendente.

### DA-09 — Interface estava integralmente em inglês

- **Arquivo/componente:** Todas as telas visíveis de `planning/wireframes/index.html` e mensagens dinâmicas em `planning/wireframes/app.js`.
- **Categoria:** Conteúdo, localização e acessibilidade.
- **Problema observado:** O documento declarava `lang="en"` e navegação, campos, estados, diálogos e notificações estavam em inglês.
- **Impacto:** A interface não correspondia ao idioma solicitado e podia ter pronúncia e leitura assistiva incorretas para o público brasileiro.
- **Severidade:** Alta.
- **Correção proposta:** Definir `lang="pt-BR"` e traduzir conteúdo visível, nomes dinâmicos de tela, rótulos acessíveis e mensagens de interação.
- **Critério de validação:** Confirmar `lang`, títulos e conteúdo das telas no navegador; exercitar seletor de perfil, filtros, notificações e navegação.
- **Status:** Corrigido; início, painel de atleta, elenco e painel de clube validados no navegador.

### DA-10 — Campo pixelado tinha as áreas dos gols no mesmo lado do eixo

- **Arquivo/componente:** `planning/brand-assets/fintalab-pitch.svg`, usado na tela inicial.
- **Categoria:** Ilustração, alinhamento e branding.
- **Problema observado:** As duas áreas de gol eram desenhadas abaixo do centro vertical; o círculo central também usava um comando de arco ambíguo.
- **Impacto:** O campo parecia assimétrico e a composição deslocava visualmente a jogada.
- **Severidade:** Média.
- **Correção proposta:** Desenhar áreas de gol espelhadas e centralizar o círculo por coordenadas explícitas, preservando paleta e estilo pixelado.
- **Critério de validação:** Renderizar o SVG isolado e conferir linha central, círculo e áreas em lados opostos com alinhamento simétrico.
- **Status:** Corrigido e validado por captura do SVG.

### DA-11 — Carta de avaliação não refletia a referência pixelada dourada

- **Arquivo/componente:** Card em `planning/wireframes/index.html` e estilos em `planning/wireframes/styles.css`.
- **Categoria:** Componentes, hierarquia e identidade visual.
- **Problema observado:** O card anterior era retangular, verde e baseado em iniciais, sem retrato, moldura pixelada, destaque do atleta e atributos compactos como na referência enviada.
- **Impacto:** O principal elemento de identidade esportiva ficava distante da linguagem desejada e tinha hierarquia de leitura fraca.
- **Severidade:** Alta.
- **Correção proposta:** Criar uma composição original de escudo pixelado dourado, com retrato vetorial pixelado, avaliação geral, posição, país, nome e atributos em duas colunas; manter pessoa e valores fictícios existentes.
- **Critério de validação:** Conferir clipping e legibilidade do cabeçalho/rodapé; renderizar em desktop, 390px e 320px; confirmar ausência de overflow horizontal.
- **Status:** Corrigido e validado visualmente em 1280px, 390px e 320px. O PNG de referência não foi incorporado.

## Hipóteses e pendências

### H-01 — Uso dos lockups em fundos claros e escuros

- **Evidência:** O protótipo usa o símbolo SVG e lettering em texto CSS; não usa os três lockups corrigidos. A captura direta do lockup horizontal branco ocorreu sobre fundo branco, portanto não valida o contraste pretendido.
- **Hipótese:** Os lockups claro/escuro podem não estar aplicados consistentemente nas futuras telas.
- **Impacto potencial:** Diferença de contraste ou escala quando os ativos forem introduzidos na interface real.
- **Como verificar:** Definir superfícies finais de aplicação e capturar cada variante em seu fundo correspondente e nos tamanhos mínimo e máximo de uso.
- **Status:** Pendente; não foi alterado o conceito da marca.

### H-02 — Aprovação final da marca

- **Evidência:** O documento de naming classifica FintaLab e os ativos como provisórios e solicita validação de marca registrada.
- **Hipótese:** A marca pode exigir aprovação formal antes de apresentação externa.
- **Impacto potencial:** Voz e lettering podem não corresponder ao mercado ou ao nome final.
- **Como verificar:** Concluir revisão legal/trademark e validação de pronúncia com os públicos-alvo antes de tratar a identidade como final.
- **Status:** Idioma do protótipo definido como pt-BR; aprovação final e revisão legal continuam pendentes.

### H-03 — PNG de card de atleta fora do inventário de marca

- **Arquivo/componente:** `Carta Pixelada de Futebol Dourada.png`, arquivo não rastreado na raiz do workspace.
- **Evidência:** A imagem apresenta um card dourado de atleta com retrato, bandeira, avaliação e atributos; não está em `planning/brand-assets` e não é referenciada pelo protótipo. A origem/licença não é verificável nesta auditoria.
- **Hipótese:** Pode ser um estudo ou ativo pretendido, mas a composição pode se aproximar de convenções proprietárias de cards de jogos de futebol e não segue a paleta verde/amarela/verde escura do protótipo.
- **Impacto potencial:** Inconsistência visual e incerteza sobre originalidade, direitos e natureza fictícia dos dados caso seja integrado.
- **Como verificar:** Confirmar autoria, finalidade, direitos e dados retratados; comparar com o card original de avaliação do produto antes de decidir integração.
- **Status:** Pendente. O arquivo foi preservado e não foi alterado nem integrado.

## Decisões preservadas

- Símbolo, paleta verde/amarelo, ilustração de campo pixelada e direção retrô foram mantidos.
- Não foram adicionadas dependências, serviços, regras de negócio nem componentes de produção.
- Não foi necessária aprovação para os ajustes corretivos de geometria, espaçamento, responsividade, tipografia e estados de interação realizados; a validação visual foi feita no navegador integrado.
