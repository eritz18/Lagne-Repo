# 🔮 The Celestial Oracle

### *A Mystical Mythology & Fortune-Telling Web Application*

<img src="https://img.shields.io/badge/Technology-HTML%2FCSS%2FJavaScript-orange" />
<img src="https://img.shields.io/badge/Data-JSON-blue" />
<img src="https://img.shields.io/badge/Framework-Bootstrap%205.3.3-purple" />
<img src="https://img.shields.io/badge/Web%20Server-Nginx-green" />
<img src="https://img.shields.io/badge/Docker-Containerized-blue" />
<img src="https://img.shields.io/badge/Project-Celestial%20Oracle-success" />
<img src="https://img.shields.io/badge/Status-Completed-brightgreen" />
<img src="https://img.shields.io/badge/Author-Jehni%20Eritz%20H.%20Lagne-purple" />

---

*"Unveil your mythological essence, discover your destiny, and consult the stars."*

---

# 📌 About This Repository

**The Celestial Oracle** is a mystical, mythology-inspired web application that allows users to explore their celestial identity through their birth month and interact with different Oracle features.

The website combines mythology, astrology-inspired readings, elemental realms, mystical sigils, Oracle cards, lore, wisdom, fortunes, prophecies, and compatibility readings into one interactive experience.

The application allows users to:

- 🔮 Discover their celestial identity based on their birth month.
- ✨ Receive personalized Oracle readings and fortunes.
- 🌙 Explore their destiny and mythological essence.
- 🌌 Learn about the **Four Celestial Realms**.
- 📜 Explore the lore and legends of the Oracle.
- 🪄 Browse the **Sigil Encyclopedia**.
- 🃏 Interact with Oracle Cards.
- 💫 Compare celestial compatibility between two birth months.
- 📖 Explore the Temple of Wisdom.
- ❓ Browse frequently asked questions through the Sacred FAQ.
- 🌟 Discover daily readings, prophecies, secrets, and other Oracle content.
- 🗂️ Load application content from `.json` files instead of a traditional database.
- 🐳 Run the entire website inside a Docker container using Nginx.

---

# 🛠️ Technologies Used

| **Technology**      | **Purpose**                                                  |
| ------------------- | ------------------------------------------------------------ |
| 🌐 HTML5            | Website structure and page content                           |
| 🎨 CSS3             | Custom styling and visual design                             |
| ⚡ JavaScript        | Interactive functionality and dynamic content                |
| 🗂️ JSON            | Stores Oracle data and application content                   |
| 🅱️ Bootstrap 5.3.3 | Responsive layout and UI components                          |
| 🔤 Google Fonts     | Cinzel, Cinzel Decorative, and Cormorant Garamond typography |
| 🌐 Nginx            | Web server used inside the Docker container                  |
| 🐳 Docker           | Application containerization                                 |
| 💻 PowerShell       | Command-line operations                                      |
| 🖥️ Docker Desktop  | Container and image management                               |

---

# ✨ Main Features

## 🔮 Oracle Reading

Users can select their birth month to receive a celestial reading based on the Oracle's mythology and data.

The Oracle connects birth months with mystical creatures, realms, symbols, fortunes, and other celestial information.

---

## 🌟 Destiny

The **Destiny** page allows users to discover their mythological identity and explore what their celestial nature represents.

---

## 🌌 Celestial Order

The **Celestial Order** introduces the four elemental realms:

- 🔥 **Ignis**
- 🌱 **Terra**
- 🌬️ **Aether**
- 🌊 **Abyss**

Each realm represents different qualities, virtues, shadows, and mystical characteristics.

---

## 📜 Lore & Legends

The **Lore** section contains the mythology and history surrounding the Celestial Oracle.

It also contains the Chronicle of the Oracle's creatures and their associated lore.

---

## 🪄 Sigil Encyclopedia

The **Sigil Encyclopedia** contains the mystical symbols associated with the Oracle.

Users can filter sigils by:

- Element
- Rarity

Available rarity classifications include:

- Common
- Uncommon
- Rare
- Mythic

---

## 🏛️ Temple of Wisdom

The **Temple of Wisdom** serves as the Oracle's knowledge center.

It provides information about:

- The history of the Oracle
- How readings work
- The meaning of sigils
- Beginner guidance
- Common questions
- Oracle knowledge and teachings

---

## 🃏 Oracle Cards

The **Oracle Cards** page allows users to explore the mystical card system of the Celestial Oracle.

---

## 💫 Celestial Compatibility

The **Compatibility** feature compares two birth months and determines their celestial connection.

It can be used to explore compatibility between different relationships and celestial identities.

---

## ❓ Sacred FAQ

The **FAQ** page provides answers to frequently asked questions about the Celestial Oracle and how its features work.

---

# 📂 Project Structure

```text
08-04-26_MIDTERMS_JsonDockerProject/
│
├── index.html
├── destiny.html
├── order.html
├── lore.html
├── faq.html
├── sigils.html
├── wisdom.html
├── cards.html
├── compatibility.html
│
├── Celestial Oracle.png
│
├── css/
│   └── style.css
│
├── js/
│   ├── common.js
│   ├── compatibility.js
│   ├── daily-oracle.js
│   ├── destiny.js
│   ├── easter-eggs.js
│   ├── faq.js
│   ├── lore.js
│   ├── oracle-cards.js
│   ├── oracle-modal.js
│   ├── order.js
│   ├── prophecy.js
│   ├── sigils.js
│   └── wisdom.js
│
├── data/
│   ├── cards.json
│   ├── compatibility.json
│   ├── daily.json
│   ├── faq.json
│   ├── fortunes.json
│   ├── lore.json
│   ├── months.json
│   ├── prophecies.json
│   ├── realms.json
│   ├── secrets.json
│   ├── sigils.json
│   └── wisdom.json
│
├── images/
│   ├── creatures/
│   │   ├── January.png
│   │   ├── February.png
│   │   ├── March.png
│   │   ├── April.png
│   │   ├── May.png
│   │   ├── June.png
│   │   ├── July.png
│   │   ├── August.png
│   │   ├── September.png
│   │   ├── October.png
│   │   ├── November.png
│   │   └── December.png
│   │
│   └── symbols/
│       ├── January.png
│       ├── February.png
│       ├── March.png
│       ├── April.png
│       ├── May.png
│       ├── June.png
│       ├── July.png
│       ├── August.png
│       ├── September.png
│       ├── October.png
│       ├── November.png
│       └── December.png
│
├── .dockerignore
├── Dockerfile
└── README.md