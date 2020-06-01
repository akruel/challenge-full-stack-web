# Opinião sobre o desafio: 
Comentando um pouco sobre minha experiência durante este desafio:
Sou desenvolvedor JAVA, possuindo também experiência em Angular.
Já havia experimentado também desenvolvimento em React.

O Vuejs foi uma grata surpresa e foi muito satisfatório aprender a utiliza-lo durante este desafio (não havia desenvolvido nada com ele até então).

O NodeJS eu já tinha mais conhecimento, mas igualmente foi satisfatório me desafiar em entregar com NodeJS uma API com nível mais empresarial da mesma forma que estou acostumado a fazer com o JAVA.

Fiquei bastante satisfeito com a stack e senti um maior conforto ao atuar como fullstack utilizando apenas Javascript.

## Decisão da arquitetura utilizada
No backend, foi utilizado NodeJS e Express, conforme solicitado pelo desafio e Postgress para o banco de dados por preferência ao open source.
No frontend, foi utilizado VueJS e Vuetifyjs, também conforme solicitado pelo desafio.

## Lista de bibliotecas de terceiros utilizadas
### Backend:
 - Express (pré requisito)
 - Sequelize (gosto de ORM tanto por acelerar o desenvolvimento, quanto por deixar a API mais desacoplada do banco de dados, propociornando maior facilidade em uma possível migração. Somado isso, essa lib oferece uma cli e um sistema de migrations e seeders com fácil setup para uma migração e controle do banco de dados durante o desenvolvimento)
 - Swagger (documentação é fundamental)
 - dotenv (para carregar as variáveis de ambiente)
 - morgan e winston (LOGs da API)
 - jest (para os testes - nas pesquisas em que realizei, era a      biblioteca que mais aparecia, gostei da sua documentação e achei o uso de fácil adaptação)
 - cors (para facilitar a configuração do cors)
 - helmet (fácil configuração de algumas medidas de seguração para a API)

 ### Frontend:
  - Vuetifyjs (pré requisito)
  - Vue Router (para controle das rotas da aplicação)
  - Axios (para solicitações HTTP)
  - Vee Validate (para validações dos forms - encontrei essa lib como sugestão na documentação do vuetify e achei de um uso simples e com um melhor DRY do que a forma original de executar validações no VUE)
  - eslint (dependência de desenvolvimento para manter o código mais limpo e organizado dentro dos padrões mais utilizados no mercado)

## O que você melhoraria se tivesse mais tempo
Realizaria mais testes, revisaria mais o código em busca de encontrar pontos a refatorar para manter o mais clean possível, melhoraria também a documentação (considero fundamental, porém nesse desafio precisei usar o tempo para estudar outros conceitos, então optei por apenas demonstrar o conhecimento pelo swagger com alguns exemplos) e procuraria gap's de UX no frontend com um profissional da área.

## Quais requisitos obrigatórios que não foram entregues
Não sei se era requisito, mas não realizei test's no frontend.

### OFF ao solicitado:
Também realizei o deploy da aplicação (front e back) na plataforma Heroku (utilizando também o Postgres oferecido pela plataforma). Gosto de enxergar a aplicação em um servidor para realizar outros testes que não tão "cegos" como o do ambiente local/desenv. Sem falar que sou bastante interessado em DevOps, então qualquer oportunidade de brincar um pouco com isso, estou lá.

## Link's:
- https://backend-student-crud.herokuapp.com/docs/
- https://frontend-student-crud.herokuapp.com/
