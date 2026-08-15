<div align="center">

# 🦖 DinoVault

### *A JSON-Powered Dinosaur & Fossil Information Website*

<img src="https://img.shields.io/badge/HTML-5-orange" />
<img src="https://img.shields.io/badge/CSS-3-blue" />
<img src="https://img.shields.io/badge/JavaScript-ES6-yellow" />
<img src="https://img.shields.io/badge/Data-JSON-green" />
<img src="https://img.shields.io/badge/Docker-Nginx-blue" />
<img src="https://img.shields.io/badge/Status-Completed-brightgreen" />

---

*"Explore the prehistoric world, one discovery at a time."*

</div>

---

# 📌 About This Repository

**DinoVault** is a web-based dinosaur and paleontology information website developed using **HTML, CSS, JavaScript, and JSON**. The project presents information about dinosaurs, fossils, prehistoric timelines, and dinosaur-related news in an organized and interactive interface.

Instead of placing the information directly inside the HTML files, the project stores its content in separate **JSON files**. JavaScript then retrieves the JSON data and dynamically displays it on the website.

The project also uses **Docker and Nginx** to containerize and serve the website.

The website allows users to:

* 🦖 Browse different dinosaur species and their information.
* 🦴 Explore fossil discoveries and paleontological information.
* 🕰️ View a prehistoric timeline.
* 📰 Browse dinosaur and paleontology-related news.
* 🏠 Explore information presented on the homepage.
* 📖 Learn more about the DinoVault project through the About page.
* 🔄 Dynamically load website content from JSON files using JavaScript.
* 🐳 Run the website inside a Docker container using Nginx.

---

# 🛠 Technologies Used

|       Technology      | Purpose                                                               |
| :-------------------: | :-------------------------------------------------------------------- |
|        🌐 HTML5       | Website structure and page layout                                     |
|        🎨 CSS3        | Styling, layout, and responsive design                                |
|      ⚡ JavaScript     | Dynamic content loading and client-side functionality                 |
|        🧩 JSON        | Stores the website's dinosaur, fossil, timeline, news, and other data |
|       🐳 Docker       | Application containerization                                          |
|        🌿 Nginx       | Web server used to serve the website inside Docker                    |
|     💻 PowerShell     | Command-line operations and Docker commands                           |
| 📝 Visual Studio Code | Project development and code editing                                  |

---

# 📂 Project Structure

```text
DinoVault/
│
├── data/
│   ├── about.json
│   ├── dinosaurs.json
│   ├── fossils.json
│   ├── home.json
│   ├── news.json
│   └── timeline.json
│
├── js/
│   ├── about.js
│   ├── dinosaurs.js
│   ├── fossils.js
│   ├── home.js
│   └── timeline.js
│
├── about.html
├── dinosaurs.html
├── fossils.html
├── index.html
├── timeline.html
├── style.css
│
├── .dockerignore
├── Dockerfile
└── README.md
```

---

# 📄 Main Pages

### 🏠 Home

The homepage introduces DinoVault and presents featured information, news, and other dinosaur-related content.

### 🦖 Dinosaurs

Displays information about different dinosaur species, including their names, genres/categories, platforms or related information where applicable, descriptions, and images.

### 🦴 Fossils

Provides information about fossil discoveries and paleontological findings.

### 🕰️ Timeline

Presents important periods and events from prehistoric history in a chronological format.

### ℹ️ About

Provides information about the DinoVault website and its purpose.

---

# 🗃️ JSON Data Structure

DinoVault separates its website content from its HTML structure by storing information inside JSON files.

For example:

```text
data/
├── dinosaurs.json
├── fossils.json
├── home.json
├── news.json
├── timeline.json
└── about.json
```

JavaScript uses the `fetch()` function to retrieve the JSON data and display it on the appropriate HTML pages.

This approach makes it easier to update the website's content without directly modifying the HTML structure.

---

# 🐳 Docker

DinoVault is containerized using **Docker** and served through **Nginx**.

The project uses a simple `Dockerfile`:

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

The Docker image can be built using:

```powershell
docker build -t dinovault .
```

The container can then be started using:

```powershell
docker run -d -p 8080:80 --name dinovault-container dinovault
```

After starting the container, the website can be accessed at:

```text
http://localhost:8080
```

---

# 🚀 How to Run the Project

## 1. Clone or Download the Repository

Download the project and open the project folder in **Visual Studio Code**.

## 2. Open the Terminal

Open a PowerShell terminal inside the project directory.

## 3. Build the Docker Image

```powershell
docker build -t dinovault .
```

## 4. Run the Docker Container

```powershell
docker run -d -p 8080:80 --name dinovault-container dinovault
```

## 5. Open the Website

Open your browser and visit:

```text
http://localhost:8080
```

---

# 🛑 Stopping the Container

To stop the running DinoVault container:

```powershell
docker stop dinovault-container
```

To start it again:

```powershell
docker start dinovault-container
```

To remove the container:

```powershell
docker rm dinovault-container
```

---