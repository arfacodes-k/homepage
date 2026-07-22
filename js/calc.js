// ── MEGA CALCULATOR ──
window.calcHTML = function() {
  return `<div class="c-inner">
    <h2>🔢 Mega Calculator</h2>
    <div class="calc">
      <input class="disp" id="cd" value="0" readonly />
      <div class="row"><button class="clr" onclick="cClear()">C</button><button class="op" onclick="cIn('(')">(</button><button class="op" onclick="cIn(')')">)</button><button class="op" onclick="cIn('/')">÷</button></div>
      <div class="row"><button class="num" onclick="cIn('7')">7</button><button class="num" onclick="cIn('8')">8</button><button class="num" onclick="cIn('9')">9</button><button class="op" onclick="cIn('*')">×</button></div>
      <div class="row"><button class="num" onclick="cIn('4')">4</button><button class="num" onclick="cIn('5')">5</button><button class="num" onclick="cIn('6')">6</button><button class="op" onclick="cIn('-')">−</button></div>
      <div class="row"><button class="num" onclick="cIn('1')">1</button><button class="num" onclick="cIn('2')">2</button><button class="num" onclick="cIn('3')">3</button><button class="op" onclick="cIn('+')">+</button></div>
      <div class="row"><button class="num" onclick="cIn('0')">0</button><button class="num" onclick="cIn('.')">.</button><button class="clr" onclick="cDel()">⌫</button><button class="eq" onclick="cEq()">=</button></div>
    </div>
  </div>`;
};

function cIn(v) {
  const d = document.getElementById('cd');
  if (d) d.value = d.value === '0' ? v : d.value + v;
}
function cClear() {
  const d = document.getElementById('cd');
  if (d) d.value = '0';
}
function cDel() {
  const d = document.getElementById('cd');
  if (d) d.value = d.value.length > 1 ? d.value.slice(0, -1) : '0';
}
function cEq() {
  const d = document.getElementById('cd');
  if (!d) return;
  try {
    d.value = eval(d.value.replace('×', '*').replace('÷', '/')) || '0';
  } catch (e) {
    d.value = 'Error';
  }
}