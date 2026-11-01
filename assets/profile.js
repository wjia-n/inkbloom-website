
(function () {
  var NK = 'inkbloom_profile_name', PK = 'inkbloom_profile_photo';
  function els() { return { btn: document.getElementById('profile-btn'), fb: document.getElementById('profile-fallback'), ph: document.getElementById('profile-photo'), nm: document.getElementById('profile-name'), dlg: document.getElementById('profile-dialog'), ni: document.getElementById('profile-name-input'), pi: document.getElementById('profile-photo-input'), pv: document.getElementById('profile-preview'), sv: document.getElementById('profile-saved') }; }
  function render() {
    var e = els(); if (!e.btn) return;
    var name = '', photo = '';
    try { name = localStorage.getItem(NK) || ''; photo = localStorage.getItem(PK) || ''; } catch (err) {}
    if (photo) { e.ph.src = photo; e.ph.classList.remove('hidden'); e.fb.classList.add('hidden'); e.pv.src = photo; e.pv.classList.remove('hidden'); }
    else { e.ph.classList.add('hidden'); e.fb.classList.remove('hidden'); e.fb.textContent = name ? name.trim().charAt(0).toUpperCase() : 'person'; e.pv.classList.add('hidden'); }
    if (name) { e.nm.textContent = name; e.nm.classList.remove('hidden'); } else { e.nm.classList.add('hidden'); }
    if (e.ni && document.activeElement !== e.ni) e.ni.value = name;
  }
  function downscale(file, done) {
    var img = new Image();
    img.onload = function () {
      var s = Math.min(1, 256 / Math.max(img.width, img.height));
      var c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * s)); c.height = Math.max(1, Math.round(img.height * s));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      done(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = function () { done(''); };
    var r = new FileReader();
    r.onload = function () { img.src = r.result; };
    r.readAsDataURL(file);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var e = els(); if (!e.btn) return;
    render();
    e.btn.addEventListener('click', function () { e.dlg.classList.toggle('hidden'); render(); });
    var close = document.getElementById('profile-close');
    if (close) close.addEventListener('click', function () { e.dlg.classList.add('hidden'); });
    if (e.pi) e.pi.addEventListener('change', function () {
      var f = e.pi.files && e.pi.files[0]; if (!f) return;
      downscale(f, function (url) { if (url) { e.pv.src = url; e.pv.classList.remove('hidden'); e.pv.dataset.url = url; } });
    });
    var save = document.getElementById('profile-save');
    if (save) save.addEventListener('click', function () {
      try {
        localStorage.setItem(NK, (e.ni.value || '').trim());
        var url = e.pv.dataset.url;
        if (url) localStorage.setItem(PK, url);
      } catch (err) {}
      render(); e.sv.classList.remove('hidden');
      setTimeout(function () { e.sv.classList.add('hidden'); }, 2500);
    });
    var clear = document.getElementById('profile-clear');
    if (clear) clear.addEventListener('click', function () {
      try { localStorage.removeItem(NK); localStorage.removeItem(PK); } catch (err) {}
      e.ni.value = ''; e.pi.value = ''; delete e.pv.dataset.url; render();
    });
  });
})();
