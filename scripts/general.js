
const sr = ScrollReveal({
  distance: '50px',
  duration: 1000,
  easing: 'ease-out',
  reset: false 
});


sr.reveal('.banner-container', {
  origin: 'top',
  interval: 200
});


sr.reveal('.eletronics-title, .eletronics-display', {
  origin: 'left',
  interval: 200
});

sr.reveal('.best-seller-title, .best-seller-products-container', {
  origin: 'right',
  interval: 200
});

sr.reveal('.best-seller-title.promotion, .best-seller-products-container.promotion', {
  origin: 'left',
  interval: 200
});

sr.reveal('.review-container', {
  origin: 'top',
  interval: 0
});

sr.reveal('.best-seller-preview, .review-item,',  {
  origin: 'bottom',
  interval: 100
});


