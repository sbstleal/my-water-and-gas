# Shopper - Back-End

API REST construída em `Node.js` para gerenciar medições de consumo de água e gás de maneira individualizada. A API se integra com o Google Gemini (um modelo de linguagem de máquina) para interpretar faturas e extrair o número de consumo do mês especificado.

### Tecnologias Utilizadas

![node.js](https://img.shields.io/badge/node.js-292b36?style=for-the-badge&logo=node.js)  
![typescript](https://img.shields.io/badge/typescript-292b36?style=for-the-badge&logo=typescript)  
![fastify](https://img.shields.io/badge/fastify-292b36?style=for-the-badge&logo=fastify)  
![zod](https://img.shields.io/badge/zod-292b36?style=for-the-badge&logo=zod)  
![postgresql](https://img.shields.io/badge/postgresql-292b36?style=for-the-badge&logo=postgresql)  
![prisma](https://img.shields.io/badge/prisma-292b36?style=for-the-badge&logo=prisma)  
![google](https://img.shields.io/badge/google_gemini-292b36?style=for-the-badge&logo=google)  
![docker](https://img.shields.io/badge/docker-292b36?style=for-the-badge&logo=docker)

- **Fastify**: Framework leve e rápido para gerenciar rotas da aplicação.
- **Zod**: Biblioteca para validação de dados de entrada.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar leituras.
- **Prisma**: ORM para interagir com o banco de dados.
- **Docker**: Ferramenta para criar e gerenciar containers da aplicação.

## Requisitos do Sistema

- Deve utilizar um arquivo `.env` na raiz do projeto contendo a chave de API (`GEMINI_API_KEY`).
- Toda a aplicação e serviços relacionados devem ser inicializáveis com um único comando usando Docker.
- Deve retornar respostas de sucesso e falha com `Status Code`, `error_code` e `error_description` conforme especificado na documentação.
- Deve fornecer uma URL para acesso à imagem da fatura enviada.

## Como Executar o Projeto

*Certifique-se de que o `Docker` está instalado na sua máquina antes de seguir os passos abaixo.*

1. Clone o repositório e navegue até o diretório do projeto:

    ```shell
    git clone https://github.com/sbstleal/my-water-and-gas.git
    cd shopper-backend
    ```

2. Crie um arquivo `.env` na raiz do projeto contendo a chave de API do Google Gemini:

    ```env
    GEMINI_API_KEY=
    ```

    > Ou renomeie o arquivo `.env_sample` para `.env` e adicione a chave de API.

3. Com o Docker em execução, utilize o seguinte comando:

    ```shell
    npm run app
    ```

    > Este comando executará o `docker compose` para construir a imagem da aplicação, iniciar os serviços necessários e aplicar as `migrations`.

4. Aguarde a mensagem de sucesso no terminal:

    ```
    All migrations have been successfully applied.
    ```

5. A aplicação estará disponível no endereço [http://localhost:3000](http://localhost:3000).

### Para Encerrar a Execução do Projeto

Para parar a execução da aplicação e remover os containers, utilize o comando:

```shell
docker compose down
```

## Endpoints

- POST /upload: para envio de faturas para leitura.
- PATCH /confirm: para confirmar o valor lido.
- GET /:customer_code/list: para listar todas as leituras realizadas.
- GET /:customer_code/list?measure_type=: filtra leituras por tipo.
- GET /images/:filename: para acessar a imagem da fatura.

## Notas Importantes

- A chave DATABASE_URL nos scripts (package.json e docker-compose.yml) não segue as melhores práticas, pois o .env deve conter apenas a chave da API do Google Gemini. Em um cenário real, utilizaríamos arquivos separados para desenvolvimento e produção.
- A imagem da fatura é armazenada na própria aplicação, mas poderia ser salva em um bucket da AWS.
- A aplicação utiliza o modelo gemini-1.5-pro, que pode retornar erros 500 em alguns casos. A recomendação é esperar alguns minutos e tentar novamente ou alterar para o modelo