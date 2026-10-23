# Be3D

Sitio de Be3D, impresión 3D a medida. Es una sola página estática (`index.html`), sin build ni dependencias que instalar.

## Qué incluye

- Portada, servicios, materiales y proceso de trabajo.
- Conversor de `.3mf` y `.obj` a STL. Se procesa en el navegador: el archivo no sale de la computadora del visitante. Los `.step` / `.stp` no se pueden convertir ahí; la página invita a escribir por contacto.
- Portada con visor 3D del soporte de celular `Base_Celu_1` (STL en `assets/Base_Celu_1.stl`, embebido en `index.html`).
- Conversor: se sube el archivo a la izquierda y el visor 3D aparece a la derecha, con medidas, volumen y peso de referencia en PLA.
- Formulario de contacto que envía la consulta por mail a `consultas@be3d.com.ar` (función en `functions/api/contact.js`). Si el envío falla, ofrece copiar el mensaje o mandarlo por WhatsApp.

## Datos a completar

En `index.html`, buscá el bloque `CONTACT` al principio del script. El email ya está cargado; el WhatsApp (solo números, con código de país) está vacío y por eso no se muestra todavía.

## Publicarlo

Con GitHub Pages: en el repo, *Settings → Pages*, elegí la rama `main` y la carpeta `/ (root)`.

## Librerías

Se cargan desde cdnjs: three.js r128 (visor) y JSZip 3.10.1 (lectura de 3MF). Las tipografías vienen de Google Fonts.

## Recepción de consultas (Cloudflare + Resend)

1. **Recibir mails en `consultas@be3d.com.ar`:** en Cloudflare, *Email → Email Routing* del dominio. Activalo, creá la dirección `consultas` y destinala a `clickpymes@gmail.com` (hay que confirmar el mail que llega a Gmail). Cloudflare agrega solo los registros MX y SPF.
2. **Enviar desde el formulario:** creá una cuenta en [Resend](https://resend.com), agregá el dominio `be3d.com.ar` (ofrece configurar los DNS de Cloudflare automáticamente) y generá una API key.
3. En el proyecto de Pages: *Settings → Variables and Secrets* → agregá `RESEND_API_KEY` como secreto con esa clave. Después hacé un nuevo deploy.

Variables opcionales: `CONTACT_TO` (por defecto `consultas@be3d.com.ar`) y `CONTACT_FROM` (por defecto `Be3D Web <web@be3d.com.ar>`).
