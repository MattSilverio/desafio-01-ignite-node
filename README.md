Desafio proposto pela Rocketseat. 

As descrições do desafio podem ser acessadas no seguinte link.

## Tecnologias
- Node.js (v18.14.1)
- Lib csv.js  https://csv.js.org

## Funcionalidades
API para realizar o CRUD de suas tasks (tarefas).
- [x] Criação de uma task
- [x] Listagem de todas as tasks
- [x] Atualização de uma task pelo id
- [x] Remover uma task pelo id
- [x] Marcar pelo id uma task como completa 
- [x] Importação de tasks em massa por um arquivo CSV
- [x] Deleção de task por id
- [x] Deleção de todas as taks

## Rotas e regras de negócio
- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.
- Validação das propriedades `title` e `description` das rotas `POST` e `PUT` estão presentes no `body` da requisição.
- Nas rotas que recebem o `/:id`, são validadas se o `id` existe no banco de dados e retorna a requisição com uma mensagem informando que o registro não existe.

Rotas:

- [x] POST - /tasks
- [x] GET - /tasks
- [x] PUT - /tasks:id
- [x] DELETE - /tasks
- [x] DELETE - /tasks/:id
- [x] PATCH - /tasks/:id/complete

## Como rodar
 - Ter o Node instalado, de preferência com a versão LTS mais recente;
 - Ter o Postman ou Insonmia instalado para verificar cada requisição (Coloque a url base como http://localhost:3333)
 - Com o projeto baixado, rodar o comando npm run dev. O script do comando está na pasta package.json
 - Para importar arquivo '.csv', abra um novo terminal com o projeto rodando e execute node src/utils/import-csv.js
 - Caso queira testar com outro arquivo .csv, adicione na pasta data e edite o caminho com o seu arquivo
 