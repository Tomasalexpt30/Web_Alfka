// ANIMAÇÃO SETA

function toggleFilters(filterId) {
  const filterContent = document.getElementById(filterId);
  const arrow = filterContent.previousElementSibling.querySelector('.filter-arrow');
  filterContent.classList.toggle('show');
  arrow.classList.toggle('rotated');
}

function initializeArrows() {
  const filterContainers = document.querySelectorAll('.filter-content');
  filterContainers.forEach((filterContent) => {
    const arrow = filterContent.previousElementSibling.querySelector('.filter-arrow');
    if (filterContent.classList.contains('show')) {
      arrow.classList.add('rotated');
    } else {
      arrow.classList.remove('rotated');
    }
  });
}

// PRICE SLIDER

function updatePriceLabels() {
  const minSlider = document.getElementById('price-min');
  const maxSlider = document.getElementById('price-max');
  const minLabel = document.getElementById('price-min-label');
  const maxLabel = document.getElementById('price-max-label');
  let minValue = parseInt(minSlider.value);
  let maxValue = parseInt(maxSlider.value);
  const minGap = 500; 
  const minLimitForMax = 500; 

  if (maxValue < minLimitForMax) {
    maxValue = minLimitForMax;
    maxSlider.value = minLimitForMax;
  }

  if (minValue + minGap > maxValue) {
    minValue = maxValue - minGap;
    minSlider.value = minValue;
  }

  minLabel.textContent = `${minValue},00 €`;
  maxLabel.textContent = `${maxValue},00 €`;

  const minPercent = Math.max(0, Math.min(100, ((minValue - minSlider.min) / (maxSlider.max - minSlider.min)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxValue - minSlider.min) / (maxSlider.max - minSlider.min)) * 100));

  document.querySelector('.range-slider').style.setProperty('--min-percent', `${minPercent}%`);
  document.querySelector('.range-slider').style.setProperty('--max-percent', `${maxPercent}%`);
}

document.getElementById('price-min').addEventListener('input', updatePriceLabels);
document.getElementById('price-max').addEventListener('input', updatePriceLabels);



// ORDER DROPBOX

document.addEventListener('DOMContentLoaded', function() {
  const orderContainer = document.querySelector('.order-container');
  const dropdown = document.querySelector('.order-dropdown');
  const selectedOption = document.querySelector('.order-selected');
  const optionsList = document.querySelectorAll('.order-option');
  const optionsContainer = document.querySelector('.order-options');

  optionsList[0].classList.add('selected');

  orderContainer.addEventListener('click', (e) => {
    optionsContainer.classList.toggle('visible');
    e.stopPropagation();
  });

  optionsList.forEach(option => {
    option.addEventListener('click', (e) => {
      optionsList.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedOption.textContent = option.textContent;
      optionsContainer.classList.remove('visible');
      e.stopPropagation();
    });
  });

  document.addEventListener('click', (e) => {
    if (!orderContainer.contains(e.target)) {
      optionsContainer.classList.remove('visible');
    }
  });
});


// REDIRECTS MAIN PAGE

function redirectToMainPage() {
  window.location.href = "main-page.html";
}

//REDIRECTS LOGIN PAGE

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
