/* Formulario de consultas de /contacto/.
   Sin JavaScript, el formulario se envía igual (la función responde con una página simple).
   Con JavaScript: se oculta si el envío no está configurado y envía sin recargar la página. */
(function () {
  var seccion = document.querySelector('.consulta');
  var form = seccion && seccion.querySelector('form');
  if (!form || !window.fetch) return;

  var estado = form.querySelector('.form-estado');
  var boton = form.querySelector('button[type="submit"]');
  var textoBoton = boton.textContent;
  var url = form.getAttribute('action');

  function avisar(texto, tipo) {
    estado.textContent = texto;
    estado.setAttribute('data-tipo', tipo || '');
  }

  // Si la función no responde o no está configurada, el formulario no se muestra.
  fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : { listo: false }; })
    .catch(function () { return { listo: false }; })
    .then(function (d) { seccion.hidden = !(d && d.listo); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var datos = {};
    new FormData(form).forEach(function (valor, clave) { datos[clave] = valor; });

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    avisar('', '');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (d) {
        if (d && d.ok) {
          form.reset();
          avisar('Consulta enviada. La respuesta va a llegar al email indicado.', 'ok');
        } else if (d && d.error === 'datos') {
          avisar('Para enviar la consulta hacen falta un email válido y una pregunta.', 'error');
        } else {
          avisar('No se pudo enviar la consulta en este momento.', 'error');
        }
      })
      .catch(function () { avisar('No se pudo enviar la consulta en este momento.', 'error'); })
      .then(function () { boton.disabled = false; boton.textContent = textoBoton; });
  });
})();
