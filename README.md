# Rick & Morty UI Component Library

Este proyecto es una prueba técnica para Frontend Developer. Consiste en un **Angular Workspace** que contiene una librería de componentes UI reutilizables (`ui-lib`) y una aplicación demo (`demo-app`) que la consume para explorar la API de Rick and Morty.

## 🏗️ Arquitectura del Proyecto

El workspace está dividido en dos proyectos principales:
- **`projects/ui-lib`**: Librería de componentes standalone desarrollada con Angular 21, TypeScript estricto y Tailwind CSS v3.
- **`projects/demo-app`**: Aplicación que consume la librería. Se encarga de la lógica de negocio, el estado global (mediante Signals) y las peticiones HTTP.

## 🚀 Requisitos Previos

- Node.js (v20 o superior)
- Angular CLI (`npm install -g @angular/cli`)

## 🛠️ Instalación y Ejecución

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install

Levanta la aplicación demo
ng serve demo-app

Abre tu navegador en http://localhost:4200

