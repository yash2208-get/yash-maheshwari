/* ==========================================================================
   Yash Maheshwari · Portfolio · main.js
   Vanilla JavaScript, zero dependencies. Progressive enhancement throughout.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var DATA = window.YM_DATA || { projects: [] };
  var EMAIL = 'yashajmera1203@gmail.com';
  var GH_USER = 'yash2208-get';
  var LINKEDIN = 'https://www.linkedin.com/in/yash-maheshwari800055';

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var icon = function (name, cls) { return '<svg class="i' + (cls ? ' ' + cls : '') + '"><use href="#i-' + name + '"/></svg>'; };

  /* ---------- Toast ---------- */
  var toastEl = $('#toast');
  var toastTimer;
  function toast(msg, isErr) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-err', !!isErr);
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, 3200);
  }
  function copyText(text, msg) {
    var done = function () { toast(msg || 'Copied to clipboard'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { window.location.href = 'mailto:' + text; }
      ta.remove();
    }
  }

  /* ---------- Year & local time ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var timeEl = $('#local-time');
  function tickTime() {
    if (!timeEl) return;
    try {
      timeEl.textContent = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(new Date());
    } catch (e) { timeEl.textContent = 'IST'; }
  }
  tickTime(); setInterval(tickTime, 30000);

  /* ---------- Nav, progress, back-to-top, timeline (one rAF scroll loop) ---------- */
  var nav = $('#nav');
  var progress = $('.scroll-progress');
  var toTop = $('#to-top');
  var ring = toTop ? toTop.querySelector('circle') : null;
  var RING = 2 * Math.PI * 21;
  if (ring) { ring.style.strokeDasharray = RING; ring.style.strokeDashoffset = RING; }
  var tl = $('#timeline');
  var tlItems = tl ? $$('.tl-item', tl) : [];

  function updateTimeline() {
    if (!tl) return;
    var r = tl.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = Math.min(1, Math.max(0, (vh * 0.62 - r.top) / r.height));
    tl.style.setProperty('--p', p.toFixed(3));
    tlItems.forEach(function (li) { li.classList.toggle('is-active', li.getBoundingClientRect().top < vh * 0.62); });
  }
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? y / h : 0;
    if (nav) nav.classList.toggle('is-scrolled', y > 12);
    if (progress) progress.style.transform = 'scaleX(' + p + ')';
    if (toTop) {
      toTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
      if (ring) ring.style.strokeDashoffset = RING * (1 - p);
    }
    updateTimeline();
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* Active nav link */
  var navLinks = $$('.nav__links a, .mobile-menu a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = '#' + e.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* Mobile menu */
  var toggle = $('.nav__toggle');
  var menu = $('#mobile-menu');
  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('is-open', open);
    menu.hidden = !open;
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* ---------- In-page anchor navigation ----------
     Offset-aware smooth scrolling. Also required for iframe/srcdoc previews,
     where "#hash" links would otherwise resolve against the parent page URL. */
  function scrollToHash(hash) {
    var target = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (!target) return false;
    var offset = (nav ? nav.offsetHeight : 0) + 8;
    var top = hash === '#home' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
    if (hash === '#main') { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented) return;
    if (scrollToHash(a.getAttribute('href'))) { e.preventDefault(); setMenu(false); }
  });

  /* ---------- Reveal on scroll ---------- */
  var revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  function observeReveal(root) {
    $$('.reveal:not(.is-in)', root).forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
      el.style.setProperty('--d', (Math.min(sibs.indexOf(el), 6) * 70) + 'ms');
      if (revealIO && !reduceMotion) revealIO.observe(el); else el.classList.add('is-in');
    });
  }

  /* ---------- Typed roles ---------- */
  var typedEl = $('#typed');
  var roles = ['Software Engineer', 'Full Stack Developer', 'Backend Architect', 'AI Engineer', 'Prompt Engineer', 'Web Scraping Specialist'];
  if (typedEl && !reduceMotion) {
    var ri = 0, ci = roles[0].length, deleting = true;
    var typeLoop = function () {
      var word = roles[ri];
      ci += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ci);
      var delay = deleting ? 32 : 68;
      if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 280; }
      setTimeout(typeLoop, delay);
    };
    setTimeout(typeLoop, 2400);
  }

  /* ---------- Console boot sequence ---------- */
  function bootConsole() {
    var lines = $$('.console .ln').concat($$('.console .log-line'));
    lines.forEach(function (ln, i) { setTimeout(function () { ln.classList.add('on'); }, reduceMotion ? 0 : 350 + i * 110); });
  }
  var consoleEl = $('#console');
  if (consoleEl && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { bootConsole(); cio.disconnect(); }
    }, { threshold: 0.3 });
    cio.observe(consoleEl);
  } else { bootConsole(); }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var dec = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion || isNaN(target)) { el.textContent = target.toFixed(dec); return; }
    var start = performance.now(), dur = 1600;
    var step = function (t) {
      var k = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - k, 4);
      el.textContent = (target * eased).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = (0).toFixed(dec);
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach(function (el) { countIO.observe(el); });
  }

  /* ---------- 3D tilt + glare ---------- */
  function bindTilt(el) {
    if (!finePointer || reduceMotion || el.dataset.tiltBound) return;
    el.dataset.tiltBound = '1';
    var max = parseFloat(el.dataset.tilt) || 6;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', ((0.5 - y) * max).toFixed(2) + 'deg');
      el.style.setProperty('--ry', ((x - 0.5) * max).toFixed(2) + 'deg');
      el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    });
    el.addEventListener('pointerleave', function () { el.style.removeProperty('--rx'); el.style.removeProperty('--ry'); });
  }

  /* ---------- Spotlight + cursor glow ---------- */
  var glow = $('.cursor-glow');
  if (finePointer && !reduceMotion) {
    document.addEventListener('pointermove', function (e) {
      document.body.classList.add('has-cursor');
      if (glow) { glow.style.setProperty('--cx', e.clientX + 'px'); glow.style.setProperty('--cy', e.clientY + 'px'); }
      var card = e.target.closest ? e.target.closest('.spot') : null;
      if (card) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }
    }, { passive: true });
    document.addEventListener('pointerleave', function () { document.body.classList.remove('has-cursor'); });
  }

  /* ---------- Magnetic buttons ---------- */
  function bindMagnetic(el) {
    if (!finePointer || reduceMotion) return;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--tx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
      el.style.setProperty('--ty', ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px');
    });
    el.addEventListener('pointerleave', function () { el.style.removeProperty('--tx'); el.style.removeProperty('--ty'); });
  }
  $$('.magnetic').forEach(bindMagnetic);

  /* ---------- Marquee (clone for seamless loop) ---------- */
  var track = $('.marquee__track');
  if (track) {
    $$('.marquee__item', track).forEach(function (item) {
      var c = item.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c);
    });
  }

  /* ---------- Project mockups (image placeholders) ---------- */
  function mockup(p) {
    var L = p.layout, inner = '';
    if (L === 'dashboard') {
      var hs = [38, 62, 48, 80, 56, 92, 70, 84];
      inner = '<div class="mk-side"><i></i><i></i><i></i><i></i><i></i></div><div class="mk-main"><div class="mk-tiles"><i></i><i></i><i></i></div><div class="mk-chart">' +
        hs.map(function (h, i) { return '<i style="--h:' + h + '%;animation-delay:' + (i * 60) + 'ms"></i>'; }).join('') + '</div></div>';
    } else if (L === 'store') {
      inner = '<div class="mk-store"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';
    } else if (L === 'site') {
      inner = '<div class="mk-site"><div class="mk-hero"></div><div class="mk-lines"><i></i><i></i><i></i></div><div class="mk-cards"><i></i><i></i><i></i></div></div>';
    } else if (L === 'live') {
      inner = '<div class="mk-live"><div class="mk-score"><b>HOME</b><span>2 : 1</span><b>AWAY</b><em>LIVE 72\'</em></div>' +
        '<div class="mk-row"><i></i><i></i><i></i></div><div class="mk-row"><i></i><i></i><i></i></div><div class="mk-row"><i></i><i></i><i></i></div><div class="mk-row"><i></i><i></i><i></i></div></div>';
    } else if (L === 'chat') {
      inner = '<div class="mk-chat"><p class="q"></p><p class="a"></p><div class="mk-cite"><i></i><i></i></div><p class="q"></p><p class="a long"></p></div>';
    } else if (L === 'graph') {
      inner = '<div class="mk-graph"><svg viewBox="0 0 320 130" aria-hidden="true">' +
        '<line x1="40" y1="65" x2="120" y2="28"/><line x1="40" y1="65" x2="120" y2="102"/><line x1="120" y1="28" x2="200" y2="65"/><line x1="120" y1="102" x2="200" y2="65"/><line x1="200" y1="65" x2="280" y2="65"/>' +
        '<circle cx="40" cy="65" r="10"/><circle cx="120" cy="28" r="10"/><circle cx="120" cy="102" r="10"/><circle class="hot" cx="200" cy="65" r="12"/><circle cx="280" cy="65" r="10"/>' +
        '<text x="22" y="92">webhook</text><text x="98" y="12">research</text><text x="100" y="124">retrieve</text><text x="182" y="94">qualify</text><text x="268" y="92">sync</text></svg></div>';
    } else {
      inner = '<div class="mk-term"><p><b>$</b> run --target=all --workers=16</p><p class="ok">✓ queue warmed · 25,184 urls</p><p>→ playwright[12] selenium[4]</p><p class="ok">✓ 24,713 ok · 98.1% success</p><p>→ llm-extract fallback: 312 pages</p><p class="ok">✓ schema valid · stored → mongodb</p></div>';
    }
    return '<div class="mockup" style="--c1:' + p.theme[0] + ';--c2:' + p.theme[1] + '"><div class="mockup__bar"><span></span><span></span><span></span><em>' + esc(p.domain) + '</em></div><div class="mockup__screen">' + inner + '</div></div>';
  }
  function media(p) {
    return p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy">' : mockup(p);
  }

  /* ---------- Project cards ---------- */
  function cardHTML(p) {
    var gh = p.github ? '<a class="icon-btn" href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="' + esc(p.title) + ' on GitHub" data-stop>' + icon('github') + '</a>' : '';
    var demo = p.demo ? '<a class="icon-btn" href="' + esc(p.demo) + '" target="_blank" rel="noopener" aria-label="Live demo of ' + esc(p.title) + '" data-stop>' + icon('external') + '</a>' : '';
    var nda = p.nda ? '<span class="nda">' + icon('lock') + 'NDA</span>' : '';
    return '<article class="pcard glass tilt reveal" data-tilt="5" data-id="' + esc(p.id) + '" data-stack="' + esc((p.keys || []).join(' ')) + '">' +
      '<div class="pcard__media">' + media(p) + '</div>' +
      '<div class="pcard__body">' +
      '<p class="pcard__cat">' + esc(p.category) + '</p>' +
      '<h3 class="pcard__title">' + esc(p.title) + '</h3>' +
      '<p class="pcard__text">' + esc(p.summary) + '</p>' +
      '<div class="pcard__results">' + p.results.map(function (r) { return '<div><b>' + esc(r.v) + '</b><span>' + esc(r.l) + '</span></div>'; }).join('') + '</div>' +
      '<ul class="chips">' + p.stack.slice(0, 5).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
      '<div class="pcard__foot">' +
      '<button type="button" class="btn btn--glass btn--sm" data-open="' + esc(p.id) + '">Read case study' + icon('arrow-right') + '</button>' +
      '<div class="pcard__links">' + nda + gh + demo + '</div>' +
      '</div>' +
      '</div></article>';
  }
  function renderGrid(sel, type) {
    var grid = $(sel);
    if (!grid) return;
    grid.innerHTML = DATA.projects.filter(function (p) { return p.type === type; }).map(cardHTML).join('');
    $$('.tilt', grid).forEach(bindTilt);
    observeReveal(grid);
    grid.addEventListener('click', function (e) {
      if (e.target.closest('[data-stop]')) return;
      var card = e.target.closest('.pcard');
      if (card) openModal(card.dataset.id);
    });
  }
  renderGrid('#projects-grid', 'fullstack');
  renderGrid('#ai-grid', 'ai');

  /* ---------- Case-study modal ---------- */
  var modal = $('#project-modal');
  var modalBody = $('#modal-body');
  var lastFocus = null;

  function list(items, cls) { return '<ul class="ticks ' + (cls || '') + '">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function renderCase(p) {
    var gh = p.github
      ? '<a class="btn btn--glass" href="' + esc(p.github) + '" target="_blank" rel="noopener">' + icon('github') + 'View on GitHub</a>'
      : '<span class="btn btn--glass is-disabled" aria-disabled="true">' + icon('lock') + 'Code private (NDA)</span>';
    var demo = p.demo
      ? '<a class="btn btn--primary" href="' + esc(p.demo) + '" target="_blank" rel="noopener">Live demo' + icon('external') + '</a>'
      : '<a class="btn btn--primary" href="mailto:' + EMAIL + '?subject=' + encodeURIComponent('Walkthrough request: ' + p.title) + '">Request a live walkthrough' + icon('arrow-right') + '</a>';
    return '<div class="case">' +
      '<div class="case__media">' + media(p) + '</div>' +
      '<div class="case__head"><p class="eyebrow">' + esc(p.category) + '</p>' +
      '<h3 class="case__title" id="modal-title">' + esc(p.title) + '</h3>' +
      '<p class="case__ctx">' + esc(p.context) + '</p>' +
      '<p class="case__summary">' + esc(p.summary) + '</p></div>' +
      '<div class="case__results">' + p.results.map(function (r) { return '<div class="result"><b class="grad-text">' + esc(r.v) + '</b><span>' + esc(r.l) + '</span></div>'; }).join('') + '</div>' +
      '<div class="case__grid">' +
      '<section class="case__sec"><h4>' + icon('alert') + 'Problem</h4><p>' + esc(p.problem) + '</p></section>' +
      '<section class="case__sec"><h4>' + icon('lightbulb') + 'Solution</h4><p>' + esc(p.solution) + '</p></section>' +
      '</div>' +
      '<section class="case__sec"><h4>' + icon('layers') + 'Architecture</h4><ol class="arch">' + p.architecture.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></section>' +
      '<div class="case__grid" style="margin-top:1rem">' +
      '<section class="case__sec"><h4>' + icon('sparkles') + 'Key features</h4>' + list(p.features) + '</section>' +
      '<section class="case__sec"><h4>' + icon('target') + 'Challenges &amp; solutions</h4>' + list(p.challenges, 'ticks--warn') + '</section>' +
      '</div>' +
      '<section class="case__sec"><h4>' + icon('trending') + 'Business impact</h4>' + list(p.impact, 'ticks--impact') + '</section>' +
      '<section class="case__sec"><h4>' + icon('code') + 'Tech stack</h4><ul class="chips" style="margin-top:0">' + p.stack.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></section>' +
      '<div class="case__actions">' + demo + gh + '</div>' +
      '</div>';
  }
  function setHash(h) { try { history.replaceState(null, '', h || window.location.pathname + window.location.search); } catch (e) { /* sandboxed */ } }
  function openModal(id) {
    var p = DATA.projects.filter(function (x) { return x.id === id; })[0];
    if (!p || !modal) return;
    lastFocus = document.activeElement;
    modalBody.innerHTML = renderCase(p);
    modal.hidden = false;
    document.body.classList.add('no-scroll');
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    var panel = $('.modal__panel', modal); if (panel) panel.scrollTop = 0;
    var closeBtn = $('.modal__close', modal); if (closeBtn) closeBtn.focus({ preventScroll: true });
    setHash('#project-' + id);
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { modal.hidden = true; modalBody.innerHTML = ''; }, 320);
    setHash('');
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  if (modal) modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });

  function trapFocus(e, root) {
    if (e.key !== 'Tab') return;
    var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', root).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  if (/^#project-/.test(window.location.hash)) setTimeout(function () { openModal(window.location.hash.replace('#project-', '')); }, 400);

  /* ---------- AI stack ↔ project highlighting ---------- */
  var aiCards = function () { return $$('#ai-grid .pcard'); };
  $$('.stack-item').forEach(function (btn) {
    var on = function () {
      var t = btn.dataset.tech;
      aiCards().forEach(function (c) {
        var match = (c.dataset.stack || '').split(' ').indexOf(t) > -1;
        c.classList.toggle('is-match', match);
        c.classList.toggle('is-dim', !match);
      });
    };
    var off = function () { aiCards().forEach(function (c) { c.classList.remove('is-match', 'is-dim'); }); };
    btn.addEventListener('mouseenter', on); btn.addEventListener('focus', on);
    btn.addEventListener('mouseleave', off); btn.addEventListener('blur', off);
  });

  /* ---------- AI pipeline (auto-cycles until the user interacts) ---------- */
  var pnodes = $$('.pnode');
  var pdesc = $('#pipeline-desc');
  var pIndex = 0, pTimer = null;
  function showNode(n) {
    pnodes.forEach(function (x) { x.classList.toggle('is-active', x === n); });
    if (pdesc) pdesc.innerHTML = n.dataset.desc;
  }
  pnodes.forEach(function (n) {
    var manual = function () { clearInterval(pTimer); showNode(n); };
    n.addEventListener('mouseenter', manual); n.addEventListener('focus', manual); n.addEventListener('click', manual);
  });
  var pipeline = $('#pipeline');
  if (pipeline && pnodes.length && !reduceMotion && 'IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !pTimer) {
        showNode(pnodes[0]);
        pTimer = setInterval(function () { pIndex = (pIndex + 1) % pnodes.length; showNode(pnodes[pIndex]); }, 2600);
        pio.disconnect();
      }
    }, { threshold: 0.4 });
    pio.observe(pipeline);
  }

  /* ---------- Skills explorer ---------- */
  var catNames = { backend: 'Backend', ai: 'AI & LLM', automation: 'Scraping & Automation', frontend: 'Frontend', data: 'Data', devops: 'DevOps & Tools' };
  var levelNames = { '3': 'Expert', '2': 'Advanced', '1': 'Proficient' };
  var skillBtns = $$('.skill');
  var detail = $('#skill-detail');
  var searchInput = $('#skill-search');
  var emptyMsg = $('#skills-empty');
  var activeFilter = 'all';
  function applySkillFilter() {
    var q = (searchInput && searchInput.value || '').trim().toLowerCase();
    var shown = 0;
    skillBtns.forEach(function (b, i) {
      var ok = (activeFilter === 'all' || b.dataset.cat === activeFilter) && (!q || b.textContent.toLowerCase().indexOf(q) > -1 || (b.dataset.used || '').toLowerCase().indexOf(q) > -1);
      b.parentElement.hidden = !ok;
      if (ok) { b.style.animationDelay = (shown * 18) + 'ms'; b.style.animationName = 'none'; void b.offsetWidth; b.style.animationName = ''; shown++; }
    });
    if (emptyMsg) emptyMsg.hidden = shown > 0;
  }
  $$('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      $$('.tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
      activeFilter = tab.dataset.filter;
      applySkillFilter();
    });
  });
  if (searchInput) searchInput.addEventListener('input', applySkillFilter);
  skillBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      skillBtns.forEach(function (x) { x.classList.toggle('is-selected', x === b); });
      if (!detail) return;
      var lv = b.dataset.level;
      detail.innerHTML = '<p class="eyebrow">' + esc(catNames[b.dataset.cat] || 'Skill') + '</p>' +
        '<h3>' + esc(b.textContent) + '</h3>' +
        '<span class="lvl"><i class="lv lv' + lv + '"></i>' + levelNames[lv] + '</span>' +
        '<dl><div><dt>Hands-on experience</dt><dd>' + esc(b.dataset.years) + '</dd></div><div><dt>Where I used it</dt><dd>' + esc(b.dataset.used) + '</dd></div></dl>';
    });
  });

  /* ---------- GitHub (lazy, cached, graceful fallback) ---------- */
  var LANG_COLORS = { PHP: '#4F5D95', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#663399', Python: '#3572A5', TypeScript: '#3178c6', Blade: '#f7523f', Vue: '#41b883', Shell: '#89e051', Java: '#b07219', 'Jupyter Notebook': '#DA5B0B', SCSS: '#c6538c' };
  function ago(iso) {
    var s = (Date.now() - new Date(iso).getTime()) / 1000;
    var units = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600]];
    for (var i = 0; i < units.length; i++) { var v = Math.floor(s / units[i][1]); if (v >= 1) return v + ' ' + units[i][0] + (v > 1 ? 's' : '') + ' ago'; }
    return 'just now';
  }
  function repoCard(r) {
    var lang = r.lang ? '<span><i style="background:' + (LANG_COLORS[r.lang] || '#8b949e') + '"></i>' + esc(r.lang) + '</span>' : '';
    return '<a class="repo glass reveal" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
      '<h4>' + icon('code') + esc(r.name) + '</h4>' +
      '<p>' + esc(r.desc || 'Source code and experiments. Open the repository for details.') + '</p>' +
      '<div class="repo__meta">' + lang + '<span>' + icon('star') + r.stars + '</span><span>' + icon('fork') + r.forks + '</span>' + (r.updated ? '<span>' + icon('clock') + ago(r.updated) + '</span>' : '') + '</div></a>';
  }
  function renderGitHub(d) {
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
    set('gh-name', d.user.name || 'Yash Maheshwari');
    set('gh-login', '@' + d.user.login);
    set('gh-repos', d.user.repos);
    set('gh-followers', d.user.followers);
    set('gh-since', new Date(d.user.created).getFullYear());
    var avatar = $('#gh-avatar'); if (avatar && d.user.avatar) avatar.src = d.user.avatar;
    var stars = d.repos.reduce(function (a, r) { return a + r.stars; }, 0);
    set('gh-stars', stars);
    var counts = {};
    d.repos.forEach(function (r) { if (r.lang) counts[r.lang] = (counts[r.lang] || 0) + 1; });
    var total = Object.keys(counts).reduce(function (a, k) { return a + counts[k]; }, 0) || 1;
    var langs = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).slice(0, 6);
    var bar = $('#gh-langbar'), legend = $('#gh-langs');
    if (bar) bar.innerHTML = langs.map(function (l) { return '<span style="width:0;background:' + (LANG_COLORS[l] || '#8b949e') + '" data-w="' + (counts[l] / total * 100).toFixed(1) + '%" title="' + esc(l) + '"></span>'; }).join('');
    if (legend) legend.innerHTML = langs.map(function (l) { return '<li><i style="background:' + (LANG_COLORS[l] || '#8b949e') + '"></i>' + esc(l) + ' <span class="muted">' + Math.round(counts[l] / total * 100) + '%</span></li>'; }).join('');
    requestAnimationFrame(function () { $$('#gh-langbar span').forEach(function (s) { s.style.width = s.dataset.w; }); });
    var top = d.repos.slice().sort(function (a, b) { return (b.stars - a.stars) || (new Date(b.updated) - new Date(a.updated)); }).slice(0, 6);
    var grid = $('#gh-repos-grid');
    if (grid) { grid.innerHTML = top.map(repoCard).join(''); observeReveal(grid); }
  }
  function renderGitHubFallback() {
    var grid = $('#gh-repos-grid');
    if (!grid) return;
    var featured = DATA.projects.filter(function (p) { return p.github; }).map(function (p) {
      return { name: p.github.split('/').pop(), desc: p.summary, url: p.github, lang: 'Python', stars: 0, forks: 0, updated: '' };
    });
    grid.innerHTML = featured.map(repoCard).join('') || '<p class="muted">Live GitHub data is unavailable right now. Visit github.com/' + GH_USER + '.</p>';
    observeReveal(grid);
  }
  function loadGitHub() {
    var KEY = 'ym-gh-v2', cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { cached = null; }
    if (cached) { renderGitHub(cached); return; }
    Promise.all([
      fetch('https://api.github.com/users/' + GH_USER),
      fetch('https://api.github.com/users/' + GH_USER + '/repos?per_page=100&sort=pushed')
    ]).then(function (res) {
      if (!res[0].ok || !res[1].ok) throw new Error('GitHub API unavailable');
      return Promise.all([res[0].json(), res[1].json()]);
    }).then(function (j) {
      var u = j[0];
      var data = {
        user: { name: u.name, login: u.login, avatar: u.avatar_url, followers: u.followers, repos: u.public_repos, created: u.created_at },
        repos: (j[1] || []).filter(function (r) { return !r.fork; }).map(function (r) {
          return { name: r.name, desc: r.description, url: r.html_url, lang: r.language, stars: r.stargazers_count, forks: r.forks_count, updated: r.pushed_at || r.updated_at };
        })
      };
      try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* storage blocked */ }
      renderGitHub(data);
    }).catch(renderGitHubFallback);
  }
  var ghSection = $('#github');
  if (ghSection && 'IntersectionObserver' in window) {
    var ghio = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { loadGitHub(); ghio.disconnect(); }
    }, { rootMargin: '400px 0px' });
    ghio.observe(ghSection);
  } else { loadGitHub(); }
  var chartImg = $('#gh-chart img');
  if (chartImg) chartImg.addEventListener('error', function () { var c = $('#gh-chart'); if (c) c.hidden = true; });

  /* ---------- Contact Form · WhatsApp Integration & Validation ---------- */
  (function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Configurable WhatsApp destination number (international format with country code)
    const WHATSAPP_PHONE = '+918000553597';

    // Field references
    const fields = {
      name: document.getElementById('f-name'),
      email: document.getElementById('f-email'),
      company: document.getElementById('f-company'),
      type: document.getElementById('f-type'),
      message: document.getElementById('f-message'),
      honey: form.elements['_honey']
    };

    /**
     * Field validation rules and custom error messages.
     */
    const validators = {
      name: (val) => {
        const trimmed = val.trim();
        if (!trimmed) return 'Please enter your name.';
        if (trimmed.length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
      email: (val) => {
        const trimmed = val.trim();
        if (!trimmed) return 'Please enter your work email.';
        // Standard RFC 5322 compatible email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmed)) return 'Please enter a valid email address.';
        return '';
      },
      message: (val) => {
        const trimmed = val.trim();
        if (!trimmed) return 'Please enter your message.';
        if (trimmed.length < 10) return 'Please write at least 10 characters.';
        return '';
      }
    };

    /**
     * Displays or removes inline validation errors for a specific field.
     * @param {HTMLElement} inputEl - The input or textarea element
     * @param {string} errorMsg - The error message to show, or empty string if valid
     * @returns {boolean} True if field is valid, false otherwise
     */
    const setFieldStatus = (inputEl, errorMsg) => {
      const container = inputEl.closest('.field');
      if (!container) return !errorMsg;

      const errorEl = container.querySelector('.field__error');

      if (errorMsg) {
        container.classList.add('is-invalid');
        inputEl.setAttribute('aria-invalid', 'true');
        if (errorEl) {
          errorEl.textContent = errorMsg;
        }
        return false;
      }

      container.classList.remove('is-invalid');
      inputEl.removeAttribute('aria-invalid');
      return true;
    };

    /**
     * Validates a single input element if a validator exists for it.
     * @param {HTMLElement} inputEl - Form control element
     * @returns {boolean} Validation result
     */
    const validateField = (inputEl) => {
      const validator = validators[inputEl.name];
      if (!validator) return true;
      const errorMsg = validator(inputEl.value);
      return setFieldStatus(inputEl, errorMsg);
    };

    /**
     * Clears all validation states across the form.
     */
    const clearAllErrors = () => {
      const fieldContainers = form.querySelectorAll('.field');
      fieldContainers.forEach((container) => {
        container.classList.remove('is-invalid');
        const input = container.querySelector('input, textarea, select');
        if (input) input.removeAttribute('aria-invalid');
      });
    };

    /**
     * Attaches live validation listeners on blur and input events.
     */
    ['name', 'email', 'message'].forEach((fieldName) => {
      const inputEl = fields[fieldName];
      if (!inputEl) return;

      // Validate when the user leaves the field
      inputEl.addEventListener('blur', () => {
        if (inputEl.value.trim() !== '') {
          validateField(inputEl);
        }
      });

      // Clear inline error in real time as the user fixes it
      inputEl.addEventListener('input', () => {
        const container = inputEl.closest('.field');
        if (container && container.classList.contains('is-invalid')) {
          validateField(inputEl);
        }
      });
    });

    /**
     * Formats form values into the structured WhatsApp message format.
     * @param {Object} data - Clean form values
     * @returns {string} Unencoded formatted message
     */
    const formatWhatsAppMessage = ({ name, email, company, type, message }) => {
      const companyVal = company.trim() ? company.trim() : 'N/A';

      return [
        '📩 New Portfolio Inquiry',
        '',
        '👤 Name:',
        name.trim(),
        '',
        '📧 Email:',
        email.trim(),
        '',
        '🏢 Company:',
        companyVal,
        '',
        '📌 Inquiry Type:',
        type.trim(),
        '',
        '💬 Message:',
        message.trim()
      ].join('\n');
    };

    /**
     * Handles the form submission event.
     */
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Silent anti-spam honeypot check
      if (fields.honey && fields.honey.value) {
        return;
      }

      // Validate all required fields
      let isFormValid = true;
      let firstInvalidInput = null;

      ['name', 'email', 'message'].forEach((fieldName) => {
        const inputEl = fields[fieldName];
        if (inputEl) {
          const isValid = validateField(inputEl);
          if (!isValid) {
            isFormValid = false;
            if (!firstInvalidInput) {
              firstInvalidInput = inputEl;
            }
          }
        }
      });

      // Focus first field with error and show toast alert
      if (!isFormValid) {
        if (typeof toast === 'function') {
          toast('Please fix the highlighted fields.', true);
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Collect field values
      const formData = {
        name: fields.name.value,
        email: fields.email.value,
        company: fields.company ? fields.company.value : '',
        type: fields.type ? fields.type.value : 'General Inquiry',
        message: fields.message.value
      };

      // Construct WhatsApp message and URL
      const textMessage = formatWhatsAppMessage(formData);
      const encodedMessage = encodeURIComponent(textMessage);
      const cleanPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

      // Show temporary button loading state
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.classList.add('is-loading');

      // Open WhatsApp in a new tab (desktop WhatsApp Web or mobile WhatsApp app)
      const newTab = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        // Fallback for aggressive popup blockers
        window.location.href = whatsappUrl;
      }

      // UX Improvement: Show feedback and reset form state
      if (typeof toast === 'function') {
        toast('Redirecting to WhatsApp to send your inquiry…');
      }

      form.reset();
      clearAllErrors();

      if (submitBtn) {
        setTimeout(() => {
          submitBtn.classList.remove('is-loading');
        }, 1000);
      }
    });
  })();

  /* Copy email */
  $$('[data-copy]').forEach(function (b) { b.addEventListener('click', function () { copyText(b.dataset.copy, 'Email copied to clipboard'); }); });

  /* ---------- Résumé download (works inside the Brand Kit preview too) ---------- */
  function kitHook() {
    try {
      if (window.parent && window.parent !== window && window.parent.YM_KIT) return window.parent.YM_KIT;
      if (window.opener && window.opener.YM_KIT) return window.opener.YM_KIT;
    } catch (e) { /* cross-origin */ }
    return null;
  }
  $$('[data-resume]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var kit = kitHook();
      if (kit && typeof kit.downloadResume === 'function') { e.preventDefault(); kit.downloadResume(); toast('Preparing résumé PDF…'); }
    });
  });

  /* ---------- Photo fallback chain ---------- */
  $$('img[data-fallback]').forEach(function (img) {
    var fail = function () {
      if (img.dataset.fallback) { var next = img.dataset.fallback; img.removeAttribute('data-fallback'); img.src = next; }
      else { var wrap = img.closest('.portrait'); if (wrap) wrap.classList.add('no-photo'); img.remove(); }
    };
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
  });

  /* ---------- Command palette (⌘K / Ctrl+K) ---------- */
  var cmdk = $('#cmdk'), cmdInput = $('#cmdk-input'), cmdList = $('#cmdk-list');
  var go = function (hash) { scrollToHash(hash); };
  var COMMANDS = [
    { g: 'Navigate', label: 'About', icon: 'user', run: function () { go('#about'); } },
    { g: 'Navigate', label: 'Experience', icon: 'briefcase', run: function () { go('#experience'); } },
    { g: 'Navigate', label: 'Selected work', icon: 'layers', run: function () { go('#projects'); } },
    { g: 'Navigate', label: 'AI Lab', icon: 'sparkles', run: function () { go('#ai'); } },
    { g: 'Navigate', label: 'Skills', icon: 'cpu', run: function () { go('#skills'); } },
    { g: 'Navigate', label: 'GitHub activity', icon: 'github', run: function () { go('#github'); } },
    { g: 'Navigate', label: 'Contact', icon: 'mail', run: function () { go('#contact'); } },
    { g: 'Actions', label: 'Download résumé (PDF)', icon: 'download', run: function () { var a = $('[data-resume]'); if (a) a.click(); } },
    { g: 'Actions', label: 'Copy email address', icon: 'copy', run: function () { copyText(EMAIL, 'Email copied to clipboard'); } },
    { g: 'Actions', label: 'Send an email', icon: 'send', run: function () { window.location.href = 'mailto:' + EMAIL; } },
    { g: 'Links', label: 'Open GitHub profile', icon: 'github', run: function () { window.open('https://github.com/' + GH_USER, '_blank', 'noopener'); } },
    { g: 'Links', label: 'Open LinkedIn', icon: 'linkedin', run: function () { window.open(LINKEDIN, '_blank', 'noopener'); } }
  ].concat(DATA.projects.map(function (p) {
    return { g: 'Case studies', label: p.title, icon: p.type === 'ai' ? 'bot' : 'file', run: function () { openModal(p.id); } };
  }));
  var cmdResults = [], cmdActive = 0;
  function renderCmds() {
    var q = cmdInput.value.trim().toLowerCase();
    cmdResults = COMMANDS.filter(function (c) { return !q || (c.label + ' ' + c.g).toLowerCase().indexOf(q) > -1; });
    cmdActive = Math.min(cmdActive, Math.max(0, cmdResults.length - 1));
    if (!cmdResults.length) { cmdList.innerHTML = '<li class="cmdk__empty">No results for "' + esc(q) + '"</li>'; return; }
    var html = '', group = '';
    cmdResults.forEach(function (c, i) {
      if (c.g !== group) { group = c.g; html += '<li class="cmdk__group" role="presentation">' + esc(group) + '</li>'; }
      html += '<li class="cmdk__item' + (i === cmdActive ? ' is-active' : '') + '" role="option" aria-selected="' + (i === cmdActive) + '" data-i="' + i + '">' + icon(c.icon) + esc(c.label) + (i === cmdActive ? '<kbd>↵</kbd>' : '') + '</li>';
    });
    cmdList.innerHTML = html;
    var act = $('.cmdk__item.is-active', cmdList); if (act) act.scrollIntoView({ block: 'nearest' });
  }
  function openCmdk() { if (!cmdk) return; lastFocus = document.activeElement; cmdk.hidden = false; cmdInput.value = ''; cmdActive = 0; renderCmds(); setTimeout(function () { cmdInput.focus(); }, 10); }
  function closeCmdk() { if (!cmdk || cmdk.hidden) return; cmdk.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
  function runCmd(i) { var c = cmdResults[i]; if (!c) return; closeCmdk(); setTimeout(c.run, 60); }
  if (cmdk) {
    $$('[data-cmdk]').forEach(function (b) { b.addEventListener('click', openCmdk); });
    cmdInput.addEventListener('input', function () { cmdActive = 0; renderCmds(); });
    cmdList.addEventListener('click', function (e) { var li = e.target.closest('.cmdk__item'); if (li) runCmd(+li.dataset.i); });
    cmdList.addEventListener('mousemove', function (e) { var li = e.target.closest('.cmdk__item'); if (li && +li.dataset.i !== cmdActive) { cmdActive = +li.dataset.i; renderCmds(); } });
    cmdk.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeCmdk(); });
  }

  /* ---------- Global keyboard ---------- */
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if ((e.metaKey || e.ctrlKey) && k === 'k') { e.preventDefault(); if (cmdk && cmdk.hidden) openCmdk(); else closeCmdk(); return; }
    if (cmdk && !cmdk.hidden) {
      if (k === 'escape') closeCmdk();
      else if (k === 'arrowdown') { e.preventDefault(); cmdActive = (cmdActive + 1) % Math.max(1, cmdResults.length); renderCmds(); }
      else if (k === 'arrowup') { e.preventDefault(); cmdActive = (cmdActive - 1 + cmdResults.length) % Math.max(1, cmdResults.length); renderCmds(); }
      else if (k === 'enter') { e.preventDefault(); runCmd(cmdActive); }
      return;
    }
    if (modal && !modal.hidden) { if (k === 'escape') closeModal(); else trapFocus(e, modal); return; }
    if (k === 'escape') setMenu(false);
  });

  /* ---------- Init ---------- */
  $$('.tilt').forEach(bindTilt);
  observeReveal(document);
  onScroll();
})();
