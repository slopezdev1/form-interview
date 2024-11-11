<!-- Challenge realizado para el proceso de entrevista de Minexus -->

## Tecnologías
- Vite + React v:18 para manejo del DOM
- Axios como cliente de peticiones HTTP
- Tanstack (React Query) como manejador de estados basado en las promesas de las peticiones

## CSS
- Tailwind como paquete de clases

##  Arquitectura
- Se buscó realizar una estructura de carpetas basadas en componentes y contenedores. En dónde este último es el encargado del manejo de lógica general y también funciona para ruteo. Así como cada componente se encarga de lógica de estados, eventos, validaciones.
Se acompañó con servicios para el manejo de lógica comunicacional con la API, interfaces para el tipado de componentes y respuestas HTTP. Y por último una carpeta utils con funciones genericas reutilizables.

## API
https://datosgobar.github.io/georef-ar-api/open-api/

- Se utilizó una API pública local del gobierno. Ya que las internacionales requerian API_KEYS pagas. Por esto se seteo por default la opción 'PAÍS' en el formulario.

## Instalación

- Clonar repositorio git clone
- Instalar dependencias - npm install
- Ejecutar servidor - npm run dev