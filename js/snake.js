// ── SNAKE GAME ──
let snakeInterval = null, snakeCanvas, snakeCtx;
let snake, food, sDir, sNextDir, sScore, sHigh, sRunning;

window.snakeHTML = function() {
  return `<div class="s-inner">
    <h2>🐍 Snake Game</h2>
    <div class="sb"><span>🐍 Score: <span class="sco" id="ssco">0</span></span><span>🏆 High: <span class="hi" id="shi">0</span></span></div>
    <canvas id="sc" width="400" height="400"></canvas>
    <div><button class="ctrl" id="ssb">▶ Start</button><button class="ctrl dng" onclick="sStop()">⏹ Stop</button></div>
    <div class="keys"><button class="up" onclick="sSetDir('up')">▲</button><button class="lt" onclick="sSetDir('left')">◀</button><button class="rt" onclick="sSetDir('right')">▶</button><button class="dn" onclick="sSetDir('down')">▼</button></div>
    <p style="color:rgba(255,255,255,0.2);font-size:12px;margin-top:10px">Use arrow keys or click buttons</p>
  </div>`;
};

window.initSnake = function() {
  snakeCanvas = document.getElementById('sc');
  if (!snakeCanvas) return;
  snakeCtx = snakeCanvas.getContext('2d');
  sScore = 0; sHigh = parseInt(localStorage.getItem('snakeHigh')) || 0;
  document.getElementById('shi').textContent = sHigh;
  sReset(); sDraw();
  document.getElementById('ssb').onclick = sStart;
};

function sReset() {
  snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}];
  sDir = 'right'; sNextDir = 'right'; sScore = 0; sRunning = false;
  document.getElementById('ssco').textContent = '0'; sFood();
}

function sFood() {
  let p;
  do { p = {x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)}; }
  while(snake.some(s => s.x===p.x && s.y===p.y));
  food = p;
}

function sStart() {
  if(sRunning) return;
  if(snake.length === 0) sReset();
  sRunning = true; sDir = sNextDir;
  if(snakeInterval) clearInterval(snakeInterval);
  snakeInterval = setInterval(sTick, 150);
  document.getElementById('ssb').textContent = '▶ Playing...';
}

function sStop() {
  if(snakeInterval) { clearInterval(snakeInterval); snakeInterval = null; }
  sRunning = false; document.getElementById('ssb').textContent = '▶ Start';
}

function sSetDir(d) {
  if(!sRunning) { sStart(); setTimeout(() => { sNextDir = d; }, 10); return; }
  const opposite = {up:'down',down:'up',left:'right',right:'left'};
  if(opposite[d] !== sDir) sNextDir = d;
}

document.addEventListener('keydown', function(e) {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay.classList.contains('active')) return;
  const content = document.getElementById('modalContent');
  if (!content.querySelector('.s-inner')) return;
  const keyMap = { 'ArrowUp': 'up', 'ArrowDown': 'down', 'ArrowLeft': 'left', 'ArrowRight': 'right' };
  if (keyMap[e.key]) { e.preventDefault(); sSetDir(keyMap[e.key]); }
});

function sTick() {
  const opposite = {up:'down',down:'up',left:'right',right:'left'};
  if (sNextDir && opposite[sNextDir] !== sDir) sDir = sNextDir;
  const h = snake[0]; const n = {x:h.x, y:h.y};
  if(sDir==='right') n.x++; else if(sDir==='left') n.x--; else if(sDir==='up') n.y--; else if(sDir==='down') n.y++;
  if(n.x<0 || n.x>=20 || n.y<0 || n.y>=20 || snake.some(s => s.x===n.x && s.y===n.y)) { sGameOver(); return; }
  snake.unshift(n);
  if(n.x===food.x && n.y===food.y) { sScore++; document.getElementById('ssco').textContent = sScore; sFood(); }
  else snake.pop();
  sDraw();
}

function sDraw() {
  snakeCtx.fillStyle = 'rgba(0,0,0,0.4)'; snakeCtx.fillRect(0,0,400,400);
  snakeCtx.strokeStyle = 'rgba(255,255,255,0.02)'; snakeCtx.lineWidth = 1;
  for(let i=0;i<=20;i++) { snakeCtx.beginPath(); snakeCtx.moveTo(i*20,0); snakeCtx.lineTo(i*20,400); snakeCtx.stroke(); snakeCtx.beginPath(); snakeCtx.moveTo(0,i*20); snakeCtx.lineTo(400,i*20); snakeCtx.stroke(); }
  snakeCtx.shadowColor = '#ff6b6b'; snakeCtx.shadowBlur = 15;
  snakeCtx.fillStyle = '#ff6b6b'; snakeCtx.beginPath(); snakeCtx.arc(food.x*20+10, food.y*20+10, 7, 0, Math.PI*2); snakeCtx.fill();
  snakeCtx.shadowBlur = 0;
  snake.forEach((s,i) => {
    const isHead = (i === 0);
    snakeCtx.shadowColor = '#4ecdc4'; snakeCtx.shadowBlur = isHead ? 15 : 5;
    snakeCtx.fillStyle = isHead ? '#4ecdc4' : '#2d8f88';
    snakeCtx.beginPath(); snakeCtx.roundRect(s.x*20+2, s.y*20+2, 16, 16, 4); snakeCtx.fill();
    if(isHead) {
      snakeCtx.fillStyle = '#fff'; snakeCtx.shadowBlur = 0;
      let ex1, ey1, ex2, ey2;
      if(sDir==='right') { ex1=14; ey1=6; ex2=14; ey2=14; }
      else if(sDir==='left') { ex1=6; ey1=6; ex2=6; ey2=14; }
      else if(sDir==='up') { ex1=6; ey1=6; ex2=14; ey2=6; }
      else { ex1=6; ey1=14; ex2=14; ey2=14; }
      snakeCtx.beginPath(); snakeCtx.arc(s.x*20+ex1, s.y*20+ey1, 2.5, 0, Math.PI*2); snakeCtx.fill();
      snakeCtx.beginPath(); snakeCtx.arc(s.x*20+ex2, s.y*20+ey2, 2.5, 0, Math.PI*2); snakeCtx.fill();
    }
  });
  snakeCtx.shadowBlur = 0;
}

function sGameOver() {
  sStop();
  if(sScore > sHigh) { sHigh = sScore; localStorage.setItem('snakeHigh', sHigh.toString()); document.getElementById('shi').textContent = sHigh; }
  snakeCtx.fillStyle = 'rgba(0,0,0,0.7)'; snakeCtx.fillRect(0,0,400,400);
  snakeCtx.fillStyle = '#fff'; snakeCtx.font = 'bold 28px Inter'; snakeCtx.textAlign = 'center'; snakeCtx.fillText('Game Over!', 200, 170);
  snakeCtx.fillStyle = '#ffe66d'; snakeCtx.font = 'bold 20px Inter'; snakeCtx.fillText('Score: '+sScore, 200, 215);
  document.getElementById('ssb').textContent = '🔄 Restart';
  document.getElementById('ssb').onclick = function() { sReset(); sDraw(); document.getElementById('ssb').textContent = '▶ Start'; document.getElementById('ssb').onclick = sStart; };
}