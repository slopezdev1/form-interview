<!-- Challenge realizado para el proceso de entrevista de Minexus -->

## Tecnologías
- Vite + React v:18 para manejo del DOM
- Axios como cliente de peticiones HTTP
- Tanstack (React Query) como manejador de estados basado en las promesas de las peticiones
- React Hook Form como manejador de formularios
- Yup como validador de formularios
- JS Cookie como manejador de cookies
- i18n como manejador de lenguajes
- Leaflet como proovedor de Mapa embebido

## CSS
- Tailwind como paquete de clases
- Deadlessui como libreria de componentes
- Lucide como paquete de íconos
- Clsx como manipulador de clases

##  Arquitectura
- Se buscó realizar una estructura de carpetas basadas en componentes y contenedores. En dónde este último es el encargado del manejo de lógica general y también funciona para ruteo. Así como cada componente se encarga de lógica de estados, eventos, validaciones.
Se acompañó con servicios para el manejo de lógica comunicacional con las APIs, interfaces para el tipado de componentes y respuestas HTTP. Y por último una carpeta utils con funciones genericas reutilizables.

## API
https://countriesnow.space
https://nominatim.openstreetmap.org/

- Se utilizó countriesnow, API internacional para la selección de País y Ciudad. Los cuales se obtuvieron sus coordenadas mediante la API de Nominatim, para proveer al mapa embebido.

## Instalación

- Clonar repositorio git clone https://github.com/slopezdev1/form-interview.git
- Instalar dependencias - npm install
- Ejecutar servidor - npm run dev

## Objetivo

Este proyecto implementa un flujo de formulario que guía al usuario a través de los siguientes pasos:
- Ingreso de datos: Captura de información personal y dirección.
- Confirmación: Visualización de los datos ingresados junto con un mapa embebido.
- Finalización: Simulación de un mensaje de "éxito" o "error" según el resultado del proceso.
