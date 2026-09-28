# Portafolio — Anghello Fernando Almeida Campoverde

Portafolio web personal e interactivo, desarrollado con **HTML5, CSS3 y JavaScript**
sin frameworks ni dependencias externas de ejecución. Presenta información
académica y profesional, habilidades técnicas, proyectos destacados y un
Design System documentado con los componentes reales del sitio.

**Sitio publicado:** `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`
*(actualiza esta línea con tu URL real de GitHub Pages una vez publicado).*

---

## Tecnologías utilizadas

| Área          | Tecnología                                   |
|---------------|-----------------------------------------------|
| Estructura    | HTML5 semántico                                |
| Estilos       | CSS3 (Custom Properties, Flexbox, Grid, Media Queries) |
| Interactividad| JavaScript (Vanilla, sin frameworks)           |
| Tipografía    | Google Fonts — Fraunces, Public Sans, IBM Plex Mono |
| Control de versiones | Git y GitHub                            |
| Publicación   | GitHub Pages                                    |

## Estructura del proyecto

```
portfolio/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── assets/
    └── img/
        ├── avatar.jpg
        ├── favicon.svg
        └── projects/
            ├── easyrent.jpg
            ├── guiospro.jpg
            └── galaxias.jpg
```

> ⚠️ Las rutas dentro de `index.html` (`css/styles.css`, `js/script.js`,
> `assets/img/...`) dependen exactamente de esta estructura de carpetas.
> Si al subir el proyecto a GitHub las carpetas no coinciden, las imágenes,
> el CSS y el JavaScript no cargarán en GitHub Pages.

## Secciones incluidas

1. **Inicio** — presentación, foto y accesos directos.
2. **Sobre mí** — perfil profesional y formación.
3. **Habilidades** — tecnologías organizadas por categoría, con nivel de dominio justificado por proyecto real.
4. **Proyectos destacados** — 3 proyectos con problema resuelto, tecnologías y enlaces.
5. **Design System / Componentes** — paleta de color, tipografía, espaciado y componentes reutilizables (botones, badges, card, inputs, navbar).
6. **Contacto** — formulario validado y datos de contacto profesional.

## Funcionalidades JavaScript implementadas

- Menú de navegación responsive (con manejo de `aria-expanded`).
- Cambio de tema claro / oscuro con persistencia en `localStorage`.
- Resaltado del enlace activo del menú según la sección visible (`IntersectionObserver`).
- Filtro de proyectos por tecnología.
- Modal accesible con detalle de cada proyecto (cierre con `Esc`, clic fuera o botón).
- Validación de formulario de contacto en tiempo real, con envío mediante `mailto:`.
- Botón "volver arriba" con aparición condicional al hacer scroll.

## Cómo verlo localmente

No requiere instalación. Basta con abrir `index.html` en un navegador, o servir
la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8080
```

y visitar `http://localhost:8080`.

## Publicación en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio público en GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda: GitHub generará la URL pública en unos minutos.
5. Verifica en una ventana de incógnito que CSS, JavaScript e imágenes carguen,
   que la navegación funcione y que la consola no muestre errores.

## Personalización pendiente

- Reemplazar los enlaces de GitHub de cada proyecto (EasyRent, GUIOSPRO FLOSS Web, clasificador de galaxias) por el repositorio específico de cada uno; actualmente los tres apuntan al perfil general.
- Actualizar la URL de LinkedIn (`https://www.linkedin.com`) con el enlace real del perfil.
- Añadir enlaces de demo desplegada cuando estén disponibles (`Enlace al proyecto desplegado`).
- Actualizar la línea del "Sitio publicado" arriba con la URL real una vez publicado en GitHub Pages.

## Capturas de pantalla

*(Añade aquí 2-3 capturas del portafolio ya publicado: vista de inicio, vista
de proyectos y vista móvil, por ejemplo como `assets/img/screenshots/`.)*

---

Desarrollado por **Anghello Fernando Almeida Campoverde** — Ingeniería de Software.
Contacto: aalmeidac7@unemi.edu.ec
