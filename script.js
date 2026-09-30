/* ====== CONFIGURAÇÃO ====== */
const CHECKOUT_URL = "https://pay.kiwify.com.br/Lz78GF9?afid=0qIqizw8"; // link único de checkout

/* Monta o link de checkout preservando UTMs e demais parâmetros da URL atual */
function buildCheckoutUrl(){
  try{
    const url = new URL(CHECKOUT_URL);
    new URLSearchParams(window.location.search).forEach((v,k)=>{
      if(!url.searchParams.has(k)) url.searchParams.set(k,v);
    });
    return url.toString();
  }catch(e){ return CHECKOUT_URL; }
}

/* Botões de compra */
document.querySelectorAll('[data-checkout]').forEach(a=>{ a.href = buildCheckoutUrl(); });

/* O primeiro botão (hero) rola até a oferta */
document.querySelectorAll('.js-buy').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(typeof fbq === 'function'){ try{ fbq('track','InitiateCheckout'); }catch(e){} }
  });
});

/* Barra fixa: aparece após o hero e some na oferta final */
const sticky = document.getElementById('sticky');
const hero = document.querySelector('.hero');
const offer = document.getElementById('comprar');
function toggleSticky(){
  const heroBottom = hero.getBoundingClientRect().bottom;
  const offerRect = offer.getBoundingClientRect();
  const offerVisible = offerRect.top < window.innerHeight * 0.85 && offerRect.bottom > 0;
  sticky.classList.toggle('show', heroBottom < 0 && !offerVisible);
}
window.addEventListener('scroll', toggleSticky, {passive:true});
window.addEventListener('resize', toggleSticky);
toggleSticky();

document.getElementById('year').textContent = new Date().getFullYear();
