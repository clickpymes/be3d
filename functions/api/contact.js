// Cloudflare Pages Function: recibe el formulario y lo envía por mail con Resend.
// Variables (Settings > Variables and Secrets del proyecto de Pages):
//   RESEND_API_KEY  (secreto, obligatoria)
//   CONTACT_TO      (opcional, por defecto consultas@be3d.com.ar)
//   CONTACT_FROM    (opcional, por defecto "Be3D Web <web@be3d.com.ar>")

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
const clean = (v, max) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);
const oneLine = (v) => v.replace(/[\r\n]+/g, " ");

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return json({ error: "bad_request" }, 400); }

  if (d.website) return json({ ok: true }); // campo trampa para bots

  const name = oneLine(clean(d.name, 100));
  const contact = oneLine(clean(d.contact, 150));
  const type = oneLine(clean(d.type, 60));
  const material = oneLine(clean(d.material, 60));
  const qty = oneLine(clean(d.qty, 10));
  const detail = clean(d.detail, 3000);
  if (!name || !contact || !detail) return json({ error: "missing_fields" }, 400);

  if (!env.RESEND_API_KEY) return json({ error: "not_configured" }, 500);

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const text = [
    `Nombre: ${name}`,
    `Contacto: ${contact}`,
    `Trabajo: ${type}`,
    `Material: ${material}`,
    `Cantidad: ${qty}`,
    "",
    detail,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.CONTACT_FROM || "Be3D Web <web@be3d.com.ar>",
      to: [env.CONTACT_TO || "consultas@be3d.com.ar"],
      subject: `Consulta web: ${type} - ${name}`,
      text,
      ...(isEmail ? { reply_to: contact } : {}),
    }),
  });
  if (!res.ok) return json({ error: "send_failed" }, 502);
  return json({ ok: true });
}
