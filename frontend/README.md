# Desafio
# Teste Front End **
Construir layout de um feed conforme imagem (construir layout conforme a imagem apresentada).
2. Consumir dados de api/mock.
3. Exibir na tela os dados da api no layout criado conforme Imagem.
4. Aplicar teste unitário nos inputs e outputs.
5. Sugerir uma solução ao seguinte problema: Como você faria para atualizar dados em tempo real, de vários campos simultâneos; Explo, novas curtidas, Seguidores, plays e etc.
## Sugestão
Para atualizar dados em tempo real, sugiro a utilizaçáo do protocolo ```WebSockets ``` que permite a comunicação bidirecional entre clientes e servidores, auxiliando a performance das aplicações.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Installation

```bash
$ npm install
```
## Data providers
Dados para criação das músicas

```src/assets/mock/sounds.json ``` 
```json
  {
      "soundName": "Should Be",
      "artistName": "Vanghu",
      "category": "House",
      "likes": 177,
      "comments": 77,
      "play": "33k",
      "img": "URL"
      ```
  }
 ```
## Running the app

```bash
# development
$ npm start

# watch mode
$ npm start:dev

# production mode
$ npm start:prod
```
## Test

```bash
# unit tests
$ npm test

# e2e tests
$ npm test:e2e

# test coverage
$ npm test:cov

## **Endpoints FRONT END **
* **Path** `localhost:4200` **


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
