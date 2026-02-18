// BOTAO CONTINUAR

document.addEventListener("DOMContentLoaded", () => {
  const continueButton = document.getElementById("continue-button");
  continueButton.addEventListener("click", function () {
    const emailInput = document.getElementById("register-email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
      const additionalFields = document.getElementById("register-additional-fields");
      additionalFields.style.display = "block";
      continueButton.style.display = "none";
    } else {
      alert("Por favor, insira um e-mail válido.");
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
