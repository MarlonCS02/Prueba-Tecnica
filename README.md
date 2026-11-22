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

---

### 2. `DEVELOPMENT_LOG.md` (En la raíz de `my-workspace`)

Crea este archivo en la raíz y pega lo siguiente. (He puesto ejemplos basados en lo que hemos hablado, siéntete libre de expandirlo):

```markdown
# Bitácora de Desarrollo - Prueba Técnica Frontend

Este documento detalla el proceso de desarrollo, las decisiones tomadas, los retos encontrados y el uso de herramientas de IA durante la realización de la prueba técnica.

## 1. Retos y Soluciones

### Reto 1: Configuración de Tailwind CSS en una Librería Angular
**Problema:** Al principio, los estilos de Tailwind no se aplicaban a los componentes dentro de `ui-lib` cuando se consumían en `demo-app`. 
**Solución:** Se descubrió que el archivo `tailwind.config.js` en la raíz solo estaba escaneando la carpeta de la demo. Se modificó la propiedad `content` para incluir ambas rutas:
```javascript
content: [
  "./projects/ui-lib/src/**/*.{html,ts}",
  "./projects/demo-app/src/**/*.{html,ts}",
]
