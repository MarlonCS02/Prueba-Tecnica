# Bitácora de Desarrollo (Development Log)

Este documento detalla el proceso de desarrollo de la prueba técnica, incluyendo las decisiones de diseño tomadas, los retos encontrados (y cómo se resolvieron) y la transparencia sobre el uso de herramientas de Inteligencia Artificial.

## 1. Retos y Soluciones

### Reto 1: Configuración de Tailwind CSS en una Librería Angular
**Problema:** Al principio, los estilos de Tailwind no se aplicaban a los componentes dentro de `ui-lib` cuando se consumían en `demo-app`. La app compilaba, pero los componentes se veían sin estilos.
**Solución:** Se descubrió que el archivo `tailwind.config.js` en la raíz solo estaba escaneando la carpeta de la demo. Se modificó la propiedad `content` para incluir ambas rutas, asegurando que el JIT de Tailwind compilara las clases usadas dentro de la librería:
```javascript
content: [
  "./projects/ui-lib/src/**/*.{html,ts}",
  "./projects/demo-app/src/**/*.{html,ts}",
]