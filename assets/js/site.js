/* BlindRoute · sitio v3
   Todo el contenido se lee sin JavaScript. Este archivo solo agrega:
   encabezado fijo, la escena de "cómo funciona" que cambia con el scroll, revelado y el botón que habla. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var top = document.querySelector('.top');
  var avance = document.querySelector('.avance');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      if (top) top.classList.toggle('fijo', window.scrollY > 24);
      if (avance) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        avance.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var hasIO = 'IntersectionObserver' in window;

  /* revelado al scroll */
  var items = document.querySelectorAll('.reveal');
  if (!reduce && hasIO && items.length) {
    root.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* escena de "cómo funciona": cambia según el paso que esté en el centro de la pantalla */
  var demo = document.querySelector('.demo');
  var pasos = demo ? [].slice.call(demo.querySelectorAll('.paso')) : [];
  if (demo && pasos.length && !reduce && hasIO) {
    root.classList.add('js');
    demo.setAttribute('data-step', '1');
    pasos[0].classList.add('activo');
    /* se observa el título de cada paso, no la caja entera: así el paso activo es siempre
       el que se está leyendo. En celular la franja queda debajo de la escena fija (que llega
       hasta la mitad de la pantalla), para que el texto activo nunca quede tapado. */
    var po = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var paso = e.target.closest('.paso');
        pasos.forEach(function (p) { p.classList.toggle('activo', p === paso); });
        demo.setAttribute('data-step', paso.getAttribute('data-n'));
      });
    }, { rootMargin: window.matchMedia('(min-width:900px)').matches ? '-45% 0px -35% 0px' : '-52% 0px -20% 0px', threshold: 0 });
    pasos.forEach(function (p) { po.observe(p.querySelector('h3') || p); });
  }

  /* ejemplo en perspectiva: la persona pide el destino, los beacons la ubican, se calcula la ruta y una voz la guía.
     Los metros salen de la distancia real que falta hasta el giro. Con movimiento reducido queda el estado final. */
  var rec = document.querySelector('.rec3d');
  if (rec) {
    var pausa = rec.querySelector('.pausa');
    var pausada = false;
    var persona = rec.querySelector('.persona');
    var estB = rec.querySelector('.estado b');
    var estS = rec.querySelector('.estado span');
    var fases = [].slice.call(rec.querySelectorAll('.fase'));
    var rutaPath = rec.querySelector('.ruta3 path');

    var LARGO = 412, TRAMO1 = 309, VEL = 40, UM = TRAMO1 / 20;   // 20 m en el primer tramo
    var T_PEDIR = 2.4, T_UBICAR = 3.0, T_RUTA = 2.4, T_GIRO = 1.4, T_FIN = 3.4;
    var A = T_PEDIR, B = A + T_UBICAR, C = B + T_RUTA;
    var D = C + TRAMO1 / VEL, E = D + T_GIRO, F = E + (LARGO - TRAMO1) / VEL, TOTAL = F + T_FIN;
    var ultimo = { fase: 0, b: '', s: '', act: -1 };

    var metros = function (n) { return n + (n === 1 ? ' metro' : ' metros'); };
    var suave = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
    /* arranca y frena con suavidad, pero sin quedarse lento en el medio */
    var camina = function (x) { return 0.6 * x + 0.4 * suave(x); };

    var aplicar = function (t) {
      var fase = t < A ? 1 : t < B ? 2 : t < C ? 3 : 4;
      var d = 0, b, s;
      if (t >= C) d = t < D ? TRAMO1 * camina((t - C) / (D - C)) : t < E ? TRAMO1 : t < F ? TRAMO1 + (LARGO - TRAMO1) * camina((t - E) / (F - E)) : LARGO;
      var andando = (t >= C && t < D) || (t >= E && t < F);

      if (fase === 1) { b = 'Ir a terminal 4'; s = 'Elección del destino'; }
      else if (fase === 2) { b = 'Ubicando…'; s = 'Con la señal de 3 beacons'; }
      else if (fase === 3) { b = 'Calculando la ruta…'; s = 'Mejor camino'; }
      else if (t < D) {
        var falta = (TRAMO1 - d) / UM;
        if (falta > 3) { b = 'Seguí derecho'; s = metros(Math.ceil(falta)); }
        else { b = 'Girá a la derecha'; s = ''; }   // el giro se indica solo, sin distancia
      }
      else if (t < E) { b = 'Girá a la derecha'; s = ''; }
      else if (t < F) { b = 'Seguí derecho'; s = metros(Math.max(1, Math.ceil((LARGO - d) / UM))); }
      else { b = 'Llegaste'; s = 'Terminal 4'; }

      if (fase !== ultimo.fase) { rec.setAttribute('data-fase', fase); ultimo.fase = fase; }
      var act = fase - 1;
      if (act !== ultimo.act) { fases.forEach(function (f, i) { f.classList.toggle('activa', i === act); }); ultimo.act = act; }
      if (b !== ultimo.b) { estB.textContent = b; ultimo.b = b; }
      if (s !== ultimo.s) { estS.textContent = s; ultimo.s = s; }

      /* la ruta son dos tramos rectos: se mueve con transform, que va por la GPU */
      var px = d <= TRAMO1 ? 181 : 181 + (d - TRAMO1);
      var py = d <= TRAMO1 ? 385 - d : 76;
      persona.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
      var ruta = fase < 3 ? 1 : fase === 3 ? 1 - suave((t - B) / T_RUTA) : 0;
      if (rutaPath) rutaPath.style.strokeDashoffset = ruta.toFixed(3);   // directo en el trazo, sin tocar variables del padre
      rec.classList.toggle('camina', andando);
      rec.classList.toggle('reinicia', t > TOTAL - 0.7);
    };

    rec.irA = aplicar;   // para probar la secuencia en un instante concreto
    if (!reduce && 'IntersectionObserver' in window && 'requestAnimationFrame' in window) {
      rec.classList.add('vivo');
      var t = 0, previo = 0, corriendo = false, visible = false;
      var cuadro = function (ahora) {
        if (!corriendo) return;
        var dt = Math.min(0.1, (ahora - previo) / 1000);
        previo = ahora;
        t += dt;
        if (t >= TOTAL) t = 0;
        aplicar(t);
        requestAnimationFrame(cuadro);
      };
      var arrancar = function () {
        var debe = visible && !pausada && !document.hidden;
        if (debe && !corriendo) { corriendo = true; previo = performance.now(); requestAnimationFrame(cuadro); }
        else if (!debe) corriendo = false;
      };
      aplicar(0);
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        rec.classList.toggle('en-vista', visible);
        arrancar();
      }, { threshold: 0.25 }).observe(rec);
      document.addEventListener('visibilitychange', arrancar);
      if (pausa) {
        pausa.addEventListener('click', function () {
          pausada = !pausada;
          rec.classList.toggle('pausada', pausada);
          pausa.setAttribute('aria-pressed', pausada ? 'true' : 'false');
          pausa.querySelector('.txt').textContent = pausada ? 'Reanudar animación' : 'Pausar animación';
          arrancar();
        });
      }
    }
  }

  /* el botón que habla: usa la voz del navegador, solo cuando la persona lo toca */
  var btn = document.querySelector('.hablar');
  var caja = document.querySelector('.voz');
  if (btn && caja && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    btn.hidden = false;
    var frase = btn.getAttribute('data-frase');
    var fin = function () { caja.classList.remove('hablando'); btn.setAttribute('aria-pressed', 'false'); };
    btn.addEventListener('click', function () {
      var ss = window.speechSynthesis;
      if (ss.speaking) { ss.cancel(); fin(); return; }
      var u = new SpeechSynthesisUtterance(frase);
      u.lang = 'es-AR';
      u.rate = 0.95;
      var voces = ss.getVoices().filter(function (v) { return /^es/i.test(v.lang); });
      var ar = voces.filter(function (v) { return /AR|MX|419|US/i.test(v.lang); })[0];
      if (ar || voces[0]) u.voice = ar || voces[0];
      u.onstart = function () { caja.classList.add('hablando'); btn.setAttribute('aria-pressed', 'true'); };
      u.onend = fin; u.onerror = fin;
      ss.speak(u);
    });
  }
})();
