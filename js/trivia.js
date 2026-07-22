// ── TRIVIA TIME ──
const TQ = [
  { q: "What is the capital of France?", a: ["Berlin", "Madrid", "Paris", "Rome"], c: 2 },
  { q: "Which planet is known as the Red Planet?", a: ["Venus", "Mars", "Jupiter", "Saturn"], c: 1 },
  { q: "How many sides does a triangle have?", a: ["2", "3", "4", "5"], c: 1 },
  { q: "Who wrote 'Romeo and Juliet'?", a: ["Dickens", "Shakespeare", "Austen", "Twain"], c: 1 },
  { q: "What is the largest ocean on Earth?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], c: 3 },
  { q: "Which animal is the WWF symbol?", a: ["Tiger", "Elephant", "Panda", "Dolphin"], c: 2 },
  { q: "How many continents are there?", a: ["5", "6", "7", "8"], c: 2 },
  { q: "What gas do plants absorb?", a: ["Oxygen", "Nitrogen", "CO₂", "Hydrogen"], c: 2 },
  { q: "What year did WWII end?", a: ["1943", "1944", "1945", "1946"], c: 2 },
  { q: "What is H₂O known as?", a: ["Salt", "Sugar", "Water", "Alcohol"], c: 2 }
];
const TL = ['A', 'B', 'C', 'D'];
let ti = 0, ts = 0, tl = false;

window.triviaHTML = function() {
  return `<div class="t-inner">
    <div class="ghead">
      <h2>🧠 Trivia Time</h2>
      <p>Test your knowledge!</p>
      <div class="inst">👩‍🏫 Instructor: Arfa Kamran</div>
    </div>
    <div class="ibar">
      <div class="sco"><span class="lbl">⭐ Score </span><span class="val" id="tsD">0</span></div>
      <div class="qno"><span class="lbl">Q </span><span class="val" id="tqD">1</span><span class="lbl"> / </span><span class="val" id="ttD">10</span></div>
    </div>
    <div class="dots" id="tdD"></div>
    <div id="tqA"><div class="qtext" id="tqt">Loading...</div><div class="answ" id="tans"></div><button class="nxt" id="tnxt">Next ➜</button></div>
    <div class="res" id="tres"><span class="trophy" id="ttr">🏆</span><h3>Game Over!</h3><div class="fs" id="tfs">0/10</div><p class="msg" id="tmsg"></p><button class="rst" onclick="window.initTrivia()">🔄 Play Again</button></div>
  </div>`;
};

window.initTrivia = function() {
  ti = 0; ts = 0; tl = false;
  const tsD = document.getElementById('tsD');
  if (!tsD) return;
  tsD.textContent = '0';
  document.getElementById('tres').style.display = 'none';
  document.getElementById('tqA').style.display = 'block';
  bTD(); lTQ();
};

function bTD() {
  const d = document.getElementById('tdD'); d.innerHTML = '';
  for (let i = 0; i < TQ.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    d.appendChild(dot);
  }
  document.getElementById('ttD').textContent = TQ.length;
}

function lTQ() {
  tl = false;
  document.getElementById('tnxt').style.display = 'none';
  const q = TQ[ti];
  document.getElementById('tqt').textContent = q.q;
  document.getElementById('tqD').textContent = ti + 1;
  const d = document.getElementById('tdD').querySelectorAll('.dot');
  d.forEach((x, i) => x.classList.toggle('active', i === ti));
  const c = document.getElementById('tans'); c.innerHTML = '';
  for (let i = 0; i < q.a.length; i++) {
    const b = document.createElement('button');
    b.innerHTML = `<span class="lb">${TL[i]}</span>${q.a[i]}`;
    b.addEventListener('click', () => hTA(i));
    c.appendChild(b);
  }
}

function hTA(s) {
  if (tl) return;
  tl = true;
  const q = TQ[ti];
  const b = document.getElementById('tans').querySelectorAll('button');
  b.forEach(x => x.disabled = true);
  b.forEach((x, i) => {
    if (i === q.c) x.classList.add('correct');
    else if (i === s) x.classList.add('wrong');
  });
  const d = document.getElementById('tdD').querySelectorAll('.dot');
  if (s === q.c) { ts++; d[ti].classList.add('green'); }
  else d[ti].classList.add('red');
  document.getElementById('tsD').textContent = ts;
  if (ti < TQ.length - 1) document.getElementById('tnxt').style.display = 'block';
  else setTimeout(tRes, 700);
}

document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'tnxt') { ti++; lTQ(); }
});

function tRes() {
  document.getElementById('tqA').style.display = 'none';
  document.getElementById('tres').style.display = 'block';
  document.getElementById('tfs').textContent = ts + '/' + TQ.length;
  const p = ts / TQ.length;
  let m, tr;
  if (p === 1) { m = 'Perfect! Trivia legend! 🎉'; tr = '🏆'; }
  else if (p >= 0.7) { m = 'Great job! 👏'; tr = '🥇'; }
  else if (p >= 0.4) { m = 'Nice effort! 💪'; tr = '🥈'; }
  else { m = 'Try again! 🌟'; tr = '🥉'; }
  document.getElementById('tmsg').textContent = m;
  document.getElementById('ttr').textContent = tr;
}