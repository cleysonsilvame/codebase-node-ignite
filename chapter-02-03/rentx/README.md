# Cadastro de carro
**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
<!-- Não deve ser possível alterar a placa de um carro já cadastrado. -->
O carro deve ser cadastrado com disponibilidade por padrão.
* Somente administradores podem realizar o cadastro de novos carros.


# Listagem de carros
**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisar estar logado no sistema.


# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.
<!-- Deve ser possível listar todas as especificações.
Deve ser possível listar todas os carros. -->

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação para já existente para o mesmo carro.
Somente administradores podem realizar o cadastro.


# Cadastro de imagens do carro
**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o `multer` para o envio dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem por carro.
Somente administradores podem realizar o cadastro.


# Aluguel de carro
**RF**
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto por usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto por carro.