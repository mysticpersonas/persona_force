/* The Trader's Journey: page behaviour for the GHL export.
   Plain JavaScript replacement for the React-only bits of the original pages.
   Everything it touches is marked with a data-tj-* attribute at export time.
   If this script never runs, the page still shows all content (reveals are
   visible by default and only hidden here, just before they animate in). */
(function () {
  var root = document.getElementById('tj-root');
  if (!root || root.getAttribute('data-tj-ready')) return;
  root.setAttribute('data-tj-ready', '1');

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;
  function each(sel, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), fn); }
  function swap(el, remove, add) {
    (remove || '').split(' ').forEach(function (c) { if (c) el.classList.remove(c); });
    (add || '').split(' ').forEach(function (c) { if (c) el.classList.add(c); });
  }
  function belowFold(el) { return el.getBoundingClientRect().top > window.innerHeight; }

  /* 1. Scroll reveals (fade up, slide in, blur in). */
  if (!reduce && hasIO) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        swap(e.target, e.target.getAttribute('data-tj-reveal'), e.target.getAttribute('data-tj-show'));
        revealIO.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    each('[data-tj-reveal]', function (el) {
      if (!belowFold(el)) return;
      swap(el, el.getAttribute('data-tj-show'), el.getAttribute('data-tj-reveal'));
      revealIO.observe(el);
    });

    /* Gradient lines that draw themselves in. */
    var lineIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        each('[data-tj-line]', function (l) {
          if (e.target.contains(l)) l.style.transform = l.getAttribute('data-tj-line') + '(1)';
        });
        lineIO.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    each('[data-tj-line]', function (l) {
      var host = l.parentElement;
      if (!belowFold(host)) return;
      l.style.transform = l.getAttribute('data-tj-line') + '(0)';
      lineIO.observe(host);
    });
  }

  /* 2. Smooth scrolling for in-page links and "scroll to form" buttons. */
  function scrollToTarget(sel) {
    var t = sel && document.querySelector(sel);
    if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    return !!t;
  }
  each('[data-tj-scroll]', function (b) {
    b.addEventListener('click', function () { scrollToTarget(b.getAttribute('data-tj-scroll')); });
  });
  each('a[href^="#"]', function (a) {
    a.addEventListener('click', function (ev) {
      if (scrollToTarget(a.getAttribute('href'))) ev.preventDefault();
    });
  });

  /* 3. Mobile menu drawer. */
  var overlay = root.querySelector('[data-tj-overlay]');
  var drawer = root.querySelector('[data-tj-drawer]');
  if (overlay && drawer) {
    var openMenu = function () {
      swap(overlay, 'opacity-0 pointer-events-none', 'opacity-100 pointer-events-auto');
      swap(drawer, 'translate-x-full', 'translate-x-0');
    };
    var closeMenu = function () {
      swap(overlay, 'opacity-100 pointer-events-auto', 'opacity-0 pointer-events-none');
      swap(drawer, 'translate-x-0', 'translate-x-full');
    };
    each('[aria-label="Open menu"]', function (b) { b.addEventListener('click', openMenu); });
    each('[aria-label="Close menu"]', function (b) { b.addEventListener('click', closeMenu); });
    overlay.addEventListener('click', closeMenu);
    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* 4. Sticky mobile CTA: shows after scrolling, hides while the form is on screen. */
  var sticky = root.querySelector('[data-tj-sticky]');
  if (sticky) {
    var formCard = root.querySelector('[data-tj-form-card]');
    var scrolled = false, formIn = false;
    var SHOW = 'translate-y-0 opacity-100', HIDE = 'translate-y-full opacity-0 pointer-events-none';
    var update = function () {
      if (scrolled && !formIn) swap(sticky, HIDE, SHOW); else swap(sticky, SHOW, HIDE);
    };
    window.addEventListener('scroll', function () {
      var s = window.scrollY > 20;
      if (s !== scrolled) { scrolled = s; update(); }
    }, { passive: true });
    // Same as the original page: once the form has been seen, the bar stays
    // hidden for the rest of the visit.
    if (formCard && hasIO) {
      var formIO = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        formIn = true; update(); formIO.disconnect();
      }, { threshold: 0.2 });
      formIO.observe(formCard);
    }
  }

  /* 5. Footer year. */
  each('[data-tj-year]', function (y) { y.textContent = new Date().getFullYear(); });

  /* 6. "Market data" particle field behind the hero. */
  each('canvas[data-tj-particles]', function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var width = 0, height = 0, nodes = [], raf, running = true;
    var NODE_COUNT = 46, LINK_DIST = 132;
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth; height = canvas.offsetHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width, y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          c: Math.random() > 0.5 ? '0,174,239' : '122,45,255',
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dist = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
          if (dist < LINK_DIST) {
            ctx.strokeStyle = 'rgba(0,174,239,' + (1 - dist / LINK_DIST) * 0.16 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        ctx.fillStyle = 'rgba(' + nodes[k].c + ',0.5)';
        ctx.beginPath(); ctx.arc(nodes[k].x, nodes[k].y, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      if (running) raf = requestAnimationFrame(step);
    }
    resize(); init();
    if (reduce) draw(); else step();
    window.addEventListener('resize', function () { resize(); init(); if (reduce) draw(); });
    if (hasIO && !reduce) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !running) { running = true; raf = requestAnimationFrame(step); }
        else if (!es[0].isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
      }).observe(canvas);
    }
  });
})();
