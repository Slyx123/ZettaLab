# ExploraTudo

**ExploraTudo** é uma aplicação web interativa desenvolvida em **React**, que combina funcionalidades de **Pokémon aleatório**, **quiz de perguntas** e **clima por cidade**. O projeto tem como objetivo praticar consumo de APIs externas, manipulação de estados e criação de layouts responsivos.

## Funcionalidades

1. **Pokémon Aleatório**
   - Exibe um Pokémon aleatório usando a [PokéAPI](https://pokeapi.co/).
   - Mostra nome e tipo(s) do Pokémon.
   - Botão para gerar outro Pokémon aleatório.

2. **Quiz Interativo**
   - Puxa perguntas aleatórias de uma API de trivia.
   - Mostra opções de resposta com feedback de acertos.
   - Exibe gráfico de desempenho ao finalizar o quiz.

3. **Clima por Cidade**
   - Permite pesquisar cidades e exibe sugestões em tempo real.
   - Mostra dados de temperatura, vento e código do clima usando a [Open-Meteo API](https://open-meteo.com/).

## Tecnologias Utilizadas

- **React 18+**
- **TypeScript**
- **Bootstrap 5**
- **Sass/SCSS**
- **Axios** para requisições HTTP
- **Recharts** para gráficos
- **React Router** para navegação

## Layout Responsivo

O layout segue os breakpoints do **Bootstrap 5**:

- **X-Small**: < 576px
- **Medium**: ≥ 768px
- **Large**: ≥ 992px

Todos os componentes são responsivos, adaptando cards, botões e inputs para diferentes telas.

## Principais Desafios

- Integração de múltiplas APIs externas com diferentes formatos de dados.
- Garantir responsividade completa usando Sass e variáveis customizadas.
- Exibir corretamente imagens de Pokémon quando algumas versões não possuem sprites.
- Configurar gráficos Recharts centralizados e responsivos no quiz final.
- Ajustar o autocomplete da pesquisa de cidades sem quebrar o layout.

