import {
  initializeApp,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "Removed for security reasons",
  authDomain: "Removed for security reasons",
  projectId: "Removed for security reasons",
  storageBucket: "Removed for security reasons",
  messagingSenderId: "Removed for security reasons",
  appId: "Removed for security reasons",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


function showSuccessPopup(message) {
  const popup = document.getElementById("success-popup");
  const popupMessage = document.getElementById("success-message");
  const closeButton = document.getElementById("success-close-button");
  if (popup && popupMessage && closeButton) {
    popupMessage.textContent = message;
    popup.style.display = "flex";
    closeButton.addEventListener("click", () => {
      popup.style.display = "none";
    });
  } else {
    console.log("Mensagem de sucesso:", message); 
  }
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (field) {
    let errorLabel = field.nextElementSibling;
    if (!errorLabel || !errorLabel.classList.contains("error-label")) {
      errorLabel = document.createElement("span");
      errorLabel.className = "error-label";
      field.parentNode.appendChild(errorLabel);
    }
    errorLabel.textContent = message;
  }
}


function clearFieldErrors(inputIds) {
  inputIds.forEach((id) => {
    const field = document.getElementById(id);
    const errorLabel = field?.nextElementSibling;
    if (errorLabel && errorLabel.classList.contains("error-label")) {
      errorLabel.textContent = "";
    }
  });
}

function updateUserTooltip(user) {
  const loginButton = document.getElementById("login-register-button");
  const accountButton = document.getElementById("account-button");
  const notificationsButton = document.getElementById("notifications-button");
  const infoButton = document.getElementById("info-button");
  const settingsButton = document.getElementById("settings-button");
  const logoutButton = document.getElementById("logout-button");
  const dashboardButton = document.getElementById("dashboard-button");

  if (loginButton && accountButton && notificationsButton && infoButton && settingsButton && logoutButton) {
    if (user) {
      const isAdmin = user.email === "admin@gmail.com";

      loginButton.style.display = "none";
      accountButton.style.display = "flex";
      notificationsButton.style.display = "flex";
      infoButton.style.display = "none";
      settingsButton.style.display = "flex";
      logoutButton.style.display = "flex";

      if (dashboardButton) {
        dashboardButton.style.display = isAdmin ? "flex" : "none";
      }
    } else {
      loginButton.style.display = "flex";
      accountButton.style.display = "none";
      notificationsButton.style.display = "none";
      infoButton.style.display = "flex";
      settingsButton.style.display = "none";
      logoutButton.style.display = "none";

      if (dashboardButton) {
        dashboardButton.style.display = "none";
      }
    }
  }
}


onAuthStateChanged(auth, (user) => {
  updateUserTooltip(user);
});


function clearInputs(inputIds) {
  inputIds.forEach((id) => {
    const inputField = document.getElementById(id);
    if (inputField) inputField.value = "";
  });
}

function createUser(email, password, name, address, country) {
  return createUserWithEmailAndPassword(auth, email, password).then(() => {
    showSuccessPopup("Usuário registrado com sucesso!");
  }).catch((error) => {
    clearFieldErrors(["register-email", "register-password"]);
    if (error.code === "auth/email-already-in-use") {
      showFieldError("register-email", "Erro: Este e-mail já está registrado.");
    } else if (error.code === "auth/invalid-email") {
      showFieldError("register-email", "Erro: Formato de e-mail inválido.");
    } else if (error.code === "auth/weak-password") {
      showFieldError("register-password", "Erro: A senha deve ter pelo menos 6 caracteres.");
    } else {
      showFieldError("register-email", `Erro no registro: ${error.message}`);
    }
  });
}

function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    if (user.email === "admin@gmail.com") {
      showSuccessPopup("Bem-vindo, administrador!");
    } else {
      showSuccessPopup("Login efetuado com sucesso!");
    }
  }).catch((error) => {
    clearFieldErrors(["login-email", "login-password"]);
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      showFieldError("login-email", "Erro no login: Verifique suas credenciais.");
      showFieldError("login-password", "Erro no login: Verifique suas credenciais.");
    } else if (error.code === "auth/too-many-requests") {
      showFieldError("login-email", "Erro: Muitas tentativas de login. Tente novamente mais tarde.");
    } else if (error.code === "auth/network-request-failed") {
      showFieldError("login-email", "Erro: Falha de conexão com o servidor.");
    } else {
      showFieldError("login-email", "Erro no login: Verifique suas credenciais.");
    }
  });
}


