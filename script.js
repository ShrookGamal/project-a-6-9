(function(){
const header=document.getElementById('mainHeader');
const progressBar=document.getElementById('progressBar');
const burgerBtn=document.getElementById('burgerBtn');
const sideMenu=document.getElementById('sideMenu');
const sideMenuOverlay=document.getElementById('sideMenuOverlay');
const sideMenuClose=document.getElementById('sideMenuClose');
const navLinks=document.querySelectorAll('.nav-link');
const sideMenuLinks=document.querySelectorAll('.side-menu-link');
const sections=document.querySelectorAll('section[id]');

function openMenu(){sideMenu.classList.add('open');sideMenuOverlay.classList.add('open');document.body.style.overflow='hidden'}
function closeMenu(){sideMenu.classList.remove('open');sideMenuOverlay.classList.remove('open');document.body.style.overflow=''}
burgerBtn.addEventListener('click',openMenu);
sideMenuClose.addEventListener('click',closeMenu);
sideMenuOverlay.addEventListener('click',closeMenu);
sideMenuLinks.forEach(function(link){link.addEventListener('click',closeMenu)});

window.addEventListener('scroll',function(){
const scrollY=window.scrollY;
const docHeight=document.documentElement.scrollHeight-window.innerHeight;
const progress=(scrollY/docHeight)*100;
progressBar.style.width=progress+'%';
if(scrollY>50){header.classList.add('scrolled')}else{header.classList.remove('scrolled')}
let current='';
sections.forEach(function(sec){const top=sec.offsetTop-120;if(scrollY>=top){current=sec.id}});
navLinks.forEach(function(link){link.classList.toggle('active',link.dataset.section===current)});
sideMenuLinks.forEach(function(link){link.classList.toggle('active',link.dataset.section===current)});
});

const revealEls=document.querySelectorAll('.reveal-up,.reveal-side');
const observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('visible');
observer.unobserve(entry.target);
const statNums=entry.target.querySelectorAll('.stat-num[data-target]');
statNums.forEach(function(el){animateCount(el)});
}
});
},{threshold:0.15,rootMargin:'0px 0px -50px 0px'});
revealEls.forEach(function(el){observer.observe(el)});

function animateCount(el){
const target=parseInt(el.dataset.target,10);
const suffix=el.dataset.suffix||'';
let current=0;
const step=Math.max(1,Math.ceil(target/60));
const timer=setInterval(function(){
current+=step;
if(current>=target){current=target;clearInterval(timer)}
el.textContent=current+suffix;
},20);
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
anchor.addEventListener('click',function(e){
const targetId=this.getAttribute('href');
if(targetId==='#')return;
const target=document.querySelector(targetId);
if(target){e.preventDefault();const offset=target.offsetTop-80;window.scrollTo({top:offset,behavior:'smooth'})}
});
});
})();
