#  Projeto: Criação de Personagem RPG

Este projeto é uma aplicação simples em **React + JSON Server**, que permite criar, visualizar e remover personagens de RPG.  
Cada personagem possui **nome, raça, habilidades específicas e imagem ilustrativa**.  
O objetivo é demonstrar a integração entre frontend e backend de forma prática e didática.

---

##  Tecnologias Utilizadas

- **Frontend:** React (Vite)
- **Backend:** JSON Server (simulação de banco de dados REST)
- **Estilos:** CSS personalizado
- **Imagens:** Ilustrações de raças 

---



##  Instalação e Execução

### 1️ Clonar o repositório

```bash
git clone https://github.com/seuusuario/cria-personagem.git
cd cria-personagem
```

### 2️ Instalar dependências

```bash
npm install
```

---

##  Como rodar o **backend (JSON Server)**

O backend usa o **JSON Server** para simular uma API REST.

### 1️ Instalar o JSON Server globalmente (caso ainda não tenha)

```bash
npm install -g json-server
```

### 2️ Executar o servidor

Entre na pasta cd backend no terminal:

npm install para instalar as dependencias

insira esse comando para rodar o backend:

 node index.js

🔹 Isso cria uma API acessível em:

```
http://localhost:3000/personagens
```

---

## 🖥️ Como rodar o **frontend (React)**

Em outro terminal entre na pasta frontend:

npm install para instalar as dependencias

insira esse comando para rodar o frontend:

npm run dev 

🔹 O React abrirá normalmente no navegador (geralmente em `http://localhost:5173`).

⚠️ **Importante:**  
Certifique-se de que o backend (JSON Server) esteja rodando na porta **3000**, pois o frontend faz requisições para `http://localhost:3000/personagens`.

---

## 🧩 Funcionalidades

 Criar personagem com:
- Nome  
- Raça (Humano, Elfo, Orc, etc.)  
- Até 3 habilidades específicas por raça  

 Visualizar imagem da raça escolhida  
 Uma tabela para visualizar personagens criados  
 Remover personagens criados  
 Mensagens de confirmação de criação e remoção 
 

---

## 🧙‍♂️ Personalização

Você pode facilmente adicionar **novas raças e habilidades** no arquivo `App.jsx`:

```js
const racas = ['humano', 'elfo', 'orc', 'anao', 'mago'];

const habilidadesPorRaca = {
  humano: ['Força', 'Resistência', 'Carisma'],
  elfo: ['Agilidade', 'Precisão', 'Magia'],
  orc: ['Brutalidade', 'Força', 'Fúria'],
  anao: ['Minerar', 'Resistência', 'Forja'],
  mago: ['Feitiço', 'Cura', 'Magia Arcana'],
};

const imagensPorRaca = {
  humano: humanoImg,
  elfo: elfoImg,
  orc: orcImg,
  anao: anaoImg,
  mago: magoImg,
};
```







