(()=> {
const D=window.IR_THEORY_DATA||{questions:[],theories:[],concepts:[],comparisons:[],subapproaches:[]};
const KEY='ydsAuzef_ir_theory_v1';
let state={seen:{},known:{},wrong:[],history:[]};
try{state={...state,...JSON.parse(localStorage.getItem(KEY)||'{}')};}catch(e){}
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const sections=[
 ['Realizm ve Neorealizm','Realizm'],['Liberalizm','Liberalizm'],['Marksizm ve Merkez Çevre','Marksizm'],['Jeopolitik','Jeopolitik'],['Eleştirel Teori','Eleştirel'],['Feminist Uluslararası İlişkiler','Feminist']
];
function init(){
 const nav=document.querySelector('.tabs');
 if(nav&&!document.querySelector('[data-view="theory"]')){
  const b=document.createElement('button');b.className='tab';b.dataset.view='theory';b.textContent='Uİ Teorileri';nav.appendChild(b);
  b.onclick=()=>{document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id==='theory'));document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.toggle('active',t===b));renderMode('learn');window.scrollTo({top:0,behavior:'smooth'});};
 }
 const main=document.querySelector('main');
 if(main&&!$('theory')){
  const sec=document.createElement('section');sec.id='theory';sec.className='view';main.appendChild(sec);
 }
 if($('theory')&&!$('irModes')){
  const sec=$('theory');
  sec.innerHTML=`<div class="hero"><div class="eyebrow">Uluslararası İlişkiler · Sınav hazırlığı</div><h2>Teorileri öğren, karşılaştır, hatırla</h2><p>Yüklediğin ders belgesindeki konu çerçevesi, kavramlar ve 84 cevaplı soru temel alınmıştır. Önce anlamlandır, sonra kendini test et; yanlışlarını tekrar listesine al.</p>
  <div class="stats"><div class="stat"><b id="irQCount">84</b><span>Kaynak soru</span></div><div class="stat"><b id="irConceptCount">0</b><span>Kavram kartı</span></div><div class="stat"><b id="irMastered">0</b><span>Öğrendim dediğim</span></div></div></div>
  <div class="toolbar" id="irModes"><button class="btn active" data-mode="learn">Konu özeti</button><button class="btn" data-mode="concepts">Kavram kartları</button><button class="btn" data-mode="questions">84 soru</button><button class="btn" data-mode="quiz">Test çöz</button><button class="btn" data-mode="wrong">Yanlışlarım</button></div>
  <div id="irContent"></div>`;
  main.appendChild(sec);
 }
$('irModes')?.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>renderMode(b.dataset.mode)));
 $('irConceptCount').textContent=D.concepts.length;
 updateStats();renderMode('learn');
}
function updateStats(){
 $('irQCount').textContent=D.questions.length;
 $('irMastered').textContent=Object.values(state.known).filter(Boolean).length;
}
function renderMode(mode){
 if(!$('irContent'))return;
 $('irModes').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
 if(mode==='learn')renderLearn();
 if(mode==='concepts')renderConcepts();
 if(mode==='questions')renderQuestions();
 if(mode==='quiz')startQuiz();
 if(mode==='wrong')renderWrong();
}
function renderLearn(){
 const theoryRows=D.theories;
 $('irContent').innerHTML=`<div class="panel"><h3>Altı ana teori: önce büyük resmi kavra</h3><p class="muted">Her yaklaşım uluslararası siyasette farklı bir şeyi merkeze alır. Tanımı ve temel soruyu birlikte öğren.</p></div>`+
 theoryRows.map(r=>`<article class="card"><div class="word">${esc(r[0])}</div><div class="meaning">${esc(r[1])}</div><div class="statusline"><span class="badge">Temel soru</span>${esc(r[2])}</div><div class="statusline"><span class="badge">Merkez</span>${esc(r[3])}</div></article>`).join('')+
 `<div class="panel"><h3>Alt yaklaşımları ayırt et</h3>${D.subapproaches.map(r=>`<div class="card"><b>${esc(r[0])}</b><div class="meaning">${esc(r[1])}</div><div class="statusline">${esc(r[2])}</div></div>`).join('')}</div>
 <div class="panel"><h3>Sınavda karıştırılan temel ayrımlar</h3>${D.comparisons.slice(0,12).map(r=>`<div class="card"><b>${esc(r[0])}</b><div class="meaning">${esc(r[1])}</div><div class="statusline">${esc(r[2])}</div></div>`).join('')}</div>
 <div class="panel"><h3>Hızlı öğrenme yöntemi</h3><ol><li>Önce altı teorinin merkezde tuttuğu unsuru ezberle.</li><li>Her teorinin temel sorusunu kendi cümlenle cevapla.</li><li>Benzer teorileri karşılaştır: realizm–liberalizm, neorealizm–neoliberalizm, Marksizm–eleştirel teori.</li><li>Sonra kavram kartlarına ve kaynak sorulara geç.</li></ol></div>`;
}
function renderConcepts(){
 let q='';
 $('irContent').innerHTML=`<div class="panel"><h3>Kavram kartları</h3><input class="search" id="irConceptSearch" placeholder="Kavram ara..."><div class="count">${D.concepts.length} kavram · Tanımı görmek için kartı aç</div><div id="irConceptList"></div></div>`;
 const draw=()=>{
  const term=($('irConceptSearch').value||'').toLocaleLowerCase('tr');
  $('irConceptList').innerHTML=D.concepts.filter(r=>r.join(' ').toLocaleLowerCase('tr').includes(term)).map((r,i)=>`<details class="card"><summary><b>${esc(r[0])}</b><span class="muted"> · Aç</span></summary><div class="meaning">${esc(r[1])}</div>${r[2]?`<div class="statusline">${esc(r[2])}</div>`:''}</details>`).join('');
 };
 $('irConceptSearch').addEventListener('input',draw);draw();
}
function renderQuestions(){
 $('irContent').innerHTML=`<div class="panel"><h3>Kaynak belgedeki 84 cevaplı soru</h3><p class="muted">Soruyu önce kendin cevapla, ardından cevabı aç. “Öğrendim” veya “Tekrar et” seçimin ilerlemene kaydedilir.</p><select id="irSectionFilter" class="search"><option value="all">Tüm konular</option>${[...new Set(D.questions.map(q=>q.section))].map(s=>`<option>${esc(s)}</option>`).join('')}</select><div id="irQuestionList"></div></div>`;
 const draw=()=>{
  const sec=$('irSectionFilter').value;
  $('irQuestionList').innerHTML=D.questions.filter(q=>sec==='all'||q.section===sec).map(q=>`<details class="card"><summary><b>Soru ${q.id}.</b> ${esc(q.q)} <span class="muted">${state.known[q.id]?'✓ öğrendim':''}</span></summary><div class="meaning">${esc(q.a)}</div><div class="toolbar"><button class="btn good" data-known="${q.id}">Öğrendim</button><button class="btn bad" data-again="${q.id}">Tekrar et</button></div></details>`).join('');
  $('irQuestionList').querySelectorAll('[data-known]').forEach(b=>b.onclick=()=>{state.known[b.dataset.known]=true;state.seen[b.dataset.known]=true;state.wrong=state.wrong.filter(x=>x!==Number(b.dataset.known));save();updateStats();draw();});
  $('irQuestionList').querySelectorAll('[data-again]').forEach(b=>b.onclick=()=>{state.known[b.dataset.again]=false;state.seen[b.dataset.again]=true;const n=Number(b.dataset.again);if(!state.wrong.includes(n))state.wrong.push(n);save();updateStats();draw();});
 };
 $('irSectionFilter').onchange=draw;draw();
}
let quiz=[],qi=0,correct=0,quizMode='mcq';
function startQuiz(){
 const pool=shuffle(D.concepts.filter(r=>r[1]&&r[0]));
 quiz=pool.slice(0,Math.min(10,pool.length));qi=0;correct=0;quizMode='mcq';renderQuiz();
}
function renderQuiz(){
 if(qi>=quiz.length){state.history.unshift({date:new Date().toLocaleDateString('tr-TR'),correct,total:quiz.length});state.history=state.history.slice(0,20);save();$('irContent').innerHTML=`<div class="panel"><h3>Test tamamlandı</h3><div class="goal"><strong>${correct}/${quiz.length}</strong><small>${Math.round(correct/quiz.length*100)}% başarı</small></div><div class="bar"><i style="width:${correct/quiz.length*100}%"></i></div><p class="meaning">Yanlış yaptığın kavramları kavram kartlarından yeniden çalış. Öğrenme kalıcılığı için testi farklı kavramlarla tekrar et.</p><button class="btn primary wide" id="irRetry">Yeni test başlat</button></div>`;$('irRetry').onclick=startQuiz;return;}
 const item=quiz[qi],choices=shuffle([item[1],...shuffle(D.concepts.filter(x=>x[1]!==item[1]).map(x=>x[1])).slice(0,3)]);
 $('irContent').innerHTML=`<div class="panel"><div class="sessionhead"><span>Kavram testi · ${qi+1}/${quiz.length}</span><span>${correct} doğru</span></div><div class="sessionbar"><i style="width:${(qi+1)/quiz.length*100}%"></i></div><div class="eyebrow">Bu tanım hangi kavrama ait?</div><h3>${esc(item[0])}</h3><div id="irChoices">${choices.map((c,i)=>`<button class="btn wide" style="display:block;text-align:left;margin:8px 0;white-space:normal" data-choice="${i}">${String.fromCharCode(65+i)}. ${esc(c)}</button>`).join('')}</div><div id="irFeedback"></div></div>`;
 $('irChoices').querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{
  if($('irFeedback').dataset.done)return;$('irFeedback').dataset.done='1';
  const ok=choices[i]===item[1];if(ok)correct++;
  $('irChoices').querySelectorAll('button').forEach((x,j)=>{x.disabled=true;if(choices[j]===item[1])x.classList.add('good');else if(j===i)x.classList.add('bad');});
  $('irFeedback').innerHTML=`<p class="meaning">${ok?'Doğru!':'Bu kez olmadı.'} <b>${esc(item[0])}</b>: ${esc(item[1])}</p><button class="btn primary wide" id="irNext">${qi===quiz.length-1?'Sonucu gör':'Sonraki soru'}</button>`;
  $('irNext').onclick=()=>{qi++;renderQuiz();};
 });
}
function renderWrong(){
 const ids=state.wrong||[];
 $('irContent').innerHTML=ids.length?`<div class="panel"><h3>Tekrar listem · ${ids.length} soru</h3>${ids.map(id=>D.questions.find(q=>q.id===id)).filter(Boolean).map(q=>`<details class="card"><summary><b>Soru ${q.id}.</b> ${esc(q.q)}</summary><div class="meaning">${esc(q.a)}</div><button class="btn good" data-clear="${q.id}">Artık öğrendim</button></details>`).join('')}</div>`:`<div class="panel"><h3>Tekrar listen boş</h3><p class="meaning">Kaynak sorularda “Tekrar et” seçtiğinde sorular burada birikir.</p></div>`;
 $('irContent').querySelectorAll('[data-clear]').forEach(b=>b.onclick=()=>{state.wrong=state.wrong.filter(x=>x!==Number(b.dataset.clear));state.known[b.dataset.clear]=true;save();updateStats();renderWrong();});
}
document.addEventListener('DOMContentLoaded',init);
})();
