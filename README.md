# Do It! - O seu To-Do App

Bem-vindo ao "Do It!", uma aplicação full-stack de lista de tarefas construída para demonstrar competências em desenvolvimento web moderno, desde a API de backend até à interface reativa do frontend.


---

## 🔗 Acesso ao Projeto (Deploy)

A aplicação está totalmente funcional e hospedada na nuvem.

* **Frontend (Vercel):** [**Aceda à aplicação aqui!**]([https://seu-link-do-vercel.app](https://todo-project-three-omega.vercel.app/))
* **Backend (Render):** [Link da API]([https://seu-link-do-render.com](https://todo-project-api-5ebh.onrender.com))

**Nota Importante:** O backend está hospedado no plano gratuito do Render e "adormece" após um período de inatividade. Ao aceder à aplicação pela primeira vez, a primeira tentativa de login ou registo pode falhar. **Para "acordar" o servidor, basta clicar no link da API acima.** Aguarde até ver uma mensagem como `{"detail":"Not Found"}` e, em seguida, a aplicação frontend funcionará perfeitamente.

---

## 🚀 Sobre o Projeto

Este projeto é uma aplicação de To-Do completa que permite aos utilizadores registarem-se, fazerem login e gerirem as suas tarefas pessoais. Cada utilizador tem a sua própria lista de tarefas privada, que pode ser criada, visualizada e excluída. A aplicação foi desenhada com um foco na experiência do utilizador, com uma interface limpa e funcionalidades como priorização de tarefas e expansão para ver detalhes.

## ✨ Funcionalidades Principais

* **Autenticação de Utilizadores:** Sistema seguro de registo e login com JWT.
* **Gestão de Tarefas (CRUD):** Funcionalidade completa para criar, ler e excluir tarefas.
* **Interface Reativa:** Uma interface de utilizador rápida e moderna construída com React.
* **Priorização e Detalhes:** As tarefas podem ser marcadas como prioritárias e os detalhes podem ser expandidos.
* **Design Responsivo:** A interface adapta-se a diferentes tamanhos de ecrã, de desktop a mobile.

## 🛠️ Tecnologias Utilizadas

**Backend:**
* **Python** com o framework **FastAPI**
* **SQLAlchemy** como ORM
* **PostgreSQL** (em produção) / **SQLite** (em desenvolvimento)
* **JWT (python-jose)** e **passlib** para autenticação e segurança de senhas

**Frontend:**
* **React** (criado com Create React App)
* **JavaScript**
* **React Router** para o roteamento
* **Axios/Fetch** para as chamadas de API
* **TailwindCSS** para a estilização

**Deploy:**
* **Backend:** Hospedado no **Render**.
* **Banco de Dados:** PostgreSQL hospedado no **Supabase**.
* **Frontend:** Hospedado no **Vercel**.

---

## 🚀 Como Iniciar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

### Pré-requisitos

* [Git](https://git-scm.com/)
* [Node.js (versão LTS)](https://nodejs.org/)
* [Python](https://www.python.org/downloads/)

### Guia de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/jguilhermepaiva/todo-project.git](https://github.com/jguilhermepaiva/todo-project.git)
    cd todo-project
    ```

2.  **Configure e Inicie o Backend (`backend/`):**
    * Navegue para a pasta do backend: `cd backend`
    * Crie um ambiente virtual (recomendado):
        ```bash
        python -m venv venv
        source venv/bin/activate  # No Windows: venv\Scripts\activate
        ```
    * Instale as dependências: `pip install -r requirements.txt`
    * Inicie o servidor:
        ```bash
        uvicorn main:app --reload
        ```
    *(O servidor estará a rodar em `http://127.0.0.1:8000`)*

3.  **Configure e Inicie o Frontend (`frontend/`):**
    * Abra um **novo terminal**.
    * Navegue para a pasta do frontend: `cd frontend/todo-app` (ou `cd frontend` se você já moveu os ficheiros).
    * Instale as dependências: `npm install`
    * Inicie a aplicação React:
        ```bash
        npm start
        ```
    *(A aplicação estará acessível em `http://localhost:3000`)*

4.  **Primeiro Uso:**
    * Abra `http://localhost:3000` no seu navegador. Como o banco de dados local (SQLite) é novo, você precisará de **registar um novo utilizador** para começar.
