# Gestão Financeira
Um site que permite a inserção de receitas/despesas com o intento de que você, usuário, consiga controlar os seus gastos.

## Sobre o site
O mesmo está composto dos seguintes requisitos.

* **Armazenamento** de dados, tanto para contas, receitas e despesas, em um banco de dados MySQL, através do sequelize;
* **Criação/Edição/Listagem e Exclusão** de receitas e despesas;
* **Layout customizado**, baseado em bootstrap, foram utilizado os exemplos: Cover, Modal e Dashboard.
* Relacionamento das entidades Conta, Receita e Despesas. (1 para n)
* **Realização de login e cadastro de conta**.
* **Relatório**, gráfico de linhas, das receitas e/ou despesas durante todo o perído, mostrando o dia em que tal receita/despesa foi inserido, seu respectivo valor e, também, sua descrição.

## Sobre o arquivo .env
* `DATABASE_NAME` - Representa o nome do banco de dados.
* `DATABASE_USERNAME` - Representa o nome de usuário para se conectar ao banco de dados.
* `DATABASE_PASSWORD` - Representa a senha do usuário para se conectar ao banco de dados.
* `DATABASE_DIALECT` - Representa o dialeto do banco de dados.
* `DATABASE_SESSION` - Cookie identificador da sessão de login.

## Dependências
```
"bcrypt": "^5.0.1",
"bootstrap": "^5.1.3",
"chart.js": "^3.6.0",
"connect-flash": "^0.1.1",
"dotenv": "^10.0.0",
"ejs": "^3.1.6",
"express": "^4.17.1",
"express-ejs-layouts": "^2.5.1",
"express-session": "^1.17.2",
"mysql2": "^2.3.3",
"passport": "^0.5.0",
"passport-local": "^1.0.0",
"sequelize": "^6.9.0"
```