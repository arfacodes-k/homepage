// ── LANGUAGE LEARNER ──
const LANG_DATA = {
  spanish: [
    { w: 'Hola', t: 'Hello' }, { w: 'Gracias', t: 'Thank you' }, { w: 'Amor', t: 'Love' },
    { w: 'Casa', t: 'House' }, { w: 'Perro', t: 'Dog' }, { w: 'Gato', t: 'Cat' },
    { w: 'Agua', t: 'Water' }, { w: 'Sol', t: 'Sun' }, { w: 'Luna', t: 'Moon' },
    { w: 'Libro', t: 'Book' }
  ],
  french: [
    { w: 'Bonjour', t: 'Hello' }, { w: 'Merci', t: 'Thank you' }, { w: 'Amour', t: 'Love' },
    { w: 'Maison', t: 'House' }, { w: 'Chien', t: 'Dog' }, { w: 'Chat', t: 'Cat' },
    { w: 'Eau', t: 'Water' }, { w: 'Soleil', t: 'Sun' }, { w: 'Lune', t: 'Moon' },
    { w: 'Livre', t: 'Book' }
  ],
  german: [
    { w: 'Hallo', t: 'Hello' }, { w: 'Danke', t: 'Thank you' }, { w: 'Liebe', t: 'Love' },
    { w: 'Haus', t: 'House' }, { w: 'Hund', t: 'Dog' }, { w: 'Katze', t: 'Cat' },
    { w: 'Wasser', t: 'Water' }, { w: 'Sonne', t: 'Sun' }, { w: 'Mond', t: 'Moon' },
    { w: 'Buch', t: 'Book' }
  ],
  italian: [
    { w: 'Ciao', t: 'Hello' }, { w: 'Grazie', t: 'Thank you' }, { w: 'Amore', t: 'Love' },
    { w: 'Casa', t: 'House' }, { w: 'Cane', t: 'Dog' }, { w: 'Gatto', t: 'Cat' },
    { w: 'Acqua', t: 'Water' }, { w: 'Sole', t: 'Sun' }, { w: 'Luna', t: 'Moon' },
    { w: 'Libro', t: 'Book' }
  ]
};
let lLang = 'spanish', lIdx = 0;

window.langHTML = function() {
  const langs = ['spanish', 'french', 'german', 'italian'];
  const emojis = { spanish: '🇪🇸', french: '🇫🇷', german: '🇩🇪', italian: '🇮🇹' };
  let btns = '';
  langs.forEach(l => {
    btns += `<button class="${l === lLang ? 'active' : ''}" onclick="lSetLang('${l}')">${emojis[l]} ${l.charAt(0).toUpperCase() + l.slice(1)}</button>`;
  });
  const d = LANG_DATA[lLang][lIdx];
  return `<div class="l-inner">
    <h2>🌍 Language Learner</h2>
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin-bottom:16px">Select a language and learn new words!</p>
    <div class="lang-select">${btns}</div>
    <div class="word-box">
      <div class="word">${d.w}</div>
      <div class="trans">${d.t}</div>
      <div class="hint">Word ${lIdx + 1} of ${LANG_DATA[lLang].length}</div>
    </div>
    <button class="ctrl" onclick="lPrev()">◀ Previous</button>
    <button class="ctrl" onclick="lNext()">Next ▶</button>
    <p style="color:rgba(255,255,255,0.15);font-size:12px;margin-top:12px">👩‍🏫 Instructor: Arfa Kamran</p>
  </div>`;
};

window.initLang = function() {
  lIdx = 0;
  lLang = 'spanish';
  renderLang();
};

function renderLang() {
  const c = document.getElementById('modalContent');
  if (!c) return;
  const d = LANG_DATA[lLang][lIdx];
  const wb = c.querySelector('.word-box');
  if (wb) {
    wb.querySelector('.word').textContent = d.w;
    wb.querySelector('.trans').textContent = d.t;
    wb.querySelector('.hint').textContent = 'Word ' + (lIdx + 1) + ' of ' + LANG_DATA[lLang].length;
  }
  const btns = c.querySelectorAll('.lang-select button');
  btns.forEach(b => {
    const lang = b.textContent.trim().split(' ')[1]?.toLowerCase() || '';
    const isActive = (lang === lLang);
    b.classList.toggle('active', isActive);
  });
}

function lSetLang(l) {
  lLang = l;
  lIdx = 0;
  renderLang();
}

function lNext() {
  lIdx = (lIdx + 1) % LANG_DATA[lLang].length;
  renderLang();
}

function lPrev() {
  lIdx = (lIdx - 1 + LANG_DATA[lLang].length) % LANG_DATA[lLang].length;
  renderLang();
}