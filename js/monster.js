// ── MONSTER DODGER ──
let monsterInterval = null, mCanvas, mCtx;
let mPlayer, mMonsters, mScore, mHigh, mRunning, mKeys;

window.monsterHTML = function() {
  return `<div class="m-inner">
    <h2>👾 Monster Dodger</h2>
    <div class="sb"><span>⭐ Score: <span class="sco" id="msco">0</span></span><span>🏆 High: <span class="hi" id="mhi">0</span></span></div>
    <canvas id="mc" width="400" height="400"></canvas>
    <div><button class="ctrl" id="msb">▶ Start</button><button class="ctrl dng" onclick="mStop()">⏹ Stop</button></div>
    <p style="color:rgba(255,255,255,0.2);font-size:12px;margin-top:10px">Use ◀ ▶ keys to move</p>
  </div>`;
};

window.initMonster = function() {
  mCanvas = document.getElementById('mc');
  if(!mCanvas) return;
  mCtx = mCanvas.getContext('2d');
  mHigh = localStorage.getItem('monsterHigh') || 0;
  document.getElementById('mhi').textContent = mHigh;
  mKeys = {};
  document.addEventListener('keydown', function(e) { mKeys[e.key] = true; });
  document.addEventListener('keyup', function(e) { mKeys[e.key] = false; });
  mReset(); mDraw();
  document.getElementById('msb').onclick = mStart;
};

function mReset() {
  mPlayer = {x:180, y:370, w:40, h:20}; mMonsters = []; mScore = 0; mRunning = false;
  document.getElementById('msco').textContent = '0';
}

function mStart() {
  if(mRunning) return; mRunning = true;
  if(monsterInterval) clearInterval(monsterInterval);
  monsterInterval = setInterval(mTick, 30);
  document.getElementById('msb').textContent = '▶ Running';
}

function mStop() {
  if(monsterInterval) { clearInterval(monsterInterval); monsterInterval = null; }
  mRunning = false; document.getElementById('msb').textContent = '▶ Start';
  document.getElementById('msb').onclick = mStart;
}

function mTick() {
  if(mKeys['ArrowLeft'] && mPlayer.x > 0) mPlayer.x -= 5;
  if(mKeys['ArrowRight'] && mPlayer.x < 360) mPlayer.x += 5;
  if(Math.random()<0.03) mMonsters.push({x:Math.random()*370, y:-20, size:18, speed:1.5+Math.random()*2});
  for(let i=mMonsters.length-1; i>=0; i--) {
    mMonsters[i].y += mMonsters[i].speed;
    const m = mMonsters[i];
    if(m.x < mPlayer.x+mPlayer.w && m.x+m.size > mPlayer.x && m.y < mPlayer.y+mPlayer.h && m.y+m.size > mPlayer.y) { mGameOver(); return; }
    if(m.y > 420) { mMonsters.splice(i,1); mScore++; document.getElementById('msco').textContent = mScore; }
  }
  mDraw();
}

function mDraw() {
  mCtx.fillStyle = 'rgba(0,0,0,0.4)'; mCtx.fillRect(0,0,400,400);
  mCtx.fillStyle = '#4ecdc4'; mCtx.shadowColor = '#4ecdc4'; mCtx.shadowBlur = 12;
  mCtx.beginPath(); mCtx.roundRect(mPlayer.x, mPlayer.y, mPlayer.w, mPlayer.h, 6); mCtx.fill();
  mCtx.shadowBlur = 0;
  mMonsters.forEach(m => {
    mCtx.shadowColor = '#ff6b6b'; mCtx.shadowBlur = 10;
    mCtx.fillStyle = '#ff6b6b'; mCtx.beginPath(); mCtx.arc(m.x+m.size/2, m.y+m.size/2, m.size/2, 0, Math.PI*2); mCtx.fill();
    mCtx.fillStyle = '#fff'; mCtx.font = '14px Inter'; mCtx.textAlign = 'center'; mCtx.shadowBlur = 0;
    mCtx.fillText('👾', m.x+m.size/2, m.y+m.size/2+5);
  });
  mCtx.shadowBlur = 0;
}

function mGameOver() {
  mStop();
  if(mScore > mHigh) { mHigh = mScore; localStorage.setItem('monsterHigh', mHigh); document.getElementById('mhi').textContent = mHigh; }
  mCtx.fillStyle = 'rgba(0,0,0,0.7)'; mCtx.fillRect(0,0,400,400);
  mCtx.fillStyle = '#fff'; mCtx.font = 'bold 28px Inter'; mCtx.textAlign = 'center'; mCtx.fillText('Game Over!', 200, 170);
  mCtx.fillStyle = '#ff6b6b'; mCtx.font = 'bold 20px Inter'; mCtx.fillText('Score: '+mScore, 200, 210);
  document.getElementById('msb').textContent = '🔄 Restart';
  document.getElementById('msb').onclick = function() { mReset(); mDraw(); document.getElementById('msb').textContent = '▶ Start'; document.getElementById('msb').onclick = mStart; };
}