function handleLogout() {
  if (auth.currentUser) {
    signOut(auth)
      .then(() => showSuccessPopup("Logout efetuado com sucesso!"))
      .catch((error) => console.error(`Erro ao fazer logout: ${error.message}`));
  }
}

const simulateUserActivityData = () => {
  const dailyData = Array(31).fill(0);

  dailyData[17] = 25; 
  dailyData[18] = 3;  
  dailyData[19] = 1;  
  dailyData[20] = 7;  
  dailyData[21] = 0;  
  dailyData[22] = 0;  

  for (let i = 0; i < 17; i++) {
    dailyData[i] = 0; 
  }

  const totalUsersInPeriod = dailyData.slice(0, 23).reduce((acc, curr) => acc + curr, 0);

  return { dailyData, monthlyData: [totalUsersInPeriod] }; 
};

function showDashboardPopup() {
  const { dailyData, monthlyData } = simulateUserActivityData();
  const ctx = document.getElementById("user-activity-chart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: dailyData.length }, (_, i) => `${i} Janeiro`), 
      datasets: [
        {
          label: "Utilizadores Ativos - Dia",
          data: dailyData,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Utilizadores Ativos - Mês",
          data: monthlyData,
          borderColor: "green",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: { title: { display: true, text: "Horas / Dias" } },
        y: { title: { display: true, text: "Número de Utilizadores" } },
      },
    },
  });

  const popup = document.getElementById("dashboard-popup");
  const closeButton = document.getElementById("dashboard-close-button");

  popup.style.display = "flex";
  popup.style.justifyContent = "center";
  popup.style.alignItems = "center";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

  const content = popup.querySelector(".popup-content");
  if (content) {
    content.style.width = "60%";
    content.style.height = "70%";
    content.style.padding = "20px";
  }

  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
    chart.destroy(); p
  });
}

document.getElementById("dashboard-button")?.addEventListener("click", showDashboardPopup);
function setupEventListeners() {
  document
    .getElementById("login-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("login-email")?.value;
      const password = document.getElementById("login-password")?.value;
      clearFieldErrors(["login-email", "login-password"]);
      if (!email) {
        showFieldError("login-email", "Erro: O preenchimento do e-mail é obrigatório.");
        return;
      }
      if (!password) {
        showFieldError("login-password", "Erro: O preenchimento da senha é obrigatório.");
        return;
      }
      loginUser(email, password);
    });

  document
    .getElementById("logout-button")
    ?.addEventListener("click", handleLogout);

  document
    .getElementById("register-button")
    ?.addEventListener("click", () => {
      const email = document.getElementById("register-email")?.value;
      const password = document.getElementById("register-password")?.value;
      const confirmPassword = document.getElementById("register-confirm-password")?.value;
      const name = document.getElementById("register-name")?.value;
      const address = document.getElementById("register-address")?.value;
      const country = document.getElementById("register-country")?.value;

      clearFieldErrors([
        "register-name",
        "register-address",
        "register-country",
        "register-email",
        "register-password",
        "register-confirm-password",
      ]);

      if (!name) {
        showFieldError("register-name", "Erro: O preenchimento do nome é obrigatório.");
        return;
      }
      if (!address) {
        showFieldError("register-address", "Erro: O preenchimento da morada é obrigatório.");
        return;
      }
      if (!country) {
        showFieldError("register-country", "Erro: O preenchimento do país é obrigatório.");
        return;
      }
      if (!email) {
        showFieldError("register-email", "Erro: O preenchimento do e-mail é obrigatório.");
        return;
      }
      if (!password) {
        showFieldError("register-password", "Erro: O preenchimento da senha é obrigatório.");
        return;
      }
      if (!confirmPassword) {
        showFieldError("register-confirm-password", "Erro: O preenchimento da confirmação de senha é obrigatório.");
        return;
      }
      if (password !== confirmPassword) {
        showFieldError("register-confirm-password", "Erro: As senhas não correspondem.");
        return;
      }

      createUser(email, password, name, address, country);
    });
}

setupEventListeners();

export { updateUserTooltip, handleLogout, loginUser, createUser };
