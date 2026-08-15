<div align="center">

# 🎮 Game Codex

### *An Express-Based Game Collection Using JSON as a Mini Database*

<img src="https://img.shields.io/badge/Node.js-20-green" />
<img src="https://img.shields.io/badge/Express.js-4.x-blue" />
<img src="https://img.shields.io/badge/Data-JSON-orange" />
<img src="https://img.shields.io/badge/Docker-Containerized-blue" />
<img src="https://img.shields.io/badge/Status-Completed-brightgreen" />

---

*"A collection of games I have enjoyed over the years."*

</div>

---

# 📌 About This Repository

**Game Codex** is a simple web-based game collection application built using **Node.js, Express.js, HTML, CSS, JavaScript, and JSON**.

The project demonstrates how an Express server can use a **JSON file as a mini database** and provide the stored information to a frontend through an API endpoint.

The game information is stored in `games.json`. The Express server reads the JSON file and makes the data available through the `/api/games` API endpoint. JavaScript then retrieves the data from the API and dynamically displays the games on the webpage.

The application allows users to:

* 🎮 Browse a collection of favorite games.
* 📋 View each game's name, genre, platform, year, and description.
* 🖼️ Display game images when available.
* 🔢 View the total number of games in the collection.
* 🗃️ Store game information using a JSON file as a mini database.
* 🔌 Retrieve game information through an Express API.
* ⚡ Dynamically render game information using JavaScript.
* 🐳 Run the application inside a Docker container.

---

# 🛠 Technologies Used

|       Technology      | Purpose                                              |
| :-------------------: | :--------------------------------------------------- |
|       🟢 Node.js      | JavaScript runtime environment                       |
|     🚂 Express.js     | Backend web framework and API server                 |
|        🧩 JSON        | Used as a mini database for storing game information |
|        🌐 HTML5       | Structure of the frontend webpage                    |
|        🎨 CSS3        | Styling and layout                                   |
|      ⚡ JavaScript     | Fetches API data and dynamically displays game cards |
|       🐳 Docker       | Application containerization                         |
|     💻 PowerShell     | Command-line operations and Docker commands          |
| 📝 Visual Studio Code | Development and code editing                         |

---

# 📂 Project Structure

```text
Game-Codex/
│
├── games.json
├── index.html
├── package.json
├── package-lock.json
├── script.js
├── server.js
├── style.css
│
├── .dockerignore
├── Dockerfile
└── README.md
```

> **Note:** `node_modules/` is created locally by npm and is intentionally excluded from the Docker build through `.dockerignore`.

---

# 📄 Main Components

### 🎮 `index.html`

Contains the main frontend structure of the Game Codex website.

It provides the game collection area where the game cards are displayed.

### ⚡ `script.js`

Handles the frontend functionality.

It sends a request to:

```text
/api/games
```

and uses the returned JSON data to dynamically generate the game cards.

### 🚂 `server.js`

Contains the Express server.

It:

* Starts the Express application.
* Serves the frontend files.
* Reads `games.json`.
* Provides the `/api/games` API endpoint.
* Returns the game information as JSON.

### 🗃️ `games.json`

Acts as the project's **mini database**.

It contains information such as:

* Game ID
* Game name
* Genre
* Platform
* Release year
* Description
* Image

### 🎨 `style.css`

Contains the visual styling and layout of the Game Codex website.

---

# 🔌 API Endpoint

The project provides one main API endpoint:

```text
GET /api/games
```

When accessed, Express reads the contents of:

```text
games.json
```

and returns the game collection as JSON.

Example:

```text
http://localhost:3000/api/games
```

The frontend JavaScript retrieves this information using:

```javascript
fetch('/api/games')
```

---

# 🗃️ JSON as a Mini Database

Instead of using a traditional database such as MySQL, this project uses `games.json` as a simple data store.

The data follows a structure similar to:

```json
{
  "id": 1,
  "name": "Left 4 Dead 1",
  "genre": "Survival Horror",
  "platform": "PC, Xbox 360",
  "year": 2008,
  "description": "Cooperative zombie survival game where four survivors fight through hordes of infected."
}
```

This makes the project simple and suitable for demonstrating how **Express can read JSON data and provide it to a frontend application**.

---

# 🐳 Docker

The Game Codex application is containerized using **Docker** and runs using a **Node.js Alpine image**.

The application uses Express to serve the website and API.

The Dockerfile uses:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

# 🚀 How to Run the Project

## 1. Open the Project

Open the Game Codex project folder in **Visual Studio Code**.

## 2. Open the Terminal

Open a PowerShell terminal inside the project directory.

## 3. Build the Docker Image

```powershell
docker build -t game-codex .
```

## 4. Run the Docker Container

```powershell
docker run -d -p 3000:3000 --name game-codex-container game-codex
```

## 5. Open the Website

Visit:

```text
http://localhost:3000
```

## 6. Test the API

Visit:

```text
http://localhost:3000/api/games
```

---

# 🛑 Stopping the Container

To stop the application:

```powershell
docker stop game-codex-container
```

---

# ▶️ Starting the Container Again

To start the existing container:

```powershell
docker start game-codex-container
```

---

# 🗑️ Removing the Container

To remove the container:

```powershell
docker stop game-codex-container
docker rm game-codex-container
```

---

# 🎯 Project Purpose

The main purpose of **Game Codex** is to demonstrate how **Express.js can use a JSON file as a mini database and provide the stored data to a frontend application through an API**.

The project also demonstrates the use of **Docker** to package and run the Express application in a consistent environment.

The application demonstrates the basic flow of:

```text
JSON Data
    ↓
Express Server
    ↓
REST API
    ↓
JavaScript Fetch
    ↓
HTML Interface
```

---
