# desafioSoundViser
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
# Pontos importantes para a entrega
* A API A, será responsável por receber as requisições do usuário, exceto a ação de processar pagamento, que será feita pela API B, sendo estimulada pela API A.
* Devera ter pelo menos 2 tabelas no banco de dados.
* A aplicação DEVE ser realizada com NestJS (e suas tecnologias disponíveis), Sequelize e MySQL.
* Deve ser possível efetuar o uso do sistema normalmente caso a API B esteja fora do ar, somente o processamento da transferência não será 
# concluída.
* É necessário ter pelo menos 1 teste na camada de serviços, mockando as dependecias externas.
* O Código final deve ser entregue no github que será disponibilizada via link pelo candidato