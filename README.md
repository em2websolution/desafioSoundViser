# desafioSoundViser**
O objetivo deste desafio é criar um sistema responsável por manter a conta de um ou vários produtores musical dentro da plataforma.

* Ter uma API onde o produtor se cadastra no sistema, sendo necessário informar nome, cpf e e-mail, todos os campos são obrigatórios e devem ser válidos de acordo com seus respectivos campos. O sistema, deverá gerar um número de conta bancaria para esse Produtor. A conta bancária é única e exclusiva.
* Eu preciso conseguir fazer depósito na minha conta para que possa fazer futuras transações
* Deve ser possível fazer a transferência para outra conta, se o saldo permitir
* Gostaria de visualizar meu saldo atual em tempo real, sem precisar ficar carregando a tela
* Quero acompanhar o histórico de transações em tempo real
* É preciso ter a possibilidade de emitir um comprovante padrão da minha conta, como exemplo:

Comprovante
* Número da Conta: 0001
* Conta da transferência: 0002
* Data da Transferência: DD/MM/AAAA * Valor que foi transferido: R$ 1,00
## **Estrutura da Solução**
* Devera ter pelo menos 2 tabelas no banco de dados.
* A aplicação DEVE ser realizada com NestJS (e suas tecnologias disponíveis), Sequelize e MySQL.
* Deve ser possível efetuar o uso do sistema normalmente caso a API B esteja fora do ar, somente o processamento da transferência não será 
### **API A - CRUD USUÁRIO **
* A API A, é responsável por receber as requisições do usuário, exceto a ação de processar pagamento, que será feita pela API B, sendo estimulada pela API A.

### **API B - TRANSAÇÕES **
* A API B, é rsponsável por receber as requisições de pagamento, deposito e transferencia enviadas pela API A de usuário

## **Endpoints API A **
* **Path** `localhost:3000` **

Aqui temos a lista de endpoints com todas as informações necessárias.
> ** Todas as solicitações e respostas têm tipo de conteúdo como ** `application / json`


### **Todos os Usuários **  
* **Path**   

  `GET` /api/v1/users/   

### **Usuários por ID **  
* **Path**   

  `GET` /api/v1/users/

* **URL Parameters**  

  **Required**  

    `:ID`  

### **Criar Usuário **  

* **Path**  

  `POST` /api/v1/users/

* **Payload**  

  ```json
  {
      "key": "[value]",
      "key": "[value]",
      ```
  }

  ```json exemplo usuario
  {
    "name": "Nome completo",
    "cpf": "numero do documento",
    "email": "email@dominio.com"
  }

### **Alterar Usuário **  

* **Path**  

  `POST` /api/v1/users/

* **URL Parameters**  

  **Required**  

    `:ID` 

* **Payload**  

  ```json
  {
      "key": "[value]",
      "key": "[value]",
      ```
  }

  ```json exemplo usuario
  {
    "name": "Nome completo",
    "cpf": "numero do documento",
    "email": "email@dominio.com"
  }

### **Excluir Usuário **  

* **Path**  

  `POST` /api/v1/users/
  
* **URL Parameters**  

  **Required**  

    `:ID` 

## **Endpoints API B **
* **Path** `localhost:4000` **

Aqui temos a lista de endpoints com todas as informações necessárias.
> ** Todas as solicitações e respostas têm tipo de conteúdo como ** `application / json`

### **Saldo por Usuário **  
* **Path**   

  `GET` /api/v1/bank/saldo/

* **URL Parameters**  

  **Required**  

    `:ID`  

### **Transações por Usuário **  
* **Path**   

  `GET` /api/v1/bank/history/

* **URL Parameters**  

  **Required**  

    `:ID`  

### **Fazer um Deposito **  

* **Path**  

  `POST` /api/v1/bank/

* **Payload**  

  ```json
  {
      "key": "[value]",
      "key": "[value]",
      ```
  }

  ```json exemplo deposito
  {
    "type": "Deposito",
    "value": 5000,
    "userId": 1
  }

### **Fazer um Pagamento **  

* **Path**  

  `POST` /api/v1/bank/

* **Payload**  

  ```json
  {
      "key": "[value]",
      "key": "[value]",
      ```
  }

  ```json exemplo pagamento
  {
    "type": "Pagamento",
    "value": 5000,
    "userId": 1
  }

### **Fazer uma Transferência **  

* **Path**  

  `POST` /api/v1/bank/

* **Payload**  

  ```json
  {
      "key": "[value]",
      "key": "[value]",
      ```
  }

  ```json exemplo transferência
  {
    "type": "Transferencia",
    "value": 5000,
    "userId": 1,
    "userIdTransfer": 2
  }

# Para rodar a aplicação veja o README de cada API **
## Swagger
http://localhost:3000/api/
http://localhost:4000/api/

## Postman
* **Import the collection**  

## Fique em contato

- Autor - [Eduardo Marques](https://www.linkedin.com/in/eduardomarquestorres/)


## License

Todos os direitos reservados.