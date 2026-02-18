
// +++++++++++++++++++++++++++++++ ANIMAÇÃO ELETRONICS SELECTOR ++++++++++++++++++++++++++++++++++

const swipeLeftButton = document.querySelector('.swipe-right-icon');
    const swipeRightButton = document.querySelector('.swipe-left-icon');
    const middleContainer = document.querySelector('.middle-container');

    swipeLeftButton.addEventListener('click', () => {
        const lastChild = middleContainer.lastElementChild;
        middleContainer.insertBefore(lastChild, middleContainer.firstChild);
    });

    swipeRightButton.addEventListener('click', () => {
        const firstChild = middleContainer.firstElementChild;
        middleContainer.appendChild(firstChild);
    });

// +++++++++++++++++++++++++++++++ ANIMAÇÃO BANNER ++++++++++++++++++++++++++++++++++

const banners = document.querySelectorAll('.banner-image');
const bannerSwipe = document.getElementById('banner-swipe');
let currentIndex = 1;
let isTransitioning = false;
let intervalId;
const firstClone = banners[0].cloneNode(true);
const lastClone = banners[banners.length - 1].cloneNode(true);

bannerSwipe.appendChild(firstClone);
bannerSwipe.insertBefore(lastClone, banners[0]);
bannerSwipe.style.width = `${(banners.length + 2) * 100}%`;
updateBannerPosition(false);

bannerSwipe.addEventListener('transitionend', () => {
  if (currentIndex === 0) {
    bannerSwipe.style.transition = 'none';
    currentIndex = banners.length;
    updateBannerPosition(false);
  } else if (currentIndex === banners.length + 1) {
    bannerSwipe.style.transition = 'none';
    currentIndex = 1;
    updateBannerPosition(false);
  }
  isTransitioning = false;
});

function nextImage() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateBannerPosition(true);
}

function prevImage() {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateBannerPosition(true);
}

function updateBannerPosition(withTransition) {
  const offset = -currentIndex * 100;
  if (withTransition) {
    bannerSwipe.style.transition = 'transform 0.5s ease-in-out';
  } else {
    bannerSwipe.style.transition = 'none';
  }
  bannerSwipe.style.transform = `translateX(${offset}%)`;
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    nextImage();
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

startAutoSlide();
bannerSwipe.addEventListener('mouseenter', stopAutoSlide);
bannerSwipe.addEventListener('mouseleave', startAutoSlide);



// +++++++++++++++++++++++++++++++ ANIMAÇÃO REVIEW ++++++++++++++++++++++++++++++++++

document.addEventListener('DOMContentLoaded', function () {
  const reviewDisplay = document.querySelector('.review-display');
  const buttonLeft = document.querySelector('.review-button-left');
  const buttonRight = document.querySelector('.review-button-right');
  const originalItems = Array.from(document.querySelectorAll('.review-item'));
  const totalItems = originalItems.length;
  const itemsPerView = 3;
  let currentStartIndex = 0;
  let isSliding = false;
  const slideDuration = 500;

  function renderItems() {
    reviewDisplay.innerHTML = ''; 
    for (let i = 0; i < itemsPerView; i++) {
      const itemIndex = (currentStartIndex + i) % totalItems;
      const item = originalItems[itemIndex].cloneNode(true);
      if (i === Math.floor(itemsPerView / 2)) {
        item.classList.add('center'); 
      } else {
        item.classList.add('blur');
      }
      reviewDisplay.appendChild(item);
    }
  }

  function startSlide(direction) {
    if (isSliding) return;
    isSliding = true;
    const slideOutClass = direction === 'left' ? 'slide-out-right' : 'slide-out-left';
    const slideInClass = direction === 'left' ? 'slide-in-left' : 'slide-in-right';
    Array.from(reviewDisplay.children).forEach((item) => {
      item.classList.add(slideOutClass);
    });
    setTimeout(() => {
      currentStartIndex =
        direction === 'left'
          ? (currentStartIndex - 1 + totalItems) % totalItems
          : (currentStartIndex + 1) % totalItems;

      reviewDisplay.innerHTML = ''; // L
      for (let i = 0; i < itemsPerView; i++) {
        const itemIndex = (currentStartIndex + i) % totalItems;
        const item = originalItems[itemIndex].cloneNode(true);

        if (i === Math.floor(itemsPerView / 2)) {
          item.classList.add('center'); 
        } else {
          item.classList.add('blur'); 
        }
        item.classList.add(slideInClass);
        reviewDisplay.appendChild(item);
      }

      setTimeout(() => {
        Array.from(reviewDisplay.children).forEach((item) => {
          item.classList.remove(slideInClass, slideOutClass);
        });
        isSliding = false;
      }, slideDuration);
    }, slideDuration);
  }

  buttonLeft.addEventListener('click', () => startSlide('left'));
  buttonRight.addEventListener('click', () => startSlide('right'));
  renderItems();
});


// REDIRECTS MAIN PAGE

function redirectToMainPage() {
  window.location.href = "main-page.html";
}

// REDIRECTS LOGIN PAGE

function redirectToLoginPage() {
  window.location.href = "login-page.html";
}

// REDIRECTS FRIDGE

function redirectToFridgePage() {
  window.location.href = "fridge-page.html";
}
function redirectToFridgeOverview() {
  window.location.href = "fridge-overview-page.html";
}

// REDIRECTS OVEN

function redirectToOvenPage() {
  window.location.href = "oven-page.html";
}
function redirectToOvenOverview() {
  window.location.href = "oven-overview-page.html";
}

// REDIRECTS DISHWASHER

function redirectToDishwasherPage() {
  window.location.href = "dishwasher-page.html";
}
function redirectToDishwasherOverview() {
  window.location.href = "dishwasher-overview-page.html";
}

// REDIRECTS WASHING MACHINE

function redirectToWashingMachinePage() {
  window.location.href = "washing-machine-page.html";
}
function redirectToWashingMachineOverview() {
  window.location.href = "washing-machine-overview-page.html";
}

