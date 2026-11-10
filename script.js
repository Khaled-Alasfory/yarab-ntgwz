const $=s=>document.querySelector(s),C=CONFIG;
const sf=(k,v)=>{try{return v===undefined?localStorage.getItem(k):localStorage.setItem(k,v)}catch(e){return null}};
// stars + floating hearts
for(let i=0;i<50;i++){const s=document.createElement('i');s.className='star';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;opacity:.6`;$('#sky').append(s)}
setInterval(()=>{const h=document.createElement('span');h.className='fh';h.textContent='♥';h.style.cssText=`left:${Math.random()*100}%;font-size:${10+Math.random()*12}px;animation-duration:${9+Math.random()*8}s`;$('#hearts').append(h);setTimeout(()=>h.remove(),17000)},2500);
// welcome
// letter
$('#letterText').textContent=C.letter;$('#letterEnd').textContent=C.letterEnd;$('#letterSign').textContent=C.signoff;
$('#envelope').onclick=()=>$('#envelope').classList.add('open');
// daily box
const today=new Date().toISOString().slice(0,10),box=$('#giftBox');
function showMsg(i,again){box.classList.add('open');const m=$('#boxMsg');m.textContent=C.dailyMessages[i];m.dir=/[\u0600-\u06FF]/.test(C.dailyMessages[i])?'rtl':'ltr';m.classList.add('show');
 $('#boxNote').textContent=again?"That's today's surprise. A new one will be waiting tomorrow.":"Come back tomorrow for another one."}
box.onclick=()=>{let d=JSON.parse(sf('box')||'null');if(d&&d.day===today)return showMsg(d.i,true);
 const seen=JSON.parse(sf('seen')||'[]');let pool=C.dailyMessages.map((_,i)=>i).filter(i=>!seen.includes(i));if(!pool.length){pool=C.dailyMessages.map((_,i)=>i);seen.length=0}
 const i=pool[Math.floor(Math.random()*pool.length)];seen.push(i);sf('seen',JSON.stringify(seen));sf('box',JSON.stringify({day:today,i}));showMsg(i)};
{const d=JSON.parse(sf('box')||'null');if(d&&d.day===today)$('#boxNote').textContent="You already opened today's box. Tap to see it again."}
// cards
C.cards.forEach(([t,e,a])=>{const b=document.createElement('button');b.className='card';b.innerHTML=`<h3>${t}</h3><p>${e}</p><p class="ar">${a}</p>`;b.onclick=()=>b.classList.toggle('open');$('#cards').append(b)});
// music
const au=$('#audio');let si=0;
function load(i){const s=C.songs[i];if(!s)return;si=i;au.src=s.src;$('#sTitle').textContent=s.title;$('#sArtist').textContent=s.artist;$('#cover').style.backgroundImage=s.cover?`url(${s.cover})`:'';$('#cover').textContent=s.cover?'':'♪'}
function setPlay(on){$('#play').textContent=on?'⏸':'▶';$('#viz').classList.toggle('on',on)}
$('#play').onclick=()=>{if(!C.songs.length)return;if(!au.src)load(0);au.paused?au.play().catch(()=>{}):au.pause()};
au.onplay=()=>setPlay(1);au.onpause=()=>setPlay(0);
const step=d=>{if(!C.songs.length)return;load((si+d+C.songs.length)%C.songs.length);au.play().catch(()=>{})};
$('#next').onclick=()=>step(1);$('#prev').onclick=()=>step(-1);au.onended=()=>step(1);
$('#vol').oninput=e=>au.volume=e.target.value;au.volume=.6;if(C.songs.length)load(0);
// hug
$('#hugBtn').onclick=e=>{const o=$('#hugOut');o.querySelector('p').textContent="Consider this the biggest hug I could send through a screen. Close your eyes for a second and imagine I'm right there beside you.";o.classList.add('show');
 const r=e.target.getBoundingClientRect();for(let i=0;i<26;i++){const s=document.createElement('i');s.className='spark';const a=Math.random()*6.28,d=80+Math.random()*160;s.style.cssText=`left:${r.left+r.width/2}px;top:${r.top}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d-60}px`;document.body.append(s);setTimeout(()=>s.remove(),2500)}
 for(let i=0;i<8;i++)setTimeout(()=>{const h=document.createElement('span');h.className='fh';h.textContent='♥';h.style.cssText=`left:${20+Math.random()*60}%;font-size:24px;opacity:.8;animation-duration:6s`;$('#hearts').append(h)},i*150)};
// garden
const cols=['#f6b6c6','#cbb9ee','#fbc9a8','#f9d98f','#f2a0b5'];
C.flowers.forEach(([en,ar,m],i)=>{const b=document.createElement('button');b.className='fl';b.style.setProperty('--c',cols[i%5]);
 b.innerHTML=`<div class="bloom">${[0,1,2,3,4].map(n=>`<i style="--n:${n}"></i>`).join('')}</div><div class="stem"></div><small>${en}</small>`;
 b.onclick=()=>{b.classList.add('open');const o=$('#flowerMsg');o.classList.remove('show');setTimeout(()=>{o.textContent=`${ar}: ${m}`;o.dir='rtl';o.classList.add('show')},200)};$('#flowers').append(b)});
// final
C.finalMessage.split('\n\n').forEach(t=>{const p=document.createElement('p');p.textContent=t;$('#finalText').append(p)});$('#sign').textContent=C.signature;$('#sign2').textContent=C.signoff;
new IntersectionObserver((es,ob)=>es.forEach(e=>{if(e.isIntersecting){const ps=[...document.querySelectorAll('.final-text p'),$('#sign'),$('#sign2')];ps.forEach((p,i)=>setTimeout(()=>p.classList.add('show'),i*1500));ob.disconnect()}}),{threshold:.35}).observe($('#final'));

// note
C.note.split('\n\n').forEach((t,i,a)=>{const p=document.createElement('p');if(i===a.length-1){const b=document.createElement('strong');b.textContent=t;p.append(b)}else p.textContent=t;$('#noteText').append(p)});
// videos
[['v1','talk'],['v2','memories']].forEach(([id,k])=>{const v=$('#'+id);v.src=C.videos[k];v.onerror=()=>{v.style.display='none';$('#'+id+'n').textContent='Add your video at '+C.videos[k]}});
// tabs
const groups=[['letter'],['note'],['talk'],['memories'],['box','remember'],['music'],['hug','garden'],['final']],tabs=[],nav=$('#tabs');
groups.forEach((g,i)=>{const d=document.createElement('div');d.className='tab';g.forEach(id=>d.append($('#'+id)));$('#main').append(d);tabs.push(d);
 const b=document.createElement('button');b.textContent=C.tabs[i];b.onclick=()=>show(i);nav.append(b)});
function show(i){$('#main').querySelectorAll('video,audio').forEach(m=>{if(m.id!=='audio')m.pause()});tabs.forEach((t,j)=>{t.classList.toggle('on',i===j);nav.children[j].classList.toggle('on',i===j)});document.body.classList.toggle('night',i===7);scrollTo({top:0});nav.children[i].scrollIntoView({inline:'center',block:'nearest'})}
show(0);


$('#enter').onclick=()=>{$('#welcome').classList.add('out');$('#main').hidden=false;nav.hidden=false;setTimeout(()=>{$('#welcome').hidden=true;scrollTo(0,0)},900)};
