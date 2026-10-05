/* Consultas del formulario de /contacto/ → mail del equipo, enviado con Resend.

   Variables de entorno (Vercel → Settings → Environment Variables):
     RESEND_API_KEY      clave de la API de Resend
     CONTACTO_EMAIL      mail que recibe las consultas
     CONTACTO_REMITENTE  opcional. Remitente con dominio verificado en Resend,
                         por ejemplo "BlindRoute <consultas@dominio.com>".
                         Sin dominio verificado se usa onboarding@resend.dev, que solo
                         puede enviar al mail con el que se creó la cuenta de Resend.

   GET  → { listo: true|false }: la página muestra el formulario solo si está configurado.
   POST → recibe nombre (opcional), email y mensaje, como JSON (con JavaScript)
          o como formulario común (sin JavaScript, responde con una página simple). */

const LIMITE = { nombre: 80, email: 120, mensaje: 2000 };

const limpiar = (valor, max) => String(valor == null ? '' : valor).replace(/\r/g, '').trim().slice(0, max);
const unaLinea = (texto) => texto.replace(/\s+/g, ' ');
const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

function leerCuerpo(req) {
  const cuerpo = req.body;
  if (cuerpo && typeof cuerpo === 'object') return cuerpo;
  if (typeof cuerpo === 'string') {
    try { return JSON.parse(cuerpo); } catch (e) { return Object.fromEntries(new URLSearchParams(cuerpo)); }
  }
  return {};
}

function pagina(titulo, texto) {
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1"><title>' + titulo + ' · BlindRoute</title>' +
    '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0D1117;color:#E6EDF3;font:400 1.0625rem/1.6 system-ui,sans-serif;padding:24px}' +
    'main{max-width:480px}h1{color:#fff;font-size:1.75rem;margin:0 0 12px}a{display:inline-flex;align-items:center;min-height:48px;margin-top:16px;color:#4DA6FF;font-weight:600}</style>' +
    '</head><body><main><h1>' + titulo + '</h1><p>' + texto + '</p><a href="/contacto/">Volver a contacto</a></main></body></html>';
}

module.exports = async function handler(req, res) {
  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_EMAIL;
  const listo = Boolean(clave && destino);

  if (req.method === 'GET') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ listo: listo });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'metodo' });
  }

  const esJson = String(req.headers['content-type'] || '').includes('application/json');
  const responder = (estado, ok, error, titulo, texto) => {
    if (esJson) return res.status(estado).json(ok ? { ok: true } : { ok: false, error: error });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(estado).send(pagina(titulo, texto));
  };

  const datos = leerCuerpo(req);
  // Campo trampa: las personas no lo ven; si viene completo, es un robot. Se responde como si nada.
  if (limpiar(datos.web, 200)) return responder(200, true, null, 'Consulta enviada', 'Gracias. La respuesta va a llegar al email indicado.');

  const nombre = unaLinea(limpiar(datos.nombre, LIMITE.nombre));
  const email = unaLinea(limpiar(datos.email, LIMITE.email));
  const mensaje = limpiar(datos.mensaje, LIMITE.mensaje);

  if (!emailValido(email) || mensaje.length < 5) {
    return responder(400, false, 'datos', 'Faltan datos', 'Para enviar la consulta hacen falta un email válido y una pregunta.');
  }
  if (!listo) {
    return responder(503, false, 'sin-configurar', 'Consultas no disponibles', 'El envío de consultas todavía no está disponible.');
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + clave, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACTO_REMITENTE || 'BlindRoute <onboarding@resend.dev>',
        to: [destino],
        reply_to: email,
        subject: 'Consulta desde la web' + (nombre ? ' · ' + nombre : ''),
        text: 'Nombre: ' + (nombre || '(sin nombre)') + '\nEmail: ' + email + '\n\n' + mensaje
      })
    });
    if (!r.ok) {
      console.error('Resend respondió', r.status, await r.text());
      return responder(502, false, 'envio', 'No se pudo enviar', 'No se pudo enviar la consulta en este momento.');
    }
    return responder(200, true, null, 'Consulta enviada', 'Gracias. La respuesta va a llegar al email indicado.');
  } catch (e) {
    console.error('Error al enviar la consulta', e);
    return responder(502, false, 'envio', 'No se pudo enviar', 'No se pudo enviar la consulta en este momento.');
  }
};
