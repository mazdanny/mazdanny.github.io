/* Mazdany Digital Platform PWA — favicon & ikon aplikasi dari MAZDANY-LOGO.png */
(function () {
  'use strict';
  var LOGO = 'MAZDANY-LOGO.png';   // huruf besar/kecil harus sama persis dengan nama file di GitHub
  var BG1 = '#052920', BG2 = '#021114', RING = '#22d3ee', THEME = '#021114';
  var BASE = new URL('./', location.href).href;

  function head(tag, attrs) {
    var el = document.createElement(tag);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    document.head.appendChild(el);
    return el;
  }
  function setLink(rel, href, extra) {
    document.querySelectorAll('link[rel="' + rel + '"]').forEach(function (n) { n.remove(); });
    var a = { rel: rel, href: href };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    head('link', a);
  }
  function setMeta(name, content) {
    var m = document.querySelector('meta[name="' + name + '"]');
    if (!m) m = head('meta', { name: name });
    m.setAttribute('content', content);
  }

  // Gambar memenuhi kotak (seperti object-cover) dan menempel di bagian atas, sama seperti tampilan avatar di situs
  function cover(x, img, bx, by, w, h) {
    var s = Math.max(w / img.width, h / img.height), dw = img.width * s, dh = img.height * s;
    x.drawImage(img, bx + (w - dw) / 2, by, dw, dh);
  }

  /* kind: 'tab' (bulat penuh, transparan), 'any' (kotak rounded), 'mask' (penuh, aman untuk maskable) */
  function draw(img, size, kind) {
    var c = document.createElement('canvas'); c.width = c.height = size;
    var x = c.getContext('2d');
    if (kind === 'tab') {
      x.beginPath(); x.arc(size / 2, size / 2, size / 2 - 1, 0, 7); x.clip();
      x.fillStyle = '#fff'; x.fillRect(0, 0, size, size);
      cover(x, img, 0, 0, size, size);
      return c.toDataURL('image/png');
    }
    var g = x.createRadialGradient(size / 2, size * 0.35, size * 0.05, size / 2, size / 2, size * 0.75);
    g.addColorStop(0, BG1); g.addColorStop(1, BG2);
    x.fillStyle = g;
    if (kind === 'mask') {
      x.fillRect(0, 0, size, size);
    } else {
      var r = size * 0.22; x.beginPath();
      x.moveTo(r, 0); x.arcTo(size, 0, size, size, r); x.arcTo(size, size, 0, size, r);
      x.arcTo(0, size, 0, 0, r); x.arcTo(0, 0, size, 0, r); x.closePath(); x.fill();
    }
    var d = size * (kind === 'mask' ? 0.62 : 0.76), o = (size - d) / 2;
    x.save();
    x.beginPath(); x.arc(size / 2, size / 2, d / 2, 0, 7); x.clip();
    x.fillStyle = '#fff'; x.fillRect(o, o, d, d);
    cover(x, img, o, o, d, d);
    x.restore();
    x.beginPath(); x.arc(size / 2, size / 2, d / 2, 0, 7);
    x.lineWidth = size * 0.03; x.strokeStyle = RING; x.stroke();
    return c.toDataURL('image/png');
  }

  function applyIcons(img) {
    var ic = {
      fav: draw(img, 64, 'tab'),
      apple: draw(img, 180, 'mask'),
      i192: draw(img, 192, 'any'),
      i512: draw(img, 512, 'any'),
      m512: draw(img, 512, 'mask')
    };
    setLink('icon', ic.fav, { type: 'image/png', sizes: '64x64' });
    setLink('apple-touch-icon', ic.apple, { sizes: '180x180' });
    var m = {
      name: 'Mazdany Digital Platform',
      short_name: 'Mazdany',
      description: 'Portal materi Al-Islam, Bahasa Arab, ibadah praktis, game edukasi, perangkat ajar AI, dan murojaah.',
      lang: 'id', dir: 'ltr',
      start_url: BASE, scope: BASE, id: BASE,
      display: 'standalone', orientation: 'any',
      background_color: THEME, theme_color: THEME,
      categories: ['education'],
      icons: [
        { src: ic.i192, sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: ic.i512, sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: ic.m512, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
      ]
    };
    var url = URL.createObjectURL(new Blob([JSON.stringify(m)], { type: 'application/manifest+json' }));
    setLink('manifest', url);
  }

  function initIcons() {
    setMeta('theme-color', THEME);
    setMeta('apple-mobile-web-app-capable', 'yes');
    setMeta('mobile-web-app-capable', 'yes');
    setMeta('apple-mobile-web-app-title', 'Mazdany');
    setMeta('apple-mobile-web-app-status-bar-style', 'black-translucent');
    setLink('icon', LOGO, { type: 'image/png' }); // favicon cadangan sebelum versi bulat siap
    var img = new Image();
    img.onload = function () { try { applyIcons(img); } catch (e) {} };
    img.src = LOGO;
  }

  /* ---- Tombol pasang aplikasi ---- */
  var deferred = null, btn = null;
  var standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  function floatBtn(text, onclick) {
    if (btn) btn.remove();
    btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = text;
    btn.style.cssText = 'position:fixed;left:14px;bottom:18px;z-index:150;font:800 .8rem "Plus Jakarta Sans",system-ui,sans-serif;padding:11px 18px;border-radius:999px;border:2px solid #22d3ee;background:#0d9488;color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.55),0 0 14px rgba(34,211,238,.4);cursor:pointer';
    btn.onclick = onclick;
    document.body.appendChild(btn);
  }
  function hideBtn() { if (btn) { btn.remove(); btn = null; } }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (standalone) return;
    floatBtn('⬇ Pasang Aplikasi', function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.then(function () { deferred = null; hideBtn(); });
    });
  });
  window.addEventListener('appinstalled', hideBtn);

  function iosHint() {
    var ua = navigator.userAgent || '';
    var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (!ios || standalone || sessionStorage.getItem('mazdany-ios-hint')) return;
    floatBtn('⬇ Cara pasang di iPhone/iPad', function () {
      alert('Di Safari: ketuk tombol Bagikan (kotak dengan panah ke atas), lalu pilih "Tambah ke Layar Utama".');
      sessionStorage.setItem('mazdany-ios-hint', '1'); hideBtn();
    });
  }

  /* ---- Service worker ---- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initIcons(); iosHint(); });
  } else { initIcons(); iosHint(); }
})();
