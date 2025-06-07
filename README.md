<div align="left" style="position: relative;">
<div align="center">
<pre>
 ████  ██████  ████  ██   ██  ████           ██   ██████ ████   
██     ██  ██ ██  ██ ███  ██ ██  ██         ████    ██   ██  ██ 
██ ███ ██████ ██  ██ ██ █ ██ ██  ██ ██████ ██  ██   ██   ██  ██ 
██  ██ ██ ██  ██  ██ ██  ███ ██  ██        ██████   ██   ██  ██ 
 ████  ██  ██  ████  ██   ██  ████         ██  ██ ██████ ████   
</pre>
</div>
<p align="left">
	<em><code>❯ Humanitarian Assistance Optimization System</code></em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/last-commit/Gronify/grono-aid?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

<details><summary>Table of Contents</summary>

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [📁 Project Structure](#-project-structure)
	- [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
	- [☑️ Prerequisites](#️-prerequisites)
	- [⚙️ Installation](#️-installation)
	- [🙌 Acknowledgments](#-acknowledgments)


</details>
<hr>

## 📍 Overview

GRONO-AID is a web-based platform built with TypeScript, NestJS, React, and MongoDB, designed to coordinate, monitor, and optimize the deployment of volunteers and robotic units in humanitarian aid missions. It provides a powerful backend and a user-friendly interface to support real-time decision-making and analytics.

---

## 👾 Features

<code>❯ 📊 Performance analytics of missions and units</code>
<code>❯ 🔐 Authentication & authorization layer with JWT</code>
<code>❯ 🧠 Optimization logic for aid distribution strategies</code>
<code>❯ 📂 Structured digital records stored in MongoDB</code>
<code>❯ ⚙️ Dynamic filtering, sorting, and export (CSV/JSON)</code>


---

## 📁 Project Structure

```sh
└── grono-aid/
    ├── README.md
    ├── backend
    │   ├── .env
    │   ├── .eslintrc.js
    │   ├── .gitignore
    │   ├── .prettierrc
    │   ├── README.md
    │   ├── nest-cli.json
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   │   ├── address
    │   │   ├── auth
    │   │   ├── center
    │   │   ├── constants
    │   │   ├── gifts
    │   │   ├── givement
    │   │   ├── human
    │   │   ├── roles
    │   │   ├── user
    │   │   ├── main.ts
    │   │   └── app.module.ts
    │   ├── test
    │   │   ├── app.e2e-spec.ts
    │   │   └── jest-e2e.json
    │   ├── tsconfig.build.json
    │   └── tsconfig.json
    └── frontend
        ├── .gitignore
        ├── README.md
        ├── package-lock.json
        ├── package.json
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo.svg
        │   ├── logo1.svg
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── App.css
        │   ├── App.test.tsx
        │   ├── App.tsx
        │   ├── components
        │   ├── constants
        │   ├── core
        │   ├── hooks
        │   ├── index.css
        │   ├── index.tsx
        │   ├── pages
        │   ├── react-app-env.d.ts
        │   ├── reportWebVitals.ts
        │   └── setupTests.ts
        ├── tailwind.config.js
        └── tsconfig.json
```


### 📂 Project Index

- client/	Frontend app using React + TS
- server/	API, auth, DB access (NestJS + Mongo)

---
## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with grono-aid, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### ⚙️ Installation

Install grono-aid using one of the following methods:

**Build from source:**

1. Clone the grono-aid repository:
```sh
❯ git clone https://github.com/Gronify/grono-aid
```

2. Navigate to the project directory:
```sh
❯ cd grono-aid
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

### 🙌 Acknowledgments

This project was developed as part of an initiative to streamline and improve humanitarian aid delivery systems.  
Special thanks to all field workers, logistics coordinators, and stakeholders who provided input and support.

---
