Bitácora de Desarrollo (Development Log)
Este documento detalla el proceso de desarrollo de la prueba técnica, incluyendo las decisiones de diseño tomadas, los retos encontrados (y cómo se resolvieron) y la transparencia sobre el uso de herramientas de Inteligencia Artificial.

1. Retos y Soluciones
Reto 1: Configuración de Tailwind CSS en una Librería Angular
Problema: Al principio, los estilos de Tailwind no se aplicaban a los componentes dentro de ui-lib cuando se consumían en demo-app. La app compilaba, pero los componentes se veían sin estilos.
Solución: Se descubrió que el archivo tailwind.config.js en la raíz solo estaba escaneando la carpeta de la demo. Se modificó la propiedad content para incluir ambas rutas, asegurando que el JIT de Tailwind compilara las clases usadas dentro de la librería:
content: [
"./projects/ui-lib/src//*.{html,ts}",
"./projects/demo-app/src//*.{html,ts}",
]

Reto 2: Convenciones de nombres en Angular 21
Problema: El CLI de Angular 21 generó el componente principal con la nueva convención de nombres: app.ts y app.html (sin el sufijo .component). Al intentar mezclar esta convención con la clásica (app.component.ts), el compilador lanzó errores de templateUrl porque no encontraba el archivo HTML.
Solución: Se adoptó la convención moderna de Angular 21. Se renombró la clase principal a App y se aseguró de que el archivo main.ts importara correctamente import { App } from './app/app';. Esto mantiene el código alineado con las prácticas más recientes del framework.

Reto 3: Filtro de Status en la API de Rick & Morty
Problema: El enunciado sugería un filtro por status. Sin embargo, la API de Rick & Morty devuelve un error 400 Bad Request si se envía el parámetro ?status= a los endpoints de episodios (/episode) o locaciones (/location). Solo el endpoint de personajes (/character) lo soporta.
Solución: En el ResourceService, se añadió una validación para solo inyectar el parámetro status si el recurso activo es characters. En la vista, el <ui-select> del filtro se deshabilita dinámicamente usando [disabled]="svc.resource() !== 'characters'" para dar un feedback visual claro al usuario de que el filtro no aplica en ese contexto.

Reto 4: Tipado estricto en la tabla genérica
Problema: El componente <ui-table> debía ser genérico para aceptar cualquier tipo de dato (Character, Episode, Location). Al intentar leer las propiedades de la fila usando un key dinámico, el compilador de TypeScript exigía un tipo, y usar any estaba estrictamente prohibido por la prueba.
Solución: Se implementó el componente usando un tipo genérico <T>. Para acceder a las propiedades dinámicas en el template, se realizó un cast seguro a Record<string, unknown> en el método getCell(). Esto satisface al compilador sin recurrir a any, manteniendo la seguridad de tipos.

2. Uso de Herramientas de IA
El desarrollo de esta prueba se apoyó en asistentes de IA para acelerar la estructuración inicial, pero todo el código fue revisado, comprendido y adaptado. A continuación, la documentación exigida:

Prompt 1: Generación de la estructura del componente <ui-table>
El prompt utilizado: "Genera un componente Angular standalone ui-table con Tailwind, que acepte un arreglo genérico T[] y columnas, que muestre skeleton loading y emita acciones de view y delete sin usar any".

Qué se aceptó y por qué: Se aceptó la estructura del componente y el uso del nuevo flujo de control @for. La lógica de skeletonRows usando Array.from({ length: 5 }) fue muy útil para simular las filas de carga de forma limpia.

Qué se rechazó o modificó: La IA sugirió inicialmente usar any para el tipo de dato de la fila y para los eventos. Esto fue rechazado inmediatamente para cumplir con la regla de "cero any" de la prueba. Se modificó el código para usar un tipo genérico <T> y se implementó el método getCell() con un cast seguro a Record<string, unknown>.

Prompt 2: Gestión del estado con Signals
El prompt utilizado: "¿Cómo manejar el estado de un recurso (loading, error, data) usando la nueva API de Signals en Angular y llamadas HTTP?"

Qué se aceptó y por qué: Se aceptó la recomendación de crear un servicio con providedIn: 'root' que utilice signal() para el estado y computed() para las URLs de la API. Es la forma moderna y más limpia de manejar el estado sin depender de RxJS para todo.

Qué se rechazó o modificó: La IA sugirió usar la función effect() para disparar la petición HTTP cada vez que cambiara el recurso. Rechacé esa idea porque los effect() deben usarse con precaución (principalmente para sincronizar con APIs externas) y no para lógica de flujo principal. En su lugar, implementé métodos explícitos (load(), setResource()) que actualizan el signal y llaman a la API directamente, lo cual es más predecible, fácil de leer y de testear.

3. Decisiones de Diseño
Separación de responsabilidades: La capa de presentación (los componentes de ui-lib) no conoce la existencia de la API. Toda la lógica de red y el estado global viven en ResourceService dentro de demo-app.

Uso de input.required(): En el componente ui-card, el título se definió como requerido para evitar renderizar cards vacías por error.

Modal reutilizando <ui-card>: En lugar de crear un componente modal desde cero, se reutilizó el componente de la tarjeta envuelto en un div fijo, demostrando el poder de la proyección de contenido (ng-content).

