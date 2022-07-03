# Biblioteca de livros API

## Dependecias

- Node.js
- NPM

## Instruções para executar a api

- Instale as depedencias do projeto

```bash
npm i
```

- Execute a aplicação:

```bash
npm run dev
```

## Endpoints de acesso

> OBS: Para executar o método POST e PATCH é necessário usar o Postman ou ferramente similar.

- GET http://localhost:3000/livros-disponiveis
- GET http://localhost:3000/retirar-livro
- PATCH http://localhost:3000/devolver-livro
    - Body (Enviar o body no formato json)

    ```
        {
            "titulo": "Titulo do livro",
            "autor": "Autor do livro",
            "ano": "Ano do livro"
        }
    ```

- POST http://localhost:3000/doar-livro
    - Body (Enviar o body no formato json)
     ```
        {
            "titulo": "Titulo do livro",
            "autor": "Autor do livro",
            "ano": "Ano do livro"
        }
    ```
