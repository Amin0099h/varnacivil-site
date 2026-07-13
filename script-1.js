// ---- Footer year ----
const yearEl = document.getElementById('year');
if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

// ---- Mobile hamburger nav ----
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if(navToggle && siteNav){
  navToggle.addEventListener('click', ()=>{
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  // Close menu when a link is tapped
  siteNav.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Contact form (Web3Forms) ----
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'در حال ارسال...';
    btn.disabled = true;
    try{
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: {'Accept': 'application/json'},
        body: new FormData(contactForm)
      });
      const data = await res.json();
      if(data.success){
        document.getElementById('formSuccess').classList.add('show');
        contactForm.reset();
      } else {
        alert('ارسال ناموفق بود. لطفاً دوباره تلاش کن یا مستقیم ایمیل بزن.');
      }
    } catch(err){
      alert('ارسال ناموفق بود. لطفاً دوباره تلاش کن یا مستقیم ایمیل بزن.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
}
