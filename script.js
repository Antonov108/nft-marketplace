const connectBtn = document.getElementById("connect-btn");
const sellerPill = document.getElementById("seller-pill");

// Модальное окно для ввода адреса
const walletModal = document.getElementById("wallet-modal");
const cancelBtn = document.getElementById("cancel-btn");

// Создаём поле ввода внутри модального окна
walletModal.innerHTML = `
  <div class="modal-content">
    <h3>Введите адрес TON-кошелька</h3>
    <input id="wallet-input" placeholder="Адрес кошелька" style="width: 90%; padding: 8px; margin: 10px 0;">
    <button id="confirm-btn" class="btn">Подтвердить</button>
    <button id="cancel-btn" class="btn">Отмена</button>
  </div>
`;

const confirmBtn = document.getElementById("confirm-btn");
const walletInput = document.getElementById("wallet-input");

// Показ модального окна
connectBtn.addEventListener("click", () => {
  walletModal.style.display = "flex";
});

// Отмена
cancelBtn.addEventListener("click", () => {
  walletModal.style.display = "none";
});

// Подтверждение
confirmBtn.addEventListener("click", () => {
  const address = walletInput.value.trim();
  if (address === "") {
    alert("Введите адрес кошелька!");
    return;
  }
  sellerPill.textContent = `Продавец: ${address}`;
  connectBtn.textContent = "TON кошелёк подключен ✅";
  walletModal.style.display = "none";
  walletInput.value = "";
});
