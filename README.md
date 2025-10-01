# Relatório do Projeto — CRUD de Pessoas (Hexagon Teste de Habilidade)

## 📌 Introdução
Este projeto foi desenvolvido como parte do **Teste de Habilidade — Hexagon**, com o objetivo de construir uma aplicação completa de CRUD (Create, Read, Update, Delete) para gerenciamento de pessoas, aplicando boas práticas de desenvolvimento front-end e integração com API simulada.

A aplicação foi projetada para ser intuitiva, responsiva e com foco em boas práticas de **organização de código, usabilidade e escalabilidade**.

------------------------------------------------------------------------

## ⚙️ Tecnologias Utilizadas
- **React.js** — biblioteca principal para construção da interface.
- **JavaScript (ES6+)** — linguagem base para lógica de componentes e funções utilitárias.
- **CSS3** — estilização da aplicação, incluindo:
  - Layout responsivo
  - Botões estilizados para ações (Editar/Excluir)
  - Cores contrastantes para melhor experiência de usuário
- **Axios / Fetch API** — comunicação com serviço de dados (`PeopleService`).
- **API do IBGE** — integração externa para preenchimento dinâmico de **Estados** e **Cidades**.
- **Git + GitHub** — versionamento de código e compartilhamento do repositório.

------------------------------------------------------------------------

## 📋 Funcionalidades Implementadas
1. **CRUD Completo**
   - Criar registros de pessoas
   - Listar pessoas cadastradas
   - Atualizar dados de pessoas existentes
   - Excluir registros

2. **Validações**
   - Nome só aceita letras e espaços
   - CPF formatado (000.000.000-00) com validação de 11 dígitos
   - Idade somente valores positivos
   - Campos obrigatórios não podem ficar vazios

3. **Integrações**
   - Estados e Cidades carregados dinamicamente da API do IBGE
   - Seleção de Estado filtra automaticamente as cidades correspondentes

4. **Paginação**
   - Lista de pessoas paginada (5 por página)
   - Navegação entre páginas com destaque para a página ativa

5. **Ordenação e Filtro**
   - Ordenação por Nome, Idade, Estado Civil, Cidade e Estado
   - Botões de ordenação com indicação de ordem crescente/decrescente
   - Campo de busca para pesquisa de pessoas pelo nome

6. **Design**
   - Layout responsivo
   - Gradiente no background
   - Cabeçalho fixo com logo da Hexagon
   - Botões coloridos (verde para editar, vermelho para excluir)

------------------------------------------------------------------------

## 🔑 Decisões de Desenvolvimento
- **Uso do React**: escolhido pela modularidade e facilidade de lidar com estado da aplicação.
- **Hooks (useState, useEffect)**: utilizados para gerenciar estado e ciclo de vida dos componentes.
- **Separação de Responsabilidades**:
  - `App.js` — lógica principal, formulários e listagem
  - `PeopleService.js` — responsável pela comunicação com os dados
- **Validação no front-end** para evitar dados inconsistentes antes de salvar.
- **Paginação e ordenação no cliente** para simplificar e otimizar a experiência do usuário sem dependência de backend complexo.
- **Estilização em CSS puro** para manter simplicidade e independência de frameworks externos.

------------------------------------------------------------------------

## 🖥️ Como Executar o Projeto
```bash
# Clone o repositório
git clone https://github.com/barretowilliam/people-crud-app.git

# Entre na pasta
cd people-crud-app

# Instale as dependências
npm install

# Rode o projeto
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

------------------------------------------------------------------------

## 🌍 Deploy Online
O projeto foi publicado em:  
👉 [https://people-crud-app.vercel.app](https://people-crud-app.vercel.app) *(exemplo caso use Vercel/Netlify)*

------------------------------------------------------------------------

## 🔒 Autenticação
Este projeto **não utiliza autenticação**.  
Caso fosse necessário, poderiam ser aplicados **JWT (JSON Web Token)** ou **OAuth2**, integrados com backend de usuários.

------------------------------------------------------------------------

## 📚 Conclusão
Este projeto reforça conceitos fundamentais de **desenvolvimento front-end**, tais como:
- Estruturação de um CRUD
- Integração com API externa
- Boas práticas de validação e usabilidade
- Organização de código para escalabilidade

Ele demonstra não apenas a prática técnica, mas também a capacidade de **tomar decisões arquiteturais e justificar as escolhas feitas**.

------------------------------------------------------------------------

📌 **Observação final:**  
Este relatório foi incorporado ao `README.md` do repositório para facilitar a visualização pelo recrutador.


------------------------------------------------------------------------

## 📸 Demonstração

![alt text](image.png)

------------------------------------------------------------------------

## 👨‍💻 Autor

**William Barreto**
🔗 https://www.linkedin.com/in/william-barreto-/
📧 barretoj.william@gmail.com
