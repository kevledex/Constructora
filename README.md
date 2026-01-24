# Sitio Web - Constructora Velástegui

Este proyecto consiste en el diseño y desarrollo de un sitio web multipágina, moderno y responsivo para "Constructora Velástegui". El objetivo principal del sitio es la promoción y venta de proyectos inmobiliarios en Quito, Ecuador, ofreciendo una interfaz intuitiva para que los usuarios exploren las características, planos y ubicaciones de las viviendas.

El desarrollo se enfoca en una maquetación limpia utilizando **HTML5** semántico y **Tailwind CSS** para los estilos, asegurando una experiencia de usuario fluida tanto en dispositivos móviles como en escritorio.

## Autores
- **Kevin Ledesma** - [Perfil de GitHub](https://github.com/kevledex)
- **Kevin Cadena** - [Perfil de GitHub](https://github.com/kevincadena95)

## Tecnologías Utilizadas
- **Vite:** Entorno de desarrollo rápido.
- **HTML5:** Estructura semántica del sitio.
- **Tailwind CSS:** Framework de utilidad para estilos y diseño responsivo.
- **JavaScript (ES6):** Lógica para interactividad (menús móviles, carruseles).
- **Flowbite (o Componentes UI):** Implementación de carruseles y elementos interactivos.

## Estructura del Proyecto
El sitio web está compuesto por las siguientes secciones:

1.  **Inicio (`index.html`):** Página de aterrizaje con carrusel de imágenes principal, sección de ventajas competitivas y resumen de proyectos entregados.
2.  **Quiénes Somos (`quienes_somos.html`):** Información institucional, historia, misión y visión de la constructora.
3.  **Proyectos en Venta:**
    * **Ciprés Residencias (`cipres.html`):** Detalle del proyecto en Tumbaco con galería, ubicación (Google Maps), video promocional y planos.
    * **Villa Aventura (`villa_ventura.html`):** Detalle del conjunto residencial con recorrido virtual (Matterport), precios y características.
4.  **Contacto (`contacto.html`):** Formulario de contacto, información de la sede y mapa de ubicación general.

## Características Principales
- **Diseño Responsive:** Adaptable a móviles, tablets y escritorio (Mobile First approach).
- **Navegación Interactiva:** Menú de navegación con dropdowns y menú "hamburguesa" para móviles.
- **Galerías Multimedia:** Implementación de carruseles de imágenes (`data-carousel`) para mostrar los inmuebles.
- **Integración de Mapas y Video:** Uso de `iframes` para Google Maps y YouTube.
- **Recorridos Virtuales:** Integración de tecnología Matterport para visualización 3D.
- **Estilos Modernos:** Uso de tipografías como *Montserrat* y *Playfair Display*, con una paleta de colores sobria y profesional.

## Instalación y Ejecución

Si deseas correr este proyecto localmente, asegúrate de tener Node.js instalado.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/kevledex/Constructora

2. Instala las dependencias:
    ```bash
    npm install

3. Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev