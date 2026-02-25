
const qs=(s,p=document)=>p.querySelector(s), qsa=(s,p=document)=>[...p.querySelectorAll(s)];
const body=document.body;
const trap=(container,close)=>{const f=qsa('button,a,input',[container][0]).filter(el=>!el.disabled);if(!f.length)return;const first=f[0],last=f[f.length-1];container.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}if(e.key==='Tab'){if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});};
qsa('.lang-active').forEach(b=>b.addEventListener('click',()=>b.closest('.lang-wrap').classList.toggle('open')));
document.addEventListener('click',e=>{if(!e.target.closest('.lang-wrap'))qsa('.lang-wrap').forEach(w=>w.classList.remove('open'));});
const drawer=qs('.mobile-drawer'),burger=qs('.burger'),closeBtn=qs('.drawer-close');
const closeDrawer=()=>{drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');body.style.overflow='';burger.setAttribute('aria-expanded','false');};
if(burger){burger.addEventListener('click',()=>{drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');body.style.overflow='hidden';burger.setAttribute('aria-expanded','true');qs('a,button',drawer).focus();});closeBtn.addEventListener('click',closeDrawer);drawer.addEventListener('click',e=>{if(e.target===drawer)closeDrawer();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))closeDrawer();});trap(drawer,closeDrawer);}
qsa('.faq-item button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');qsa('.faq-item').forEach(i=>{if(i!==item){i.classList.remove('open');qs('button',i).setAttribute('aria-expanded','false');}});item.classList.toggle('open');btn.setAttribute('aria-expanded',item.classList.contains('open'));}));
const modal=qs('.modal'),openM=qs('.privacy-open');
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');body.style.overflow='';};
if(openM){openM.addEventListener('click',()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');body.style.overflow='hidden';qs('.modal-x').focus();});qsa('.modal-x,.modal-close').forEach(b=>b.addEventListener('click',closeModal));modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});trap(qs('.modal-box'),closeModal);}
const months=qs('#months'),monthsValue=qs('#monthsValue');let amount=50000;
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const calc=()=>{const m=Number(months.value);monthsValue.textContent=`${m} months`;qsa('.proj').forEach(p=>{const r=Number(p.dataset.rate);p.textContent=fmt(amount*Math.pow(1+r,m));});};
qsa('.amount-segment button').forEach(b=>b.addEventListener('click',()=>{qsa('.amount-segment button').forEach(x=>x.classList.remove('active'));b.classList.add('active');amount=Number(b.dataset.amount);calc();}));
if(months){months.addEventListener('input',calc);calc();}
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});qsa('.reveal').forEach(el=>io.observe(el));
