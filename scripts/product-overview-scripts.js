
// ANIMAÇÃO SETA

function toggleElement(targetId, arrowClass) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const arrow = targetElement.previousElementSibling.querySelector(`.${arrowClass}`);
  targetElement.classList.toggle('show');
  if (arrow) {
    arrow.classList.toggle('rotated');
  }
}

function initializeToggles(containerSelector, arrowClass) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach((container) => {
    const arrow = container.previousElementSibling.querySelector(`.${arrowClass}`);
    if (container.classList.contains('show')) {
      if (arrow) arrow.classList.add('rotated');
    } else {
      if (arrow) arrow.classList.remove('rotated');
    }
  });
}

// ANIMAÇÃO OVERVIEW

let currentIndex = 0; 

function updateMainImageWithAnimation(newIndex) {
  const mainImage = document.querySelector('.main-image'); 
  const extraImages = document.querySelectorAll('.extra-image');
  if (!mainImage || !extraImages[newIndex]) return;
  const direction = newIndex > currentIndex ? 'down' : 'up';
  const animationDuration = 500;
  mainImage.style.transition = `transform ${animationDuration}ms ease-in-out, opacity ${animationDuration / 2}ms ease-out`;
  mainImage.style.transform = direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)';
  mainImage.style.opacity = '0';
  setTimeout(() => {
    mainImage.src = extraImages[newIndex].src;
    mainImage.style.transition = '';
    mainImage.style.transform = direction === 'down' ? 'translateY(-100%)' : 'translateY(100%)';
    mainImage.style.opacity = '0';
    setTimeout(() => {
      mainImage.style.transition = `transform ${animationDuration}ms ease-in-out, opacity ${animationDuration / 2}ms ease-in`;
      mainImage.style.transform = 'translateY(0)';
      mainImage.style.opacity = '1';
      currentIndex = newIndex;
    }, 50);
  }, animationDuration);
}

function initializeExtraImageClicks() {
  const extraImageContainers = document.querySelectorAll('.extra-image-container'); 
  const mainImage = document.querySelector('.main-image');
  if (extraImageContainers.length > 0) {
    extraImageContainers[0].classList.add('selected'); 
    if (mainImage) {
      mainImage.src = extraImageContainers[0].querySelector('.extra-image').src;
    }
  }
  extraImageContainers.forEach((imageContainer, index) => {
    imageContainer.addEventListener('click', () => {
      extraImageContainers.forEach((container) => container.classList.remove('selected'));
      imageContainer.classList.add('selected');
      if (index !== currentIndex) {
        updateMainImageWithAnimation(index);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeExtraImageClicks();
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
