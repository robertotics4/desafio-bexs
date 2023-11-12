<p align="center">
  <a href="" rel="noopener">
 <img src="https://123empregos.com.br/wp-content/uploads/2022/12/bexs-vagas-2022.jpg" alt="Logo da Bexs" style="width: 400px; height: auto;">
</p>

<h3 align="center">Desafio Técnico - Bexs Banco</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Desafio técnico aplicado na disputa de vagas para desenvolvedor no Banco Bexs
    <br>
</p>

## 📝 Índice

- [Sobre a aplicação](#sobre)
- [Desafio](#desafio)
- [Por onde começar?](#inicio)
- [Como usar?](#como_usar)
- [Testes](#testes)
- [Swagger](#swagger)
- [Tecnologias utilizadas](#techs)
- [Requisitos](./REQUIREMENTS.md)
- [Autores](#autores)
- [Agradecimentos](#agradecimentos)

## 🧐 Sobre a aplicação <a name = "sobre"></a>

O desafio consiste em um programa que auxilia turistas a encontrar a rota de viagem mais econômica entre dois pontos, considerando diversas conexões. O usuário fornece as rotas e seus respectivos custos através de um arquivo CSV. O programa oferece duas interfaces: uma de console e outra REST.

### Metodologia

A principal classe do projeto é a `FindBestPathUseCase` e tem como objetivo encontrar a rota mais econômica entre dois pontos, utilizando um algoritmo de busca em largura (BFS - Breadth-First Search) adaptado para o contexto de rotas e preços. Além disso, a classe `CSVManipulator` desempenha um papel crucial no projeto. Para lidar com arquivos de tamanho considerável, essa classe utiliza a poderosa feature de streams do Node.js. A escolha por streams é estratégica, visando mitigar os desafios associados à leitura de arquivos grandes. Ao utilizar streams, a manipulação de dados ocorre em pequenos pedaços, evitando a necessidade de carregar o arquivo inteiro na memória. Isso não apenas otimiza o uso de recursos, mas também contribui para o desempenho eficiente da aplicação, especialmente em cenários onde o tamanho do arquivo pode ser significativo.

O código fonte (source/src) da aplicação foi organizado na seguinte estrutura de pastas:
- **domain**: contém a parte central da aplicação, onde estão localizadas as entidades de negócios, interfaces de repositórios, serviços e outros elementos que representam o domínio;
- **application**: utiliza os elementos definidos no domain para implementar casos de uso específicos da aplicação;
- **infra**:  lida com a implementação de detalhes técnicos e infraestrutura. Isso inclui a implementação de repositórios, serviços externos, etc. Essa camada é responsável por fornecer as implementações concretas para as abstrações definidas no domain;
- **main**: contém os pontos de entrada da aplicação, como arquivos de inicialização, configurações e adaptações necessárias para integrar todas as camadas.

Foram aplicadas inúmeras práticas de **clean code**, **clean architecture**, **SOLID** e design patterns, entre elas:
- Triple A (test pattern)
- Injeção de dependências
- Inversão de dependências
- Princípio de Substituição de Liskov
- Don't Repeat Yourself" (DRY)
- Factory e Strategy
- You Aren't Gonna Need It (YAGN)

### Algoritmo BFS para Encontrar a Melhor Rota

O algoritmo começa listando todas as rotas disponíveis no repositório, representando o grafo de conexões entre diferentes locais. Em seguida, ele inicia uma busca em largura a partir do ponto de origem fornecido. Aqui está uma explicação passo a passo:

1. **Inicialização:**
   - Criação de um dicionário `bestPaths` para armazenar a melhor rota até cada local. Inicialmente, apenas a origem tem uma rota vazia e custo zero.
   - Inicialização de uma fila `queue` com o ponto de origem.

   ```typescript
   const routes = await this.routeRepository.list();
   if (!routes.length) {
     throw new AppError('There are no registered routes');
   }

   const bestPaths: { [key: string]: Path } = {};
   bestPaths[origin] = { routes: [], price: 0 };

   const queue: string[] = [origin];
   ```

2. **Busca em Largura:**
   - Enquanto a fila não estiver vazia, o algoritmo continua a busca.
   - Para cada local na fila, percorre as rotas disponíveis e calcula o custo total até o novo destino.

    ```typescript
    while (queue.length > 0) {
      const currentLocation = queue.shift() as string;

      for (const route of routes) {
        if (route.origin === currentLocation) {
          // ...
        }
      }
    }

   ```

3. **Atualização da Melhor Rota:**
   - Se a rota até o novo destino for mais eficiente (menos custosa) do que a rota atualmente armazenada, atualiza a melhor rota para esse destino.
   - Adiciona o novo destino à fila para continuar a busca a partir desse ponto.

    ```typescript
    const newPath: Path = {
      routes: bestPaths[currentLocation].routes.concat(route),
      price: bestPaths[currentLocation].price + Number(route.price),
    };

    if (
      !bestPaths[route.destination] ||
      newPath.price < bestPaths[route.destination].price
    ) {
      bestPaths[route.destination] = newPath;
      queue.push(route.destination);
    }
   ```
4. **Finalização:**
   - O algoritmo continua até que todos os destinos alcançáveis sejam visitados.
   - O resultado final é a melhor rota e seu custo associado até o ponto de destino desejado.

    ```typescript
    const bestPath = bestPaths[destination];

    if (!bestPath) {
      return null;
    }

    return bestPath;
   ```
### Tratamento de Erros e Casos Especiais

- Se não houver rotas registradas, o algoritmo lança um erro indicando que não há rotas disponíveis.

    ```typescript
    if (!routes.length) {
        throw new AppError('There are no registered routes');
    }
   ```
- Se não for possível encontrar uma rota até o destino, a função retorna `null`.
-
    ```typescript
    const bestPath = bestPaths[destination];

    if (!bestPath) {
      return null;
    }

    return bestPath;
   ```

Esse algoritmo de busca em largura é eficiente para encontrar a melhor rota em termos de custo em um contexto de grafos ponderados, como o apresentado neste desafio.


## 📄 Conhecendo o desafio <a name = "desafio"></a>

Você pode visualizar as instruções e requisitos do desafio em:
[Instruções do desafio](https://github.com/robertotics4/desafio-bexs/blob/main/docs/desafio.md)

## 🏁 Por onde começar? <a name = "inicio"></a>

A aplicação foi desenvolvida com Typescript e Node.js, utilizando sempre os padrões e boas práticas de desenvolvimento.

### Pré-requisitos

- Node.js (v18+)
- NPM (v9+) ou Yarn

### Instalando as dependências

Para instalar as dependências do projeto, abra o prompt no diretório raiz e execute o comando:

```bash
# Utilizando o NPM
npm install

# Ou utilizando o Yarn
yarn
```

Recomendo a utilização do yarn por questões de performance.

## 🎈 Como usar? <a name="como_usar"></a>

Foram criados dois scripts para rodar a aplicação nas interfaces solicitadas no desafio.

1. Para iniciar a aplicação com a interface **CONSOLE**, execute:

```bash
# npm
npm run start:console {caminho-para-o-arquivo-csv}

# yarn
yarn start:console {caminho-para-o-arquivo-csv}

# exemplo
yarn start:console docs/input-file.csv
```

2. Para iniciar a aplicação com a interface **REST**, execute:

```bash
# npm
npm run start:rest {caminho-para-o-arquivo-csv}

# yarn
yarn start:rest {caminho-para-o-arquivo-csv}

# exemplo
yarn start:rest docs/input-file.csv
```

Foi disponibilizado o arquivo `postman_collection.json` na pasta *docs*. Você pode importar esse arquivo no `Postman` e terá todas as requisições disponíveis para executar seus testes. Esse diretório também contém o arquivo `input-file.csv` que pode ser utilizado na inicialização da aplicação pois já inclui várias rotas previamente cadastradas.

## ✅ Testes <a name = "testes"></a>

Como na maioria das aplicações node.js, foi utilizado o `Jest` para a escrita dos testes unitários. Todos os testes encontram-se no diretório `tests` que está na raíz. Você pode executa-los através do seguinte comando:

```bash
# npm
npm run test

# yarn
yarn test
```

Se precisar analisar a cobertura de código, execute:

```bash
# npm
npm run test:coverage

# yarn
yarn test:coverage
```

Será gerada na raiz do projeto uma pasta chamada `coverage`. Dentro dela, você pode acessar o arquivo `coverage/lcov-report/index.html` para acessar o painel de cobertura de código.

## 📚 Swagger <a name = "swagger"></a>

Com a aplicação na interface REST em execução, você pode acessar a documentação dos recursos da API acessando o endereço *http://localhost:{porta}/api-docs*, onde `porta` é a porta configurada na aplicação. Por padrão a porta é **3333**.

http://localhost:3333/api-docs

## ⛏️ Tecnologias utilizadas <a name = "techs"></a>

- [Node.js](https://nodejs.org/en) - Open-source, cross-platform JavaScript runtime environment
- [Typescript](https://www.typescriptlang.org/) - Superset JavaScript


## ✍️ Autores <a name = "autores"></a>

- [@robertotics4](https://github.com/robertotics4)

## 🎉 Agradecimentos <a name = "agradecimentos"></a>

Gostaria de expressar minha sincera gratidão aos colegas da Bexs pela oportunidade de participar do processo seletivo. Foi uma experiência enriquecedora e estimulante poder compartilhar minhas habilidades e experiências. Agradeço também pela consideração e pelo profissionalismo demonstrado ao longo do processo.
