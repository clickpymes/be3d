# Be3D

Sitio de Be3D, impresión 3D a medida. Es una sola página estática (`index.html`), sin build ni dependencias que instalar.

## Qué incluye

- Portada, servicios, materiales y proceso de trabajo.
- Conversor de `.3mf` y `.obj` a STL. Se procesa en el navegador: el archivo no sale de la computadora del visitante. Los `.step` / `.stp` no se pueden convertir ahí; la página invita a escribir por contacto.
- Visor 3D del modelo cargado, con medidas, volumen y peso de referencia en PLA.
- Formulario de contacto que arma el mensaje para enviarlo por WhatsApp o copiarlo y mandarlo por mail.

## Datos a completar

En `index.html`, buscá el bloque `CONTACT` al principio del script y poné el WhatsApp (solo números, con código de país) y el email reales. Hoy tienen valores de ejemplo.

## Publicarlo

Con GitHub Pages: en el repo, *Settings → Pages*, elegí la rama `main` y la carpeta `/ (root)`.

## Librerías

Se cargan desde cdnjs: three.js r128 (visor) y JSZip 3.10.1 (lectura de 3MF). Las tipografías vienen de Google Fonts.
