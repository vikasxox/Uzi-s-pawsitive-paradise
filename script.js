const menuButton=document.querySelector('.menu-button');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));mobileMenu.setAttribute('aria-hidden',String(open));});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');mobileMenu.setAttribute('aria-hidden','true');}));}

const tabs=[...document.querySelectorAll('.tab')];
const panels=[...document.querySelectorAll('.service-panel')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>{t.classList.remove('is-active');t.setAttribute('aria-selected','false')});panels.forEach(p=>{p.classList.remove('is-active');p.hidden=true});tab.classList.add('is-active');tab.setAttribute('aria-selected','true');const panel=document.getElementById(tab.getAttribute('aria-controls'));if(panel){panel.hidden=false;panel.classList.add('is-active');panel.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i,3)*60}ms`;requestAnimationFrame(()=>el.classList.add('is-visible'));});}}));

const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px -60px 0px'});reveals.forEach(el=>io.observe(el));}else reveals.forEach(el=>el.classList.add('is-visible'));

const lightbox=document.querySelector('.lightbox');
const lightboxImage=document.querySelector('.lightbox-image');
const lightboxName=document.querySelector('.lightbox-name');
const closeButton=document.querySelector('.lightbox-close');
function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('is-open');lightbox.setAttribute('aria-hidden','true');document.body.classList.remove('lock');lightboxImage.src='';}
document.querySelectorAll('.review-card').forEach(card=>card.addEventListener('click',()=>{lightboxImage.src=card.dataset.review;lightboxImage.alt=`Full Google review screenshot from ${card.dataset.name}`;lightboxName.textContent=card.dataset.name;lightbox.classList.add('is-open');lightbox.setAttribute('aria-hidden','false');document.body.classList.add('lock');}));
closeButton?.addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

const header=document.querySelector('.site-header');let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{if(header)header.style.boxShadow=window.scrollY>10?'0 10px 35px rgba(33,25,32,.07)':'none';ticking=false;});},{passive:true});
